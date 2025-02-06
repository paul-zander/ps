import { useState, useEffect } from "react";

function XSSChat() {
  // State für Nachrichten und Text-Eingabe
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Funktion, um eine Nachricht zu senden
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Nachricht hinzufügen
      setNewMessage(""); // Eingabefeld zurücksetzen
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // useEffect, um JavaScript aus den Nachrichten zu evaluieren
  useEffect(() => {
    messages.forEach((msg) => {
      try {
        const scriptTag = /<script>(.*?)<\/script>/gs.exec(msg);
        if (scriptTag && scriptTag[1]) {
          eval(scriptTag[1]); // JavaScript-Code ausführen
        }
      } catch (error) {
        console.error("Fehler beim Ausführen von XSS-Code:", error);
      }
    });
  }, [messages]);

  // Funktion, mit der man eine simulierte Cookie-Nachricht in den Chat einfügt.
  useEffect(() => {
    window.simulateXSSCookieSteal = () => {
      const cookieMessage =
        "Hey, hier ist mein Cookie: sessionId=123456789; user=demoUser";
      setMessages((prevMessages) => [...prevMessages, cookieMessage]);
      console.log("Simulierter Cookie-Diebstahl ausgelöst!");
    };

    // Aufräumfunktion
    return () => {
      delete window.simulateXSSCookieSteal;
    };
  }, []);

  return (
    <div className="chat-box w-full max-w-md h-80 bg-white border border-gray-300 rounded-lg flex flex-col">
      {/* Nachrichten anzeigen */}
      <div className="messages flex-grow p-4 overflow-y-auto border-b border-gray-300">
        {messages.map((msg, index) => (
          <div key={index} className="message p-2 mb-2 bg-gray-100 rounded-lg">
            {/* Unsicheres Rendering der Nachricht, das zu XSS führt */}
            <div dangerouslySetInnerHTML={{ __html: msg }} />
          </div>
        ))}
      </div>

      {/* Eingabebereich */}
      <div className="message-input p-4 border-t border-gray-300 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Geben Sie eine Nachricht ein..."
          className="flex-grow p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 bg-sky-600 text-white p-2 rounded-lg hover:bg-sky-700"
        >
          Senden
        </button>
      </div>
    </div>
  );
}

export default XSSChat;
