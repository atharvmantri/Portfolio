import { Pool } from 'pg';

type GlobalPool = typeof globalThis & { __dbPool?: Pool };

const globalForDb = globalThis as GlobalPool;

export const getPool = () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set');
  }

  if (!globalForDb.__dbPool) {
    const ssl =
      process.env.DATABASE_SSL === 'false' ? undefined : { rejectUnauthorized: false };
    globalForDb.__dbPool = new Pool({ connectionString: databaseUrl, ssl });
  }

  return globalForDb.__dbPool;
};
