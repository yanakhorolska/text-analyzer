# Text Analyzer

A simple web application built with Angular for text analysis and synonym suggestions.

## Features

- Enter and edit text in a textarea.
- Select a word or phrase to search for synonyms using the Datamuse API.
- Replace selected text by clicking a suggested synonym.
- Real-time character and word counting.
- Copy text to the clipboard and clear the editor.
- Responsive user interface.

## Tech Stack

Angular, TypeScript, Signals, RxJS, HttpClient, CSS, Datamuse API.

## Getting Started

```bash
npm install
ng serve
```

Open `http://localhost:4200/` in your browser.

## Note

Synonym availability depends on the Datamuse API. Some phrases may not return results. Browser-based requests may also be affected by CORS restrictions.
