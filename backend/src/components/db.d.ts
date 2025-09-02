import type { Database } from 'sqlite';

export let db: Database | null;

export function initDb(): Promise<void>;