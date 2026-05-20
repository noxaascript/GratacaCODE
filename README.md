GratacaAI is a black & white coding-focused AI website built with Next.js + Tailwind, using OpenRouter for model access.

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Add environment variables

Create a file named `.env.local` in the project root:

```bash
OPENROUTER_API_KEY=your_key_here
OPENROUTER_SITE_URL=http://localhost:3000
OPENROUTER_SITE_NAME=GratacaAI
```

### 3) Run the dev server

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/` — Home / landing
- `/chat` — Coding chat UI (model picker + markdown + code copy)
- `/models` — Model directory (edit list in `lib/models.ts`)

## API

- `POST /api/chat` — Calls OpenRouter `chat/completions`

## Model list

Edit `lib/models.ts` to add/remove models or change the default model.

## Build

```bash
npm run build
npm start
```

## Notes

- If you see an error about missing `OPENROUTER_API_KEY`, double-check `.env.local` and restart `npm run dev`.
