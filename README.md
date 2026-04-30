# Voices of Arrakis — Dune Quotes

A small site + JSON API serving quotes from Frank Herbert's six Dune novels.

🌍 **Live:** https://dune-quotes.vercel.app

## API

| Endpoint | Description |
|---|---|
| `GET /api/random` | Single random quote. Defaults to Frank Herbert's originals (books 0–6). Supports `?book=N`, `?theme=NAME`, and `?set=all` to include the prequels/sequels. |
| `GET /api/all` | Every quote with metadata. |
| `GET /api/book/:n` | All quotes from book `n` (0 = cross-book, 1 = Dune ... 6 = Chapterhouse). |
| `GET /api/theme/:name` | Quotes by theme: `bene-gesserit`, `mentat`, `fremen`, `atreides`, `irulan`, `leto-ii`, `general`. |
| `GET /api/meta` | Books and themes available, total count. |

CORS is open (`Access-Control-Allow-Origin: *`).

## Project layout

```
api/            Vercel serverless functions (one per endpoint)
  _lib.js       Shared data loader and helpers
  random.js
  all.js
  meta.js
  book/[n].js
  theme/[name].js
public/         Static frontend (served by Vercel at root)
  index.html
  style.css
  app.js
quotes.json     Source of truth — edit here to add quotes
vercel.json     Vercel config (output dir, CORS headers)
```

## Adding quotes

Append a new object to the `quotes` array in `quotes.json` with a unique `id`, `book` (0–6), `theme`, `source`, and `text`. Push — Vercel redeploys automatically.

## License

Quotes are © Frank Herbert / Herbert estate. This project is non-commercial fan tribute.
