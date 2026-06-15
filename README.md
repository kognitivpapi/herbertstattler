# Herbert Stattler — Portfolio

Landing page recreated after [Rabobank Art Collection](https://art.rabobank.nl/en/) — fullscreen 3D artwork carousel on black, with positioned navigation links and collection overlay.

## Stack

React · Vite · TypeScript · React Three Fiber · Framer Motion · Tailwind CSS v4

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build
npm run preview   # http://localhost:4173
```

## Structure

| File | Role |
|------|------|
| `src/pages/HomePage.tsx` | Fullscreen home shell |
| `src/components/HomeCarousel.tsx` | 3D ring carousel (auto-rotate, orthographic camera) |
| `src/components/HomeGrid.tsx` | Rabobank-style link grid overlay |
| `src/components/StickyMenu.tsx` | Top-right nav pill |
| `src/components/CollectionOverlay.tsx` | Collection view (Discover) |
| `src/data/portfolio.ts` | Portfolio content |
