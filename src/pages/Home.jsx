import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import '../index.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{
      width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-color)',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)'
    }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--text-color)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
        Discover the Anatomy of Valves.
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', textAlign: 'center', marginBottom: '3rem' }}>
        The world's most detailed and visually interactive valve knowledge platform. 
        Learn by seeing and interacting with true-to-life 3D models.
      </p>
      <button 
        onClick={() => navigate('/catalog')}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '16px 32px', fontSize: '1.2rem', fontWeight: '600',
          backgroundColor: 'var(--primary)', color: 'white', border: 'none',
          borderRadius: '30px', cursor: 'pointer', transition: 'transform 0.2s',
          boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <Play fill="white" size={20} />
        Explore the Catalog
      </button>
    </div>
  );
};

export default Home;
