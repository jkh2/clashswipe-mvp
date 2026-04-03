# ClashSwipe MVP

**Swipe. Match. Fight. Fans vote with their wallets.**

Tinder-style matchmaking for fighters + fan-powered PPV bouts. Fighters swipe on opponents. Fans swipe on matches they'd pay to watch. When enough votes hit, the fight gets green-lit and streamed on the app.

Built live in <5 minutes by Grok + Claude Sentinel as a fully functional demo.

## Live Demo
[→ Open the live app](https://clashswipe-mvp.vercel.app) *(live on Vercel)*

## Core Features (MVP)
- **Fighter Mode**
  - Quick profile builder (name, weight, height, age, record, style)
  - Real Tinder-style swipe cards with Framer Motion drag physics
  - ✓ / ✕ buttons + mobile-optimized
  - Public Fight Ledger (persistent via Zustand + localStorage)

- **Fan Mode**
  - Browse mutual "yes" matches
  - Swipe "I'd Pay" / Pass
  - Live estimated purse counter

- **Tech Stack**
  - Next.js 16 (App Router) + TypeScript
  - Tailwind CSS v4 + shadcn/ui
  - Framer Motion (butter-smooth swipes)
  - Zustand + persist (localStorage)
  - Sonner for toasts

## How to Run Locally
```bash
git clone https://github.com/jkh2/clashswipe-mvp.git
cd clashswipe-mvp
npm install
npm run dev
```
Open http://localhost:3000

## Roadmap (what we ship next)

- Supabase backend (real auth, shared matches, live voting across users)
- Fighter verification + highlight reel upload
- Real PPV paywall + mock live stream
- Public Fight Ledger page
- Mobile PWA install prompt

Built as the foundation for the full ClashSwipe platform.
Ready to show to gyms, fighters, and investors in Colorado today.

Made with 🔥 by James + Grok + Claude Sentinel
