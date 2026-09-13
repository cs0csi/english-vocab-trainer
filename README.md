# English Vocab Trainer

A simple, no-typing English vocabulary trainer built for a ~10-year-old preparing for school vocabulary quizzes.

No typing, no audio, no gamey mechanics — just tapping, real English words, and a spaced-repetition-style review that focuses on whatever word is still shaky.

## How it works

1. **Learn** — the word and its translation are shown together.
2. **Recognize** — the word disappears; pick it out from a few real English words (or, in reverse rounds, pick the correct translation).
3. **Spell** — one or two letters are missing from the word; pick the correct letter(s) from a small set of easily-confused options (no typing, ever).

Words the learner gets wrong come back more often; words they know well are asked less often.

There's also a separate **Exam mode**: no hints, no color feedback, just a final score and a list of the words that are still uncertain — which automatically get prioritized in the next practice session.

## Files

- `index.html` — the app itself (React + Tailwind, loaded from a CDN — no build step, no install)
- `words.js` — the default word list, loaded automatically the first time the app runs on a device, as long as nothing has been saved yet
- `manifest.json`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `favicon.ico`, `favicon-32.png` — the app icon (a little green monkey) and metadata used when the app is added to a phone's home screen or shown in a browser tab

## Editing the word list

Either:
- edit `words.js` before uploading, or
- open the app, tap the small "szólista" link on the home screen, and paste in a new list at any time.

Each line should be `english word – hungarian translation`, for example:

```
suitcase – bőrönd
```

## Hosting

This is a static site with no build step. To host it on GitHub Pages:

1. Push `index.html`, `words.js`, `manifest.json`, and all the `icon-*` / `apple-touch-icon.png` / `favicon*` files to this repository.
2. Go to **Settings → Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then save.
4. The app will be live at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- Progress (which words are mastered vs. still shaky) is saved in the browser's local storage, per device — it does not sync across devices.
- There's a light/dark mode toggle, and the layout is tuned for mobile Safari (iOS).
