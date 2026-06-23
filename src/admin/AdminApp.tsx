import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Submission = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  sourceIp?: string | null;
  userAgent?: string | null;
};

const AUTH_STORAGE_KEY = 'adminAuthToken';

const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

export const AdminApp = () => {
  const { t } = useTranslation();
  const [authToken, setAuthToken] = useState<string>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) ?? '';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const storeAuthToken = (token: string) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, token);
    setAuthToken(token);
  };

  const clearAuth = useCallback(() => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthToken('');
  }, []);

  const fetchSubmissions = useCallback(async (token: string, isLogin = false) => {
    setIsLoading(true);
    setDataError(null);
    if (isLogin) setLoginError(null);

    try {
      const response = await fetch('/api/admin/submissions?limit=200', {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (response.status === 401) {
        if (isLogin) {
          setLoginError(t('invalidCredentials'));
        } else {
          setLoginError(t('sessionExpired'));
          clearAuth();
        }
        return false;
      }

      if (!response.ok) {
        setDataError(t('unableToLoad'));
        return false;
      }

      const payload = (await response.json()) as { submissions?: Submission[] };
      setSubmissions(payload.submissions ?? []);
      setLastUpdated(new Date().toLocaleString());
      return true;
    } catch {
      setDataError(t('networkErrorSubmissions'));
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [clearAuth, t]);

  useEffect(() => {
    if (authToken) {
      const timer = window.setTimeout(() => {
        void fetchSubmissions(authToken);
      }, 0);

      return () => window.clearTimeout(timer);
    }
  }, [authToken, fetchSubmissions]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = btoa(`${username}:${password}`);
    const success = await fetchSubmissions(token, true);
    if (success) {
      storeAuthToken(token);
      setPassword('');
    }
  };

  const handleLogout = () => {
    clearAuth();
    setSubmissions([]);
    setLoginError(null);
    setDataError(null);
    setLastUpdated(null);
  };

  return (
    <>
      <div className="grid-bg"></div>
      <div className="bg-glow-container">
        <div className="bg-glow-blob blob-1"></div>
        <div className="bg-glow-blob blob-2"></div>
        <div className="bg-glow-blob blob-3"></div>
      </div>

      <main className="container" style={{ padding: '4rem 0 6rem' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                fontSize: '0.85rem',
              }}
            >
              {t('adminHeader')}
            </p>
            <h1 style={{ fontSize: '2.4rem', marginTop: '0.4rem' }}>
              {t('adminTitle')} <span className="text-gradient">{t('adminTitleAccent')}</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', maxWidth: '520px' }}>
              {t('adminDescription')}
            </p>
          </div>

          {authToken && (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => void fetchSubmissions(authToken)}
                disabled={isLoading}
              >
                {isLoading ? t('syncing') : t('refresh')}
              </button>
              <button className="btn btn-secondary" type="button" onClick={handleLogout}>
                {t('logout')}
              </button>
            </div>
          )}
        </header>

        {!authToken ? (
          <section className="glass-panel" style={{ maxWidth: '460px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{t('adminSignIn')}</h2>
            <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {t('username')}
                </label>
                <input
                  className="glass-input"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  {t('password')}
                </label>
                <input
                  className="glass-input"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {loginError && (
                <div
                  style={{
                    background: 'rgba(236, 72, 153, 0.08)',
                    border: '1px solid var(--accent-pink)',
                    color: 'var(--accent-pink)',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                  }}
                >
                  {loginError}
                </div>
              )}
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? t('connecting') : t('accessFeed')}
              </button>
            </form>
          </section>
        ) : (
          <section style={{ display: 'grid', gap: '1.5rem' }}>
            {dataError && (
              <div
                className="glass-panel"
                style={{
                  borderColor: 'var(--accent-pink)',
                  color: 'var(--accent-pink)',
                  background: 'rgba(236, 72, 153, 0.08)',
                }}
              >
                {dataError}
              </div>
            )}

            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                    {t('latestSubmissions')}
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    {t('totalPayloads', { count: submissions.length })}
                    {lastUpdated ? t('updatedAt', { time: lastUpdated }) : ''}
                  </p>
                </div>
              </div>
            </div>

            {submissions.length === 0 ? (
              <div className="glass-panel" style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)' }}>
                  {t('noSubmissions')}
                </p>
              </div>
            ) : (
              submissions.map((submission) => (
                <article className="glass-panel" style={{ padding: '1.5rem' }} key={submission.id}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>
                        {submission.name}
                      </h3>
                      <a
                        href={`mailto:${submission.email}`}
                        style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem' }}
                      >
                        {submission.email}
                      </a>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {formatDate(submission.createdAt)}
                    </div>
                  </div>

                  <p style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                    {submission.message}
                  </p>

                  {(submission.sourceIp || submission.userAgent) && (
                    <div
                      style={{
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                      }}
                    >
                      {submission.sourceIp && <span>{t('ipAddress', { ip: submission.sourceIp })}</span>}
                      {submission.userAgent && <span>{t('userAgent', { ua: submission.userAgent })}</span>}
                    </div>
                  )}
                </article>
              ))
            )}
          </section>
        )}
      </main>
    </>
  );
};
