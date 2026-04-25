import { quotes, enrich, pickRandom, cors } from './_lib.js';

export default function handler(req, res) {
  cors(res);
  const { book, theme } = req.query;
  let pool = quotes;
  if (book !== undefined) pool = pool.filter((q) => String(q.book) === String(book));
  if (theme) pool = pool.filter((q) => q.theme === theme);
  if (pool.length === 0) return res.status(404).json({ error: 'no quotes match' });
  res.json(enrich(pickRandom(pool)));
}
