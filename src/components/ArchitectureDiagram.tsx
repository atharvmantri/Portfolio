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
    { id: 'sk-client', label: 'Tauri / React App', type: 'client', description: 'Desktop User Interface written in React & TypeScript, packaged with Tauri.', x: 100, y: 150 },
    { id: 'sk-ipc', label: 'IPC / RPC Bridge', type: 'gateway', description: 'Cross-process Inter-Process Communication gateway conveying events secure-side.', x: 300, y: 150 },
    { id: 'sk-core', label: 'Rust Core Agent', type: 'compute', description: 'Background service listening to keystroke telemetry & low-level events.', x: 500, y: 150 },
    { id: 'sk-crypto', label: 'AES-256 Engine', type: 'security', description: 'Hardware-accelerated envelope cryptography operations (AES-GCM).', x: 700, y: 90 },
    { id: 'sk-db', label: 'SQLite (Encrypted)', type: 'database', description: 'SQLCipher local relational storage, keeping system history encrypted at rest.', x: 700, y: 210 },
  ];

  const shadowkeyPaths: PathLine[] = [
    { from: 'sk-client', to: 'sk-ipc', animated: true },
    { from: 'sk-ipc', to: 'sk-core', animated: true },
    { from: 'sk-core', to: 'sk-crypto', animated: true },
    { from: 'sk-core', to: 'sk-db', animated: true },
  ];

  // Nodes for Guardnet
  const guardnetNodes: ArchitectureNode[] = [
    { id: 'gn-tap', label: 'Network Interface (TAP/TUN)', type: 'client', description: 'Raw socket listener capturing local/ingress interface traffic packets.', x: 80, y: 150 },
    { id: 'gn-ingest', label: 'Go Event Broker', type: 'gateway', description: 'High-speed ingestion layer parsing headers & filtering protocols.', x: 260, y: 150 },
    { id: 'gn-worker', label: 'ML Threat Classifier', type: 'compute', description: 'Python engine running Isolation Forest & auto-encoders on packet feature vectors.', x: 480, y: 150 },
    { id: 'gn-influx', label: 'InfluxDB (TSDB)', type: 'database', description: 'Time-series database tracking packet frequencies, alerts, and protocols.', x: 700, y: 90 },
    { id: 'gn-fw', label: 'Iptables Firewall rule generator', type: 'security', description: 'Generates kernel firewall hooks dynamically to block suspicious IPs.', x: 700, y: 210 },
  ];

  const guardnetPaths: PathLine[] = [
    { from: 'gn-tap', to: 'gn-ingest', animated: true },
    { from: 'gn-ingest', to: 'gn-worker', animated: true },
    { from: 'gn-worker', to: 'gn-influx', animated: true },
    { from: 'gn-worker', to: 'gn-fw', animated: true, dashed: true },
  ];

  // Nodes for WebSniper
  const websniperNodes: ArchitectureNode[] = [
    { id: 'ws-trigger', label: 'Trigger Endpoint / Cron', type: 'client', description: 'HTTP REST interface or system scheduler triggering scrapers.', x: 100, y: 150 },
    { id: 'ws-distributor', label: 'Go Scheduler Coordinator', type: 'gateway', description: 'Go routine channel controller distributing scraping subtasks.', x: 300, y: 150 },
    { id: 'ws-workers', label: 'Scraper Node Pool', type: 'compute', description: 'Concurrent scraper microservices scraping through proxy rotators.', x: 500, y: 150 },
    { id: 'ws-redis', label: 'Redis Cache (Deduplication)', type: 'cache', description: 'High-speed Redis key-value cache preventing scraping redundant URLs.', x: 700, y: 90 },
    { id: 'ws-db', label: 'PostgreSQL Datastore', type: 'database', description: 'Relational data vault storing structured outputs & scraping indices.', x: 700, y: 210 },
  ];

  const websniperPaths: PathLine[] = [
    { from: 'ws-trigger', to: 'ws-distributor', animated: true },
    { from: 'ws-distributor', to: 'ws-workers', animated: true },
    { from: 'ws-workers', to: 'ws-redis', animated: true },
    { from: 'ws-workers', to: 'ws-db', animated: true },
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
          🔐 ShadowKey Core
        </button>
        <button 
          onClick={() => setSelectedProject('guardnet')}
          className={`btn ${selectedProject === 'guardnet' ? 'btn-primary' : 'btn-secondary'}`}
          data-interactive
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          🌐 Guardnet Threat Monitor
        </button>
        <button 
          onClick={() => setSelectedProject('websniper')}
          className={`btn ${selectedProject === 'websniper' ? 'btn-primary' : 'btn-secondary'}`}
          data-interactive
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
        >
          🕷 WebSniper Scraper
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
