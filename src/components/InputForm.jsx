import React, { useState } from 'react';

const InputForm = ({ onAnalyze, isLoading }) => {
  const [mode, setMode] = useState('food-to-mood'); // or 'mood-to-food'
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAnalyze(mode, input);
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '600px', margin: '2rem 0' }}>
      
      {/* Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button 
          className={`btn-primary ${mode === 'food-to-mood' ? 'active' : ''}`}
          style={{ 
            background: mode === 'food-to-mood' ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
            borderColor: mode === 'food-to-mood' ? 'var(--accent-color)' : 'var(--glass-border)'
          }}
          onClick={() => setMode('food-to-mood')}
        >
          I ate...
        </button>
        <button 
          className={`btn-primary ${mode === 'mood-to-food' ? 'active' : ''}`}
          style={{ 
            background: mode === 'mood-to-food' ? 'var(--success-color)' : 'rgba(255,255,255,0.1)',
            borderColor: mode === 'mood-to-food' ? 'var(--success-color)' : 'var(--glass-border)',
            color: mode === 'mood-to-food' ? '#0f0c29' : 'white'
          }}
          onClick={() => setMode('mood-to-food')}
        >
          I feel...
        </button>
      </div>

      <form onSubmit={handleSubmit} className="animate-fade-in">
        <label 
          style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            fontSize: '1.2rem', 
            fontWeight: '600',
            color: 'var(--text-main)'
          }}
        >
          {mode === 'food-to-mood' ? 'What did you eat?' : 'How are you feeling?'}
        </label>
        
        <textarea
          rows="3"
          placeholder={mode === 'food-to-mood' ? 'e.g., A warm bowl of cheesy pasta...' : 'e.g., Stressed and tired...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ marginBottom: '1.5rem', resize: 'none' }}
        />

        <button 
          type="submit" 
          className="btn-primary" 
          disabled={isLoading}
          style={{ width: '100%', background: 'linear-gradient(to right, #8e2de2, #4a00e0)' }}
        >
          {isLoading ? <div className="loader"></div> : 'Reveal'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;
