import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: 'neo', text: 'Bonjour ! Je suis Néo, ton assistant RH ici pour t’aider à t’intégrer. 😊' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const signalDetecte = /(pas bien|stress|angoisse|mal|déprime|triste)/i.test(input);

    if (signalDetecte) {
      await fetch('https://hook.eu2.make.com/75d65c4lev3femb9pyb5qwmb9fivl3y8', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: 'Louis',
          phrase_declencheuse: input,
          referent: 'Quentin',
          manager: 'Quentin',
          date: new Date().toISOString().split('T')[0]
        })
      });
    }

    const responseText = signalDetecte
      ? "Je suis là pour toi, tu n'es pas seul. Merci de me partager ça, c’est important."
      : "Merci pour ton message ! Tu as une question sur ton intégration ou un point que je peux clarifier ?";

    setMessages([...newMessages, { sender: 'neo', text: responseText }]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Assistant RH - Néo</h1>
        <div className="chat-box">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.sender}`}>
              <strong>{msg.sender === 'neo' ? 'Néo' : 'Toi'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écris ici..."
          />
          <button onClick={handleSend}>Envoyer</button>
        </div>
      </header>
    </div>
  );
}

export default App;
