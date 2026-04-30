import { quotes, enrich, pickRandom, cors } from './_lib.js';

const FRANK_BOOKS = new Set([0, 1, 2, 3, 4, 5, 6]);

export default function handler(req, res) {
  cors(res);
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const { book, theme, set } = req.query;
  let pool = quotes;
  if (book !== undefined) {
    pool = pool.filter((q) => String(q.book) === String(book));
  } else if (set !== 'all') {
    pool = pool.filter((q) => FRANK_BOOKS.has(q.book));
  }
  if (theme) pool = pool.filter((q) => q.theme === theme);
  if (pool.length === 0) return res.status(404).json({ error: 'no quotes match' });
  res.json(enrich(pickRandom(pool)));
}
