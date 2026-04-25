import { books, quotes, enrich, cors } from '../_lib.js';

export default function handler(req, res) {
  cors(res);
  const n = String(req.query.n);
  if (!(n in books)) return res.status(404).json({ error: 'unknown book id', books });
  const subset = quotes.filter((q) => String(q.book) === n).map(enrich);
  res.json({ book: books[n], count: subset.length, quotes: subset });
}
