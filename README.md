# PredictMarket

A prediction market MVP where users create yes/no markets, buy shares, and see live odds.

## Tech Stack

- **Frontend/API**: Next.js 14 (App Router)
- **Database**: MariaDB
- **Deployment**: Dokploy via Nixpacks

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home - list markets
│   ├── layout.tsx        # Root layout
│   └── api/
│       ├── markets/      # CRUD markets
│       └── bets/         # Place bets
└── lib/
    └── db.ts             # Database connection
```

## Database Schema

**users**: id, username, balance (starts $1000), created_at

**markets**: id, question, creator_id, yes_shares, no_shares, resolved, outcome, created_at

**bets**: id, user_id, market_id, side (yes/no), shares, price, created_at

## Odds Calculation

Uses constant product AMM: `price_yes = no_shares / (yes_shares + no_shares)`

## Environment Variables

```
DATABASE_URL=mysql://user:pass@host:3306/predictmarket
```

## API Routes

```bash
# List all markets
curl http://localhost:3000/api/markets

# Create a market
curl -X POST http://localhost:3000/api/markets -H "Content-Type: application/json" -d '{"question":"Will BTC hit 100k?"}'

# Get market with odds
curl http://localhost:3000/api/markets/1

# Place a bet (buy 10 yes shares)
curl -X POST http://localhost:3000/api/bets -H "Content-Type: application/json" -d '{"marketId":1,"side":"yes","shares":10}'
```
