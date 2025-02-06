from fastapi import FastAPI, HTTPException, status, Form
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from mysql.connector import pooling
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

# Lade Umgebungsvariablen aus der .env Datei
load_dotenv()

# Pydantic Modelle für Requests
class RegisterRequest(BaseModel):
    first_name: str
    last_name: str
    # email: EmailStr
    email: str
    password: str

class LoginRequest(BaseModel):
    # email: EmailStr
    email: str
    password: str

class TransferRequest(BaseModel):
    # sender_email: EmailStr 
    # receiver_email: EmailStr
    sender_email: str
    receiver_email: str
    amount: float
    purpose: str

# Passlib-Kontext mit Bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Erstellt einen Bcrypt-Hash für das übergebene Passwort."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Vergleicht ein Klartext-Passwort mit einem Bcrypt-Hash."""
    return pwd_context.verify(plain_password, hashed_password)

dbconfig = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", "1234"),
    "database": os.getenv("DB_NAME", "bibifi"),
    "connection_timeout": int(os.getenv("CONNECTION_TIMEOUT", 3600))
}

pool = pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **dbconfig)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Endpoint: /register
# ----------------------------
@app.post("/register")
def register_user(request: RegisterRequest):
    """
    Registriert einen neuen Benutzer, wenn die E-Mail-Adresse noch nicht vergeben ist.
    Unsichere SQL-Abfragen (String-Konkatenation) bleiben absichtlich erhalten.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        # Prüfen, ob die E-Mail schon existiert
        check_query = "SELECT id FROM bibifi.users WHERE email = '%s'" % (request.email,)
        cursor.execute(check_query)
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Ein Benutzer mit dieser E-Mail existiert bereits."
            )

        # Passwort bewusst für Lehrzwecke nicht gehashed (alternativ: hash_password(request.password))
        plain_pw = request.password
        insert_query = (
            "INSERT INTO bibifi.users (first_name, last_name, email, balance, password) "
            "VALUES ('%s','%s','%s',%s,'%s')"
            % (request.first_name, request.last_name, request.email, 200.00, plain_pw)
        )
        cursor.execute(insert_query)
        conn.commit()

        return {"message": "Benutzer erfolgreich registriert"}

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler bei der Registrierung: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /login (unsicher, absichtlich!)
# ----------------------------
@app.post("/login")
def login_user(request: LoginRequest):
    """
    Loggt einen bestehenden Benutzer ein. Unsichere SQL-Abfrage per String-Konkatenation.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        query = (
            "SELECT id, password FROM bibifi.users WHERE email = '"
            + request.email
            + "' AND (password = '"
            + request.password
            + "')"
        )
        cursor.execute(query)
        user_data = cursor.fetchone()

        if not user_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Benutzer nicht gefunden oder falsches Passwort."
            )

        user_id, stored_password = user_data

        return {"message": "Login erfolgreich", "user_id": user_id}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Einloggen: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /transactions/{user_id} (Abfrage aller Transaktionen eines Benutzers)
# ----------------------------
@app.get("/transactions/{user_id}")
def get_transactions(user_id: int):
    """
    Gibt alle Transaktionen des Benutzers zurück.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM bibifi.transactions WHERE user_id = %s ORDER BY date DESC" % (user_id,)
        cursor.execute(query)
        result = cursor.fetchall()

        transactions = []
        for row in result:
            try:
                amount_val = float(row[3]) if row[3] is not None else 0.0
            except Exception:
                amount_val = 0.0

            transactions.append({
                "id": row[0],
                "user_id": row[1],
                "description": row[2],
                "amount": f"{amount_val:.2f}",
                "date": row[4],
                "purpose": row[5]
            })

        return transactions

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Abrufen der Transaktionen: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /transactions (Erstellen einer Transaktion via Form-Daten)
# ----------------------------
@app.post("/transactions")
def create_transaction(
    user_id: int = Form(...),
    description: str = Form(...),
    amount: float = Form(...),
    date: str = Form(...),
    purpose: str = Form(...)
):
    """
    Erstellt eine neue Transaktion.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        query = (
            "INSERT INTO bibifi.transactions (user_id, description, amount, date, purpose) "
            "VALUES (%s, %s, %s, %s, %s)"
        )
        values = (user_id, description, amount, date, purpose)
        cursor.execute(query, values)
        conn.commit()

        return {
            "message": "Transaktion erfolgreich erstellt",
            "transaction": {
                "user_id": user_id,
                "description": description,
                "amount": f"{amount:.2f}",
                "date": date,
                "purpose": purpose
            }
        }

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Erstellen der Transaktion: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /userdata/{user_id} (Abfrage der Benutzerdaten)
# ----------------------------
@app.get("/userdata/{user_id}")
def get_userdata(user_id: int):
    """
    Gibt die Userdaten des angegebenen Benutzers zurück.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM bibifi.users WHERE id = %s" % (user_id,)
        cursor.execute(query)
        result = cursor.fetchone()

        if not result:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Benutzer mit der ID {user_id} wurde nicht gefunden."
            )

        userdata = {
            "id": result[0],
            "first_name": result[1],
            "last_name": result[2],
            "email": result[3],
            "balance": f"{result[4]:.2f}"
        }

        return userdata

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Abrufen der Userdaten: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /transfer
# ----------------------------
@app.post("/transfer")
def transfer_funds(request: TransferRequest):
    """
    Führt eine Überweisung durch.
    Unsichere SQL-Abfragen (String-Konkatenation) werden absichtlich verwendet.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        sender_email = request.sender_email
        receiver_email = request.receiver_email
        amount = request.amount
        purpose = request.purpose

        # Sender anhand der E-Mail suchen (unsichere Abfrage)
        query_sender = (
            "SELECT id, balance, email FROM bibifi.users WHERE email = '"
            + sender_email
            + "'"
        )
        cursor.execute(query_sender)
        sender_data = cursor.fetchone()

        if not sender_data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Absender mit der E-Mail {sender_email} wurde nicht gefunden."
            )
        sender_id, sender_balance, _ = sender_data

        if sender_balance < amount:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Nicht genügend Guthaben."
            )

        # Empfänger anhand der E-Mail suchen (unsichere Abfrage)
        query_receiver = (
            "SELECT id FROM bibifi.users WHERE email = '"
            + receiver_email
            + "'"
        )
        cursor.execute(query_receiver)
        receiver = cursor.fetchone()

        if not receiver:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Empfänger mit der E-Mail {receiver_email} wurde nicht gefunden."
            )
        receiver_id = receiver[0]

        # Betrag vom Absender abziehen
        query_deduct = (
            "UPDATE bibifi.users SET balance = balance - %s WHERE id = %s"
            % (amount, sender_id)
        )
        cursor.execute(query_deduct)

        # Betrag dem Empfänger gutschreiben
        query_credit = (
            "UPDATE bibifi.users SET balance = balance + %s WHERE id = %s"
            % (amount, receiver_id)
        )
        cursor.execute(query_credit)

        current_date = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Transaktion für den Absender eintragen
        query_trans_sender = (
            "INSERT INTO bibifi.transactions (user_id, description, amount, date, purpose) "
            "VALUES (%s, %s, %s, %s, %s)"
        )
        values_sender = (sender_id, f"Überweisung an {receiver_email}", -amount, current_date, purpose)
        cursor.execute(query_trans_sender, values_sender)

        # Transaktion für den Empfänger eintragen
        query_trans_receiver = (
            "INSERT INTO bibifi.transactions (user_id, description, amount, date, purpose) "
            "VALUES (%s, %s, %s, %s, %s)"
        )
        values_receiver = (receiver_id, f"Überweisung von {sender_email}", amount, current_date, purpose)
        cursor.execute(query_trans_receiver, values_receiver)

        conn.commit()

        return {
            "message": "Überweisung erfolgreich durchgeführt",
            "transfer": {
                "sender_email": sender_email,
                "receiver_email": receiver_email,
                "amount": f"{amount:.2f}",
                "purpose": purpose,
                "date": current_date
            }
        }

    except Exception as e:
        if conn:
            conn.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler bei der Überweisung: {str(e)}"
        )
    finally:
        if conn:
            conn.close()

# ----------------------------
# Endpoint: /users/{user_id} (Abfrage aller Benutzer außer dem angegebenen)
# ----------------------------
@app.get("/users/{user_id}")
def get_all_users(user_id: int):
    """
    Gibt alle Benutzer zurück, außer dem mit der angegebenen ID.
    """
    conn = None
    try:
        conn = pool.get_connection()
        cursor = conn.cursor()
        query = "SELECT id, first_name, last_name, email, balance FROM bibifi.users WHERE id != %s" % (user_id,)
        cursor.execute(query)
        results = cursor.fetchall()

        users = []
        for row in results:
            users.append({
                "id": row[0],
                "first_name": row[1],
                "last_name": row[2],
                "email": row[3],
                "balance": f"{row[4]:.2f}"
            })

        return users

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Fehler beim Abrufen der Benutzerdaten: {str(e)}"
        )
    finally:
        if conn:
            conn.close()
