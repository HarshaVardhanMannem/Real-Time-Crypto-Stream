import React from 'react';
import AddTickerForm from '../components/AddTickerForm';
import TickerList from '../components/TickerList';
import ThemeToggle from '../components/ThemeToggle';
import { useTickerStream } from '../hooks/useTickerStream';
import { CONFIG } from '../config/constants';

export default function Home() {
  const { prices, errors, subscribe, unsubscribe } = useTickerStream(CONFIG.DEFAULT_API_URL);

  return (
    <main style={styles.container}>
      {/* Animated background elements */}
      <div style={styles.backgroundElements}>
        <div style={styles.backgroundCircle1}></div>
        <div style={styles.backgroundCircle2}></div>
        <div style={styles.backgroundCircle3}></div>
      </div>

      <div style={styles.header}>
        <div style={styles.themeToggleContainer}>
          <ThemeToggle />
        </div>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>₿</div>
          <h1 style={styles.title}>Crypto Stream</h1>
        </div>
        <h2 style={styles.subtitle}>Real-Time Crypto Price Stream</h2>
        <p style={styles.description}>
          Add cryptocurrency tickers to stream live prices directly from TradingView
        </p>
        <div style={styles.statsContainer} className="mobile-stats">
          <div style={styles.statItem}>
            <div style={styles.statNumber}>{Object.keys(prices).length}</div>
            <div style={styles.statLabel}>Active Tickers</div>
          </div>
          <div style={styles.statItem}>
            <div style={styles.statNumber}>Live</div>
            <div style={styles.statLabel}>Real-Time Data</div>
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <AddTickerForm onAdd={(sym) => subscribe(sym)} />
        <TickerList prices={prices} onUnsubscribe={(sym) => unsubscribe(sym)} />
      </div>
    </main>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'var(--bg-primary)',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    transition: 'all 0.3s ease',
  },
  backgroundElements: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none' as const,
    zIndex: 0,
  },
  backgroundCircle1: {
    position: 'absolute' as const,
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    top: '-150px',
    right: '-150px',
    animation: 'float 6s ease-in-out infinite',
  },
  backgroundCircle2: {
    position: 'absolute' as const,
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    bottom: '-100px',
    left: '-100px',
    animation: 'float 8s ease-in-out infinite reverse',
  },
  backgroundCircle3: {
    position: 'absolute' as const,
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    top: '50%',
    left: '10%',
    animation: 'float 10s ease-in-out infinite',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '50px',
    color: 'white',
    position: 'relative' as const,
    zIndex: 1,
  },
  themeToggleContainer: {
    position: 'absolute' as const,
    top: '20px',
    right: '20px',
    zIndex: 2,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  logoIcon: {
    fontSize: '3rem',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '700',
    margin: 0,
    background: 'linear-gradient(45deg, #ffffff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
  subtitle: {
    fontSize: '1.4rem',
    fontWeight: '300',
    margin: '0 0 25px 0',
    color: 'rgba(255, 255, 255, 0.9)',
    letterSpacing: '0.5px',
  },
  description: {
    fontSize: '1.1rem',
    maxWidth: '700px',
    margin: '0 auto 40px auto',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.7,
    fontWeight: '300',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    marginTop: '30px',
  },
  statItem: {
    textAlign: 'center' as const,
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '20px 30px',
    borderRadius: '15px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: 'white',
    marginBottom: '5px',
  },
  statLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '300',
  },
  content: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative' as const,
    zIndex: 1,
  },
};
