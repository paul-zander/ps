import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MdNavigateNext } from "react-icons/md";

function FixXSS() {
  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);
  // Unsicherer Code als Ausgangspunkt (nur als String, ohne Variablenauswertung)
  const insecureCode = `<div>
  Hallo, \${request.userInput}!
</div>`;

  // Antwortoptionen inkl. passender Code-Beispiele
  const options = [
    {
      id: "A",
      text: "Benutze eine Escape-Funktion für Benutzereingaben",
      codeExample: `// Beispiel in JavaScript:
// Escape-Funktion, die Sonderzeichen ersetzt:
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const safeOutput = escapeHTML(request.userInput);
const html = \`<div>
  Hallo, \${safeOutput}!
</div>\`;`,
      isCorrect: true,
    },
    {
      id: "B",
      text: "Den Benutzerinput direkt in den DOM einfügen",
      codeExample: `const html = \`<div>
  Hallo, \${request.userInput}!
</div>\`;`,
      isCorrect: false,
    },
    {
      id: "C",
      text: "innerHTML setzen",
      codeExample: `const element = document.getElementById("greeting");
element.innerHTML = \`Hallo, \${request.userInput}!\`;`,
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
    setFeedback(
      chosenOption.isCorrect
        ? "Richtig! Das Escapen von Benutzereingaben schützt vor XSS."
        : "Falsch! Beachte das Code-Beispiel und versuche es erneut."
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">XSS Fix-It Quiz</h2>
      <p className="mb-4">
        Der unten stehende Code zeigt ein Szenario, in dem Benutzereingaben
        direkt in den HTML-Code eingefügt werden. Dadurch entsteht eine
        Sicherheitslücke für Cross-Site Scripting (XSS). Schau dir den Code an
        und entscheide, welche Variante diesen sicher macht.
      </p>
      <pre className="bg-gray-100 p-4 rounded overflow-auto mb-6">
        {insecureCode}
      </pre>

      <h3 className="text-xl font-semibold mb-4">Antwortmöglichkeiten:</h3>
      {options.map((option) => (
        <div
          key={option.id}
          className="border border-gray-300 rounded p-4 mb-4"
        >
          <label className="font-bold flex items-center">
            <input
              type="radio"
              name="fixxss"
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
          to="/complete"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white px-4 py-3 h-12 flex items-center justify-center gap-2 shadow-lg"
        >
          Beenden
          <MdNavigateNext size={24} />
        </Link>
      </div>
    </div>
  );
}

export default FixXSS;
