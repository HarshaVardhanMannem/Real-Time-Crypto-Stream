// Backend Configuration Constants
export const CONFIG = {
    // Server Configuration
    DEFAULT_PORT: parseInt(process.env.PORT || '4000'),
    DEFAULT_HOST: process.env.HOST || 'localhost',
    
    // WebSocket Configuration
    RECONNECT_DELAY: parseInt(process.env.RECONNECT_DELAY || '3000'), // ms
    HEARTBEAT_INTERVAL: parseInt(process.env.HEARTBEAT_INTERVAL || '30000'), // ms
    
    // Playwright Configuration
    POLL_INTERVAL: parseInt(process.env.POLL_INTERVAL || '1000'), // ms
    PAGE_LOAD_TIMEOUT: parseInt(process.env.PAGE_LOAD_TIMEOUT || '30000'), // ms
    PAGE_SETTLE_DELAY: parseInt(process.env.PAGE_SETTLE_DELAY || '500'), // ms
    
    // TradingView Configuration
    DEFAULT_EXCHANGE: process.env.DEFAULT_EXCHANGE || 'BINANCE',
    TRADINGVIEW_BASE_URL: process.env.TRADINGVIEW_BASE_URL || 'https://www.tradingview.com/symbols',
    
    // Price Configuration
    MIN_PRICE_RANGE: parseFloat(process.env.MIN_PRICE_RANGE || '0.01'),
    MAX_PRICE_RANGE: parseFloat(process.env.MAX_PRICE_RANGE || '1000000'),
    
    // Browser Configuration
    VIEWPORT: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1200'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '900')
    },
    
    // CORS Configuration
    CORS_ORIGIN: process.env.FRONTEND_URL || 'http://localhost:3000'
  } as const;
  
  export const PRICE_SELECTORS = [
    // Current TradingView selectors (2024)
    '.tv-symbol-price-quote__value',
    '.tv-symbol-price-quote__value.js-symbol-last',
    '.tv-symbol-price-quote__value.js-symbol-last.js-shrink',
    '.tv-symbol-price-quote__value--no-animation',
    '[data-symbol="last-price"]',
    '[data-testid="price"]',
    '.js-symbol-last',
    // Additional selectors for different layouts
    '.tv-widget-copyright + div div[class*="price"]',
    'div[class*="price"][class*="value"]',
    'span[class*="price"][class*="last"]',
    // Generic price patterns
    '[class*="last"][class*="price"]',
    '[class*="price"][class*="quote"]'
  ] as const;
  
  export const BROWSER_ARGS = [
    '--start-maximized',
    '--disable-blink-features=AutomationControlled',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor'
  ] as const;
  