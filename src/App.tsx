import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import Lenis from 'lenis';
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
  X,
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
  problem: string;
  build: string[];
  proof: string;
  live?: string;
};

type GitHubRepository = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics?: string[];
  updated_at: string;
  fork: boolean;
  archived: boolean;
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
    problem: 'School tasks are buried in emails, PDFs, and LMS notices—especially costly for students dealing with executive dysfunction.',
    build: ['A seven-stage Gemini pipeline with strict JSON handoffs', 'Grounded task cards that retain the original source sentence', 'A 7-day plan, start cues, voice input, and calendar export'],
    proof: 'Live product with a public demo and a deliberately labeled sandbox for simulated integrations.',
    live: 'https://actionpath.atharv.me',
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
    problem: 'Voice assistants feel magical until setup, privacy, or desktop control becomes the bottleneck.',
    build: ['Wake word → speech-to-text → streaming tool calls → local TTS', 'A Windows tray app with a click-through stateful overlay', 'An installer that configures Python, models, and voice settings'],
    proof: '260+ built-in capabilities with confirmation required for destructive system actions.',
    live: 'https://lumiassist.xyz',
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
    problem: 'Dense online content needs more than font resizing to work for different cognitive profiles.',
    build: ['A Chrome extension that overlays adapted content in context', 'FastAPI orchestration across reader, focus, comprehension, communication, and emotion agents', 'A mock-mode fallback so the prototype can be tested without cloud credentials'],
    proof: 'Submitted to STEMINATE Hackathon: AI for a Better World.',
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
    problem: 'Hardware documentation is slow to produce and hard to connect back to the moment a component appears.',
    build: ['Video ingestion for MP4, MOV, and WebM files up to 50 MB', 'Gemini analysis that returns timestamped component data', 'A synchronized video player and component catalogue with JSON export'],
    proof: 'Turns a physical-system walkthrough into navigable, structured documentation.',
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
    problem: 'Attention systems need to respond to overload without turning private behavior into another cloud data stream.',
    build: ['Local behavior-signal collection', 'On-device overload detection', 'Interruption-control routines designed around focus'],
    proof: 'A local-first exploration of attention-aware computing.',
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
    problem: 'Identity systems routinely ask people to reveal more personal information than a verification needs.',
    build: ['Nine Groth16 circuits written in Compact', 'Identity verification on Midnight Network', 'A proof-oriented flow instead of raw identity disclosure'],
    proof: 'A zero-knowledge identity system built around selective verification.',
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
    problem: 'Disaster risk is spread across disconnected feeds that are difficult to read as one operational picture.',
    build: ['Live weather, NASA, USGS, GDACS, terrain, and community inputs', 'A single risk-score surface', 'A Firebase-backed progressive web app'],
    proof: 'Built for WeatherWise 2026 as a unified disaster-risk view.',
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
    problem: 'Web automation breaks when selectors drift, and the repair loop is usually hidden in code.',
    build: ['A local visual scraper builder', 'Playwright-backed execution timelines', 'Selector repair when target sites change'],
    proof: 'A developer tool that keeps the automation workflow inspectable.',
  },
];

const projectAccents = ['gold', 'blue', 'red', 'green', 'violet', 'black'];
const githubProjectsEndpoint = 'https://api.github.com/users/atharvmantri/repos?type=owner&sort=updated&direction=desc&per_page=100';
const githubCacheKey = 'atharv-github-projects-v1';
const githubCacheLifetime = 1000 * 60 * 15;

const formatProjectDate = (date: string) => {
  const d = new Date(date);
  const formatted = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(d);
  return `Updated ${formatted}`;
};

const formatProjectDateISO = (date: string) => new Date(date).toISOString().split('T')[0];

const githubProjectToPortfolioProject = (repository: GitHubRepository, index: number): Project => {
  const knownProject = projects.find((project) => project.name.toLowerCase() === repository.name.toLowerCase());
  const stack = [repository.language, ...(repository.topics ?? [])].filter(
    (item): item is string => Boolean(item)
  );

  return {
    name: repository.name,
    repo: repository.html_url,
    description: repository.description || knownProject?.description || 'A public build from my GitHub.',
    stack: stack.length ? stack.slice(0, 3) : knownProject?.stack ?? ['GitHub'],
    signal: knownProject?.signal ?? `${repository.language ?? 'GitHub'} repository`,
    updated: formatProjectDate(repository.updated_at),
    icon: knownProject?.icon ?? <Code2 size={24} />,
    accent: knownProject?.accent ?? projectAccents[index % projectAccents.length],
    problem: knownProject?.problem ?? 'A public repository pulled directly from my GitHub profile.',
    build: knownProject?.build ?? [
      'The source code and project history are available publicly on GitHub.',
      `Last updated ${formatProjectDate(repository.updated_at).replace('Updated ', '')}.`,
    ],
    proof: knownProject?.proof ?? 'Project metadata is synchronized from GitHub.',
    live: knownProject?.live,
  };
};

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
  { value: 7, suffix: 'x', label: 'Hackathon winner', icon: <Award size={20} /> },
  { value: 12, suffix: '', label: 'Public repositories', icon: <Code2 size={20} /> },
  { value: 15, suffix: '', label: 'Year old', icon: <Sparkles size={20} /> },
  { value: 120, suffix: 'k+', label: 'Lines shipped', icon: <Code2 size={20} /> },
];

const navItems = [
  ['work', 'Work'],
  ['now', 'Now'],
  ['lab', 'Lab'],
  ['stack', 'Stack'],
  ['contact', 'Contact'],
] as const;

const headlineWords = 'I build AI tools, web systems, and hackathon projects that actually run.'.split(' ');

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const node = ref.current;

    if (!node || reduceMotion) {
      setValue(end);
      return;
    }

    let raf = 0;
    let startedAt = 0;

    const run = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / 1150, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) {
        raf = window.requestAnimationFrame(run);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        raf = window.requestAnimationFrame(run);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [end]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

function App() {
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [githubProjects, setGithubProjects] = useState<Project[]>(projects);
  const [githubStatus, setGithubStatus] = useState<'loading' | 'live' | 'cached' | 'fallback'>('loading');
  const featured = useMemo(() => githubProjects.slice(0, 4), [githubProjects]);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const applyRepositories = (repositories: GitHubRepository[], status: 'live' | 'cached') => {
      const publicProjects = repositories
        .filter((repository) => !repository.fork && !repository.archived)
        .map(githubProjectToPortfolioProject);

      if (!cancelled && publicProjects.length) {
        setGithubProjects(publicProjects);
        setGithubStatus(status);
      }
    };

    const syncProjects = async () => {
      try {
        const cached = window.sessionStorage.getItem(githubCacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as { savedAt: number; repositories: GitHubRepository[] };
          if (Date.now() - parsed.savedAt < githubCacheLifetime && Array.isArray(parsed.repositories)) {
            applyRepositories(parsed.repositories, 'cached');
            return;
          }
        }

        const response = await fetch(githubProjectsEndpoint, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(`GitHub request failed with ${response.status}`);

        const repositories = (await response.json()) as GitHubRepository[];
        window.sessionStorage.setItem(githubCacheKey, JSON.stringify({ savedAt: Date.now(), repositories }));
        applyRepositories(repositories, 'live');
      } catch (error) {
        if (!cancelled && !(error instanceof DOMException && error.name === 'AbortError')) {
          setGithubStatus('fallback');
        }
      }
    };

    void syncProjects();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const setParallaxVars = () => {
      frame = 0;

      if (reduceMotion.matches) {
        root.style.setProperty('--parallax-slow', '0px');
        root.style.setProperty('--parallax-medium', '0px');
        root.style.setProperty('--parallax-fast', '0px');
        root.style.setProperty('--parallax-reverse', '0px');
        root.style.setProperty('--parallax-image', '0px');
        root.style.setProperty('--parallax-bg', '0px');
        return;
      }

      const scrollY = window.scrollY;
      const capped = (speed: number, limit: number) => Math.round(Math.max(Math.min(scrollY * speed, limit), -limit));

      root.style.setProperty('--parallax-bg', `${capped(0.018, 46)}px`);
      root.style.setProperty('--parallax-slow', `${capped(0.032, 62)}px`);
      root.style.setProperty('--parallax-medium', `${capped(0.052, 84)}px`);
      root.style.setProperty('--parallax-fast', `${capped(0.11, 132)}px`);
      root.style.setProperty('--parallax-reverse', `${capped(-0.045, 72)}px`);
      root.style.setProperty('--parallax-image', `${capped(-0.022, 38)}px`);
    };

    const requestParallaxUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(setParallaxVars);
    };

    setParallaxVars();
    window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
    window.addEventListener('resize', requestParallaxUpdate);
    reduceMotion.addEventListener('change', setParallaxVars);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestParallaxUpdate);
      window.removeEventListener('resize', requestParallaxUpdate);
      reduceMotion.removeEventListener('change', setParallaxVars);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedProject]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText('work@atharv.me');
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };



  return (
    <div className="site-shell">
      <div className="parallax-backdrop" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="motion-field" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="topbar">
        <button className="brand-mark" onClick={() => scrollTo('home')} aria-label="Go to top">
          <img src="/short-logo.png" alt="Atharv Mantri" width="40" height="40" />
        </button>
        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <a className="nav-cta" href="https://github.com/atharvmantri" target="_blank" rel="noopener noreferrer">
          <Code2 size={18} />
          GitHub
        </a>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Indore, India / built by Atharv Mantri</p>
            <h1 className="reveal-headline" aria-label="I build AI tools, web systems, and hackathon projects that actually run.">
              {headlineWords.map((word, index) => (
                <span
                  className="word-mask"
                  key={`${word}-${index}`}
                  style={{ '--word-index': index } as CSSProperties}
                  aria-hidden="true"
                >
                  <span>{word}</span>
                </span>
              ))}
            </h1>
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
              <img
                src={profileImg}
                alt="Atharv Mantri — AI Systems &amp; Full-Stack Developer"
                width="400"
                height="400"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
            <div className="card-kicker">Current read</div>
            <h2>7x hackathon winner. Still writing the code myself.</h2>
            <p>
              Recent repos: ActionPath, BridgeMind, Lumi Assist, ScribeMesh, ShadowKey,
              Guardnet, Websniper, Cognitive.
            </p>
            <div className="mini-map">
              <MapPin size={16} />
              Open to ideas.
            </div>
          </aside>
        </section>

        <section className="stats-strip" aria-label="Portfolio stats">
          {stats.map((stat) => (
            <div className="stat-cell" key={stat.label}>
              {stat.icon}
              <strong>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="work" className="section work-section" aria-labelledby="work-title">
          <div className="section-heading">
            <p className="eyebrow">Pulled from my GitHub</p>
            <h2 id="work-title">Stuff I have been building lately.</h2>
            <p>
              No fake case studies. These public repositories are synced directly from GitHub, newest first.
            </p>
            <span className={`github-sync ${githubStatus}`} aria-live="polite">
              {githubStatus === 'loading' && 'Syncing GitHub…'}
              {githubStatus === 'live' && `${githubProjects.length} projects synced live`}
              {githubStatus === 'cached' && `${githubProjects.length} projects loaded from a recent sync`}
              {githubStatus === 'fallback' && 'GitHub is unavailable — showing the saved selection'}
            </span>
          </div>
          <div className="featured-grid">
            {featured.map((project, index) => (
              <button className={`feature-card accent-${project.accent}`} onClick={() => setSelectedProject(project)} key={project.name} type="button">
                <span className="project-index">0{index + 1}</span>
                <span className="project-icon">{project.icon}</span>
                <span className="project-signal">{project.signal}</span>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="project-link">
                  Read build notes <ArrowUpRight size={17} />
                </span>
              </button>
            ))}
          </div>

          <div className="repo-table" aria-label="Repository table">
            {githubProjects.slice(4).map((project) => (
              <a className="repo-row" href={project.repo} target="_blank" rel="noopener noreferrer" key={project.name}>
                <span className="repo-icon">{project.icon}</span>
                <span>
                  <strong>{project.name}</strong>
                  <em>{project.description}</em>
                </span>
                <span className="repo-stack">{project.stack.join(' / ')}</span>
                <time className="repo-date" dateTime={formatProjectDateISO(project.updated.replace('Updated ', ''))}>{project.updated}</time>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </section>

        <section id="now" className="section now-section" aria-labelledby="now-title">
          <div className="now-label">
            <span className="live-dot" aria-hidden="true" />
            <span>Now</span>
            <i />
            <span>July 2026</span>
          </div>
          <div className="now-copy">
            <p className="eyebrow">Currently in the lab</p>
            <h2 id="now-title">Building an autonomous system for the NSE.</h2>
            <p>
              I’m making an autonomous trading algorithm that trades on the National Stock Exchange of India.
              It is up 4% over its first 16 days.
            </p>
          </div>
          <div className="now-metric" aria-label="4 percent up in 16 days">
            <strong>+4%</strong>
            <span>first 16 days</span>
            <small>Personal research system. Not investment advice.</small>
          </div>
        </section>

        <section id="lab" className="section lab-section" aria-labelledby="lab-title">
          <div className="section-heading narrow">
            <p className="eyebrow">How I think</p>
            <h2 id="lab-title">I like problems where the input is messy and the output is obvious.</h2>
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

        <section id="stack" className="section stack-section" aria-labelledby="stack-title">
          <div className="section-heading">
            <p className="eyebrow">Stack</p>
            <h2 id="stack-title">The parts I keep reaching for.</h2>
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

        <section id="contact" className="contact-section" aria-labelledby="contact-title" role="complementary">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Send me the sharp version.</h2>
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
            <a href="https://github.com/atharvmantri" target="_blank" rel="noopener noreferrer">
              <Code2 size={19} />
              github.com/atharvmantri
              <ArrowUpRight size={17} />
            </a>
            <a href="https://www.instagram.com/atharvmantr_i" target="_blank" rel="noopener noreferrer">
              <Sparkles size={19} />
              @atharvmantr_i
              <ArrowUpRight size={17} />
            </a>

          </div>

        </section>
      </main>

      {selectedProject && (
        <div className="case-overlay" role="presentation" onMouseDown={() => setSelectedProject(null)}>
          <article className="case-sheet" role="dialog" aria-modal="true" aria-labelledby="case-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="case-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">
              <X size={19} />
            </button>
            <div className={`case-glyph accent-${selectedProject.accent}`}>{selectedProject.icon}</div>
            <p className="eyebrow">Project case file</p>
            <h2 id="case-title">{selectedProject.name}</h2>
            <div className="case-grid">
              <section>
                <h3>The problem</h3>
                <p>{selectedProject.problem}</p>
              </section>
              <section>
                <h3>What I built</h3>
                <ul>
                  {selectedProject.build.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </div>
            <p className="case-proof"><Award size={18} /> {selectedProject.proof}</p>
            <div className="case-actions">
              {selectedProject.live && <a className="button primary" href={selectedProject.live} target="_blank" rel="noopener noreferrer"><Zap size={17} /> View live product <ArrowUpRight size={16} /></a>}
              <a className="button ghost" href={selectedProject.repo} target="_blank" rel="noopener noreferrer"><Code2 size={17} /> Source code <ArrowUpRight size={16} /></a>
            </div>
          </article>
        </div>
      )}

      <footer className="footer">
        <span>Atharv Mantri</span>
        <span>Hand-coded React/CSS. No template pretending to be taste.</span>
      </footer>
    </div>
  );
}

export default App;
