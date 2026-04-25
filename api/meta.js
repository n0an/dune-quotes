import { books, themes, quotes, cors } from './_lib.js';

export default function handler(req, res) {
  cors(res);
  res.json({ books, themes, count: quotes.length });
}
