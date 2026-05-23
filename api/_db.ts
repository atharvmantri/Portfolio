import { config as loadEnv } from 'dotenv';
import { Pool } from 'pg';

type GlobalPool = typeof globalThis & { __dbPool?: Pool };

const globalForDb = globalThis as GlobalPool;

loadEnv();

const buildConnectionString = () => {
  const host = process.env.PGHOST;
  const database = process.env.PGDATABASE;
  const user = process.env.PGUSER;
  const password = process.env.PGPASSWORD;

  if (!host || !database || !user || !password) return null;

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  return `postgresql://${encodedUser}:${encodedPassword}@${host}/${database}`;
};

const resolveSsl = () => {
  if (process.env.DATABASE_SSL === 'false') return undefined;
  if (process.env.DATABASE_SSL === 'true') return { rejectUnauthorized: false };
  if (process.env.PGSSLMODE === 'require') return { rejectUnauthorized: false };
  return undefined;
};

export const getPool = () => {
  const databaseUrl = process.env.DATABASE_URL ?? buildConnectionString();
  if (!databaseUrl) {
    throw new Error('DATABASE_URL or PG* variables are not set');
  }

  if (!globalForDb.__dbPool) {
    const ssl = resolveSsl();
    globalForDb.__dbPool = new Pool({ connectionString: databaseUrl, ssl });
  }

  return globalForDb.__dbPool;
};
