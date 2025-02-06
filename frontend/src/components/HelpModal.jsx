import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const hints = [
  // Hinweis 1: Beispiel zur unsicheren SQL-Abfrage beim Login
  `Hinweis 1:  
Die folgende SQL-Abfrage zeigt, wie eine unsichere Abfrage zum Login an die Datenbank aussehen könnte:
<pre style="font-family: monospace; background: #f5f5f5; padding: 8px; border-radius: 4px;">
"SELECT id, password FROM bibifi.users WHERE email = '" 
  + request.email 
  + "' AND (password = '" 
  + request.password 
  + "')"
</pre>
Durch unsichere String-Konkatenierung kann hier SQL-Injection ermöglicht werden.`,

  // Hinweis 2: Passwortfeld und SQL-Injection
  `Hinweis 2:  
Es lohnt sich zu prüfen, ob das Passwort-Feld wirklich gegen SQL-Injection geschützt ist, da die E-Mail-Adresse eines Benutzers oft bekannt ist.`,

  // Hinweis 3: Manipulation des WHERE-Clause
  `Hinweis 3:  
Beispielsweise könnte man folgenden Ausdruck in die SQL-Abfrage einfügen:
<pre style="font-family: monospace; background: #f5f5f5; padding: 8px; border-radius: 4px;">
' OR '1'='1
</pre>
Dadurch wird der WHERE-Clause so verändert, dass er immer wahr ist – und somit der Login auch bei falschem Passwort erfolgreich durchgeführt wird.`,

  // Hinweis 4: Beispiel zur XSS-Demonstration
  `Hinweis 4: Überprüfe, ob der Verwendungszweck via XSS exploitiert werden könnte.  
Die Funktion zur Überweisung von Geld könnte zum Beispiel so aussehen:
<pre style="font-family: monospace; background: #f5f5f5; padding: 8px; border-radius: 4px;">
fetch('http://localhost:8000/transfer', { 
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' }, 
  body: JSON.stringify({ 
    sender_email: '', 
    receiver_email: '', 
    amount: 0, 
    purpose: '' 
  })
});
</pre>
(Diesen Code kannst du kopieren und anpassen – beachte, dass hier Platzhalter verwendet werden.)`,

  // Hinweis 5: Beispiel zur XSS-Demonstration via IMG-Tag
  `Hinweis 5:  
Das folgende <code>&lt;img&gt;</code>-Tag zeigt, wie ein Bild, das nicht existiert, aussehen könnte:
<pre style="font-family: monospace; background: #f5f5f5; padding: 8px; border-radius: 4px;">
&lt;img src="invalid.jpg" onerror="fetch('http://localhost:8000/transfer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sender_email: '', receiver_email: '', amount: 0, purpose: '' }) });" /&gt;
</pre>
Wird das Bild nicht geladen, wird der onerror-Handler aktiviert – das könnte ausgenutzt werden, um einen schädlichen Request abzusetzen.`,
];

const HelpModal = ({ open, onClose }) => {
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  const handleNext = () => {
    if (currentHintIndex < hints.length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
    } else {
      setCurrentHintIndex(0);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentHintIndex > 0) {
      setCurrentHintIndex(currentHintIndex - 1);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: {
          width: "600px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle>Hilfestellung</DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="body1"
          style={{ whiteSpace: "pre-wrap" }}
          component="div"
          dangerouslySetInnerHTML={{ __html: hints[currentHintIndex] }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlePrev} disabled={currentHintIndex === 0}>
          Zurück
        </Button>
        <Button onClick={handleNext}>
          {currentHintIndex < hints.length - 1 ? "Weiter" : "Schließen"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HelpModal;
