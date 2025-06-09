"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faSignInAlt, faComments, faUsers, faFileAlt, faUserCircle, faLock, faPalette, faCheckCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { faTwitter, faGithub, faDiscord, faLinkedin, faLinux, faWindows, faApple, faTrello, faBluesky, faInstagram, faReact, faTiktok, faNodeJs, faCloudflare} from "@fortawesome/free-brands-svg-icons";

// --- Floating Overlay Context ---
type OverlayContextType = {
  showHelp: boolean;
  setShowHelp: (v: boolean) => void;
  showQuick: boolean;
  setShowQuick: (v: boolean) => void;
};

const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("OverlayContext not found");
  return ctx;
}

function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [showHelp, setShowHelp] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  return (
    <OverlayContext.Provider value={{ showHelp, setShowHelp, showQuick, setShowQuick }}>
      {children}
    </OverlayContext.Provider>
  );
}

// --- Add CSS for Animations ---
// Add to globals.css (or use Tailwind classes if possible)
// For now, add inline style for fade/slide in/out

// --- FloatingHelpButton ---
function FloatingHelpButton() {
  const { showHelp, setShowHelp } = useOverlay();
  const helpRef = useRef<HTMLDivElement>(null);
  // Dismiss on Escape or outside click
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowHelp(false);
    }
    function onClick(e: MouseEvent) {
      if (showHelp && helpRef.current && !helpRef.current.contains(e.target as Node)) setShowHelp(false);
    }
    if (showHelp) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('mousedown', onClick);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClick);
    };
  }, [showHelp]);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 focus:scale-105 active:scale-95"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)', transition: 'box-shadow 0.3s, transform 0.2s' }}
        onClick={() => setShowHelp(true)}
        aria-label="Help"
      >
        Help
      </button>
      {showHelp && (
        <div className="z-[100] mt-2 animate-fadeInUp" style={{position:'relative'}}>
          <div ref={helpRef} className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-[340px] p-0 relative outline-none transition-all duration-300 animate-scaleIn" tabIndex={-1} style={{minHeight: 400}}>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none transition-colors duration-200"
              onClick={() => setShowHelp(false)}
              aria-label="Close Help"
              tabIndex={0}
            >×</button>
            <div className="rounded-t-xl bg-blue-600 text-white px-6 py-3 text-lg font-semibold">Support</div>
            <iframe
              src="https://support.chittersync.com/"
              title="ChitterSync Support"
              className="w-full h-[400px] border-0 rounded-b-xl"
              style={{minHeight: 400, background: 'white'}}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FloatingQuickActionsButton() {
  const { showQuick, setShowQuick } = useOverlay();
  const quickRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowQuick(false);
    }
    function onClick(e: MouseEvent) {
      if (showQuick && quickRef.current && !quickRef.current.contains(e.target as Node)) setShowQuick(false);
    }
    if (showQuick) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('mousedown', onClick);
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClick);
    };
  }, [showQuick]);
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-full shadow-lg transition-all duration-300 focus:scale-105 active:scale-95"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)', transition: 'box-shadow 0.3s, transform 0.2s' }}
        onClick={() => setShowQuick(true)}
        aria-label="Quick Actions"
      >
        Quick Actions
      </button>
      {showQuick && (
        <div className="z-[100] mt-2 animate-fadeInUp" style={{position:'relative'}}>
          <div ref={quickRef} className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-[320px] p-0 relative outline-none transition-all duration-300 animate-scaleIn" tabIndex={-1}>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none transition-colors duration-200"
              onClick={() => setShowQuick(false)}
              aria-label="Close Quick Actions"
              tabIndex={0}
            >×</button>
            <div className="rounded-t-xl bg-green-600 text-white px-6 py-3 text-lg font-semibold">Quick Actions</div>
            <ul className="p-6 space-y-3">
              <li><Link href="/social-feed" className="text-blue-700 hover:underline font-medium">Social Feed</Link></li>
              <li><Link href="/friends-management" className="text-blue-700 hover:underline font-medium">Friends Management</Link></li>
              <li><Link href="/chitterhaven-server-manager" className="text-blue-700 hover:underline font-medium">ChitterHaven Server Manager</Link></li>
              <li><Link href="/subscription-tiers" className="text-blue-700 hover:underline font-medium">Subscription Tiers</Link></li>
              <li><Link href="/redeem-system" className="text-blue-700 hover:underline font-medium">Redeem System</Link></li>
              <li><Link href="/gia-show-builder" className="text-blue-700 hover:underline font-medium">Gia Show Builder</Link></li>
              <li><Link href="/gia-label-manager" className="text-blue-700 hover:underline font-medium">Gia Label Manager</Link></li>
              <li><Link href="/gia-ad-control-panel" className="text-blue-700 hover:underline font-medium">Gia Ad Control Panel</Link></li>
              <li><Link href="/velosync-file-explorer" className="text-blue-700 hover:underline font-medium">Velosync File Explorer</Link></li>
              <li><Link href="/velosync-cloud-sync" className="text-blue-700 hover:underline font-medium">Velosync Cloud Sync</Link></li>
              <li><Link href="/bot-creator" className="text-blue-700 hover:underline font-medium">Bot Creator</Link></li>
              <li><Link href="/bot-storage" className="text-blue-700 hover:underline font-medium">Bot Storage</Link></li>
              <li><Link href="/api-key-manager" className="text-blue-700 hover:underline font-medium">API Key Manager</Link></li>
              <li><Link href="/webhook-tester" className="text-blue-700 hover:underline font-medium">Webhook Tester</Link></li>
              <li><Link href="/privacy-settings" className="text-blue-700 hover:underline font-medium">Privacy Settings</Link></li>
              <li><Link href="/jade-ai-phishing-detection" className="text-blue-700 hover:underline font-medium">Jade AI Phishing Detection</Link></li>
              <li><Link href="/migration-wizard" className="text-blue-700 hover:underline font-medium">Migration Wizard</Link></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

  // Move OverlayProvider to _app.tsx or layout.tsx for true global context, but for now, wrap all Home content in OverlayProvider
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [animatedText, setAnimatedText] = useState('');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [theme, setTheme] = useState('default');
  const [pendingTheme, setPendingTheme] = useState(theme);
  const [customDuration, setCustomDuration] = useState(15);
  const [customColor1, setCustomColor1] = useState('#0d1915');
  const [customColor2, setCustomColor2] = useState('#7fffd4');
  const [showCustomization, setShowCustomization] = useState(false);
  const phrases = useRef([
    'Collaborate seamlessly.',
    'Stay connected.',
    'Experience the future of communication.',
  ]);
  const phraseIndex = useRef(0);
  const tabCount = useRef(0);

  // Animated text effect
  useEffect(() => {
    setAnimatedText(phrases.current[0]);
    const interval = setInterval(() => {
      phraseIndex.current = (phraseIndex.current + 1) % phrases.current.length;
      setAnimatedText(phrases.current[phraseIndex.current]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Hide loader after mount
  useEffect(() => {
    setLoading(false);
  }, []);

  // Navbar scroll effect
  useEffect(() => {
    const nav = document.getElementById("sticky-navbar");
    const header = document.getElementById("main-header");
    function onScroll() {
      if (!nav || !header) return;
      const headerBottom = header.offsetTop + header.offsetHeight;
      if (window.scrollY > headerBottom) {
        nav.classList.add("visible");
      } else {
        nav.classList.remove("visible");
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dynamically update text color based on background only for animated themes
  useEffect(() => {
    let animationFrame: number | undefined;
    function updateTextColor() {
      const bg = getComputedStyle(document.body).backgroundColor;
      const rgb = bg.match(/\d+/g)?.map(Number) || [0,0,0];
      const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      const color = luminance > 0.5 ? '#000' : '#fff';
      document.body.style.color = color;
      document.querySelectorAll('.dynamic-text').forEach(el => {
        (el as HTMLElement).style.color = color;
      });
      animationFrame = requestAnimationFrame(updateTextColor);
    }
    if (theme === 'default' || theme === 'custom') {
      updateTextColor();
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    } else {
      // For static themes, set color directly
      if (theme === 'dark') {
        document.body.style.color = 'var(--text-color-dark)';
      } else if (theme === 'light') {
        document.body.style.color = 'var(--text-color-light)';
      } else if (theme === 'rainbow') {
        document.body.style.color = 'white';
      }
    }
    return () => {};
  }, [theme]);

  // Theme menu logic (Tab to open, rainbow, custom, etc.)
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Tab') {
        event.preventDefault();
        tabCount.current++;
        setShowThemeMenu(true);
        setPendingTheme(theme);
        if (tabCount.current === 2 && pendingTheme !== 'rainbow') {
          setPendingTheme('rainbow');
        }
        if (tabCount.current === 3 && pendingTheme === 'default') {
          setShowCustomization(true);
        }
      }
    }
    function onClick(event: MouseEvent) {
      const menu = document.getElementById('theme-menu');
      if (menu && !menu.contains(event.target as Node)) {
        setShowThemeMenu(false);
        setShowCustomization(false);
        tabCount.current = 0;
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [theme, pendingTheme]);

  // Apply theme when user clicks Apply
  function handleApplyTheme() {
    setTheme(pendingTheme);
    setShowThemeMenu(false);
    setShowCustomization(false);
    tabCount.current = 0;
  }

  // Show customization for custom theme
  useEffect(() => {
    if (pendingTheme === 'custom') {
      setShowCustomization(true);
    } else {
      setShowCustomization(false);
    }
  }, [pendingTheme]);

  // Apply theme
  useEffect(() => {
    if (theme === 'default') {
      document.body.style.animation = 'backgroundColorTransition 1800s ease infinite';
      document.body.style.backgroundColor = '';
    } else if (theme === 'dark') {
      document.body.style.animation = 'none';
      document.body.style.backgroundColor = 'rgb(13, 25, 21)';
      document.body.style.color = 'var(--text-color-dark)';
    } else if (theme === 'light') {
      document.body.style.animation = 'none';
      document.body.style.backgroundColor = 'aquamarine';
      document.body.style.color = 'var(--text-color-light)';
    } else if (theme === 'rainbow') {
      document.body.style.animation = 'rainbowBackground 7s linear infinite';
      document.body.style.color = 'white';
    } else if (theme === 'custom') {
      // Add custom keyframes
      const styleId = 'custom-bg-keyframes';
      let styleTag = document.getElementById(styleId) as HTMLStyleElement | null;
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = styleId;
        document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `@keyframes customBackgroundTransition { 0% { background-color: ${customColor1}; } 50% { background-color: ${customColor2}; } 100% { background-color: ${customColor1}; } }`;
      document.body.style.animation = `customBackgroundTransition ${customDuration}s ease infinite`;
    }
  }, [theme, customDuration, customColor1, customColor2]);

  // Fade-out effect for navigation
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.classList.contains('page-link')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        document.body.classList.add('fade-out');
        setTimeout(() => {
          if (href) window.location.href = href;
        }, 500);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // Accessibility: close on Escape
  const { showHelp, setShowHelp, showQuick, setShowQuick } = useOverlay();
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setShowHelp(false);
        setShowQuick(false);
      }
    }
    if (showHelp || showQuick) {
      document.addEventListener('keydown', onKeyDown);
      return () => document.removeEventListener('keydown', onKeyDown);
    }
  }, [showHelp, showQuick]);

  // Dismiss bubble on outside click
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const help = document.getElementById('help-bubble');
      const quick = document.getElementById('quick-actions-bubble');
      if (showHelp && help && !help.contains(e.target as Node)) setShowHelp(false);
      if (showQuick && quick && !quick.contains(e.target as Node)) setShowQuick(false);
    }
    if (showHelp || showQuick) {
      setTimeout(() => document.addEventListener('mousedown', onClick), 0);
      return () => document.removeEventListener('mousedown', onClick);
    }
  }, [showHelp, showQuick]);

  return (
    <OverlayProvider>
      {/* Loader Overlay */}
      {loading && (
        <div className="loader">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
        </div>
      )}

      {/* Navbar */}
      <nav className="chitter-nav glass-navbar hidden" id="sticky-navbar">
        <a href="/" className="logo">
          <FontAwesomeIcon icon={faComments} style={{marginRight: 8}} />
          ChitterSync
        </a>
        <div className="nav-links">
          <a href="#features"><FontAwesomeIcon icon={faPalette} style={{marginRight: 6}} />Features</a>
          <a href="/wizard"><FontAwesomeIcon icon={faCheckCircle} style={{marginRight: 6}} />Pricing</a>
          <a href="/support"><FontAwesomeIcon icon={faCircleQuestion} style={{marginRight: 6}} />Support</a>
          <a href="/signin"><FontAwesomeIcon icon={faSignInAlt} style={{marginRight: 6}} />Login</a>
        </div>
      </nav>

      {/* Header */}
      <header id="main-header">
        <h1><FontAwesomeIcon icon={faComments} style={{marginRight: 12}} />Welcome to ChitterSync</h1>
        <p>Your go-to platform for seamless communication and collaboration.</p>
        <div className="animated-text-container">
          <span className="animated-text">{animatedText}</span>
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="/signin" className="button" style={{ textDecoration: 'none' }}>
            <button className="button" style={{
              background: 'aquamarine',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginRight: 0,
              cursor: 'pointer',
              transition: 'background 0.3s, color 0.3s',
              display: 'flex', alignItems: 'center', gap: 8
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgb(13, 25, 21)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'aquamarine'; e.currentTarget.style.color = '#000'; }}
            ><FontAwesomeIcon icon={faSignInAlt} style={{marginRight: 6}} />Sign In</button>
          </a>
          <a href="/register" className="button" style={{ textDecoration: 'none' }}>
            <button className="button" style={{
              background: 'aquamarine',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: 'bold',
              fontSize: '1rem',
              marginRight: 0,
              cursor: 'pointer',
              transition: 'background 0.3s, color 0.3s',
              display: 'flex', alignItems: 'center', gap: 8
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgb(13, 25, 21)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'aquamarine'; e.currentTarget.style.color = '#000'; }}
            ><FontAwesomeIcon icon={faUserPlus} style={{marginRight: 6}} />Register</button>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Steps Section */}
        <div className="steps">
          <div className="step">
            <h2>Step 1: Sign Up</h2>
            <p>Create an account to get started. It's quick and easy!</p>
          </div>
          <div className="step">
            <h2>Step 2: Connect</h2>
            <p>Find and connect with your friends, colleagues, or team members.</p>
          </div>
          <div className="step">
            <h2>Step 3: Sync</h2>
            <p>Start sharing updates, collaborating on projects, and staying in sync.</p>
          </div>
        </div>

        {/* Tag List Section */}
        <div className="tag-list-container">
          <div className="tag-list">
            <div className="loop-slider" style={{
              // These CSS variables are used by the original CSS for animation
              // @ts-ignore
              '--duration': '15951ms', '--direction': 'normal',
            }}>
              <div className="inner">
                {['ChitterSync', 'Gia', 'CommunityForged', 'ChitterHaven', 'ThreadLine', 'VeloSync', 'PreCorded', 'EchoDrive', 'VibeLoop'].map((tag, i) => (
                  <div key={tag} className="tag"><span>#</span> {tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Why Choose Section */}
      <section>
        <h2>Why Choose ChitterSync?</h2>
        <p>ChitterSync offers a unique blend of features designed to enhance your communication experience. With our user-friendly interface and powerful tools, you can easily manage your connections and stay updated.</p>
        <p>Whether you're a student, professional, or just looking to connect with friends, ChitterSync has something for everyone.</p>
        <p>Join us today and experience the future of communication!</p>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2><FontAwesomeIcon icon={faPalette} style={{marginRight: 8}} />Features</h2>
        <ul>
          <li style={{ '--index': 0 } as React.CSSProperties}><FontAwesomeIcon icon={faComments} style={{marginRight: 6}} /><strong>Real-time updates:</strong> Stay informed with instant notifications and updates.</li>
          <li style={{ '--index': 1 } as React.CSSProperties}><FontAwesomeIcon icon={faUsers} style={{marginRight: 6}} /><strong>Group chats:</strong> Collaborate with your team or friends in dedicated chat rooms.</li>
          <li style={{ '--index': 2 } as React.CSSProperties}><FontAwesomeIcon icon={faFileAlt} style={{marginRight: 6}} /><strong>File sharing:</strong> Share documents, images, and other files seamlessly.</li>
          <li style={{ '--index': 3 } as React.CSSProperties}><FontAwesomeIcon icon={faUserCircle} style={{marginRight: 6}} /><strong>Customizable profiles:</strong> Personalize your profile to reflect your identity.</li>
          <li style={{ '--index': 4 } as React.CSSProperties}><FontAwesomeIcon icon={faLock} style={{marginRight: 6}} /><strong>Privacy controls:</strong> Manage your privacy settings with ease.</li>
        </ul>
      </section>

      {/* Theme Menu */}
      {showThemeMenu && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
          zIndex: 1000,
          minWidth: 320,
          maxWidth: '90vw',
        }} className="menu" id="theme-menu">
          <h2>Select Theme</h2>
          <select id="theme-selector" value={pendingTheme} onChange={e => setPendingTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="rainbow">Rainbow</option>
            <option value="custom">Custom</option>
          </select>
          <button id="apply-theme" style={{marginLeft: 12, marginTop: 8}} onClick={handleApplyTheme}>Apply</button>
          {showCustomization && pendingTheme === 'custom' && (
            <div id="customization-options" style={{marginTop: 16}}>
              <h3>Customize Theme</h3>
              <label htmlFor="animation-duration">Animation Duration (seconds):</label>
              <input type="number" id="animation-duration" value={customDuration} min={1} max={60} onChange={e => setCustomDuration(Number(e.target.value))} style={{marginLeft: 8}} />
              <br />
              <label htmlFor="color1">Color 1:</label>
              <input type="color" id="color1" value={customColor1} onChange={e => setCustomColor1(e.target.value)} style={{marginLeft: 8}} />
              <br />
              <label htmlFor="color2">Color 2:</label>
              <input type="color" id="color2" value={customColor2} onChange={e => setCustomColor2(e.target.value)} style={{marginLeft: 8}} />
              <br />
              <button id="apply-customization" style={{marginTop: 8}} onClick={() => { setTheme('custom'); setShowThemeMenu(false); setShowCustomization(false); tabCount.current = 0; }}>Apply Customization</button>
            </div>
          )}
        </div>
      )}

      {/* Floating Buttons */}
      <FloatingHelpButton />
      <FloatingQuickActionsButton />

      {/* Footer */}
      <footer>
        <p>
          <span style={{marginLeft: 16}}>2021-2025 ChitterSync &copy; All rights reserved.</span>
          <span style={{marginLeft: 16}}><br/>Made with <span style={{color: 'red'}}><FontAwesomeIcon icon={faHeart} /></span> by Reach 7105 Studios<br/></span>
          <a href="https://twitter.com/@ChitterSync" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="Twitter"><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
          <a href="https://github.com/ChitterSync" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="GitHub"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
          <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="Discord"><FontAwesomeIcon icon={faDiscord} size="lg" /></a>
          <a href="https://www.linkedin.com/company/chittersync" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="LinkedIn"><FontAwesomeIcon icon={faLinkedin} size="xl" /></a>
          <a href="https://whois.chittersync.com/org/@chittersync" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="ChitterSync Profile"><FontAwesomeIcon icon={faUserCircle} size="lg" /></a>
          <a href="https://trello.com/b/mcuPb55i/chittersync" target="_blank" rel="noopener noreferrer" style={{marginRight: 18}} title="Trello Board"><FontAwesomeIcon icon={faTrello} size="lg" /></a>
        </p>
      </footer>
    </OverlayProvider>
  );
}
