import { GrTransaction } from "react-icons/gr";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { NavLink } from "react-router";

function BankingAppSidebar() {
  return (
    <div className="flex flex-col p-4 gap-4 shadow-custom-shadow h-screen">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "border border-purple-600 p-2 hover:cursor-pointer flex gap-2 items-center text-white bg-purple-600 rounded-sm font-medium transition-all"
            : "border border-purple-600 hover:bg-purple-100 p-2 hover:cursor-pointer flex gap-2 items-center font-medium text-gray-800 hover:border-purple-100 rounded-sm"
        }
      >
        <MdOutlineSpaceDashboard />
        Finanzübersicht
      </NavLink>
      <NavLink
        to="/ueberweisung"
        className={({ isActive }) =>
          isActive
            ? "border border-purple-600 p-2 hover:cursor-pointer flex gap-2 items-center text-white bg-purple-600 rounded-sm font-medium transition-all"
            : "border border-purple-600 hover:bg-purple-100  p-2 hover:cursor-pointer flex gap-2 items-center font-medium text-gray-800 hover:border-purple-100 rounded-sm"
        }
      >
        <GrTransaction />
        Überweisung
      </NavLink>
      <NavLink
        to="/banking-login"
        className={({ isActive }) =>
          isActive
            ? "border border-purple-600 p-2 hover:cursor-pointer flex gap-2 items-center text-white bg-purple-600 rounded-sm font-medium transition-all"
            : "border border-purple-600 hover:bg-purple-100 p-2 hover:cursor-pointer flex gap-2 items-center font-medium text-gray-800 hover:border-purple-100 rounded-sm"
        }
      >
        <MdLogout />
        Logout
      </NavLink>
    </div>
  );
}

export default BankingAppSidebar;
