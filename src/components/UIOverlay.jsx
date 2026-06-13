import React from 'react';
import { X, Maximize2, Play, Pause, Eye } from 'lucide-react';

const valveData = {
  body: {
    title: 'Valve Body',
    function: 'The primary boundary of a pressure valve. It holds everything together and connects to the piping system.',
    material: 'Cast Iron, Stainless Steel, or Bronze.',
    failure: 'Cracking due to thermal shock, corrosion, or over-pressurization.'
  },
  stem: {
    title: 'Valve Stem',
    function: 'Connects the actuator/handwheel to the disc, transmitting the motion to open or close the valve.',
    material: 'Forged Stainless Steel (high strength).',
    failure: 'Bending from excessive force, or thread wear causing leaks.'
  },
  handwheel: {
    title: 'Handwheel',
    function: 'The manual actuator used by operators to apply torque to the stem.',
    material: 'Cast Iron or Aluminum.',
    failure: 'Physical breakage from improper tool use (e.g., valve wrenches).'
  },
  disc: {
    title: 'Valve Disc (Gate)',
    function: 'The part that physically blocks or allows the flow of fluid.',
    material: 'Stainless Steel with hard-faced seating surfaces.',
    failure: 'Erosion, cavitation damage, or scoring which leads to passing (internal leakage).'
  }
};

const UIOverlay = ({ activePart, viewMode, setViewMode, isOperating, setIsOperating, onClose }) => {
  const partInfo = activePart ? valveData[activePart] : null;

  return (
    <div className="ui-overlay">
      <div className="top-bar">
        {/* Placeholder for future top right controls */}
      </div>

      {partInfo && (
        <div className="info-panel glass-panel">
          <div className="info-header">
            <h2>{partInfo.title}</h2>
            <button className="close-btn" onClick={onClose}><X size={20} /></button>
          </div>
          <div className="info-content">
            <h3>Function</h3>
            <p>{partInfo.function}</p>
            
            <h3>Material</h3>
            <p>{partInfo.material}</p>
            
            <h3>Common Failures</h3>
            <p>{partInfo.failure}</p>
          </div>
        </div>
      )}

      <div className="controls-bar">
        <button 
          className={`control-btn ${viewMode === 'default' ? 'active' : ''}`}
          onClick={() => setViewMode('default')}
        >
          <Eye size={18} /> Normal View
        </button>
        <button 
          className={`control-btn ${viewMode === 'exploded' ? 'active' : ''}`}
          onClick={() => setViewMode('exploded')}
        >
          <Maximize2 size={18} /> Exploded View
        </button>
        <button 
          className={`control-btn ${isOperating ? 'active' : ''}`}
          onClick={() => setIsOperating(!isOperating)}
        >
          {isOperating ? <Pause size={18} /> : <Play size={18} />} 
          {isOperating ? 'Stop Operation' : 'Simulate Operation'}
        </button>
      </div>
    </div>
  );
};

export default UIOverlay;
