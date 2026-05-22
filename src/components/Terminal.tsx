import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'ATHARV_CORE // SECURE CONNECTION ESTABLISHED', type: 'success' },
    { text: 'Initial port handshake: 200 OK', type: 'output' },
    { text: 'System Uptime: 99.98% // Location: Indore, India', type: 'output' },
    { text: 'Type "help" for a list of available command directives.', type: 'output' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      // Scroll the container internally without affecting window scroll
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input.trim());
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    const newHistory = [...history, { text: `atharv@portfolio:~$ ${cmd}`, type: 'input' as const }];
    
    // Add to history list
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (lowerCmd) {
      case 'help':
        newHistory.push(
          { text: 'Available commands:', type: 'output' },
          { text: '  about      - Display background details on Atharv Mantri', type: 'output' },
          { text: '  skills     - Catalog current capability stack', type: 'output' },
          { text: '  projects   - Highlight core system architectures', type: 'output' },
          { text: '  hackathons - Display competitive achievements and prizes', type: 'output' },
          { text: '  stats      - Stream telemetry statistics', type: 'output' },
          { text: '  contact    - Retrieve access endpoints', type: 'output' },
          { text: '  info       - Show portfolio compilation data', type: 'output' },
          { text: '  source     - Display git repository source nodes', type: 'output' },
          { text: '  clear      - Purge terminal terminal history', type: 'output' }
        );
        break;
      case 'about':
        newHistory.push(
          { text: 'SYSTEM ARCHITECT PROFILE:', type: 'success' },
          { text: '  Identity: Atharv Mantri // Age: 15 // Indore, India', type: 'output' },
          { text: '  Role: Full-Stack Developer & AI Systems Architect', type: 'output' },
          { text: '  Internship: Built full-stack utility assets at a Yash Technologies subsidiary', type: 'output' },
          { text: '  Core Philosophy: "Building systems, not side projects. I build leverage, not just code."', type: 'output' },
          { text: '  Current Focus: Autonomous AI agents, performance compilers, database scaling.', type: 'output' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: 'CAPABILITY CLASSIFICATIONS:', type: 'success' },
          { text: '  [Languages]       TypeScript, Python, Compact (ZK), SQL, Bash', type: 'output' },
          { text: '  [Frontend]        React, Framer Motion, HTML5/CSS3, Tailwind, Lace SDK', type: 'output' },
          { text: '  [Backend & Infra] FastAPI, Node.js, Firebase, Redis, Docker, PWA', type: 'output' },
          { text: '  [AI / Intelligence] Autonomous Agents, Auto-healing selectors, LLM Pipelines', type: 'output' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: 'HIGHLIGHTED SOURCE PIPELINES:', type: 'success' },
          { text: '  ShadowKey  - Zero-knowledge identity verification protocol built on Midnight Network.', type: 'output' },
          { text: '  GuardNet   - Community disaster intelligence network built for WeatherWise 2026.', type: 'output' },
          { text: '  WebSniper  - Visual extraction timeline and auto-healing browser scraper with local REST APIs.', type: 'output' },
          { text: '  (Hint: Type "projects" or click below in the Project section to toggle layout)', type: 'output' }
        );
        break;
      case 'hackathons':
        newHistory.push(
          { text: 'HACKATHON WINNER REGISTRY:', type: 'success' },
          { text: '  Total Earnings: $12,000+ USD', type: 'output' },
          { text: '  Milestone: Built, presented, and deployed highly interactive developer tools and infrastructure platforms in international hackathons.', type: 'output' },
          { text: '  Focus areas in competitions: High-scale backend servers, decentralized tooling.', type: 'output' }
        );
        break;
      case 'stats':
        newHistory.push(
          { text: 'REAL-TIME TELEMETRY STREAM:', type: 'success' },
          { text: '  GitHub Commits : 500+ YTD', type: 'output' },
          { text: '  Coffee/Redbull : 840 Liters', type: 'output' },
          { text: '  Systems Built  : 14', type: 'output' },
          { text: '  Uptime Rating  : 99.98%', type: 'output' }
        );
        break;
      case 'contact':
        newHistory.push(
          { text: 'RETRIEVING CONNECTION ENDPOINTS...', type: 'output' },
          { text: '  Email: work@atharv.me', type: 'success' },
          { text: '  GitHub: https://github.com/atharvmantri', type: 'success' },
          { text: '  LinkedIn: https://linkedin.com/in/atharv-mantri (Simulated)', type: 'success' }
        );
        break;
      case 'info':
      case 'cat info.txt':
        newHistory.push(
          { text: 'PORTFOLIO ARCHITECTURE METRIC:', type: 'success' },
          { text: '  Stack   : React 19.2 + TypeScript 6.0 + Vite 8.0 (No heavy UI frameworks)', type: 'output' },
          { text: '  Bundle  : ~268kB compressed production build', type: 'output' },
          { text: '  Assets  : 100% self-contained local inline SVGs for performance & stability', type: 'output' },
          { text: '  Styling : Modular encapsulated layout variables & CSS keyframes', type: 'output' }
        );
        break;
      case 'source':
      case 'code':
        newHistory.push(
          { text: 'GIT REPOSITORY TREE ACTIVE:', type: 'success' },
          { text: '  Repository URL: https://github.com/atharvmantri/Portfolio', type: 'output' },
          { text: '  Core Components:', type: 'output' },
          { text: '    - Hero.tsx             => Glowing Neural Core & mpath animation', type: 'output' },
          { text: '    - Terminal.tsx         => Interactive command-line loop shell', type: 'output' },
          { text: '    - ArchitectureDiagram.tsx => Bezier path data stream pipelines', type: 'output' },
          { text: '    - Skills.tsx           => Customized vector branded SVG chips', type: 'output' }
        );
        break;
      case 'secret':
      case 'easteregg':
        newHistory.push(
          { text: 'ACCESS GRANTED // INITIALIZING EASTER_EGG...', type: 'success' },
          { text: '  "I enjoy building products that feel slightly ahead of their time."', type: 'output' },
          { text: '  - Under the hood: Custom 3D tilt algorithms, cubic-bezier curves, and SVG paths.', type: 'output' },
          { text: '  - Keep exploring the system! Try running "sudo" to get started.', type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo make-me-coffee':
      case 'sudo':
        newHistory.push({
          text: 'make-coffee: Sudo credentials validated. Checking coffee maker connection... [FAIL] Err: 404 hardware not found. Please insert Red Bull into disk drive to proceed.',
          type: 'error',
        });
        break;
      default:
        newHistory.push({
          text: `Command directive not recognized: "${cmd}". Type "help" to display instructions.`,
          type: 'error',
        });
    }

    setHistory(newHistory);
  };

  return (
    <section id="terminal" style={{ padding: '80px 0', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            System Console
          </h3>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>
            Interactive <span className="text-gradient">Console Interface</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', marginTop: '0.5rem' }}>
            Interact directly with my kernel shell in real-time. Query backgrounds, systems, capabilities, and logs by typing directives.
          </p>
        </div>

        {/* Terminal Window */}
        <div 
          className="terminal-window" 
          onClick={handleTerminalClick}
          style={{ width: '100%', maxWidth: '900px', margin: '0 auto', textAlign: 'left' }}
          data-interactive
        >
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red"></span>
              <span className="terminal-dot dot-yellow"></span>
              <span className="terminal-dot dot-green"></span>
            </div>
            <div className="terminal-title">atharvmantri@terminal: ~ (sh)</div>
            <div style={{ width: '42px' }}></div> {/* Spacer */}
          </div>

          <div 
            ref={terminalBodyRef} 
            className="terminal-body" 
            style={{ minHeight: '320px', maxHeight: '420px', overflowY: 'auto' }}
          >
            {history.map((line, idx) => (
              <div 
                key={idx} 
                style={{ 
                  color: 
                    line.type === 'input' ? '#ffffff' : 
                    line.type === 'error' ? 'var(--accent-pink)' : 
                    line.type === 'success' ? 'var(--accent-cyan)' : 
                    '#a7f3d0',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.4rem',
                  whiteSpace: 'pre-wrap',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.2rem'
                }}
              >
                {line.text}
              </div>
            ))}
            <div className="terminal-input-line">
              <span className="terminal-prompt" style={{ fontFamily: 'var(--font-mono)' }}>
                atharv@portfolio:~$
              </span>
              <input
                ref={inputRef}
                type="text"
                className="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                style={{ caretColor: 'var(--accent-cyan)' }}
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
