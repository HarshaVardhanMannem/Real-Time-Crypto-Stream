import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { ThemeProvider } from '../contexts/ThemeContext'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Add global styles for animations
    const style = document.createElement('style')
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      
      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      
      * {
        box-sizing: border-box;
      }
      
      :root {
        /* Light theme colors */
        --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        --bg-secondary: rgba(255, 255, 255, 0.95);
        --bg-card: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        --text-primary: #333;
        --text-secondary: #666;
        --text-inverse: white;
        --border-color: rgba(255, 255, 255, 0.3);
        --shadow-color: rgba(0, 0, 0, 0.1);
        --accent-primary: #667eea;
        --accent-secondary: #764ba2;
      }
      
      [data-theme="dark"] {
        /* Dark theme colors */
        --bg-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        --bg-secondary: rgba(30, 30, 46, 0.95);
        --bg-card: linear-gradient(135deg, #2d2d44 0%, #1e1e2e 100%);
        --text-primary: #e2e8f0;
        --text-secondary: #94a3b8;
        --text-inverse: #1a202c;
        --border-color: rgba(255, 255, 255, 0.1);
        --shadow-color: rgba(0, 0, 0, 0.3);
        --accent-primary: #8b5cf6;
        --accent-secondary: #a855f7;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        min-height: 100vh;
        overflow-x: hidden;
        background: var(--bg-primary);
        color: var(--text-primary);
        transition: background 0.3s ease, color 0.3s ease;
      }
      
      input:focus {
        border-color: #667eea !important;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
        transform: translateY(-1px);
        transition: all 0.3s ease;
      }
      
      button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
        transition: all 0.3s ease;
      }
      
      button:active {
        transform: translateY(0);
      }
      
      .card-animation {
        animation: slideInUp 0.6s ease-out;
      }
      
      .price-update {
        animation: pulse 0.3s ease-out;
      }
      
      .glass-effect {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
      
      .gradient-text {
        background: linear-gradient(45deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .card-animation {
          animation-duration: 0.4s;
        }
        
        /* Mobile-specific adjustments */
        .mobile-stack {
          flex-direction: column !important;
          gap: 15px !important;
        }
        
        .mobile-full-width {
          width: 100% !important;
          min-width: auto !important;
        }
        
        .mobile-center {
          text-align: center !important;
        }
        
        .mobile-padding {
          padding: 15px !important;
        }
        
        .mobile-grid {
          grid-template-columns: 1fr !important;
          gap: 15px !important;
        }
        
        .mobile-stats {
          flex-direction: column !important;
          gap: 20px !important;
          align-items: center !important;
        }
      }
      
      @media (max-width: 480px) {
        .mobile-small-padding {
          padding: 10px !important;
        }
        
        .mobile-small-text {
          font-size: 0.9rem !important;
        }
        
        .mobile-small-title {
          font-size: 2rem !important;
        }
      }
      
      /* Touch-friendly interactions */
      @media (hover: none) and (pointer: coarse) {
        button:hover {
          transform: none !important;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3) !important;
        }
        
        button:active {
          transform: scale(0.98) !important;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}



