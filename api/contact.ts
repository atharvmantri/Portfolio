import { getPool } from './_db';

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const parseBody = (body: unknown): Record<string, unknown> | null => {
  if (!body) return null;
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  if (typeof body === 'object') return body as Record<string, unknown>;
  return null;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = parseBody(req.body);
  if (!payload) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }

  const name = typeof payload.name === 'string' ? payload.name.trim() : '';
  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  const message = typeof payload.message === 'string' ? payload.message.trim() : '';

  if (!name) return res.status(400).json({ error: 'Name is required' });
  if (name.length > 100) return res.status(400).json({ error: 'Name is too long' });

  if (!email) return res.status(400).json({ error: 'Email is required' });
  if (email.length > 200) return res.status(400).json({ error: 'Email is too long' });
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: 'Email is invalid' });
  }

  if (!message) return res.status(400).json({ error: 'Message is required' });
  if (message.length < 10) {
    return res.status(400).json({ error: 'Message is too short' });
  }
  if (message.length > 4000) {
    return res.status(400).json({ error: 'Message is too long' });
  }

  const userAgent = getHeaderValue(req.headers['user-agent']) ?? null;
  const forwardedFor = getHeaderValue(req.headers['x-forwarded-for']);
  const sourceIp = forwardedFor
    ? forwardedFor.split(',')[0]?.trim()
    : getHeaderValue(req.headers['x-real-ip']) ?? null;

  try {
    const pool = getPool();
    await pool.query(
      'insert into contact_submissions (name, email, message, user_agent, source_ip) values ($1, $2, $3, $4, $5)',
      [name, email, message, userAgent, sourceIp]
    );

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Failed to save submission' });
  }
}
