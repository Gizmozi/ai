import React, { useState } from 'react';

function App() {
  const [skargi, setSkargi] = useState('');
  const [gptResponse, setGptResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:5000/api/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: skargi }),
      });

      if (!res.ok) {
        throw new Error('GPT server returned an error');
      }

      const data = await res.json();
      setGptResponse(data.reply);
    } catch (error) {
      console.error('GPT request failed:', error);
      setGptResponse('⚠️ Помилка при зверненні до GPT-сервера');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>MedAsystent GPT</h1>

      <label>Skargi pacjenta:</label><br />
      <textarea
        rows={4}
        value={skargi}
        onChange={(e) => setSkargi(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <br />
      <button onClick={handleSubmit}>Wyślij do GPT</button>

      {gptResponse && (
        <div style={{ marginTop: '2rem', backgroundColor: '#f0f0f0', padding: '1rem' }}>
          <h3>Odpowiedź GPT:</h3>
          <p>{gptResponse}</p>
        </div>
      )}
    </div>
  );
}

export default App;