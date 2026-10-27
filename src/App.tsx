import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  CircleHelp,
  Compass,
  Menu,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Wallet,
  X,
} from 'lucide-react';

const categories = [
  'All products',
  'Electronics',
  'Fashion',
  'Digital goods',
  'Home & living',
  'Collectibles',
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="app-shell">
      <div className="announcement">
        <span className="status-dot" />
        BUILT FOR NEAR
        <span className="announcement-divider">/</span>
        YOUR MARKETPLACE, ON-CHAIN
      </div>

      <header className="navbar">
        <a className="brand" href="#" aria-label="CARTEL home">
          <span className="brand-mark">C</span>
          <span className="brand-name">CARTEL<span>.</span></span>
        </a>

        <nav className="desktop-nav">
          <a className="nav-link active" href="#marketplace">Marketplace</a>
          <a className="nav-link" href="#how-it-works">How it works</a>
          <a className="nav-link" href="#sell">Sell on CARTEL</a>
        </nav>

        <div className="nav-actions">
          <button
            className="wallet-button"
            onClick={() => alert('NEAR wallet connection is coming in the next build step.')}
          >
            <Wallet size={17} />
            <span>Connect wallet</span>
          </button>

          <button
            className="menu-button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-menu">
          <a href="#marketplace" onClick={() => setMenuOpen(false)}>Marketplace</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#sell" onClick={() => setMenuOpen(false)}>Sell on CARTEL</a>
        </nav>
      )}

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <Sparkles size={14} />
            THE NEXT GENERATION MARKETPLACE
          </div>

          <h1>
            Your world.
            <br />
            <span>Your market.</span>
          </h1>

          <p className="hero-description">
            Discover products worth owning. Sell what matters.
            Everything starts with you, powered by NEAR.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#marketplace">
              Explore marketplace <ArrowRight size={17} />
            </a>
            <a className="secondary-button" href="#sell">
              Start selling <ArrowDownRight size={17} />
            </a>
          </div>

          <div className="hero-proof">
            <div className="proof-icon"><ShieldCheck size={18} /></div>
            <div>
              <strong>Built on NEAR Protocol</strong>
              <span>Blockchain-powered marketplace</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="visual-card">
            <div className="visual-card-top">
              <span className="visual-label">THE CARTEL STANDARD</span>
              <span className="visual-number">001</span>
            </div>

            <div className="visual-symbol">
              <div className="symbol-ring">
                <div className="symbol-core">C</div>
              </div>
            </div>

            <div className="visual-card-bottom">
              <div>
                <span className="visual-caption">ONE MARKET</span>
                <h3>Infinite possibilities.</h3>
              </div>
              <div className="near-token">Ⓝ</div>
            </div>
          </div>

          <div className="floating-tag tag-top">
            <span className="tag-dot" /> Digital + Physical
          </div>

          <div className="floating-tag tag-bottom">
            <BadgeCheck size={16} /> Powered by NEAR
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stat">
          <span className="stat-label">NETWORK</span>
          <strong>NEAR Protocol</strong>
        </div>
        <div className="stat">
          <span className="stat-label">PAYMENT</span>
          <strong>NEAR only</strong>
        </div>
        <div className="stat">
          <span className="stat-label">PRODUCTS</span>
          <strong>Physical + Digital</strong>
        </div>
        <div className="stat">
          <span className="stat-label">MISSION</span>
          <strong>Commerce without borders</strong>
        </div>
      </section>

      <section className="marketplace-section" id="marketplace">
        <div className="section-heading">
          <div>
            <div className="section-kicker">FIND YOUR NEXT</div>
            <h2>The marketplace<span>.</span></h2>
            <p>Discover what the community has to offer.</p>
          </div>

          <div className="listing-count">
            <span className="count-dot" />
            <span>Live listings</span>
            <strong>0</strong>
          </div>
        </div>

        <div className="marketplace-tools">
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-chip ${
                  activeCategory === category ? 'selected' : ''
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="search-box">
            <Search size={18} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </label>
        </div>

        <div className="empty-state">
          <div className="empty-icon">
            <ShoppingBag size={28} strokeWidth={1.4} />
          </div>
          <div className="empty-kicker">A FRESH MARKET STARTS HERE</div>
          <h3>No products listed yet.</h3>
          <p>
            CARTEL is getting ready for its first sellers.
            Published listings will appear here when the marketplace is connected.
          </p>
          <a className="primary-button empty-button" href="#sell">
            Become a founding seller <ArrowRight size={17} />
          </a>
          <span className="empty-note">
            {search
              ? `Your search for "${search}" will work when listings are available.`
              : `Category: ${activeCategory}`}
          </span>
        </div>
      </section>

      <section className="sell-banner" id="sell">
        <div className="sell-icon"><Store size={25} /></div>
        <div className="sell-copy">
          <span className="section-kicker">BUILT FOR BUILDERS AND SELLERS</span>
          <h2>Your product deserves a market.</h2>
          <p>Bring your products to CARTEL and prepare to trade on NEAR.</p>
        </div>
        <button
          className="sell-button"
          onClick={() => alert('Seller onboarding will be connected after wallet setup.')}
        >
          Become a seller <ArrowRight size={17} />
        </button>
      </section>

      <section className="how-section" id="how-it-works">
        <div className="section-heading">
          <div>
            <div className="section-kicker">STRAIGHTFORWARD BY DESIGN</div>
            <h2>Commerce, reimagined<span>.</span></h2>
          </div>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon"><Wallet size={21} /></div>
            <h3>Connect</h3>
            <p>Connect a supported NEAR wallet to access marketplace features.</p>
          </article>

          <article className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon"><Compass size={21} /></div>
            <h3>Discover</h3>
            <p>Explore real products published by marketplace sellers.</p>
          </article>

          <article className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon"><Package size={21} /></div>
            <h3>Trade</h3>
            <p>List products or purchase with NEAR once payments are enabled.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">C</span>
          <span className="brand-name">CARTEL<span>.</span></span>
        </a>

        <p>List on NEAR. Buy on NEAR.</p>

        <a className="footer-help" href="#how-it-works">
          <CircleHelp size={16} /> How it works
        </a>

        <span className="footer-copy">© 2026 CARTEL</span>
      </footer>
    </main>
  );
}
