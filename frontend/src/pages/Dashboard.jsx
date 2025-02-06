import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BankingAppSidebar from "../components/BankingAppSidebar";
import { NavLink } from "react-router";
import { FaPlus } from "react-icons/fa";
import LastTransactions from "../components/LastTransactions";
import CurrentBalance from "../components/CurrentBalance";

function Dashboard({ loggedInUser }) {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!loggedInUser) {
      // Auf Login umleiten
      navigate("/banking-login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    if (loggedInUser) {
      fetchData(loggedInUser);
    }
  }, [loggedInUser]);

  async function fetchData(userId) {
    try {
      // Transaktionen abrufen
      const resTransactions = await fetch(
        `http://127.0.0.1:8000/transactions/${userId}`
      );
      const transactionsData = await resTransactions.json();
      setTransactions(transactionsData);

      // Userdaten abrufen
      const resUserData = await fetch(
        `http://127.0.0.1:8000/userdata/${userId}`
      );
      const userJson = await resUserData.json();
      setUserData(userJson);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex border-t h-full">
      <BankingAppSidebar />
      <div className="py-4 px-8 w-full">
        <div className="flex justify-between">
          <h1 className="text-gray-900 text-xl font-bold mb-4">
            Finanzübersicht
          </h1>
          <NavLink
            to="/ueberweisung"
            className="flex gap-2 items-center p-4 bg-purple-700 hover:bg-purple-500 text-white transition-all rounded-sm font-medium"
          >
            <FaPlus size={"12px"} /> Überweisung
          </NavLink>
        </div>
        <h3 className="text-xl mb-6">
          Guten Tag, {userData.first_name} {userData.last_name}
        </h3>
        <CurrentBalance balance={userData.balance} />
        <LastTransactions transactions={transactions} />
      </div>
    </div>
  );
}

export default Dashboard;
