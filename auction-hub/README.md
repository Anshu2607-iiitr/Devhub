# 🏏 AuctionHub — Live Real-Time Sports Player Auction Platform

**AuctionHub** is a production-quality, high-energy live sports player auction arena inspired by professional leagues like the IPL, Premier League, and esports tournaments.

The platform empowers tournament organizers to conduct real-time live bidding wars, manage franchise purses with rupee precision, and analyze squad dynamics down to position quotas.

---

## ⚡ Key Highlights & Features

### 1. 🏟️ Live Auction Arena (`/live/:auctionId`)
- **Centerpiece Player Spotlight**: High-res athlete portrait, role badges, base prices, career statistics (matches, runs, wickets, avg, strike rate, economy, playing style).
- **Giant Current Bid Board**: Real-time highest bid with dynamic minimum increments (₹5k, ₹10k, ₹25k, ₹50k, ₹1L+), leading franchise badge, and pulsing glow animations.
- **Dramatic Digital Auction Clock**: Large countdown timer with sound-assisted urgency shifts (<10s heartbeat ticking, <5s final call flash).
- **Live Bid Stream**: Real-time event ticker with franchise logos, timestamps, and increment tags.
- **Interactive Team Bidding Panel**: Quick-jump bids, custom amounts, remaining purse validations, and squad capacity guards (15/15).
- **Audio Synthesizer (Web Audio API)**: Zero-dependency sound effects for Gavel strikes, electronic bid chimes, countdown ticks, and victory fanfares.
- **SOLD Celebration Experience**: Fullscreen confetti explosion, hammer stamp, and winner franchise highlight.

### 2. 🛡️ Auctioneer Command Room (`/admin/auction`)
- Full live console for the admin/auctioneer.
- **Verdict Controls**: Strike the gavel for `[ HAMMER SOLD ]` (with confirmation modal) or `[ MARK UNSOLD ]`.
- **Timer & Flow Controls**: Pause/Resume, Reset Timer (25s), Skip Player.
- **Dynamic Queue Reordering**: Drag, promote, or immediately call upcoming players to the auction block.
- **Real-Time Franchise Matrix**: Live view of purse utilization and open squad slots.

### 3. 👥 Multi-Role Perspectives & 1-Click Switcher
- **Admin / Auctioneer**: Complete auction authority and event administration.
- **Team Manager**: Live bidding cockpit, budget manager, and squad builder for any of the 6 franchises (Royal Warriors, Titans United, Super Kings, Knights Brigade, Red Strikers, Apex Predators).
- **Viewer / Spectator**: Clean broadcast view with stats, leaderboards, and audio stream.
- **Demo Role Switcher**: Instant switcher in the top bar to test different perspectives without tedious re-logins.

### 4. 📊 Comprehensive Suite of Portals
- **Landing Page (`/`)**: Hero section with interactive live auction preview, live stats counter, and tournament use cases.
- **Admin Analytics Dashboard (`/admin/dashboard`)**: Purse utilization charts, auction progress bar, and recent sales ledger.
- **Searchable Player Catalog (`/players`, `/players/:id`)**: Filter by role, status (Live/Upcoming/Sold/Unsold), search by style/state, and radar skill ratings.
- **Franchise Hub (`/teams`, `/teams/:id`)**: Team profiles, purse progress bars, and squad composition by position quotas.
- **Team Manager Hub (`/team/dashboard`, `/team/squad`, `/team/bids`, `/team/budget`)**: Command center for franchise owners.
- **Tournament Creator (`/admin/create-auction`)**: 4-step wizard for tournament setup, team purse allocation, and bidding brackets.
- **Auction Results & Ledger (`/results`)**: Official recap, top 3 marquee buys, and complete player sales table.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **Sound Engine**: Web Audio API Synthesizer (zero external audio file dependencies)
- **State Management**: React Context (`AuctionContext`, `AuthContext`, `SoundContext`)

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🔌 Future Backend Integration (Spring Boot + WebSocket)

The frontend data structures and context dispatchers are mapped directly to REST and STOMP WebSocket contracts:

### REST Endpoints
- `POST /api/auth/login` & `POST /api/auth/signup`
- `GET /api/auctions` & `GET /api/auctions/:id`
- `POST /api/auctions/:id/start`, `POST /api/auctions/:id/pause`
- `POST /api/auctions/:id/bid`
- `POST /api/auctions/:id/sell` & `POST /api/auctions/:id/unsold`
- `GET /api/players` & `POST /api/players`
- `GET /api/teams` & `POST /api/teams`

### Real-Time WebSocket Events
- `BID_PLACED`
- `TIMER_UPDATED`
- `PLAYER_SOLD`
- `PLAYER_UNSOLD`
- `PLAYER_SELECTED`
- `AUCTION_COMPLETED`
