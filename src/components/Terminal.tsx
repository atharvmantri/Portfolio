import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export const Terminal: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      setHistory([
        { text: t('term_conn_est'), type: 'success' },
        { text: t('term_handshake'), type: 'output' },
        { text: t('term_uptime'), type: 'output' },
        { text: t('term_help_hint'), type: 'output' },
      ]);
      hasInitialized.current = true;
    }
  }, [t]);

  useEffect(() => {
    if (terminalBodyRef.current) {
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
          setInput(commandHistory.at(-1 - nextIndex) ?? '');
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory.at(-1 - nextIndex) ?? '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    const newHistory = [...history, { text: `${t('terminalPrompt')} ${cmd}`, type: 'input' as const }];

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (lowerCmd) {
      case 'help':
        newHistory.push(
          { text: t('term_help_avail'), type: 'output' },
          { text: t('term_help_about'), type: 'output' },
          { text: t('term_help_skills'), type: 'output' },
          { text: t('term_help_projects'), type: 'output' },
          { text: t('term_help_hackathons'), type: 'output' },
          { text: t('term_help_stats'), type: 'output' },
          { text: t('term_help_contact'), type: 'output' },
          { text: t('term_help_info'), type: 'output' },
          { text: t('term_help_source'), type: 'output' },
          { text: t('term_help_clear'), type: 'output' }
        );
        break;
      case 'about':
        newHistory.push(
          { text: t('term_about_header'), type: 'success' },
          { text: t('term_about_identity'), type: 'output' },
          { text: t('term_about_role'), type: 'output' },
          { text: t('term_about_internship'), type: 'output' },
          { text: t('term_about_philosophy'), type: 'output' },
          { text: t('term_about_focus'), type: 'output' }
        );
        break;
      case 'skills':
        newHistory.push(
          { text: t('term_skills_header'), type: 'success' },
          { text: t('term_skills_languages'), type: 'output' },
          { text: t('term_skills_frontend'), type: 'output' },
          { text: t('term_skills_backend'), type: 'output' },
          { text: t('term_skills_ai'), type: 'output' }
        );
        break;
      case 'projects':
        newHistory.push(
          { text: t('term_projects_header'), type: 'success' },
          { text: t('term_projects_sk'), type: 'output' },
          { text: t('term_projects_gn'), type: 'output' },
          { text: t('term_projects_ws'), type: 'output' },
          { text: t('term_projects_hint'), type: 'output' }
        );
        break;
      case 'hackathons':
        newHistory.push(
          { text: t('term_hackathons_header'), type: 'success' },
          { text: t('term_hackathons_earnings'), type: 'output' },
          { text: t('term_hackathons_milestone'), type: 'output' },
          { text: t('term_hackathons_focus'), type: 'output' }
        );
        break;
      case 'stats':
        newHistory.push(
          { text: t('term_stats_header'), type: 'success' },
          { text: t('term_stats_commits'), type: 'output' },
          { text: t('term_stats_coffee'), type: 'output' },
          { text: t('term_stats_systems'), type: 'output' },
          { text: t('term_stats_uptime'), type: 'output' }
        );
        break;
      case 'contact':
        newHistory.push(
          { text: t('term_contact_retrieving'), type: 'output' },
          { text: t('term_contact_email'), type: 'success' },
          { text: t('term_contact_github'), type: 'success' },
          { text: t('term_contact_linkedin'), type: 'success' }
        );
        break;
      case 'info':
      case 'cat info.txt':
        newHistory.push(
          { text: t('term_info_header'), type: 'success' },
          { text: t('term_info_stack'), type: 'output' },
          { text: t('term_info_bundle'), type: 'output' },
          { text: t('term_info_assets'), type: 'output' },
          { text: t('term_info_styling'), type: 'output' }
        );
        break;
      case 'source':
      case 'code':
        newHistory.push(
          { text: t('term_source_header'), type: 'success' },
          { text: t('term_source_url'), type: 'output' },
          { text: t('term_source_components'), type: 'output' },
          { text: t('term_source_hero'), type: 'output' },
          { text: t('term_source_term'), type: 'output' },
          { text: t('term_source_arch'), type: 'output' },
          { text: t('term_source_skills'), type: 'output' }
        );
        break;
      case 'secret':
      case 'easteregg':
        newHistory.push(
          { text: t('term_secret_header'), type: 'success' },
          { text: t('term_secret_quote'), type: 'output' },
          { text: t('term_secret_under'), type: 'output' },
          { text: t('term_secret_hint'), type: 'output' }
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo make-me-coffee':
      case 'sudo':
        newHistory.push({
          text: t('term_sudo_fail'),
          type: 'error',
        });
        break;
      default:
        newHistory.push({
          text: t('term_err_unrecognized', { cmd }),
          type: 'error',
        });
    }

    setHistory(newHistory);
  };

  return (
    <section id="terminal" className="retro-section">
      <div className="container">

        {/* DOS Terminal Window */}
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
            <div className="terminal-title">C:\ATHARV\terminal.exe</div>
            <div style={{ width: '42px' }}></div>
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
                      line.type === 'error' ? '#ff6b6b' :
                        line.type === 'success' ? '#ffcc00' :
                          '#33ff33',
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
                {t('terminalPrompt')}
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
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
