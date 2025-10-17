## Crypto Stream - Technical Implementation Comments

###  What This Is
This project is a real-time app that grabs live cryptocurrency prices from TradingView and streams them directly to your browser. I built it to be fast, efficient, and able to handle many users at once.

---
### How It Works, from Start to Finish

It all kicks off with a single command (`run.sh`) that installs everything needed and starts both the frontend and backend servers at the same time.

#### **1. The Backend (The Engine Room)**
The backend is an Express server that uses ConnectRPC to talk to the frontend. Its main job is to manage who's watching which crypto ticker, cache the latest price per symbol, and fetch data when needed.

* **Cache‑First Subscriptions:** On subscribe, the server first checks an in‑memory cache (`lastPriceBySymbol`).
  * If a cached price exists, it is yielded immediately to the client and scraping is not started.
  * If no cached price exists, the scraper is started for that symbol to warm the cache and stream live updates.
* **Single Scraper per Symbol:** One scraper instance updates the cache for that symbol; all connected clients receive updates from the same source.
* **Live Streaming:** Subscribed clients receive real‑time server→client updates as soon as prices change (push; no polling).
* **Immediate Teardown on Last Client:** When the last client for a symbol disconnects, the scraper tab/context is closed immediately and the cached value for that symbol is cleared. A future subscribe will reopen a fresh tab and repopulate the cache.

#### **2. The Scraper (The Data Detective)**
To get the price, the backend fires up a Playwright browser instance that visits TradingView.

* **One Browser to Rule Them All:** Instead of opening a new browser for every request, the app uses a single, shared Chromium browser for everything. This is way more efficient.
* **Headed Mode:** The browser runs in visible (headed) mode (`headless: false`) so behavior is observable during scraping.
* **Finding the Price, Fast (and Safe):** It first reads from high‑confidence CSS selectors. Only if those fail does it fall back to a DOM scan. The initial “immediate” emission uses only selector‑based reads to avoid showing random fallback values.
* **No Spamming:** It's smart enough to only send you an update when the price *actually changes*, which keeps network traffic low.
* **Built to Be Tough:** If a page crashes or a network error occurs, it knows how to retry without giving up.

#### **3. The Frontend (The Pretty Face)**
The frontend is a clean and modern React app where you can add and remove tickers.



* **Smooth & Real-Time:** Thanks to a custom hook (`useTickerStream`), the app seamlessly handles the live data stream from the backend. You'll see loading spinners while it connects, and then prices will update in real-time.
* **User-Friendly:** You can easily add new tickers from a form, and they show up on a responsive grid that looks good on both desktop and mobile. Removing a ticker is just one click away.
* **Alphabetical List:** Tickers are displayed in alphabetical order for easy scanning.

---
### The Data's Journey
It follows a simple, logical path:

1.  You type a ticker symbol (e.g., "ETHUSD") into the form and hit "Add."
2.  The frontend tells the backend, "Hey, this user wants to see ETH-USD."
3.  The backend checks its cache:
    * If **cached**, it sends you the last price immediately and keeps using it until a newer update arrives.
    * If **not cached**, it starts a scraper tab for that symbol to fetch the live price and warm the cache.
4.  The scraper finds the price and updates the backend cache.
5.  The backend broadcasts each new cached value to all subscribers of that symbol.
6.  When the last subscriber leaves, the scraper tab is closed and the cache entry is cleared.

---
###  Key Features

* **Scalability:** The system is built to handle lots of users without slowing down because it shares resources so efficiently. Memory usage grows with the number of *unique tickers*, not the number of users.
* **Low Latency:** Using a push-based streaming model means you get price updates the moment they're available. No polling, no delays.
* **Robustness:** The app is designed to handle errors gracefully. If something goes wrong with one scraper, it won't take down the whole system.
* **Production-Ready:** It includes health check endpoints and handles graceful shutdowns.