import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { CiCircleInfo } from "react-icons/ci";
import { BsBank, BsEye, BsEyeSlash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

function BankingAppSignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fehler- und UI-Zustände
  const [error, setError] = useState("");

  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);

  // Sichtbarkeit für Passwortfelder steuern
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Für Navigation nach erfolgreichem Registrieren
  const navigate = useNavigate();

  // Handler zum Umschalten der Passwortsichtbarkeit (erstes Passwortfeld)
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handler zum Umschalten der Passwortsichtbarkeit (Confirm-Passwortfeld)
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Handler für das Abschicken des Formulars
  const handleRegister = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Bitte alle Felder ausfüllen.");
      return;
    }

    // Passwörter vergleichen
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        // Hiermit fängst du z. B. den 400- oder 500-Statuscode ab
        const errorData = await response.json();
        throw new Error(errorData.detail || "Fehler bei der Registrierung.");
      }

      // Wenn erfolgreich, JSON-Antwort weiter verarbeiten
      const data = await response.json();
      console.log(data.message);

      toast.success("Registierung erfolgreich!");

      setTimeout(() => {
        navigate("/banking-login");
      }, 2000);
    } catch (err) {
      setError(err.message);
      console.error("Registrierungsfehler:", err.message);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center relative">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col items-center gap-1">
        <BsBank className="text-2xl text-gray-700" />
        <h1 className="font-bold text-2xl uppercase text-gray-700">
          Super Secure Bank
        </h1>
      </div>
      <NavLink
        to="/banking-login"
        className="absolute top-4 right-24 w-[100px] flex item justify-center p-4 bg-purple-800 hover:bg-purple-600 text-white font-medium transition-all"
      >
        Login
      </NavLink>

      <form
        className="flex flex-col gap-4 xs:p-4 md:p-6 shadow-custom-shadow items-center w-[300px] md:w-[500px] bg-white mt-4"
        onSubmit={handleRegister}
      >
        <h2 className="font-medium text-3xl border-b-2 border-b-violet-800 p-2 mb-5">
          Sign Up
        </h2>

        {/* Vorname */}
        <input
          type="text"
          id="firstName"
          className="border p-3 w-full focus:outline-none focus:border-purple-600"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Vorname"
          required
        />

        {/* Nachname */}
        <input
          type="text"
          id="lastName"
          className="border p-3 w-full focus:outline-none focus:border-purple-600"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Nachname"
          required
        />

        {/* E-Mail */}
        <input
          type="email"
          id="email"
          className="border p-3 w-full focus:outline-none focus:border-purple-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-Mail"
          required
        />

        {/* Passwort */}
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="border p-3 w-full focus:outline-none focus:border-purple-600 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3.5 text-gray-700"
          >
            {showPassword ? (
              <BsEye size={"24px"} />
            ) : (
              <BsEyeSlash size={"24px"} />
            )}
          </button>
        </div>

        {/* Passwort bestätigen */}
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="border p-3 w-full focus:outline-none focus:border-purple-600 pr-10"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Passwort bestätigen"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-3 top-3.5 text-gray-700"
          >
            {showConfirmPassword ? (
              <BsEye size={"24px"} />
            ) : (
              <BsEyeSlash size={"24px"} />
            )}
          </button>
        </div>

        {/* Fehlermeldung (falls vorhanden) */}
        {error && <p className="error-message text-red-600">{error}</p>}

        {/* Registrieren-Button */}
        <button
          type="submit"
          className="bg-violet-800 hover:bg-violet-700 transition-all text-white p-3 w-full font-medium"
        >
          Registrieren
        </button>

        <div className="flex gap-2 items-center text-gray-600 mt-2">
          <CiCircleInfo size={"32px"} />
          Neukunden erhalten 200,00 € Startguthaben!
        </div>
      </form>
    </div>
  );
}

export default BankingAppSignUp;
