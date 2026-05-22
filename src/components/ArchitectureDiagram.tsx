import React, { useState } from 'react';
import { Database, Shield, Server, Cpu, Layers, HardDrive, RefreshCw } from 'lucide-react';

interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'gateway' | 'compute' | 'cache' | 'database' | 'security';
  description: string;
  x: number;
  y: number;
}

interface PathLine {
  from: string;
  to: string;
  dashed?: boolean;
  animated?: boolean;
}

export const ArchitectureDiagram: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<'shadowkey' | 'guardnet' | 'websniper'>('shadowkey');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Nodes for ShadowKey
  const shadowkeyNodes: ArchitectureNode[] = [
    { id: 'sk-client', label: 'React 19 Frontend', type: 'client', description: 'Browser UI built with React, Framer Motion, and Tailwind CSS. Collects inputs and triggers proof workflows.', x: 100, y: 150 },
    { id: 'sk-wallet', label: 'Lace Wallet SDK', type: 'gateway', description: 'Dapp-to-wallet communication gateway. Manages transaction signing and connects to the Midnight Network.', x: 300, y: 150 },
    { id: 'sk-circuits', label: 'Compact ZK Engine', type: 'compute', description: 'Executes 9 Groth16 zero-knowledge circuits (submit, prove, delete, login, etc.) locally in-browser.', x: 500, y: 150 },
    { id: 'sk-commit', label: 'SHA256 Commitments', type: 'security', description: 'Computes 5-field domain-separated commitments in the browser so raw data never leaves the device.', x: 700, y: 90 },
    { id: 'sk-ledger', label: 'Midnight Ledger', type: 'database', description: 'Midnight Network ledger storing ZK commitments, verification statuses, tombstones, and session records.', x: 700, y: 210 },
  ];

  const shadowkeyPaths: PathLine[] = [
    { from: 'sk-client', to: 'sk-wallet', animated: true },
    { from: 'sk-wallet', to: 'sk-circuits', animated: true },
    { from: 'sk-circuits', to: 'sk-commit', animated: true },
    { from: 'sk-circuits', to: 'sk-ledger', animated: true },
  ];

  // Nodes for GuardNet
  const guardnetNodes: ArchitectureNode[] = [
    { id: 'gn-sources', label: 'Multi-Source Feeds', type: 'client', description: 'Ingests real-time weather and incident data from Open-Meteo, NASA EONET, USGS, and GDACS.', x: 80, y: 150 },
    { id: 'gn-engine', label: '0-100 Risk Engine', type: 'gateway', description: 'Aggregates weather, disaster telemetry, elevation, and terrain data to compute risk indexes.', x: 260, y: 150 },
    { id: 'gn-guardian', label: 'Guardian & Dispatch', type: 'compute', description: 'Handles volunteer registration, vulnerable registry mapping, and incident dispatching.', x: 480, y: 150 },
    { id: 'gn-cloud', label: 'Firebase / Firestore', type: 'database', description: 'Stores real-time report states, volunteer coordinates, and handles push alerts.', x: 700, y: 90 },
    { id: 'gn-cache', label: 'Workbox / IndexedDB', type: 'security', description: 'Offline-first caching and submission queue ensuring the application functions in zero-connectivity.', x: 700, y: 210 },
  ];

  const guardnetPaths: PathLine[] = [
    { from: 'gn-sources', to: 'gn-engine', animated: true },
    { from: 'gn-engine', to: 'gn-guardian', animated: true },
    { from: 'gn-guardian', to: 'gn-cloud', animated: true },
    { from: 'gn-guardian', to: 'gn-cache', animated: true, dashed: true },
  ];

  // Nodes for WebSniper
  const websniperNodes: ArchitectureNode[] = [
    { id: 'ws-ext', label: 'Chrome Extension', type: 'client', description: 'React-based browser extension UI allowing users to visually build action sequences and timelines.', x: 100, y: 150 },
    { id: 'ws-runner', label: 'FastAPI Local Runner', type: 'gateway', description: 'Local Python FastAPI coordination server managing scrape tasks and API endpoints.', x: 300, y: 150 },
    { id: 'ws-browser', label: 'Playwright Headless', type: 'compute', description: 'Runs headless Chromium automation instances to bypass client-rendered dynamic JS structures.', x: 500, y: 150 },
    { id: 'ws-healing', label: 'AI Selector Solver', type: 'cache', description: 'Auto-healing AI module that dynamically resolves broken CSS/XPath selectors on target pages.', x: 700, y: 90 },
    { id: 'ws-api', label: 'Local REST Endpoints', type: 'database', description: 'Deploys successfully configured scrapers as standard local REST API paths.', x: 700, y: 210 },
  ];

  const websniperPaths: PathLine[] = [
    { from: 'ws-ext', to: 'ws-runner', animated: true },
    { from: 'ws-runner', to: 'ws-browser', animated: true },
    { from: 'ws-browser', to: 'ws-healing', animated: true },
    { from: 'ws-browser', to: 'ws-api', animated: true },
  ];

  const getActiveNodes = () => {
    switch (selectedProject) {
      case 'guardnet': return guardnetNodes;
      case 'websniper': return websniperNodes;
      default: return shadowkeyNodes;
    }
  };

  const getActivePaths = () => {
    switch (selectedProject) {
      case 'guardnet': return guardnetPaths;
      case 'websniper': return websniperPaths;
      default: return shadowkeyPaths;
    }
  };

  const nodes = getActiveNodes();
  const paths = getActivePaths();

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'client': return <Layers size={18} style={{ color: 'var(--accent-cyan)' }} />;
      case 'gateway': return <Server size={18} style={{ color: 'var(--accent-blue)' }} />;
      case 'compute': return <Cpu size={18} style={{ color: 'var(--accent-purple)' }} />;
      case 'cache': return <RefreshCw size={18} style={{ color: 'var(--accent-pink)' }} />;
      case 'database': return <Database size={18} style={{ color: 'var(--accent-cyan)' }} />;
      case 'security': return <Shield size={18} style={{ color: 'var(--accent-pink)' }} />;
      default: return <HardDrive size={18} />;
    }
  };

  // Find coordinates for line connections
  const getNodeCoords = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
      
      {/* Switcher Buttons */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setSelectedProject('shadowkey')}
          className={`btn ${selectedProject === 'shadowkey' ? 'btn-primary' : 'btn-secondary'}`}
          data-interactive
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          🔐 ShadowKey ZK
        </button>
        <button 
          onClick={() => setSelectedProject('guardnet')}
          className={`btn ${selectedProject === 'guardnet' ? 'btn-primary' : 'btn-secondary'}`}
          data-interactive
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          🌐 GuardNet PWA
        </button>
        <button 
          onClick={() => setSelectedProject('websniper')}
          className={`btn ${selectedProject === 'websniper' ? 'btn-primary' : 'btn-secondary'}`}
          data-interactive
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          🕷 WebSniper Extension
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '2rem', alignItems: 'center' }}>
        
        {/* SVG Pipeline */}
        <div style={{ position: 'relative', background: 'rgba(5, 3, 10, 0.6)', border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '1rem', overflowX: 'auto', minWidth: '400px' }}>
          
          <svg viewBox="0 0 850 300" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              {/* Linear Gradients for Flow Lines */}
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-cyan)" />
                <stop offset="50%" stopColor="var(--accent-purple)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--accent-pink)" />
              </linearGradient>

              {/* Node Drop Shadows */}
              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Connecting Paths */}
            {paths.map((path, idx) => {
              const start = getNodeCoords(path.from);
              const end = getNodeCoords(path.to);
              
              // Draw smooth bezier curves instead of straight lines
              const midX = (start.x + end.x) / 2;
              const pathD = `M ${start.x} ${start.y} C ${midX} ${start.y}, ${midX} ${end.y}, ${end.x} ${end.y}`;

              return (
                <g key={idx}>
                  {/* Outer glow line */}
                  <path 
                    d={pathD}
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="3"
                    strokeOpacity="0.15"
                  />
                  {/* Main line */}
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke="url(#flowGrad)" 
                    strokeWidth="1.5"
                    strokeDasharray={path.dashed ? '5 5' : 'none'}
                    strokeOpacity="0.7"
                  />
                  {/* Moving dot animation */}
                  {path.animated && (
                    <circle r="4" fill="var(--accent-cyan)">
                      <animateMotion 
                        path={pathD} 
                        dur="3.5s" 
                        repeatCount="indefinite" 
                        keyPoints="0;1"
                        keyTimes="0;1"
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node) => {
              const isHovered = hoveredNode === node.id;
              
              return (
                <g 
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Node Outer Pulsing Circle */}
                  <circle 
                    r={isHovered ? '24' : '20'}
                    fill="rgba(8, 6, 16, 0.9)"
                    stroke={isHovered ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)'}
                    strokeWidth={isHovered ? '2' : '1'}
                    filter={isHovered ? 'url(#nodeGlow)' : 'none'}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Inner ring */}
                  <circle
                    r="15"
                    fill="rgba(255, 255, 255, 0.02)"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="1"
                  />

                  {/* Icon centered inside node */}
                  <g transform="translate(-9, -9)">
                    {getNodeIcon(node.type)}
                  </g>

                  {/* Node Text Label (placed below/above depending on spacing) */}
                  <text
                    y="38"
                    textAnchor="middle"
                    fill={isHovered ? '#ffffff' : 'var(--text-muted)'}
                    style={{ 
                      fontSize: '10px', 
                      fontFamily: 'var(--font-mono)', 
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      transition: 'fill 0.3s'
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

        </div>

        {/* Node Metadata Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.01)', borderColor: 'rgba(255,255,255,0.04)' }}>
            
            {hoveredNode ? (
              // Display details for hovered node
              (() => {
                const node = nodes.find(n => n.id === hoveredNode);
                if (!node) return null;
                return (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {getNodeIcon(node.type)}
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                        {node.label}
                      </h4>
                    </div>
                    <span style={{ display: 'inline-block', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', padding: '0.2rem 0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', color: 'var(--accent-cyan)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                      {node.type} node
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {node.description}
                    </p>
                  </div>
                );
              })()
            ) : (
              // Welcome / default message
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.75rem' }}>
                  Interactive Pipeline Architect
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Hover over any node in the SVG diagram to view dynamic diagnostics, component specifications, and communication pipelines.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1.2rem', fontSize: '0.75rem', color: 'var(--accent-purple)', fontFamily: 'var(--font-mono)' }}>
                  <span className="dot-blink" style={{ display: 'inline-block', width: '6px', height: '6px', background: 'var(--accent-purple)', borderRadius: '50%', boxShadow: '0 0 6px var(--accent-purple)' }}></span>
                  <span>LISTENING_FOR_NODE_SELECT</span>
                </div>
              </div>
            )}
            
          </div>

        </div>

      </div>

      <style>{`
        .dot-blink {
          animation: corePulse 1.5s infinite ease-in-out;
        }
        @keyframes corePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>

    </div>
  );
};
