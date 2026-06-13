import React, { Suspense, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useProgress, Html } from '@react-three/drei';
import ValveModel from '../components/ValveModel';
import { valves } from '../data/valves';
import { ArrowLeft, Maximize2, Play, Pause, Eye } from 'lucide-react';
import '../App.css';

function Loader() {
  const { progress } = useProgress();
  return <Html center style={{ color: 'white' }}>{progress.toFixed(1)} % loaded</Html>;
}

const ValveViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activePart, setActivePart] = useState(null);
  const [viewMode, setViewMode] = useState('default'); // 'default', 'exploded'
  const [isOperating, setIsOperating] = useState(false);

  const valve = valves.find(v => v.id === id);

  if (!valve) {
    return <div style={{ color: 'white', padding: '40px' }}>Valve not found.</div>;
  }

  const partInfo = activePart ? valve.parts[activePart] : null;

  return (
    <div className="app-container">
      {/* Sidebar with part list */}
      <aside className="sidebar">
        <button 
          onClick={() => navigate('/catalog')}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: 0 }}
        >
          <ArrowLeft size={16} /> Back to Catalog
        </button>

        <div className="sidebar-header">
          <h1 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>{valve.name}</h1>
          <p style={{ fontSize: '0.9rem' }}>Components</p>
        </div>

        <nav className="sidebar-nav" style={{ marginTop: '16px' }}>
          {Object.entries(valve.parts).map(([key, part]) => (
            <button 
              key={key}
              className={`nav-item ${activePart === key ? 'active' : ''}`}
              onClick={() => setActivePart(activePart === key ? null : key)}
            >
              <span>{part.title}</span>
            </button>
          ))}
        </nav>
      </aside>
      
      {/* 3D Canvas Viewport */}
      <main className="canvas-container">
        <Canvas camera={{ position: [0, 2, 10], fov: 45 }}>
          <color attach="background" args={['#0f172a']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={<Loader />}>
            <Environment preset="city" />
            <ValveModel 
              viewMode={viewMode} 
              isOperating={isOperating} 
              onPartClick={setActivePart} 
              activePart={activePart}
            />
            <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
          </Suspense>
          
          <OrbitControls 
            makeDefault 
            minPolarAngle={Math.PI / 6} 
            maxPolarAngle={Math.PI / 1.5} 
            minDistance={4}
            maxDistance={20}
          />
        </Canvas>
        
        {/* UI Overlay */}
        <div className="ui-overlay">
          <div className="top-bar"></div>

          {partInfo && (
            <div className="info-panel glass-panel">
              <div className="info-header">
                <h2>{partInfo.title}</h2>
                <button className="close-btn" onClick={() => setActivePart(null)}>✕</button>
              </div>
              <div className="info-content" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                <h3>Function</h3>
                <p>{partInfo.function}</p>
                
                <h3>Material</h3>
                <p>{partInfo.material}</p>
                
                <h3>Common Failures</h3>
                <p style={{ color: 'var(--danger)' }}>{partInfo.failure}</p>
              </div>
            </div>
          )}

          <div className="controls-bar">
            <button className={`control-btn ${viewMode === 'default' ? 'active' : ''}`} onClick={() => setViewMode('default')}>
              <Eye size={18} /> Normal View
            </button>
            <button className={`control-btn ${viewMode === 'exploded' ? 'active' : ''}`} onClick={() => setViewMode('exploded')}>
              <Maximize2 size={18} /> Exploded View
            </button>
            <button className={`control-btn ${isOperating ? 'active' : ''}`} onClick={() => setIsOperating(!isOperating)}>
              {isOperating ? <Pause size={18} /> : <Play size={18} />} 
              {isOperating ? 'Stop Operation' : 'Simulate Operation'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ValveViewer;
