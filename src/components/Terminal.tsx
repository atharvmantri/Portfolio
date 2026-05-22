import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'ATHARV_CORE v2.5.8 // SECURE CONNECTION ESTABLISHED', type: 'success' },
    { text: 'Initial port handshake: 200 OK', type: 'output' },
    { text: 'System Uptime: 99.98% // Location: Indore, India', type: 'output' },
    { text: 'Type "help" for a list of available command directives.', type: 'output' },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom of terminal
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
          { text: '  [Languages]       Go, TypeScript, Python, C++, Rust, SQL, Bash', type: 'output' },
          { text: '  [Frontend]        React, Next.js, HTML5/CSS3, Tailwind, WebGL', type: 'output' },
          { text: '  [Backend & Infra] Node.js, PostgreSQL, Redis, Docker, gRPC, Linux', type: 'output' },
          { text: '  [AI / Intelligence] LLM Agentic Pipelines, LangChain, PyTorch, Embeddings', type: 'output' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: 'HIGHLIGHTED SOURCE PIPELINES:', type: 'success' },
          { text: '  ShadowKey  - Security core protecting sensitive keystrokes/data patterns.', type: 'output' },
          { text: '  Guardnet   - Cyber threat isolation engine utilizing ML classifiers.', type: 'output' },
          { text: '  WebSniper  - High-concurrency scraper and crawler engineered in Go.', type: 'output' },
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

          <div className="terminal-body" style={{ minHeight: '320px', maxHeight: '420px' }}>
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
            <div ref={terminalEndRef} />
          </div>
        </div>

      </div>
    </section>
  );
};
