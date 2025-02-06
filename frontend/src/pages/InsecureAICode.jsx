import { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router";
import { MdNavigateNext } from "react-icons/md";
import { FaShieldAlt, FaInfoCircle } from "react-icons/fa";

function InsecureAICode() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState(
    "Baue mir bitte mit Python einen Endpoint, um User einzuloggen."
  );
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim() || sent) return;

    const userMessage = {
      author: "Du",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      content: inputValue,
      type: "user",
    };

    setInputValue("");
    setMessages((prev) => [...prev, userMessage]);
    // Setzt den Status auf "gesendet", so dass keine weitere Eingabe möglich ist
    setSent(true);

    // Simuliert die KI-Antwort mit einer Verzögerung
    setTimeout(() => {
      const aiMessage = {
        author: "AI Code Generator",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        content: `from fastapi import FastAPI, Form
import mysql.connector

app = FastAPI()

@app.post("/login")
async def login(username: str = Form(...), password: str = Form(...)):
    conn = mysql.connector.connect(
        host="localhost",
        user="your_user",
        password="your_password",
        database="banking"
    )
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cursor.execute(query)
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    
    if user:
        return {"message": "Login erfolgreich!"}
    else:
        return {"message": "Ungültige Zugangsdaten"}
`,
        type: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000); // simuliert 1 Sekunde Verzögerung
  };

  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-sky-100 min-h-screen">
      {/* Einführungskarte */}
      <div className="max-w-4xl w-full bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg p-8 mb-8">
        <div className="flex items-center mb-4">
          <FaShieldAlt className="text-sky-600 text-3xl mr-2" />
          <h1 className="text-2xl font-bold text-sky-700">
            Security-Risiken von KI-generiertem Code
          </h1>
        </div>
        <p className="text-justify text-gray-700 mb-4">
          Immer mehr Entwickler nutzen KI-Tools, um Entwicklungsprozesse zu
          beschleunigen. Doch was passiert, wenn der generierte Code
          Schwachstellen enthält? Zum Beispiel könntest du dir Code generieren
          lassen, der für den Login von Usern zuständig ist. Wie du in den
          nächsten Lektionen sehen wirst, kann ein solcher Code, wenn er
          unbedacht eingesetzt wird, zu schwerwiegenden Sicherheitsproblemen
          führen.
        </p>
      </div>

      {/* Chatfenster */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4 flex items-center border-b border-gray-200 pb-2">
          <FaInfoCircle className="text-blue-500 text-xl mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">
            Simulierter Chat mit einer KI
          </h2>
        </div>

        {/* Nachrichtenbereich */}
        <div className="space-y-4 h-80 overflow-y-auto p-4 bg-gray-50 rounded-md mb-4 custom-scrollbar">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.type === "user" ? "items-start" : "items-end"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold">{msg.author}:</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              {msg.type === "ai" ? (
                <div className="bg-blue-100 rounded-md p-2 w-full mt-1">
                  <pre className="text-sm font-mono overflow-x-auto whitespace-pre-wrap">
                    {msg.content}
                  </pre>
                </div>
              ) : (
                <p className="bg-sky-100 rounded-md p-2 mt-1">{msg.content}</p>
              )}
            </div>
          ))}
        </div>

        {/* Eingabebereich */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Gib deine Anfrage hier ein..."
            disabled={sent}
          />
          <button
            onClick={handleSend}
            disabled={sent}
            className={`bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center justify-center transition-colors ${
              sent ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <IoIosSend className="text-white" size={24} />
          </button>
        </div>

        {/* Hinweis */}
        <div className="mt-4 text-center text-gray-600 text-sm">
          Hinweis: Dieser Chat simuliert, wie unsicherer KI-generierter Code
          aussehen kann.
        </div>
      </div>

      {/* Weitere Informationen */}
      <div className="max-w-4xl w-full bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg p-8 mt-8">
        <p className="text-justify text-gray-700 mb-4">
          In der nächsten Lektion beleuchten wir die erste Sicherheitslücke, die
          durch KI-generierten Code entstehen kann. Dabei wirst du entdecken,
          dass der von der KI erstellte Code Sicherheitslücken aufweist und
          nicht sicher ist. In den folgenden Lektionen erfährst du, warum solche
          Codes gefährliche Schwachstellen enthalten können.
        </p>
      </div>

      {/* Navigationsbutton*/}
      <div className="flex gap-4 mt-8">
        <Link
          to="/xss"
          className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-6 py-3 flex items-center shadow-md"
        >
          Nächste Lektion
          <MdNavigateNext size={24} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default InsecureAICode;
