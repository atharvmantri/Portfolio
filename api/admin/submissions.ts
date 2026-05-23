import { getPool } from '../_db';

type ApiRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

const getHeaderValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const parseBasicAuth = (authorization: string | undefined) => {
  if (!authorization || !authorization.startsWith('Basic ')) return null;
  const base64 = authorization.slice('Basic '.length).trim();
  const decoded = Buffer.from(base64, 'base64').toString('utf8');
  const separatorIndex = decoded.indexOf(':');
  if (separatorIndex === -1) return null;
  return {
    user: decoded.slice(0, separatorIndex),
    pass: decoded.slice(separatorIndex + 1),
  };
};

const parseLimit = (rawLimit: string | undefined) => {
  if (!rawLimit) return 200;
  const parsed = Number.parseInt(rawLimit, 10);
  if (Number.isNaN(parsed)) return 200;
  return Math.min(Math.max(parsed, 1), 500);
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const adminUser = process.env.ADMIN_USER;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPassword) {
    return res.status(500).json({ error: 'Admin credentials are not configured' });
  }

  const credentials = parseBasicAuth(getHeaderValue(req.headers.authorization));
  if (!credentials || credentials.user !== adminUser || credentials.pass !== adminPassword) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const limit = parseLimit(getHeaderValue(req.query?.limit));

  try {
    const pool = getPool();
    const result = await pool.query(
      'select id, name, email, message, created_at, source_ip, user_agent from contact_submissions order by created_at desc limit $1',
      [limit]
    );

    const submissions = result.rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      message: row.message,
      createdAt: row.created_at,
      sourceIp: row.source_ip,
      userAgent: row.user_agent,
    }));

    return res.status(200).json({ submissions });
  } catch {
    return res.status(500).json({ error: 'Failed to load submissions' });
  }
}
