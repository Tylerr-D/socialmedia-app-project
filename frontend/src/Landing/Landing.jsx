import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --cream: #EDE8D4;
    --cream-dark: #D9D2B6;
    --cream-light: #F5F1E4;
    --ink: #1A1814;
    --ink-soft: #3D3A30;
    --ink-muted: #7A7568;
    --amber: #C4892A;
    --amber-light: #E8B54A;
    --sage: #6B7C5A;
    --rose: #C4726A;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--ink);
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 3rem;
    background: var(--cream);
    border-bottom: 1px solid var(--cream-dark);
    transition: all 0.3s;
  }
  nav.scrolled {
    padding: 0.875rem 3rem;
    box-shadow: 0 2px 24px rgba(26,24,20,0.08);
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--ink);
    letter-spacing: -0.02em;
  }
  .nav-logo span { color: var(--amber); font-style: italic; }
  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .nav-links a {
    text-decoration: none;
    color: var(--ink-muted);
    font-size: 0.9rem;
    font-weight: 400;
    letter-spacing: 0.02em;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-actions { display: flex; gap: 0.75rem; align-items: center; }
  .btn-ghost {
    background: none;
    border: 1px solid var(--cream-dark);
    color: var(--ink);
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: var(--ink); }
  .btn-dark {
    background: var(--ink);
    border: 1px solid var(--ink);
    color: var(--cream);
    padding: 0.5rem 1.25rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-dark:hover { background: var(--ink-soft); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem 4rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--cream-light);
    border: 1px solid var(--cream-dark);
    color: var(--ink-muted);
    font-size: 0.78rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.375rem 1rem;
    border-radius: 100px;
    margin-bottom: 2rem;
    animation: fadeUp 0.6s ease both;
  }
  .hero-tag::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--amber);
    border-radius: 50%;
  }
  .hero-headline {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3.5rem, 7vw, 6.5rem);
    font-weight: 700;
    line-height: 1.05;
    letter-spacing: -0.03em;
    max-width: 900px;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .hero-headline em {
    font-style: italic;
    color: var(--amber);
  }
  .hero-sub {
    margin-top: 1.75rem;
    font-size: 1.1rem;
    color: var(--ink-muted);
    max-width: 520px;
    line-height: 1.7;
    font-weight: 300;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .hero-cta {
    display: flex;
    gap: 1rem;
    margin-top: 2.5rem;
    animation: fadeUp 0.6s 0.3s ease both;
  }
  .btn-primary {
    background: var(--ink);
    color: var(--cream);
    border: none;
    padding: 0.875rem 2.25rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .btn-primary:hover { background: var(--amber); transform: translateY(-1px); }
  .btn-outline {
    background: transparent;
    color: var(--ink);
    border: 1.5px solid var(--ink);
    padding: 0.875rem 2.25rem;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-outline:hover { background: var(--ink); color: var(--cream); }

  /* FLOATING POSTS PREVIEW */
  .hero-preview {
    margin-top: 4rem;
    position: relative;
    width: 100%;
    max-width: 860px;
    height: 280px;
    animation: fadeUp 0.6s 0.4s ease both;
  }
  .post-card {
    position: absolute;
    background: var(--cream-light);
    border: 1px solid var(--cream-dark);
    border-radius: 16px;
    padding: 1.25rem;
    width: 260px;
    box-shadow: 0 8px 32px rgba(26,24,20,0.08);
    transition: transform 0.3s ease;
  }
  .post-card:hover { transform: translateY(-4px) !important; }
  .post-card:nth-child(1) { left: 0; top: 0; transform: rotate(-3deg); }
  .post-card:nth-child(2) { left: 50%; transform: translateX(-50%) rotate(0deg); top: -20px; z-index: 2; width: 300px; }
  .post-card:nth-child(3) { right: 0; top: 20px; transform: rotate(2.5deg); }
  .post-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 500;
    margin-bottom: 0.875rem;
    color: var(--cream-light);
  }
  .post-text {
    font-size: 0.85rem;
    line-height: 1.6;
    color: var(--ink-soft);
    margin-bottom: 0.875rem;
  }
  .post-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.75rem;
    color: var(--ink-muted);
  }
  .post-meta span { display: flex; align-items: center; gap: 0.3rem; }

  /* MARQUEE */
  .marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--cream-dark);
    border-bottom: 1px solid var(--cream-dark);
    padding: 0.875rem 0;
    margin-bottom: 6rem;
    white-space: nowrap;
  }
  .marquee-inner {
    display: inline-flex;
    gap: 3rem;
    animation: marquee 18s linear infinite;
  }
  .marquee-item {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: var(--ink-muted);
    font-size: 0.875rem;
    letter-spacing: 0.04em;
  }
  .marquee-dot { color: var(--amber); font-style: normal; }

  /* FEATURES */
  .section {
    padding: 6rem 3rem;
    max-width: 1100px;
    margin: 0 auto;
  }
  .section-label {
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--amber);
    font-weight: 500;
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    line-height: 1.1;
    font-weight: 700;
    max-width: 600px;
  }
  .section-title em { font-style: italic; color: var(--amber); }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 3.5rem;
  }
  .feature-card {
    background: var(--cream-light);
    border: 1px solid var(--cream-dark);
    border-radius: 20px;
    padding: 2rem;
    transition: transform 0.25s ease, box-shadow 0.25s;
    cursor: default;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(26,24,20,0.08);
  }
  .feature-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem;
    margin-bottom: 1.25rem;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.625rem;
  }
  .feature-desc {
    font-size: 0.875rem;
    color: var(--ink-muted);
    line-height: 1.7;
    font-weight: 300;
  }

  /* STATS */
  .stats-band {
    background: var(--ink);
    color: var(--cream);
    padding: 4rem 3rem;
    margin: 0 -1rem;
  }
  .stats-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 700;
    color: var(--amber-light);
    line-height: 1;
  }
  .stat-label {
    font-size: 0.85rem;
    color: rgba(237,232,212,0.6);
    margin-top: 0.5rem;
    font-weight: 300;
    letter-spacing: 0.04em;
  }

  /* HOW IT WORKS */
  .steps {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3.5rem;
    position: relative;
  }
  .steps::before {
    content: '';
    position: absolute;
    top: 2rem;
    left: calc(16.6% + 1rem);
    right: calc(16.6% + 1rem);
    height: 1px;
    background: linear-gradient(90deg, var(--cream-dark), var(--amber), var(--cream-dark));
  }
  .step {
    text-align: center;
    padding: 1.5rem;
  }
  .step-num {
    width: 4rem; height: 4rem;
    border-radius: 50%;
    background: var(--ink);
    color: var(--cream);
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
  }
  .step-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.1rem;
    margin-bottom: 0.625rem;
    font-weight: 700;
  }
  .step-desc {
    font-size: 0.875rem;
    color: var(--ink-muted);
    line-height: 1.65;
    font-weight: 300;
  }

  /* TESTIMONIALS */
  .testimonials {
    background: var(--cream-light);
    border-top: 1px solid var(--cream-dark);
    border-bottom: 1px solid var(--cream-dark);
    padding: 6rem 3rem;
    overflow: hidden;
  }
  .t-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    max-width: 1100px;
    margin: 3.5rem auto 0;
  }
  .t-card {
    background: var(--cream);
    border: 1px solid var(--cream-dark);
    border-radius: 20px;
    padding: 2rem;
  }
  .t-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--ink-soft);
    margin-bottom: 1.5rem;
  }
  .t-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .t-avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem;
    font-weight: 500;
    color: white;
  }
  .t-name { font-size: 0.875rem; font-weight: 500; }
  .t-handle { font-size: 0.75rem; color: var(--ink-muted); }

  /* CTA FOOTER */
  .cta-section {
    padding: 8rem 3rem;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  }
  .cta-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 700;
    line-height: 1.08;
    margin-bottom: 1.5rem;
  }
  .cta-title em { font-style: italic; color: var(--amber); }
  .cta-sub {
    font-size: 1rem;
    color: var(--ink-muted);
    margin-bottom: 2.5rem;
    font-weight: 300;
    line-height: 1.7;
  }
  .email-row {
    display: flex;
    gap: 0.75rem;
    max-width: 440px;
    margin: 0 auto;
  }
  .email-input {
    flex: 1;
    background: var(--cream-light);
    border: 1px solid var(--cream-dark);
    border-radius: 100px;
    padding: 0.875rem 1.5rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s;
  }
  .email-input:focus { border-color: var(--amber); }
  .email-input::placeholder { color: var(--ink-muted); }

  /* FOOTER */
  footer {
    border-top: 1px solid var(--cream-dark);
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1100px;
    margin: 0 auto;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 1.1rem;
  }
  .footer-logo span { font-style: italic; color: var(--amber); }
  .footer-links {
    display: flex; gap: 2rem; list-style: none;
  }
  .footer-links a {
    text-decoration: none;
    color: var(--ink-muted);
    font-size: 0.82rem;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: var(--ink); }
  .footer-copy { font-size: 0.8rem; color: var(--ink-muted); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .hero { padding: 5rem 1.5rem 3rem; }
    .hero-preview { height: 200px; }
    .post-card { width: 200px; }
    .post-card:nth-child(1) { display: none; }
    .post-card:nth-child(3) { display: none; }
    .features-grid, .steps, .stats-inner, .t-grid { grid-template-columns: 1fr; }
    .steps::before { display: none; }
    .section { padding: 4rem 1.5rem; }
    .email-row { flex-direction: column; }
  }
`;

const posts = [
  {
    avatar: "#C4892A",
    initials: "AK",
    text: "Golden hour at the market today. The light was absolutely everything ✨",
    likes: "142",
    comments: "28",
  },
  {
    avatar: "#6B7C5A",
    initials: "MR",
    text: "Just finished my morning pages and honestly? Everything feels possible right now. Grateful for this community 🌿",
    likes: "389",
    comments: "54",
  },
  {
    avatar: "#C4726A",
    initials: "JL",
    text: "New recipe drop: cardamom rose rice pudding. Weekend project incoming 🍚",
    likes: "97",
    comments: "19",
  },
];

const features = [
  {
    icon: "✦",
    bg: "#C4892A22",
    color: "#C4892A",
    title: "Curated Feed",
    desc: "Your feed, shaped by genuine interests — not engagement bait or viral noise.",
  },
  {
    icon: "◎",
    bg: "#6B7C5A22",
    color: "#6B7C5A",
    title: "Slow Posting",
    desc: "Draft, refine, and share with intention. Your thoughts deserve more than a rushed take.",
  },
  {
    icon: "❋",
    bg: "#C4726A22",
    color: "#C4726A",
    title: "Real Connections",
    desc: "Follow people whose perspectives genuinely move you. Quality over follower count.",
  },
  {
    icon: "◈",
    bg: "#3D3A3022",
    color: "#3D3A30",
    title: "Ad-Free Spaces",
    desc: "No sponsored content masquerading as posts. Just authentic voices, always.",
  },
  {
    icon: "◉",
    bg: "#C4892A22",
    color: "#C4892A",
    title: "Story Threads",
    desc: "Long-form storytelling built in. Go beyond the character limit into real depth.",
  },
  {
    icon: "✿",
    bg: "#6B7C5A22",
    color: "#6B7C5A",
    title: "Private Circles",
    desc: "Share selectively with the people who matter most, without broadcasting to everyone.",
  },
];

const testimonials = [
  {
    quote:
      "Finally, a place that feels like the early internet — curious, warm, and actually human.",
    name: "Priya S.",
    handle: "@priyawrites",
    bg: "#C4892A",
  },
  {
    quote:
      "I've had more meaningful conversations here in a week than two years elsewhere.",
    name: "Tom H.",
    handle: "@thomasho",
    bg: "#6B7C5A",
  },
  {
    quote:
      "The design is so considered. It encourages you to slow down and actually read.",
    name: "Laila M.",
    handle: "@lailam",
    bg: "#C4726A",
  },
];

const marqItems = [
  "Share Slowly",
  "Connect Deeply",
  "Create Freely",
  "Live Loudly",
  "Think Openly",
  "Grow Together",
];

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [activeTab, setActiveTab] = useState("Feed");
  const [activeUser,setActiveUser]=useState(0);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{CSS}</style>
      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          Gather<span>.</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how">How it works</a>
          </li>
          <li>
            <a href="#community">Community</a>
          </li>
        </ul>
        <div className="nav-actions">
          <button className="btn-ghost">Sign in</button>
          <button className="btn-dark">Join free</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-tag">A social space for thoughtful people</div>
        <h1 className="hero-headline">
          Share what <em>matters</em>,<br />
          not what performs.
        </h1>
        <p className="hero-sub">
          Gather is where writers, thinkers, and creators share work worth
          reading — and build community worth belonging to.
        </p>
        <div className="hero-cta">
          <button className="btn-primary">Start sharing free</button>
          <button className="btn-outline">See how it works</button>
        </div>

        {/* MOCK POSTS */}
        <div className="hero-preview">
          {posts.map((p, i) => (
            <div className="post-card" key={i}>
              <div className="post-avatar" style={{ background: p.avatar }}>
                {p.initials}
              </div>
              <p className="post-text">{p.text}</p>
              <div className="post-meta">
                <span>♥ {p.likes}</span>
                <span>◯ {p.comments}</span>
                <span>↗ Share</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {[...marqItems, ...marqItems, ...marqItems, ...marqItems].map(
            (item, i) => (
              <span key={i} className="marquee-item">
                {item} <span className="marquee-dot">✦</span>
              </span>
            ),
          )}
        </div>
      </div>
      {/* FEATURES */}
      <div id="features" className="section">
        <p className="section-label">Why Gather</p>
        <h2 className="section-title">
          Built for <em>depth</em>, not distraction.
        </h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div
                className="feature-icon"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="stats-band">
        <div className="stats-inner">
          {[
            ["2.1M+", "active members"],
            ["94%", "say it feels authentic"],
            ["4.8★", "app store rating"],
            ["Zero", "ads, ever"],
          ].map(([num, lbl], i) => (
            <div key={i}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{lbl}</div>
            </div>
          ))}
        </div>
      </div>
      {/* HOW IT WORKS */}
      <div id="how" className="section">
        <p className="section-label">Getting started</p>
        <h2 className="section-title">
          Three steps to <em>your community.</em>
        </h2>
        <div className="steps">
          {[
            [
              "01",
              "Create your profile",
              "Tell the world who you are. Add your interests, your work, and the topics you care about most.",
            ],
            [
              "02",
              "Find your people",
              "Discover writers, thinkers, and makers through shared interests — not follower counts.",
            ],
            [
              "03",
              "Share your voice",
              "Post thoughts, long reads, photos, or threads. Everything you share belongs to you.",
            ],
          ].map(([n, title, desc], i) => (
            <div className="step" key={i}>
              <div className="step-num">{n}</div>
              <h3 className="step-title">{title}</h3>
              <p className="step-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* TESTIMONIALS */}
      <div id="community" className="testimonials">
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p className="section-label">From the community</p>
          <h2 className="section-title">
            People who <em>get it.</em>
          </h2>
        </div>
        <div className="t-grid">
          {testimonials.map((t, i) => (
            <div className="t-card" key={i}>
              <p className="t-quote">"{t.quote}"</p>
              <div className="t-author">
                <div className="t-avatar" style={{ background: t.bg }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-handle">{t.handle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* CTA */}
      <div className="cta-section">
        <h2 className="cta-title">
          Ready to <em>gather</em>
          <br />
          your people?
        </h2>
        <p className="cta-sub">
          Join over 2 million thoughtful people who chose depth over
          distraction. Always free, always ad-free.
        </p>
        {joined ? (
          <p
            style={{
              color: "#C4892A",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontSize: "1.1rem",
            }}
          >
            ✦ You're on the list. We'll be in touch soon.
          </p>
        ) : (
          <div className="email-row">
            <input
              className="email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && email && setJoined(true)}
            />
            <button
              className="btn-primary"
              onClick={() => email && setJoined(true)}
            >
              Get early access
            </button>
          </div>
        )}
      </div>
      {/* FOOTER */}
      <footer/>
    </>
  );
}
