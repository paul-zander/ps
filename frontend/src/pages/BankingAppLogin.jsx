import { useState } from "react";
import { BsBank, BsEye, BsEyeSlash } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router";

function BankingAppLogin({ setLoggedInUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // React Router Hook für Weiterleitung
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("HTTP-Response-Object:", response);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Unbekannter Fehler");
        return;
      }

      const data = await response.json();
      console.log("Server data:", data);

      if (data && data.user_id) {
        // Speichere user_id (oder token) in globalem State
        setLoggedInUser(data.user_id);
        console.log(data.user_id);
        console.log(typeof data.user_id);
        // Weiterleitung aufs Dashboard
        navigate("/dashboard");
      } else {
        setError("Falsche Login-Daten oder User existiert nicht.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mt-8 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-1">
        <BsBank className="text-2xl text-gray-700" />
        <h1 className="font-bold text-3xl uppercase text-gray-700">
          Super Secure Bank
        </h1>
      </div>

      <form
        className="flex flex-col gap-4 xs:p-4 md:p-12 shadow-custom-shadow items-center w-[300px] md:w-[500px] bg-white mt-6"
        onSubmit={handleLogin}
      >
        <h2 className="font-medium text-3xl border-b-2 border-b-violet-800 p-2 mb-5">
          Login
        </h2>
        <input
          type="text"
          id="email"
          className="border p-3 w-full focus:outline-none focus:border-purple-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
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
        {error && <p className="error-message">{error}</p>}
        <button
          type="submit"
          className="bg-violet-800 hover:bg-violet-700 transition-all text-white p-3 w-full font-medium"
        >
          Anmelden
        </button>
        <div className="text-gray-400">
          Noch nicht dabei?{" "}
          <NavLink to="/banking-signup" className="text-purple-800">
            Registrieren
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default BankingAppLogin;
