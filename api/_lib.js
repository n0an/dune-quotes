import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(readFileSync(join(__dirname, '..', 'quotes.json'), 'utf8'));

export const { books, themes, quotes } = data;
export const enrich = (q) => ({ ...q, bookName: books[String(q.book)] });
export const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
};
