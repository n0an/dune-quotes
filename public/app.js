const card = document.getElementById('quote-card');
const textEl = document.getElementById('quote-text');
const sourceEl = document.getElementById('quote-source');
const bookEl = document.getElementById('quote-book');
const nextBtn = document.getElementById('next-btn');
const bookFilter = document.getElementById('book-filter');
const themeFilter = document.getElementById('theme-filter');

async function fetchMeta() {
  const res = await fetch('api/meta');
  return res.json();
}

async function fetchRandom() {
  const params = new URLSearchParams();
  if (bookFilter.value) params.set('book', bookFilter.value);
  if (themeFilter.value) params.set('theme', themeFilter.value);
  const url = 'api/random' + (params.toString() ? `?${params}` : '');
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

function render(quote) {
  if (!quote) {
    textEl.textContent = 'No quote matches that filter.';
    sourceEl.textContent = '';
    bookEl.textContent = '';
    return;
  }
  textEl.textContent = quote.text;
  sourceEl.textContent = quote.source ? `— ${quote.source}` : '';
  bookEl.textContent = quote.bookName || '';
}

async function nextQuote() {
  card.classList.add('fading');
  const quote = await fetchRandom();
  setTimeout(() => {
    render(quote);
    card.classList.remove('fading');
  }, 200);
}

const FRANK_BOOKS = new Set(['1', '2', '3', '4', '5', '6']);

function populateFilters({ books, themes }) {
  for (const [id, name] of Object.entries(books)) {
    if (!FRANK_BOOKS.has(id)) continue;
    const opt = document.createElement('option');
    opt.value = id;
    opt.textContent = name;
    bookFilter.appendChild(opt);
  }
  const crossOpt = document.createElement('option');
  crossOpt.value = '0';
  crossOpt.textContent = 'Cross-book';
  bookFilter.appendChild(crossOpt);

  for (const theme of themes) {
    const opt = document.createElement('option');
    opt.value = theme;
    opt.textContent = theme.replace(/-/g, ' ');
    themeFilter.appendChild(opt);
  }
}

nextBtn.addEventListener('click', nextQuote);
bookFilter.addEventListener('change', nextQuote);
themeFilter.addEventListener('change', nextQuote);

(async () => {
  const meta = await fetchMeta();
  populateFilters(meta);
  await nextQuote();
})();
