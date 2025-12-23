import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { getPrediction } from './services/ai';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (mode, input) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPrediction(mode, input);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 className="title-gradient" style={{ fontSize: '4rem', letterSpacing: '-2px' }}>Mood & Food</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
          Discover the connection between what you eat and how you feel.
        </p>
      </header>
      
      <main style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {error && (
          <div className="glass-panel" style={{ padding: '1rem', color: 'var(--error-color)', marginBottom: '1rem', borderColor: 'var(--error-color)' }}>
            {error}
          </div>
        )}

        {!result ? (
          <InputForm onAnalyze={handleAnalyze} isLoading={loading} />
        ) : (
          <ResultCard result={result} onReset={handleReset} />
        )}
      </main>
      
      <footer style={{ marginTop: 'auto', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        Powered by Google Gemini AI
      </footer>
    </>
  );
}

export default App;
