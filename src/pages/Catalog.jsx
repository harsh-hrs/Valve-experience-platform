import React from 'react';
import { useNavigate } from 'react-router-dom';
import { valves } from '../data/valves';
import { ArrowLeft } from 'lucide-react';

const Catalog = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', padding: '40px 80px' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}
      >
        <ArrowLeft size={20} /> Back to Home
      </button>

      <h1 style={{ fontSize: '3rem', color: 'var(--text-color)', marginBottom: '10px' }}>Valve Catalog</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>Select a valve type to explore its internal anatomy.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {valves.map(valve => (
          <div 
            key={valve.id}
            className="glass-panel"
            style={{ padding: '24px', cursor: 'pointer', transition: 'transform 0.2s', border: '1px solid var(--glass-border)' }}
            onClick={() => navigate(`/valve/${valve.id}`)}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}
          >
            <div style={{ height: '200px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>[3D Preview]</span>
            </div>
            <h2 style={{ color: 'var(--text-color)', margin: '0 0 8px 0' }}>{valve.name}</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{valve.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
