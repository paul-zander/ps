import { useEffect } from "react";
import { Link } from "react-router";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { FaBullseye, FaShieldAlt } from "react-icons/fa";

function BankingAppIntroduction() {
  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-sky-100 flex flex-col justify-center items-center p-6 min-h-screen">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-8 bg-white bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-sky-700">
          Willkommen zur Challenge
        </h1>
        <p className="text-justify leading-relaxed text-gray-700">
          Du hast bereits einiges über Sicherheitslücken wie SQL-Injection
          (SQLi) und Cross-Site Scripting (XSS) gelernt. Jetzt kannst du dein
          Wissen in einer praxisnahen Umgebung anwenden. In der folgenden
          simulierten Banking App kannst du selbst erleben, wie
          Sicherheitslücken ausgenutzt werden können – und warum es so wichtig
          ist, Systeme zu schützen.
        </p>
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Aufgaben-Karte */}
          <div className="flex-1 bg-sky-50 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaBullseye className="text-sky-600 text-2xl mr-2" />
              <h2 className="text-xl font-semibold text-sky-700">
                Deine Aufgabe:
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <span className="font-medium text-sky-600">Analysiere</span> die
                Banking App und finde mögliche Schwachstellen.
              </li>
              <li>
                <span className="font-medium text-sky-600">
                  Nimm die Rolle eines Hackers ein
                </span>
                , um gezielt Schwachstellen auszunutzen und versuche, Geld von
                anderen Nutzern zu stehlen.
              </li>
              <li>
                <span className="font-medium text-sky-600">Verstehe</span> die
                Denkweise von Angreifern, um in Zukunft besser vorbereitet zu
                sein und Systeme sicherer zu machen.
              </li>
              <li>
                <span className="font-medium text-sky-600">Habe Spaß!</span>
              </li>
            </ul>
          </div>

          {/* Hinweise-Karte */}
          <div className="flex-1 bg-green-50 rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaShieldAlt className="text-green-600 text-2xl mr-2" />
              <h2 className="text-xl font-semibold text-green-700">
                Wichtige Hinweise:
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                Ab der nächsten Seite gibt es im Header einen Button mit
                hilfreichen Hinweisen, die dich unterstützen.
              </li>
              <li>
                Diese Umgebung ist komplett simuliert und dient nur zu
                Übungszwecken.
              </li>
              <li>
                Nutze dein Wissen verantwortungsvoll – Ziel ist es,
                Schwachstellen zu verstehen, um sie in der realen Welt zu
                verhindern.
              </li>
            </ul>
          </div>
        </div>
        <p className="text-lg font-medium text-center text-gray-800">
          Viel Erfolg und happy hacking! 🚀
        </p>
      </div>

      {/* Navigationsbuttons */}
      <div className="flex gap-4 mt-8">
        <Link
          to="/xss"
          className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-6 py-3 flex items-center shadow-md"
        >
          <MdNavigateBefore size={24} className="mr-2" />
          Zurück zu SQLi
        </Link>
        <Link
          to="/banking-signup"
          className="bg-sky-600 hover:bg-sky-700 transition-colors text-white px-6 py-3 flex items-center shadow-md"
        >
          Zur Banking App
          <MdNavigateNext size={24} className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default BankingAppIntroduction;
