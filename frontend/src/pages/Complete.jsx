import { useEffect } from "react";
import { useWindowSize } from "react-use";
import { Link } from "react-router";
import Confetti from "react-confetti";

function Complete() {
  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);
  const { width, height } = useWindowSize();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        Herzlichen Glückwunsch!
      </h1>
      <p className="text-xl text-green-700 mb-8">Du hast alles geschafft!</p>
      <Link
        to="/"
        className=" bg-green-600 hover:bg-green-700 text-white py-2 px-6 shadow-xl"
      >
        Nochmal versuchen
      </Link>

      {/* Konfetti in einem Container, der zentriert ist */}
      <div className="flex items-center justify-center w-80 h-80">
        <Confetti
          width={width - 100}
          height={height - 100}
          numberOfPieces={200}
          recycle={false}
        />
      </div>
    </div>
  );
}

export default Complete;
