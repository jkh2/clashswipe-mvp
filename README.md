# ClashSwipe MVP

**Swipe. Match. Fight. Fans vote with their wallets.**

Tinder-style matchmaking for fighters + fan-powered PPV bouts. Fighters swipe on opponents. Fans swipe on matches they'd pay to watch. When enough fan votes hit, the fight gets green-lit.

Built live by Grok + Claude Sentinel as a fully functional demo.

## Live Demo
[→ Open the live app](https://clashswipe-mvp.vercel.app) *(live on Vercel)*

## Core Features (MVP)

- **Fighter Mode**
  - Quick profile builder (name, weight, height, age, record, style)
  - Tinder-style swipe cards with Framer Motion drag physics
  - ✓ / ✕ buttons + mobile-optimized
  - Fighter profiles saved to Supabase DB

- **Fan Mode**
  - Browse fighter matchups in real time
  - Vote "I'd Pay" on fights you want to watch
  - Live fan vote counter updates instantly across all devices (Supabase Realtime)
  - Estimated purse counter per matchup

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion (swipe physics) |
| State | Zustand |
| Backend | Supabase (Postgres + Realtime) |
| Hosting | Vercel |

## Database Schema

```sql
fighters      -- fighter profiles
swipes        -- per-user yes/no swipe records
votes         -- fan vote counts, realtime-enabled
```

## How to Run Locally

```bash
git clone https://github.com/jkh2/clashswipe-mvp.git
cd clashswipe-mvp
npm install
npm run dev
```

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Open http://localhost:3000

## Roadmap

- [ ] Auth — fighter accounts, fan accounts
- [ ] Fighter verification + highlight reel upload
- [ ] Mutual match logic (both fighters swiped yes)
- [ ] PPV paywall + mock live stream
- [ ] Public Fight Ledger page
- [ ] Mobile PWA install prompt

## Status

Production MVP — live backend, real-time voting, fighter profiles persisted to DB.
Ready to demo to gyms, fighters, and investors in Colorado today.

---

Made with 🔥 by James + Grok + Claude Sentinel
