# Vantix — Crypto Exchange Dashboard

A modern, light-themed cryptocurrency exchange dashboard UI built with **React**, **Vite**, and **Tailwind CSS**. Vantix reproduces the core screens of a professional trading platform — live market table, price chart, order book, a buy/sell trading panel, portfolio overview, and a transaction history — entirely with mock/static data (no backend or live API calls).

![Vantix dashboard — desktop view](./screenshots/Screenshot%20Dashboard.png)

## Description

Vantix is a frontend-only crypto exchange dashboard designed to feel like a real trading product: a fluid, near-full-width layout, a warm teal-and-amber brand identity on a light background, consistent green/red conventions for gains and losses, and interactive trading controls that respond to user input on the client. It's built for demos, portfolios, and as a starting point for a real exchange frontend.



## Features

- Responsive cryptocurrency exchange dashboard
- Dashboard overview with portfolio statistics
- Cryptocurrency market overview
- Bitcoin, Ethereum, Solana, BNB, XRP, Cardano, Dogecoin, and Polkadot data
- Cryptocurrency search and filtering
- Market price and 24-hour change indicators
- Top market movers
- Interactive cryptocurrency selection
- Buy / Sell trading interface
- Market, Limit, and Stop-Limit order types
- Amount and price input handling
- Percentage-based order amount selection
- Automatic order total calculation
- Mock Buy/Sell order confirmation
- Portfolio balance and profit/loss overview
- Cryptocurrency holdings and asset allocation
- Interactive price chart
- 1H, 1D, 1W, and 1M chart periods
- Order book with buy and sell orders
- Current market price indicator
- Recent transaction history
- Transaction search
- Buy/Sell transaction filtering
- Completed, Pending, and Failed status filtering
- Responsive mobile navigation
- Reusable React components
- Hover and active states
- Smooth UI transitions
- Mobile, tablet, laptop, and desktop responsive layouts

## Technologies Used

- React.js
- Vite
- JavaScript ES6+
- Tailwind CSS
- React Router
- React Icons / Lucide Icons
- Recharts
- Git
- GitHub
- Netlify / Vercel

## Project Structure

```text
src/
├── components/
│   ├── MarketOverview.jsx
│   ├── TradingPanel.jsx
│   ├── PriceChart.jsx
│   ├── OrderBook.jsx
│   ├── RecentTransactions.jsx
│   ├── Portfolio.jsx
│   └── ...
│
├── data/
│   └── mockData.js
│
├── pages/
│   ├── Dashboard.jsx
│   ├── Markets.jsx
│   ├── Trade.jsx
│   ├── Portfolio.jsx
│   └── ...
│
├── utils/
│   └── format.js
│
├── App.jsx
├── main.jsx
└── index.css



## Installation

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/vantix-exchange.git
cd vantix-exchange

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app runs at `http://localhost:5173` by default.

### Build for production

```bash
npm run build   # outputs to /dist
npm run preview # preview the production build locally
```



## Screenshots

| Desktop | Mobile |
| --- | --- |
| ![Desktop](./screenshots/Screenshot%20DesktopView.png) | ![Mobile](./screenshots/Screenshot%20MobileView.png) |



## Notes

All prices, order-book depth, transactions, and portfolio figures are static mock data for demonstration only — this project does not connect to any real exchange, wallet, or market-data API, and nothing here is financial advice.
