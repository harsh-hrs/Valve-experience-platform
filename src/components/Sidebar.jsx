import React from 'react';
import { Layers, Zap, Info, Settings, ShieldCheck } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>ValveXplorer</h1>
        <p>Interactive 3D Knowledge Platform</p>
      </div>

      <nav className="sidebar-nav">
        <button className="nav-item active">
          <Layers size={20} />
          <span>Gate Valve</span>
        </button>
        <button className="nav-item">
          <Settings size={20} />
          <span>Globe Valve (Coming Soon)</span>
        </button>
        <button className="nav-item">
          <ShieldCheck size={20} />
          <span>Check Valve (Coming Soon)</span>
        </button>
      </nav>
      
      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--glass-border)' }}>
        <button className="nav-item">
          <Info size={20} />
          <span>About Platform</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
