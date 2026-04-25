import { quotes, enrich, cors } from './_lib.js';

export default function handler(req, res) {
  cors(res);
  res.json({ count: quotes.length, quotes: quotes.map(enrich) });
}
