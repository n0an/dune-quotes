import { themes, quotes, enrich, cors } from '../_lib.js';

export default function handler(req, res) {
  cors(res);
  const name = req.query.name;
  if (!themes.includes(name)) return res.status(404).json({ error: 'unknown theme', themes });
  const subset = quotes.filter((q) => q.theme === name).map(enrich);
  res.json({ theme: name, count: subset.length, quotes: subset });
}
