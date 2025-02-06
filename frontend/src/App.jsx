import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import InsecureAICode from "./pages/InsecureAICode";
import AccordionXSS from "./pages/AccordionXSS";
import AccordionSQLi from "./pages/AccordionSQLi";
import BankingAppIntroduction from "./pages/BankingAppIntroduction";
import BankingAppSignUp from "./pages/BankingAppSignUp";
import BankingAppLogin from "./pages/BankingAppLogin";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import FixSQLi from "./pages/FixSQLi";
import FixXSS from "./pages/FixXSS";
import Complete from "./pages/Complete";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      window.currentUser = loggedInUser;
    } else {
      // Wenn kein Benutzer eingeloggt ist, sicherheitshalber den globalen Wert entfernen
      delete window.currentUser;
    }
  }, [loggedInUser]);

  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <Output /> */}
        <Routes>
          {/* "Lehr"-Seiten */}
          <Route path="/" element={<InsecureAICode />} />
          <Route path="/xss" element={<AccordionXSS />} />
          <Route path="/sql-injection" element={<AccordionSQLi />} />
          {/* Einführungstext */}
          <Route path="/introduction" element={<BankingAppIntroduction />} />
          {/* Banking-spezifische Routen */}
          <Route path="banking-signup" element={<BankingAppSignUp />} />
          <Route
            path="banking-login"
            element={<BankingAppLogin setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="dashboard"
            element={<Dashboard loggedInUser={loggedInUser} />}
          />
          <Route
            path="ueberweisung"
            element={<Transaction loggedInUser={loggedInUser} />}
          />
          {/* Fix-It Teil */}
          <Route path="fix-SQLi" element={<FixSQLi />} />
          <Route path="fix-XSS" element={<FixXSS />} />
          {/* Finish */}
          <Route path="complete" element={<Complete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
