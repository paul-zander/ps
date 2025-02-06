import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Box, Typography } from "@mui/material";
import { Link } from "react-router";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

// StepCircle-Komponente zur konsistenten Darstellung der Schritt-Zahlen
const StepCircle = ({ number }) => (
  <Box
    sx={{
      width: 40,
      height: 40,
      backgroundColor: "#1976d2",
      color: "#fff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      fontSize: "1rem",
      flexShrink: 0,
    }}
  >
    {number}
  </Box>
);

export default function AccordionSQLi() {
  // Gesamtzahl der Accordions
  const totalAccordions = 4;

  // State: Array, ob das jeweilige Accordion aktuell geöffnet ist
  const [expandedStates, setExpandedStates] = useState(
    Array(totalAccordions).fill(false)
  );

  // State: Array, ob das jeweilige Accordion mindestens einmal geöffnet wurde
  const [everOpened, setEverOpened] = useState(
    Array(totalAccordions).fill(false)
  );

  // Fortschritt in Prozent berechnen anhand der Panels, die mindestens einmal geöffnet wurden
  const openedCount = everOpened.filter(Boolean).length;
  const progress = (openedCount / totalAccordions) * 100;

  useEffect(() => {
    // Scrollt die Seite bei jedem Mount der Komponente nach oben
    window.scrollTo(0, 0);
  }, []);

  // Funktion, um einen bestimmten Accordion-Zustand zu toggeln
  const handleToggle = (index) => (event, isExpanded) => {
    // Aktuellen Zustand aktualisieren
    setExpandedStates((prev) => {
      const newState = [...prev];
      newState[index] = isExpanded;
      return newState;
    });
    // Falls das Panel geöffnet wird, merken wir uns, dass es mindestens einmal geöffnet wurde
    if (isExpanded) {
      setEverOpened((prev) => {
        const newOpened = [...prev];
        newOpened[index] = true;
        return newOpened;
      });
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: '"Inter", sans-serif',
    },
    components: {
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&:first-of-type": {
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
            "&:last-of-type": {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            borderRadius: 0,
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            marginBottom: "8px",
          },
        },
      },
    },
  });

  // Zustände für die Login-Formulare
  const [standardLogin, setStandardLogin] = useState({
    email: "testuser@mail.com",
    password: "password123",
    message: "",
    severity: "info",
  });

  const [bypassLogin, setBypassLogin] = useState({
    email: "testuser@mail.com",
    password: "keineahnung ' OR '1'='1",
    message: "",
    severity: "info",
  });

  // Handler für das Standard-Login-Formular
  const handleStandardLogin = (e) => {
    e.preventDefault();
    const { email, password } = standardLogin;
    // Standard-Login-Logik
    if (password === "password123") {
      setStandardLogin({
        ...standardLogin,
        message: "Erfolgreich angemeldet!",
        severity: "success",
      });
    } else if (password === "böses' passwort") {
      setStandardLogin({
        ...standardLogin,
        message: "Incorrect syntax near es'",
        severity: "error",
      });
    } else {
      setStandardLogin({
        ...standardLogin,
        message: "Anmeldung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        severity: "error",
      });
    }
  };

  // Handler für das Login-Bypass-Angriff-Formular
  const handleBypassLogin = (e) => {
    e.preventDefault();
    const { email, password } = bypassLogin;

    // Simulierte SQL-Abfrage: SELECT * FROM users WHERE email = 'email' AND password = 'password';
    // Überprüfung mehrerer SQL-Injection-Muster
    if (password.includes("' OR 1=1") || password.includes("' OR '1'='1")) {
      setBypassLogin({
        ...bypassLogin,
        message:
          "Bingo! Du hast einen SQL-Injection-Angriff durchgeführt und dich erfolgreich angemeldet.",
        severity: "success",
      });
    } else if (password === "password123") {
      setBypassLogin({
        ...bypassLogin,
        message: "Erfolgreich angemeldet!",
        severity: "success",
      });
    } else {
      setBypassLogin({
        ...bypassLogin,
        message: "Anmeldung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        severity: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-[#f9fcff] to-sky-100 min-h-screen">
      <ThemeProvider theme={theme}>
        {/* Fortschrittsbalken über den Accordions */}
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mb: 2, width: "100%", maxWidth: 800 }}
        />

        {/* Accordion 1: Grundlagen */}
        <Accordion
          expanded={expandedStates[0]}
          onChange={handleToggle(0)}
          sx={{ width: "100%", maxWidth: 800 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderRadius: 0,
            }}
          >
            <Typography variant="h6">SQL injection: Grundlagen</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ border: 0, borderRadius: 0 }}>
            <Typography paragraph>
              SQL-Injection ist eine der am weitesten verbreiteten
              Code-Schwachstellen. Bei einem SQL-Injektionsangriff fügt ein
              Angreifer über die Eingabedaten der Anwendung bösartigen SQL-Code
              ein oder "injiziert" ihn. Die SQL-Injektion ermöglicht es dem
              Angreifer, sensible Daten zu lesen, zu ändern oder zu löschen
              sowie administrative Operationen in der Datenbank auszuführen.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Was du lernen wirst
            </Typography>
            <Typography paragraph>
              In dieser Lektion lernst du, wie SQL-Injection funktioniert und
              wie du deinen Code dagegen schützen kannst. Wir beginnen mit einer
              SQL-Injektion, um den Anmeldebildschirm einer anfälligen
              Webanwendung zu umgehen. Anschließend tauchen wir tiefer in den
              Code dieser anfälligen Anwendung ein und erklären, warum der
              SQL-Injection-Angriff erfolgreich war. Schließlich wirst du sehen,
              wie du SQL-Injection in deinen Anwendungen beheben und verhindern
              kannst.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 2: SQL injection in Aktion */}
        <Accordion
          expanded={expandedStates[1]}
          onChange={handleToggle(1)}
          sx={{ width: "100%", maxWidth: 800 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h6">SQL injection in Aktion</Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-6 text-justify">
            {/* Standard Login */}
            <Box>
              <Typography variant="h6" align="center" gutterBottom>
                Standard Login
              </Typography>
              <form
                onSubmit={handleStandardLogin}
                className="flex flex-col gap-2 p-2 border my-2"
              >
                <input
                  type="email"
                  className="border p-1"
                  placeholder="Email"
                  value={standardLogin.email}
                  onChange={(e) =>
                    setStandardLogin({
                      ...standardLogin,
                      email: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  className="border p-1"
                  placeholder="Password"
                  value={standardLogin.password}
                  onChange={(e) =>
                    setStandardLogin({
                      ...standardLogin,
                      password: e.target.value,
                    })
                  }
                  required
                />
                <button type="submit" className="bg-sky-600 text-white p-1">
                  Log In
                </button>
                {standardLogin.message && (
                  <Alert severity={standardLogin.severity}>
                    {standardLogin.message}
                  </Alert>
                )}
              </form>
            </Box>

            <Typography variant="h6" gutterBottom>
              Seltsame Eingaben, seltsame Fehler
            </Typography>
            <Typography paragraph>
              Es ist Zeit, mit dem Hacken zu beginnen! Ändere das Passwort-Feld
              in{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                böses' passwort
              </Box>
              . Du erwartest vielleicht eine Standardfehlermeldung. Stattdessen
              siehst du:
            </Typography>
            <Box
              component="span"
              sx={{
                fontFamily: "monospace",
                border: "1px solid #ccc",
                padding: "2px 4px",
                borderRadius: "4px",
                backgroundColor: "#f4f4f4",
                display: "inline-block",
                mb: 2,
              }}
            >
              Incorrect syntax near es'
            </Box>
            <Typography paragraph>
              Diese Fehlermeldung erinnert an diejenige, die du kennst, wenn
              eine fehlerhafte SQL-Abfrage ausgeführt wird. Der Fehler zeigt,
              dass das eingegebene Passwort{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                böses' passwort
              </Box>{" "}
              in die Backend-SQL-Abfrage injiziert wurde – das Apostroph-Zeichen
              hat die Abfragesyntax durcheinandergebracht.
            </Typography>
            <Typography paragraph>
              Das bedeutet, dass ein von uns kontrollierter Eingabestring direkt
              in den Backend-SQL-Code eingefügt wird. Damit können wir viel mehr
              erreichen als nur einen harmlosen Fehler.
            </Typography>

            <Typography variant="h6" gutterBottom>
              Die Anmeldung umgehen
            </Typography>
            <Typography paragraph>
              Wir wissen nun, dass das Backend alles ausführt, was wir in das
              Passwortfeld eingeben. Nutze folgendes Kennwort:{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                keineahnung ' OR '1'='1
              </Box>
              . Probiere es mit der Standard-E-Mail-Adresse{" "}
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                testuser@mail.com
              </Box>{" "}
              aus.
            </Typography>
            {/* Login Bypass Attack */}
            <Box>
              <Typography variant="h6" align="center" gutterBottom>
                Login-Bypass-Angriff
              </Typography>
              <form
                onSubmit={handleBypassLogin}
                className="flex flex-col gap-2 p-2 border my-2"
              >
                <input
                  type="email"
                  className="border p-1"
                  placeholder="Email"
                  value={bypassLogin.email}
                  onChange={(e) =>
                    setBypassLogin({ ...bypassLogin, email: e.target.value })
                  }
                  required
                />
                <input
                  type="text"
                  className="border p-1"
                  placeholder="Password"
                  value={bypassLogin.password}
                  onChange={(e) =>
                    setBypassLogin({ ...bypassLogin, password: e.target.value })
                  }
                  required
                />
                <button type="submit" className="bg-sky-600 text-white p-1">
                  Log In
                </button>
                {bypassLogin.message && (
                  <Alert severity={bypassLogin.severity}>
                    {bypassLogin.message}
                  </Alert>
                )}
              </form>
            </Box>
            <Typography paragraph>
              Bingo! Obwohl unser Passwort offensichtlich falsch ist, zeigt die
              Anwendung eine erfolgreiche Login-Meldung an – Du hast gerade
              einen SQL-Injection-Angriff durchgeführt.
            </Typography>
            <Typography paragraph>
              Warum war das erfolgreich? In unserem Code befindet sich ein
              gültiger SQL-Ausdruck (
              <Box
                component="span"
                sx={{
                  fontFamily: "monospace",
                  border: "1px solid #ccc",
                  padding: "2px 4px",
                  borderRadius: "4px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                OR '1'='1
              </Box>
              ) nach dem Apostroph. Dieser verändert die Bedeutung der
              Original-Abfrage, sodass die Anmeldung umgangen wird.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 3: SQL Injection hinter den Kulissen */}
        <Accordion
          expanded={expandedStates[2]}
          onChange={handleToggle(2)}
          sx={{ width: "100%", maxWidth: 800 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography variant="h6">
              SQL Injection hinter den Kulissen
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="h6" gutterBottom>
                Wie funktioniert die SQL-Injection?
              </Typography>

              {/* Schritt 1 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={1} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Originale SQL-Abfrage:</strong>
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      padding: 2,
                      borderRadius: 2,
                      overflow: "auto",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {`SELECT * FROM users WHERE email = 'testuser@mail.com' AND password = 'password123';`}
                  </Box>
                </Box>
              </Box>

              {/* Schritt 2 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={2} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Angreifer gibt ein bösartiges Passwort ein:</strong>
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: "#ffe0b2",
                      padding: 2,
                      borderRadius: 2,
                      overflow: "auto",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                      marginBottom: 2,
                    }}
                  >
                    {`' OR '1'='1`}
                  </Box>
                  <Typography className="mt-2">
                    Der Angreifer gibt anstelle eines normalen Passworts den
                    Code <code className="border">' OR '1'='1</code> ein. Diese
                    manipulierte Eingabe zielt darauf ab, die ursprüngliche
                    SQL-Abfrage zu verändern.
                  </Typography>
                </Box>
              </Box>

              {/* Schritt 3 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={3} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Modifizierte SQL-Abfrage durch Injection:</strong>
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      backgroundColor: "#f5f5f5",
                      padding: 2,
                      borderRadius: 2,
                      overflow: "auto",
                      fontFamily: "monospace",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {`SELECT * FROM users WHERE email = 'testuser@mail.com' AND password = '' OR '1'='1';`}
                  </Box>
                  <Typography>
                    Durch die manipulierte Eingabe wird die SQL-Abfrage
                    verändert, sodass die Bedingung{" "}
                    <code className="border">'1'='1'</code> immer wahr ist.
                    Dadurch wird die Passwortüberprüfung umgangen.
                  </Typography>
                </Box>
              </Box>

              {/* Schritt 4 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={4} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Auswirkung der modifizierten Abfrage:</strong>
                  </Typography>
                  <Typography gutterBottom>
                    Die Bedingung <code className="border">'1'='1'</code> ist
                    immer wahr, sodass die Abfrage alle Benutzer zurückgibt und
                    die Authentifizierung umgangen wird. Dadurch kann der
                    Angreifer Zugriff auf Benutzerkonten ohne gültige
                    Anmeldedaten erhalten.
                  </Typography>
                  <Typography>
                    <strong>Zusätzliche Risiken:</strong> Der schädliche Code
                    könnte auch dazu verwendet werden, weitere Teile der
                    Datenbank zu manipulieren oder vertrauliche Informationen
                    auszulesen. Wenn die manipulierten Eingaben auf dem Server
                    gespeichert werden (z. B. in einer Datenbank), kann dies zu
                    einem Stored SQL-Injection-Angriff führen, der alle Nutzer
                    betrifft, die auf die kompromittierten Daten zugreifen.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 4: SQL-Injection verhindern */}
        <Accordion
          expanded={expandedStates[3]}
          onChange={handleToggle(3)}
          sx={{ width: "100%", maxWidth: 800 }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography variant="h6">SQL-Injection verhindern</Typography>
          </AccordionSummary>
          <AccordionDetails className="flex flex-col gap-6">
            <Typography paragraph>
              Um SQL-Injection zu verhindern, solltest du folgende Maßnahmen
              ergreifen:
            </Typography>
            <Box component="ul" sx={{ listStyleType: "disc", pl: 4 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Validierung:
                </Typography>{" "}
                Überprüfe alle Benutzereingaben darauf, ob sie dem erwarteten
                Format entsprechen. Beispielsweise sollte ein E-Mail-Feld nur
                valide E-Mail-Adressen akzeptieren. Ungültige Eingaben werden
                dabei abgelehnt oder bereinigt.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Escaping:
                </Typography>{" "}
                Wandel spezielle Zeichen (wie das Apostroph <code>'</code>) in
                sichere Entitäten um, damit sie nicht als Teil der SQL-Syntax
                interpretiert werden. Dies ist allerdings allein selten
                ausreichend.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Prepared Statements und parametrische Abfragen:
                </Typography>{" "}
                Verwende immer vorbereitete Statements, bei denen die
                SQL-Abfrage und die Eingabewerte getrennt behandelt werden. Auf
                diese Weise wird gewährleistet, dass Benutzereingaben niemals
                direkt in die SQL-Abfrage eingebettet werden.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  ORMs und Frameworks:
                </Typography>{" "}
                Nutze moderne Object-Relational-Mapping-Libraries oder
                Frameworks, die standardmäßig Schutzmechanismen gegen
                SQL-Injection implementieren.
              </Box>
            </Box>
            <Typography paragraph>
              Mit diesen Maßnahmen verhinderst du, dass bösartiger Code in
              SQL-Abfragen injiziert und ausgeführt wird. Dadurch erhöhst du die
              Sicherheit deiner Anwendung erheblich.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>
      <div className="flex gap-2 mt-4">
        <Link
          to="/xss"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white p-3 h-12 flex items-center justify-center gap-2"
        >
          <MdNavigateBefore size={24} />
          Zurück zu XSS
        </Link>
        <Link
          to="/introduction"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white p-3 h-12 flex items-center justify-center gap-2"
        >
          Nächste Lektion
          <MdNavigateNext size={24} />
        </Link>
      </div>
    </div>
  );
}
