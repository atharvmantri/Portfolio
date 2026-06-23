import { useMemo, useState, type ReactNode } from 'react';
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Check,
  Code2,
  Copy,
  Cpu,
  Globe2,
  Mail,
  MapPin,
  Mic2,
  NotebookTabs,
  Radar,
  Route,
  Shield,
  Sparkles,
  Terminal,
  Video,
  Zap,
} from 'lucide-react';
import profileImg from './assets/profile.jpeg';

type Project = {
  name: string;
  repo: string;
  description: string;
  stack: string[];
  signal: string;
  updated: string;
  icon: ReactNode;
  accent: string;
};

const projects: Project[] = [
  {
    name: 'ActionPath',
    repo: 'https://github.com/atharvmantri/ActionPath',
    description:
      'I built this to turn school emails, syllabi, LMS notices, and PDF clutter into checklists a student can actually act on.',
    stack: ['TypeScript', 'AI workflows', 'Accessibility'],
    signal: 'Newest build',
    updated: 'Updated Jun 21, 2026',
    icon: <Route size={24} />,
    accent: 'gold',
  },
  {
    name: 'Lumi Assist',
    repo: 'https://github.com/atharvmantri/Lumi-Assist',
    description:
      'A Windows 11 voice assistant that stays local-first, with the installer and frontend built around fast setup.',
    stack: ['Python', 'Next.js', 'Voice AI'],
    signal: 'Local AI',
    updated: 'Updated Jun 10, 2026',
    icon: <Mic2 size={24} />,
    accent: 'blue',
  },
  {
    name: 'BridgeMind',
    repo: 'https://github.com/atharvmantri/BridgeMind',
    description:
      'Chrome extension plus backend agents that rewrite dense web content for different cognitive profiles.',
    stack: ['JavaScript', 'FastAPI', 'Multi-agent AI'],
    signal: 'Hackathon platform',
    updated: 'Updated Jun 12, 2026',
    icon: <BrainCircuit size={24} />,
    accent: 'red',
  },
  {
    name: 'ScribeMesh',
    repo: 'https://github.com/atharvmantri/ScribeMesh',
    description:
      'Upload a hardware video, get timestamped component notes, maintenance details, and structured docs back.',
    stack: ['Next.js 15', 'React 19', 'Gemini 2.5'],
    signal: 'Video to docs',
    updated: 'Updated Jun 6, 2026',
    icon: <Video size={24} />,
    accent: 'green',
  },
  {
    name: 'Cognitive',
    repo: 'https://github.com/atharvmantri/Cognitive',
    description:
      'Local behavior signals go in; overload detection and interruption control come out. No cloud dependency needed.',
    stack: ['Python', 'On-device ML', 'Focus systems'],
    signal: 'Attention OS',
    updated: 'Updated May 18, 2026',
    icon: <Radar size={24} />,
    accent: 'violet',
  },
  {
    name: 'ShadowKey',
    repo: 'https://github.com/atharvmantri/ShadowKey',
    description:
      'Identity verification on Midnight Network using nine Groth16 circuits written in Compact.',
    stack: ['TypeScript', 'Compact ZK', 'Midnight'],
    signal: 'ZK identity',
    updated: 'Updated May 17, 2026',
    icon: <Shield size={24} />,
    accent: 'black',
  },
  {
    name: 'Guardnet',
    repo: 'https://github.com/atharvmantri/Guardnet',
    description:
      'Weather, NASA, USGS, GDACS, terrain, and community reports compressed into one live disaster risk score.',
    stack: ['TypeScript', 'Firebase', 'PWA'],
    signal: 'WeatherWise 2026',
    updated: 'Updated May 15, 2026',
    icon: <Globe2 size={24} />,
    accent: 'green',
  },
  {
    name: 'Websniper',
    repo: 'https://github.com/atharvmantri/Websniper',
    description:
      'A local scraper builder with visual timelines, Playwright execution, and selector repair when sites change.',
    stack: ['TypeScript', 'Playwright', 'FastAPI'],
    signal: 'Devtool',
    updated: 'Updated May 10, 2026',
    icon: <Terminal size={24} />,
    accent: 'blue',
  },
];

const capabilities = [
  {
    title: 'AI that becomes software',
    detail: 'Agents, local assistants, accessibility tools, overload detection, and task extraction flows that end in usable interfaces.',
    tools: ['Gemini', 'FastAPI', 'Python', 'prompt chains'],
  },
  {
    title: 'Interfaces I can defend',
    detail: 'React surfaces, extension UIs, dashboards, PWAs, and CSS systems built with the details visible.',
    tools: ['React 19', 'TypeScript', 'Next.js', 'Tailwind'],
  },
  {
    title: 'Systems under the UI',
    detail: 'ZK identity, disaster pipelines, DDoS scripts, Linux ops, and backend logic that makes the frontend honest.',
    tools: ['Compact ZK', 'Firebase', 'Docker', 'Bash'],
  },
];

const stats = [
  { value: '7x', label: 'Hackathon winner', icon: <Award size={20} /> },
  { value: '19', label: 'Public repositories', icon: <Code2 size={20} /> },
  { value: '15', label: 'Building age', icon: <Sparkles size={20} /> },
  { value: '120k+', label: 'Lines shipped', icon: <Code2 size={20} /> },
];

const navItems = [
  ['work', 'Work'],
  ['lab', 'Lab'],
  ['stack', 'Stack'],
  ['contact', 'Contact'],
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function App() {
  const [copied, setCopied] = useState(false);
  const featured = useMemo(() => projects.slice(0, 4), []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('work@atharv.me');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <div className="motion-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="topbar">
        <button className="brand-mark" onClick={() => scrollTo('home')} aria-label="Go to top">
          <span>AM</span>
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href="https://github.com/atharvmantri" target="_blank" rel="noreferrer">
          <Code2 size={18} />
          GitHub
        </a>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Indore, India / built by Atharv Mantri</p>
            <h1>I build AI tools, web systems, and hackathon projects that actually run.</h1>
            <p className="hero-lede">
              This site is hand-rolled in React and CSS because I wanted it to feel like my work:
              direct, technical, a little raw, and obsessed with shipping the thing.
            </p>
            <div className="hero-actions">
              <button className="button primary" onClick={() => scrollTo('work')}>
                <Zap size={18} />
                See the work
              </button>
              <button className="button ghost" onClick={() => scrollTo('contact')}>
                <Mail size={18} />
                Contact
              </button>
            </div>
          </div>

          <aside className="hero-card" aria-label="Atharv profile summary">
            <div className="portrait-frame">
              <img src={profileImg} alt="Atharv Mantri" />
            </div>
            <div className="card-kicker">Current read</div>
            <h2>7x hackathon winner. Still writing the code myself.</h2>
            <p>
              Recent repos: ActionPath, BridgeMind, Lumi Assist, ScribeMesh, ShadowKey,
              Guardnet, Websniper, Cognitive.
            </p>
            <div className="mini-map">
              <MapPin size={16} />
              Open to internships, serious builds, and people who move fast.
            </div>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Portfolio stats">
          {stats.map((stat) => (
            <div className="stat-cell" key={stat.label}>
              {stat.icon}
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="work" className="section work-section">
          <div className="section-heading">
            <p className="eyebrow">Pulled from my GitHub</p>
            <h2>Stuff I have been building lately.</h2>
            <p>
              No fake case studies. These are the repos I would actually point someone to first.
            </p>
          </div>

          <div className="featured-grid">
            {featured.map((project, index) => (
              <a className={`feature-card accent-${project.accent}`} href={project.repo} target="_blank" rel="noreferrer" key={project.name}>
                <span className="project-index">0{index + 1}</span>
                <span className="project-icon">{project.icon}</span>
                <span className="project-signal">{project.signal}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="project-link">
                  Open repository <ArrowUpRight size={17} />
                </span>
              </a>
            ))}
          </div>

          <div className="repo-table" aria-label="Repository table">
            {projects.slice(4).map((project) => (
              <a className="repo-row" href={project.repo} target="_blank" rel="noreferrer" key={project.name}>
                <span className="repo-icon">{project.icon}</span>
                <span>
                  <strong>{project.name}</strong>
                  <em>{project.description}</em>
                </span>
                <span className="repo-stack">{project.stack.join(' / ')}</span>
                <span className="repo-date">{project.updated}</span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </section>

        <section id="lab" className="section lab-section">
          <div className="section-heading narrow">
            <p className="eyebrow">How I think</p>
            <h2>I like problems where the input is messy and the output is obvious.</h2>
          </div>
          <div className="lab-board">
            <div className="lab-statement">
              <Cpu size={34} />
              <p>
                Emails become tasks. Videos become docs. Disaster feeds become a risk score.
                Websites become APIs. Identity becomes a private proof. That pattern keeps showing up in my work.
              </p>
            </div>
            <div className="lab-notes">
              <span>01 / Build the boring path too</span>
              <span>02 / Keep local data local</span>
              <span>03 / Make the model earn its UI</span>
              <span>04 / Demo only what can run</span>
            </div>
          </div>
        </section>

        <section id="stack" className="section stack-section">
          <div className="section-heading">
            <p className="eyebrow">Stack</p>
            <h2>The parts I keep reaching for.</h2>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability-card" key={capability.title}>
                <NotebookTabs size={24} />
                <h3>{capability.title}</h3>
                <p>{capability.detail}</p>
                <div className="tool-list">
                  {capability.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>Send me the sharp version.</h2>
            <p>
              What are you building, what is broken, and where do you need help? That is enough to start.
            </p>
          </div>
          <div className="contact-panel">
            <button className="email-copy" onClick={copyEmail}>
              <Mail size={20} />
              <span>work@atharv.me</span>
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
            <a href="https://github.com/atharvmantri" target="_blank" rel="noreferrer">
              <Code2 size={19} />
              github.com/atharvmantri
              <ArrowUpRight size={17} />
            </a>
            <a href="https://www.instagram.com/atharvmantr_i" target="_blank" rel="noreferrer">
              <Sparkles size={19} />
              @atharvmantr_i
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Atharv Mantri</span>
        <span>Hand-coded React/CSS. No template pretending to be taste.</span>
      </footer>
    </div>
  );
}

export default App;
