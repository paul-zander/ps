import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MdNavigateNext } from "react-icons/md";

function FixSQLi() {
  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);
  // Unsicherer Code als Ausgangspunkt (nur als String, ohne Variablenauswertung)
  const insecureCode = `query = (
  "SELECT id, password FROM bibifi.users WHERE email = '"
  + request.email
  + "' AND (password = '"
  + request.password
  + "')"
)`;

  // Antwortoptionen inkl. passender Code-Beispiele
  const options = [
    {
      id: "A",
      text: "Prepared Statements bzw. Parameterized Queries verwenden",
      codeExample: `// Beispiel in Node.js mit dem "mysql" Modul:
const sql = "SELECT id, password FROM bibifi.users WHERE email = ? AND password = ?";
connection.query(sql, [request.email, request.password], (error, results) => {
  if (error) {
    throw error;
  }
  // Ergebnisse verarbeiten...
});`,
      isCorrect: true,
    },
    {
      id: "B",
      text: "HTML-Entities encoden",
      codeExample: `// Beispiel: HTML-Encoding
const safeEmail = encodeHTML(request.email);
const safePassword = encodeHTML(request.password);
query = (
  "SELECT id, password FROM bibifi.users WHERE email = '" +
  safeEmail +
  "' AND (password = '" +
  safePassword +
  "')"
);`,
      isCorrect: false,
    },
    {
      id: "C",
      text: "Daten in der Session speichern und dynamisch abfragen",
      codeExample: `// Beispiel: Daten aus der Session verwenden
const emailFromSession = request.session.email;
const passwordFromSession = request.session.password;
query = (
  "SELECT id, password FROM bibifi.users WHERE email = '" +
  emailFromSession +
  "' AND (password = '" +
  passwordFromSession +
  "')"
);`,
      isCorrect: false,
    },
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    const chosenOption = options.find((opt) => opt.id === selectedOption);
    if (!chosenOption) return;

    if (chosenOption.isCorrect) {
      setFeedback("Richtig! Prepared Statements verhindern SQL-Injection.");
    } else {
      setFeedback(
        "Falsch! Schau dir das Code-Beispiel an und versuche es nochmal."
      );
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-[#f9fcff] to-sky-50">
      <h2 className="text-2xl font-bold mb-4">SQL Injection Fix-It Quiz</h2>
      <p className="mb-4">
        Der unten stehende Code ist anfällig für SQL-Injection. Schau dir den
        Code an und entscheide, welche Variante diesen sicher macht.
      </p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto mb-6">
        {insecureCode}
      </pre>

      <h3 className="text-xl font-semibold mb-4">Antwortmöglichkeiten:</h3>
      {options.map((option) => (
        <div
          key={option.id}
          className="border border-gray-300 rounded p-4 mb-4 bg-white"
        >
          <label className="font-bold flex items-center">
            <input
              type="radio"
              name="fixsql"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={handleOptionChange}
              className="mr-2"
            />
            {option.id}. {option.text}
          </label>
          <pre className="bg-gray-200 p-2 rounded mt-2 whitespace-pre-wrap">
            {option.codeExample}
          </pre>
        </div>
      ))}

      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="bg-sky-400 hover:bg-sky-500 transition-all text-white px-4 py-3 h-12 flex items-center justify-center gap-2 shadow-lg"
        >
          Antwort prüfen
        </button>
        {feedback && <p className="mt-4 font-bold">{feedback}</p>}
        <Link
          to="/fix-XSS"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white px-4 py-3 h-12 flex items-center justify-center gap-2 shadow-lg"
        >
          Fix XSS
          <MdNavigateNext size={24} />
        </Link>
      </div>
    </div>
  );
}

export default FixSQLi;
