import React from 'react';

const ResultCard = ({ result, onReset }) => {
  if (!result) return null;

  // Expecting result to be { mood/food: string, description: string, color: string }
  const title = result.mood || result.food;
  const description = result.description;
  const color = result.color || 'var(--accent-color)';

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', width: '100%', maxWidth: '600px', textAlign: 'center', borderTop: `4px solid ${color}` }}>
      <h2 
        style={{ 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          color: color,
          textShadow: `0 0 20px ${color}40`
        }}
      >
        {title}
      </h2>
      
      <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-muted)' }}>
        {description}
      </p>

      <button 
        onClick={onReset}
        className="btn-primary"
        style={{ background: 'transparent', border: '1px solid var(--text-muted)', fontSize: '0.9rem' }}
      >
        Try Another
      </button>
    </div>
  );
};

export default ResultCard;
