# Comserv

`Comserv` now includes a runnable Vite + React app for a seasonal neighborhood services website branded as "Zach's Easy Side Jobs."

## What it is

The project is a multi-section one-page experience for a small local service business. The component includes:

- A home page with seasonal featured cards
- A services page with seasonal dropdowns and pricing
- A "How It Works" section
- A policy gate before booking
- SMS and phone booking links
- QR codes for booking by text
- Feedback and safety sections

## Current repository contents

This repository currently includes:

- [README.md](C:/Users/Zach28/Github/Comserv/README.md)
- [sihu](C:/Users/Zach28/Github/Comserv/sihu) - the synced source copy
- [src/SeasonalSideHustleWebsite.jsx](C:/Users/Zach28/Github/Comserv/src/SeasonalSideHustleWebsite.jsx) - the main React component
- [package.json](C:/Users/Zach28/Github/Comserv/package.json) - app dependencies and scripts
- [vite.config.js](C:/Users/Zach28/Github/Comserv/vite.config.js) - Vite configuration

## Tech assumptions

The app uses:

- `react`
- `framer-motion`
- `qrcode.react`
- `lucide-react`

The styling also assumes Tailwind CSS utility classes are available.

## How to use it

1. Install dependencies with `npm install`.
2. Start the preview with `npm run dev`.
3. Build production assets with `npm run build`.

The main component lives in `src/SeasonalSideHustleWebsite.jsx`.

Example:

```jsx
import SeasonalSideHustleWebsite from "./SeasonalSideHustleWebsite"

export default function App() {
  return <SeasonalSideHustleWebsite />
}
```

## Notes

- Some text encoding issues still exist in emoji and punctuation from the original source.
- Booking is wired around Zach's phone number and South Florida service area.
- The component includes an exported `__testCases` array, but no automated test runner is included in this repo.

## Next steps

Recommended cleanup for this repository:

1. Remove or archive `sihu` if you only want the app source under `src/`.
2. Fix the remaining encoding issues in displayed text.
3. Add real scheduling persistence if you want the 2-per-day rule enforced by data instead of UI text.
4. Add automated tests for navigation and scheduling flow.
