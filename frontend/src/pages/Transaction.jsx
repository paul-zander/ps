import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import BankingAppSidebar from "../components/BankingAppSidebar";
import CurrentBalance from "../components/CurrentBalance";
import { ToastContainer, toast } from "react-toastify";

function Transaction({ loggedInUser }) {
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState({});
  // Handle transfer
  const [receiverMail, setReceiverMail] = useState("");
  const [allUserEmails, setAllUserEmails] = useState([]);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/banking-login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    if (loggedInUser) {
      (async () => {
        await fetchData(loggedInUser);
        await fetchUserEmails();
      })();
    }
  }, [loggedInUser]);

  async function fetchData(userId) {
    try {
      console.log(userId);

      // --- Abrufen der Transaktionen ---
      const resTransactions = await fetch(
        `http://127.0.0.1:8000/transactions/${userId}`
      );
      console.log("Transaktionen Response-Object:", resTransactions);
      if (!resTransactions.ok) {
        const errorText = await resTransactions.text();
        console.error("Transaktionen Server Error Body:", errorText);
        throw new Error("HTTP-Error (Transactions): " + resTransactions.status);
      }
      const transactionsData = await resTransactions.json();
      console.log("Transaktionen Server Data:", transactionsData);
      setTransactions(transactionsData);

      // --- Abrufen der Userdaten ---
      const resUserData = await fetch(
        `http://127.0.0.1:8000/userdata/${userId}`
      );
      console.log("Userdaten Response-Object:", resUserData);
      if (!resUserData.ok) {
        const errorText = await resUserData.text();
        console.error("Userdaten Server Error Body:", errorText);
        throw new Error("HTTP-Error (Userdata): " + resUserData.status);
      }
      const userJson = await resUserData.json();
      console.log("Userdaten Server Data:", userJson);
      setUserData(userJson);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function fetchUserEmails() {
    try {
      const resUsers = await fetch(
        `http://127.0.0.1:8000/users/${loggedInUser}`
      );
      if (!resUsers.ok) {
        const errorText = await resUsers.text();
        console.error("Users Server Error Body:", errorText);
        throw new Error("HTTP-Error (Users): " + resUsers.status);
      }
      const usersData = await resUsers.json();
      // Wir extrahieren nur die Email-Adressen aus der zurückgegebenen Liste
      const emails = usersData.map((user) => user.email);
      setAllUserEmails(emails);
    } catch (error) {
      console.error("Fehler beim Abrufen der User-Emails:", error);
    }
  }

  const transferMoney = async () => {
    // Überprüfung, ob alle Felder ausgefüllt sind
    if (!receiverMail || !amount || !purpose) {
      toast.error(
        "Bitte füllen Sie alle Felder aus, um die Überweisung durchzuführen."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_email: userData.email,
          receiver_email: receiverMail,
          amount: parseFloat(amount),
          purpose: purpose,
        }),
      });

      if (!response.ok) {
        // Fehler behandeln, wenn der Statuscode nicht 2xx ist
        const errorData = await response.json();
        throw new Error(errorData.detail || "Ein Fehler ist aufgetreten.");
      }
      const data = await response.json();
      console.log(data);

      toast.success("Überweisung erfolgreich");

      // States zurücksetzen nach erfolgreicher Überweisung
      setReceiverMail(allUserEmails[0]);
      setAmount("");
      setPurpose("");

      // Balance nach erfolgreicher Überweisung aktualisieren
      await fetchData(loggedInUser);
    } catch (error) {
      toast.error(error.message);
      console.error("Fehler:", error.message);
    }
  };

  return (
    <div className="flex border-t h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        theme="light"
      />
      <BankingAppSidebar />
      <div className="flex flex-col w-full items-center">
        <div className="py-8 px-8">
          <h1 className="text-gray-900 text-xl font-bold mb-4">Überweisung</h1>
          <div className="mb-6">
            <CurrentBalance balance={userData.balance} />
          </div>

          <div className="flex flex-col gap-4">
            <select
              className="border-2 p-2 rounded-sm w-[500px] focus:outline-none focus:border-purple-700"
              value={receiverMail}
              onChange={(e) => setReceiverMail(e.target.value)}
            >
              <option value="" disabled>
                Empfänger auswählen
              </option>
              {allUserEmails.map((email) => (
                <option key={email} value={email}>
                  {email}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Betrag"
              className="border-2 p-2 rounded-sm w-[500px] focus:outline-none focus:border-purple-700"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Verwendungszweck"
              className="border-2 p-2 rounded-sm w-[500px] h-[100px] focus:outline-none focus:border-purple-700"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
            <button
              className="self-end p-4 bg-purple-600 hover:bg-purple-400 transition-all font-medium text-white rounded-sm"
              onClick={transferMoney}
            >
              Überweisen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
