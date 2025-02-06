import { useState } from "react";
import HelpModal from "./HelpModal";
import { TfiHelpAlt } from "react-icons/tfi";
import { useLocation } from "react-router";
import { Link } from "react-router";

function Header() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const location = useLocation();

  const allowedRoutes = [
    "/banking-signup",
    "/banking-login",
    "/dashboard",
    "/ueberweisung",
  ];
  const showHelpButton = allowedRoutes.includes(location.pathname);

  const handleOpenHelp = () => {
    setIsHelpOpen(true);
  };

  const handleCloseHelp = () => {
    setIsHelpOpen(false);
  };
  return (
    <header className="flex items-center p-4 w-full shadow-md bg-white justify-between sticky top-0 z-50">
      <ul>
        <li className="text-4xl font-bold tracking-tighter">
          <Link to="/">
            <div className="flex items-center">
              <span className="mr-2 text-sky-900">{"</>"}</span>
              <span className="text-sky-800">BI</span>
              <span className="text-sky-700">BI</span>
              <span className="text-sky-600">FI</span>
            </div>
          </Link>
        </li>
      </ul>
      {showHelpButton && (
        <div className="flex gap-4">
          <button
            onClick={handleOpenHelp}
            className="px-4 py-2 bg-sky-200 text-sky-800 hover:bg-sky-300 transition flex gap-2 items-center"
          >
            <TfiHelpAlt /> Hilfestellung
          </button>
          <Link
            to="/fix-SQLi"
            className="px-4 py-2 border border-sky-800 text-sky-800 hover:border-sky-300 hover:text-sky-300 transition flex gap-2 items-center"
          >
            Challenge beenden
          </Link>
        </div>
      )}
      <HelpModal open={isHelpOpen} onClose={handleCloseHelp} />
    </header>
  );
}
export default Header;
