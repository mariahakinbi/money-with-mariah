import { useState, useEffect } from "react";

/* ════════════════════════════════════════════════════════════
   MONEY WITH MARIAH - moneywithmariah.com
   Personal Finance Coaching & Coast FIRE
   ════════════════════════════════════════════════════════════ */

const C = {
  cream: "#FAF7F2",
  sage: "#8B9E7E",
  sageDark: "#6B7E5E",
  sageLight: "#D4DFC8",
  warmBlack: "#2C2C2C",
  warmGray: "#6B6560",
  gold: "#C4A35A",
  goldLight: "#F5ECD7",
  white: "#FFFFFF",
  blush: "#F0E6DC",
};

/* ── Analytics helper ── */
function track(event, params = {}) {
  try {
    if (window.gtag) window.gtag("event", event, params);
  } catch (e) {}
}

/* ── Book Data ── */
const BOOKS = {
  foundations: [
    {
      title: "Total Money Makeover",
      author: "Dave Ramsey",
      desc: "A proven system for getting out of debt and building your financial foundation.",
      tag: "Great for debt payoff",
      read: true,
      amazon: "https://amzn.to/3OXs60W",
      walmart: "https://walmrt.us/4cIMg94",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      desc: "Understand the emotional side of money decisions and why behavior matters more than knowledge.",
      tag: "Money mindset",
      read: true,
      amazon: "https://amzn.to/4rOiUL1",
      walmart: "https://walmrt.us/4sddzgC",
    },
    {
      title: "Money for Couples",
      author: "Ramit Sethi",
      desc: "Build a money system that works whether you are single or in a relationship.",
      tag: "Singles and couples",
      read: true,
      amazon: "https://amzn.to/4ssjXQS",
      walmart: "https://walmrt.us/4sddw4q",
    },
  ],
  investing: [
    {
      title: "Die With Zero",
      author: "Bill Perkins",
      desc: "Rethink the balance between saving and living your life fully.",
      tag: "The purpose of money",
      read: true,
      amazon: "https://amzn.to/4cJneXd",
      walmart: "https://walmrt.us/4ukYISJ",
    },
    {
      title: "The Simple Path to Wealth",
      author: "JL Collins",
      desc: "The investing classic for building wealth with index funds.",
      tag: "On my TBR",
      read: false,
      amazon: "https://amzn.to/4rsjX2b",
      walmart: "https://walmrt.us/3Nk9wQi",
    },
    {
      title: "Your Money or Your Life",
      author: "Vicki Robin",
      desc: "The original FIRE book. Transform your relationship with money and reclaim your time.",
      tag: "On my TBR",
      read: false,
      amazon: "https://amzn.to/4rtvYV9",
      walmart: "https://walmrt.us/4s5ouZv",
    },
  ],
  retirement: [
    {
      title: "The Wealth Ladder",
      author: "Nick Maggiulli",
      desc: "A modern, data-driven framework for building wealth at every stage of life.",
      tag: "Currently reading",
      read: true,
      hasNotes: true,
      amazon: "https://amzn.to/4dfeF6C",
      walmart: "https://walmrt.us/4ae7ad0",
    },
    {
      title: "Bogleheads' Guide to Investing",
      author: "Larimore, Lindauer & LeBoeuf",
      desc: "Deep dive into passive investing strategy and portfolio construction.",
      tag: "On my TBR",
      read: false,
      amazon: "https://amzn.to/4ru7U4x",
      walmart: "https://walmrt.us/4bEW1Us",
    },
    {
      title: "Early Retirement Extreme",
      author: "Jacob Lund Fisker",
      desc: "The most rigorous, systems-thinking take on financial independence.",
      tag: "On my TBR",
      read: false,
      amazon: "https://amzn.to/4rZEigm",
      walmart: null,
    },
  ],
};

/* ── Responsive hook ── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/* ── Icons ── */
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.13C5.12 19.56 12 19.56 12 19.56s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const NotesIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CloseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ── Notes Modal ── */
function NotesModal({ book, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.white,
          borderRadius: 20,
          padding: "32px",
          maxWidth: 600,
          width: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: C.sage,
                marginBottom: 8,
              }}
            >
              My Notes
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22,
                fontWeight: 500,
                margin: 0,
              }}
            >
              {book.title}
            </h3>
            <div style={{ fontSize: 14, color: C.warmGray, marginTop: 4 }}>
              by {book.author}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: C.cream,
              border: "none",
              width: 36,
              height: 36,
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.warmGray,
              flexShrink: 0,
            }}
          >
            x
          </button>
        </div>
        {book.title === "The Wealth Ladder" ? (
          <div style={{ fontSize: 15, lineHeight: 1.8, color: C.warmBlack }}>
            <div
              style={{
                margin: "0 0 16px",
                padding: 20,
                background: C.cream,
                borderRadius: 12,
                border: `1px solid ${C.sageLight}`,
              }}
            >
              <strong style={{ color: C.sage }}>Key Takeaway:</strong>{" "}
              Maggiulli's data-driven approach shows that wealth building is not
              one-size-fits-all. The strategies that work depend on where you
              are on the ladder.
            </div>
            <p style={{ margin: "0 0 12px" }}>
              The book breaks wealth building into stages and argues that the
              advice you need changes as your net worth grows. What works at $0
              does not work at $500K.
            </p>
            <p style={{ margin: "0 0 12px" }}>
              One thing I appreciate is how he uses actual data rather than
              anecdotes. The chapter on when to start investing vs. paying off
              debt was especially relevant to the Coast FIRE journey.
            </p>
            <p style={{ margin: 0, fontStyle: "italic", color: C.warmGray }}>
              Still reading. More notes coming soon.
            </p>
          </div>
        ) : (
          <p style={{ fontSize: 15, color: C.warmGray }}>Notes coming soon!</p>
        )}
      </div>
    </div>
  );
}

/* ── Blog Page ── */
function BlogPage({ onBack, isMobile }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.cream,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <nav
        style={{
          background: "rgba(250,247,242,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.sageLight}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
          }}
        >
          <div
            onClick={onBack}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: -0.5,
              cursor: "pointer",
            }}
          >
            money with <span style={{ color: C.sage }}>mariah</span>
          </div>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: C.sage,
              fontWeight: 500,
            }}
          >
            ← Back
          </button>
        </div>
      </nav>
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: isMobile ? "48px 20px" : "80px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: C.sage,
            marginBottom: 16,
          }}
        >
          Blog
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 32 : 44,
            fontWeight: 500,
            margin: "0 0 20px",
            lineHeight: 1.2,
          }}
        >
          Thoughts on money,
          <br />
          <span style={{ fontStyle: "italic", color: C.sage }}>
            freedom, and life.
          </span>
        </h1>
        <p
          style={{
            fontSize: isMobile ? 15 : 17,
            color: C.warmGray,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Deep dives on Coast FIRE, index fund investing, spending
          intentionally, and designing a work-optional life.
        </p>
        <div
          style={{
            background: C.white,
            borderRadius: 20,
            padding: isMobile ? "40px 24px" : "60px 40px",
            border: `1px solid ${C.sageLight}`,
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>✍️</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 24,
              fontWeight: 500,
              margin: "0 0 12px",
            }}
          >
            Coming soon!
          </h2>
          <p
            style={{
              fontSize: 15,
              color: C.warmGray,
              lineHeight: 1.7,
              maxWidth: 400,
              margin: "0 auto 28px",
            }}
          >
            I am working on my first posts about Coast FIRE, building wealth on
            a single income, and the books that shaped my financial journey.
            Subscribe to get notified.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: 12,
              maxWidth: 440,
              margin: "0 auto 32px",
            }}
          >
            <input
              type="email"
              id="newsletter-email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 8,
                border: "none",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(255,255,255,0.95)",
              }}
            />
            <button
              onClick={() => {
                const email = document.getElementById("newsletter-email").value;
                if (!email) return;
                track("newsletter_signup", { location: "footer" });
                fetch("https://app.kit.com/forms/9197742/subscriptions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email_address: email }),
                })
                  .then(() => {
                    document.getElementById("newsletter-email").value = "";
                    alert("You're on the list! Check your email to confirm.");
                  })
                  .catch(() =>
                    alert("Something went wrong. Please try again."),
                  );
              }}
              style={{
                background: C.sage,
                color: C.white,
                border: "none",
                padding: "12px 24px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div style={{ marginTop: 40 }}>
          {[
            {
              title: "What is Coast FIRE? A complete guide",
              category: "Coast FIRE",
            },
            {
              title: "How I built a $550K net worth by 33",
              category: "My Journey",
            },
            {
              title:
                "Index funds vs. target date funds: which should you choose?",
              category: "Investing",
            },
          ].map((post, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                borderRadius: 16,
                padding: "20px 24px",
                border: `1px solid ${C.sageLight}`,
                marginBottom: 12,
                opacity: 0.5,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: C.sage,
                  marginBottom: 8,
                }}
              >
                {post.category}
              </div>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 16 : 18,
                  fontWeight: 500,
                  color: C.warmBlack,
                }}
              >
                {post.title}
              </div>
              <div style={{ fontSize: 12, color: C.warmGray, marginTop: 6 }}>
                Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════════════════════ */
export default function MoneyWithMariah() {
  const [bookLevel, setBookLevel] = useState("foundations");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [notesBook, setNotesBook] = useState(null);
  const [page, setPage] = useState("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const isMobile = useIsMobile();

  const scrollTo = (id) => {
    setMobileMenu(false);
    track("nav_click", { section: id });
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (page === "blog")
    return <BlogPage onBack={() => setPage("home")} isMobile={isMobile} />;

  const px = isMobile ? "20px" : "40px";

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        background: C.cream,
        color: C.warmBlack,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        rel="stylesheet"
      />
      <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { margin: 0; } input:focus { outline: none; }`}</style>

      {notesBook && (
        <NotesModal book={notesBook} onClose={() => setNotesBook(null)} />
      )}

      {/* NAV */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(250,247,242,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.sageLight}`,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: `0 ${px}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 64,
          }}
        >
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 20 : 22,
              fontWeight: 600,
              letterSpacing: -0.5,
              cursor: "pointer",
            }}
            onClick={() => {
              setPage("home");
              window.scrollTo(0, 0);
            }}
          >
            money with <span style={{ color: C.sage }}>mariah</span>
          </div>

          {isMobile ? (
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.warmBlack,
                padding: 4,
              }}
            >
              {mobileMenu ? <CloseIcon /> : <MenuIcon />}
            </button>
          ) : (
            <div style={{ display: "flex", gap: 24 }}>
              {[
                ["about", "About"],
                ["calculator", "Calculator"],
                ["books", "Books"],
                ["services", "Work With Me"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: C.warmGray,
                    fontWeight: 400,
                    transition: "color 0.2s",
                    padding: 0,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = C.sage)}
                  onMouseLeave={(e) => (e.target.style.color = C.warmGray)}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => {
                  setPage("blog");
                  track("nav_click", { section: "blog" });
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: C.warmGray,
                  fontWeight: 400,
                  transition: "color 0.2s",
                  padding: 0,
                }}
                onMouseEnter={(e) => (e.target.style.color = C.sage)}
                onMouseLeave={(e) => (e.target.style.color = C.warmGray)}
              >
                Blog
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {isMobile && mobileMenu && (
          <div
            style={{
              background: C.cream,
              borderBottom: `1px solid ${C.sageLight}`,
              padding: "16px 20px",
            }}
          >
            {[
              ["about", "About"],
              ["calculator", "Calculator"],
              ["books", "Books"],
              ["services", "Work With Me"],
              ["blog", "Blog"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() =>
                  id === "blog"
                    ? (setPage("blog"), setMobileMenu(false))
                    : scrollTo(id)
                }
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  fontWeight: 500,
                  color: C.warmBlack,
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.sageLight}`,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: isMobile ? "48px 20px 40px" : "80px 40px 60px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 1fr",
            gap: isMobile ? 32 : 60,
            alignItems: "center",
          }}
        >
          <div style={{ order: isMobile ? 2 : 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 16px",
                borderRadius: 20,
                background: C.sageLight,
                color: C.sageDark,
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 0.3,
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: C.sage,
                  display: "inline-block",
                }}
              />
              Pursuing AFC® Certification
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 38 : 54,
                fontWeight: 500,
                lineHeight: 1.1,
                margin: "0 0 20px",
                letterSpacing: -1,
              }}
            >
              Build wealth.
              <br />
              <span style={{ fontStyle: "italic", color: C.sage }}>
                Live fully.
              </span>
              <br />
              Coast to freedom.
            </h1>
            <p
              style={{
                fontSize: isMobile ? 16 : 18,
                lineHeight: 1.7,
                color: C.warmGray,
                maxWidth: 460,
                margin: "0 0 32px",
              }}
            >
              Personal finance coaching for people who want to invest wisely,
              spend on what matters, and design a life where work becomes
              optional.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  scrollTo("services");
                  track("cta_click", { button: "hero_work_with_me" });
                }}
                style={{
                  background: C.sage,
                  color: C.white,
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = C.sageDark)}
                onMouseLeave={(e) => (e.target.style.background = C.sage)}
              >
                Work With Me
              </button>
              <button
                onClick={() => {
                  scrollTo("calculator");
                  track("cta_click", { button: "hero_calculator" });
                }}
                style={{
                  background: "transparent",
                  color: C.warmBlack,
                  border: `1.5px solid ${C.warmBlack}`,
                  padding: "14px 28px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Coast FIRE Calculator →
              </button>
            </div>
          </div>
          <div
            style={{
              order: isMobile ? 1 : 2,
              borderRadius: 24,
              overflow: "hidden",
              position: "relative",
              aspectRatio: "1",
              maxWidth: isMobile ? 280 : 440,
              margin: isMobile ? "0 auto" : undefined,
              background: `linear-gradient(135deg, ${C.sageLight} 0%, ${C.blush} 50%, ${C.goldLight} 100%)`,
            }}
          >
            <img
              src="/profpic_square.png"
              alt="Mariah"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 0.4s",
              }}
            />
            {!imgLoaded && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: 72 }}>🌿</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ background: C.white }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 40px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 40 : 80,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: C.sage,
                  marginBottom: 16,
                }}
              >
                About Mariah
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: 500,
                  margin: "0 0 24px",
                  lineHeight: 1.2,
                }}
              >
                Data engineer by day.
                <br />
                <span style={{ color: C.sage }}>
                  Financial freedom advocate
                </span>{" "}
                always.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: C.warmGray,
                  marginBottom: 16,
                }}
              >
                At 33, I have built a net worth of over $550K on a single income
                through intentional investing, strategic spending, and the power
                of index funds. I am on track to hit Coast FIRE, and I want to
                help you do the same.
              </p>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: C.warmGray,
                  marginBottom: 16,
                }}
              >
                I believe in spending generously on what you love (travel, great
                food, giving back) while building a portfolio that works for you
                in the background. No deprivation. No get-rich-quick schemes.
                Just math, discipline, and a plan.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: C.warmGray }}>
                I am currently pursuing my{" "}
                <strong>Accredited Financial Counselor (AFC®)</strong>{" "}
                designation through AFCPE to bring even more depth to my
                coaching and teaching.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                alignContent: "center",
              }}
            >
              {[
                { number: "$550K+", label: "Net worth at 33" },
                { number: "Coast FIRE", label: "Financial strategy" },
                { number: "Index Funds", label: "Investment approach" },
                { number: "AFC®", label: "Pursuing certification" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: C.cream,
                    borderRadius: 16,
                    padding: isMobile ? 20 : 28,
                    border: `1px solid ${C.sageLight}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: isMobile ? 16 : 20,
                      fontWeight: 600,
                      color: C.sage,
                      marginBottom: 6,
                    }}
                  >
                    {item.number}
                  </div>
                  <div style={{ fontSize: 13, color: C.warmGray }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section
        id="calculator"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: isMobile ? "60px 20px" : "80px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: C.sage,
              marginBottom: 12,
            }}
          >
            Free Tool
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 30 : 40,
              fontWeight: 500,
              margin: "0 0 12px",
            }}
          >
            Coast FIRE Calculator
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.warmGray,
              maxWidth: 520,
              margin: "0 auto",
            }}
          >
            Find out when you can stop contributing and let compound growth
            carry you to retirement.
          </p>
        </div>
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
            border: `1px solid ${C.sageLight}`,
            background: C.white,
          }}
        >
          <iframe
            src="https://coastfirecalc.io"
            title="Coast FIRE Calculator"
            style={{
              width: "100%",
              height: isMobile ? 700 : 900,
              border: "none",
              display: "block",
            }}
          />
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: C.warmGray,
            marginTop: 16,
            fontStyle: "italic",
          }}
        >
          For educational purposes only. Not financial advice.
        </p>
      </section>

      {/* BOOKS */}
      <section id="books" style={{ background: C.white }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: isMobile ? "60px 20px" : "80px 40px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 2,
                color: C.sage,
                marginBottom: 12,
              }}
            >
              Reading List
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 30 : 40,
                fontWeight: 500,
                margin: "0 0 8px",
              }}
            >
              The Bookshelf
            </h2>
            <p style={{ fontSize: 16, color: C.warmGray }}>
              What I have read, what I am reading, and what is next on my list.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 36,
              flexWrap: "wrap",
            }}
          >
            {[
              ["foundations", "Foundations"],
              ["investing", "Investing"],
              ["retirement", "Retirement"],
            ].map(([level, label]) => (
              <button
                key={level}
                onClick={() => {
                  setBookLevel(level);
                  track("book_tab_click", { tab: level });
                }}
                style={{
                  background: bookLevel === level ? C.sage : "transparent",
                  color: bookLevel === level ? C.white : C.warmGray,
                  border: `1.5px solid ${bookLevel === level ? C.sage : C.sageLight}`,
                  padding: isMobile ? "8px 18px" : "10px 24px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {BOOKS[bookLevel].map((book, i) => (
              <div
                key={`${bookLevel}-${i}`}
                style={{
                  background: C.cream,
                  borderRadius: 16,
                  padding: isMobile ? 22 : 28,
                  border: `1px solid ${C.sageLight}`,
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  opacity: book.read ? 1 : 0.75,
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 24px rgba(0,0,0,0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      padding: "4px 10px",
                      borderRadius: 6,
                      background:
                        book.tag === "On my TBR"
                          ? "#F0EDEB"
                          : book.tag === "Currently reading"
                            ? C.goldLight
                            : C.sageLight,
                      color:
                        book.tag === "On my TBR"
                          ? C.warmGray
                          : book.tag === "Currently reading"
                            ? C.gold
                            : C.sageDark,
                      fontSize: 11,
                      fontWeight: 500,
                    }}
                  >
                    {book.tag}
                  </div>
                  {book.hasNotes && (
                    <button
                      onClick={() => {
                        setNotesBook(book);
                        track("notes_open", { book: book.title });
                      }}
                      style={{
                        background: C.sageLight,
                        border: "none",
                        borderRadius: 6,
                        padding: "5px 10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        color: C.sageDark,
                        fontSize: 11,
                        fontWeight: 500,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <NotesIcon /> My Notes
                    </button>
                  )}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 19,
                    fontWeight: 500,
                    margin: "0 0 4px",
                    lineHeight: 1.3,
                  }}
                >
                  {book.title}
                </h3>
                <div
                  style={{
                    fontSize: 13,
                    color: C.sage,
                    fontWeight: 500,
                    marginBottom: 10,
                  }}
                >
                  {book.author}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: C.warmGray,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {book.desc}
                </p>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  {book.amazon && book.amazon !== "#" && (
                    <a
                      href={book.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("book_click", {
                          book: book.title,
                          store: "amazon",
                        })
                      }
                      style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        border: `1px solid ${C.sageLight}`,
                        background: C.white,
                        fontSize: 12,
                        fontWeight: 500,
                        color: C.warmBlack,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Amazon ↗
                    </a>
                  )}
                  {book.walmart && (
                    <a
                      href={book.walmart}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("book_click", {
                          book: book.title,
                          store: "walmart",
                        })
                      }
                      style={{
                        padding: "8px 14px",
                        borderRadius: 6,
                        border: `1px solid ${C.sageLight}`,
                        background: C.white,
                        fontSize: 12,
                        fontWeight: 500,
                        color: C.warmBlack,
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      Walmart ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: C.warmGray,
              marginTop: 24,
              fontStyle: "italic",
            }}
          >
            Some links on this page are affiliate links, which means I may earn
            a small commission if you purchase through them. It does not cost
            you anything extra.
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: C.warmGray,
              marginTop: 8,
            }}
          >
            TBR = To Be Read. I only feature books I have read or am actively
            reading. TBR books are ones I plan to read next.
          </p>
        </div>
      </section>

      {/* WORK WITH ME */}
      <section
        id="services"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: isMobile ? "60px 20px" : "80px 40px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: C.sage,
              marginBottom: 12,
            }}
          >
            Services
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 30 : 40,
              fontWeight: 500,
              margin: 0,
            }}
          >
            Work With Me
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 20,
          }}
        >
          {[
            {
              title: "Coast FIRE Roadmap",
              price: "$197",
              type: "One-time session",
              features: [
                "90-minute deep dive",
                "Custom Coast FIRE plan",
                "Investment strategy overview",
                "Values-based spending plan",
                "Recording + action items",
              ],
              cta: "Book a Session",
              href: "https://calendly.com",
              active: true,
            },
            {
              title: "Coaching Package",
              price: "$497",
              type: "3 months",
              featured: true,
              features: [
                "6 coaching sessions",
                "Coast FIRE calculator walkthrough",
                "Spending and savings audit",
                "Accountability check-ins",
                "Async support via email",
              ],
              cta: "Get Started",
              href: "https://calendly.com",
              active: true,
            },
            {
              title: "Group Workshop",
              price: "",
              type: "Coming soon",
              features: [
                "Live 2-hour workshop",
                "Coast FIRE fundamentals",
                "Interactive exercises",
                "Community Q&A",
                "Resource guide",
              ],
              cta: "Get Notified",
              href: "#",
              active: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              style={{
                background: plan.featured ? C.sage : C.white,
                color: plan.featured ? C.white : C.warmBlack,
                borderRadius: 20,
                padding: isMobile ? 28 : 36,
                border: plan.featured ? "none" : `1px solid ${C.sageLight}`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transform: plan.featured && !isMobile ? "scale(1.03)" : "none",
                boxShadow: plan.featured
                  ? "0 8px 32px rgba(139,158,126,0.3)"
                  : "none",
                opacity: plan.active ? 1 : 0.7,
              }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: C.gold,
                    color: C.white,
                    padding: "4px 16px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  Most Popular
                </div>
              )}
              {!plan.active && (
                <div
                  style={{
                    position: "absolute",
                    top: isMobile ? 12 : 16,
                    right: isMobile ? 12 : 16,
                    background: C.goldLight,
                    color: C.gold,
                    padding: "4px 12px",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Coming Soon
                </div>
              )}
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 20 : 24,
                  fontWeight: 500,
                  margin: "0 0 8px",
                }}
              >
                {plan.title}
              </h3>
              <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 20 }}>
                {plan.type}
              </div>
              {plan.price ? (
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: isMobile ? 28 : 36,
                    fontWeight: 700,
                    marginBottom: 24,
                  }}
                >
                  {plan.price}
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 18,
                    fontWeight: 500,
                    marginBottom: 24,
                    color: plan.featured ? "rgba(255,255,255,0.6)" : C.warmGray,
                  }}
                >
                  Price TBD
                </div>
              )}
              <div style={{ flex: 1 }}>
                {plan.features.map((f, j) => (
                  <div
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 12,
                      fontSize: 14,
                      opacity: 0.9,
                    }}
                  >
                    <span
                      style={{
                        color: plan.featured ? C.goldLight : C.sage,
                        fontSize: 16,
                      }}
                    >
                      ✓
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a
                href={plan.href}
                target={plan.active ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => track("service_click", { service: plan.title })}
                style={{
                  marginTop: 24,
                  display: "block",
                  width: "100%",
                  padding: "14px 0",
                  borderRadius: 8,
                  border: plan.featured
                    ? "1.5px solid rgba(255,255,255,0.4)"
                    : `1.5px solid ${plan.active ? C.sage : C.sageLight}`,
                  background: plan.featured
                    ? "rgba(255,255,255,0.15)"
                    : "transparent",
                  color: plan.featured
                    ? C.white
                    : plan.active
                      ? C.sage
                      : C.warmGray,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: plan.active ? "pointer" : "default",
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "center",
                  textDecoration: "none",
                  boxSizing: "border-box",
                }}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: C.warmGray,
            marginTop: 24,
            fontStyle: "italic",
          }}
        >
          Mariah is not a registered investment advisor. Coaching is educational
          in nature and does not constitute personalized financial advice.
        </p>
      </section>

      {/* NEWSLETTER + SOCIALS */}
      <section style={{ background: C.sage }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: isMobile ? "48px 20px" : "64px 40px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 26 : 32,
              fontWeight: 500,
              color: C.white,
              margin: "0 0 12px",
            }}
          >
            Join the Newsletter
          </h2>
          <p
            style={{
              fontSize: isMobile ? 14 : 16,
              color: "rgba(255,255,255,0.8)",
              maxWidth: 460,
              margin: "0 auto 28px",
            }}
          >
            Weekly insights on Coast FIRE, index fund investing, and building
            wealth without giving up what you love.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "center",
              gap: 12,
              maxWidth: 440,
              margin: "0 auto 32px",
            }}
          >
            <input
              type="email"
              id="newsletter-email"
              placeholder="your@email.com"
              style={{
                flex: 1,
                padding: "14px 20px",
                borderRadius: 8,
                border: "none",
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                background: "rgba(255,255,255,0.95)",
              }}
            />
            <button
              onClick={() => {
                const email = document.getElementById("newsletter-email").value;
                if (!email) return;
                track("newsletter_signup", { location: "footer" });
                fetch("https://app.kit.com/forms/9197742/subscriptions", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email_address: email }),
                })
                  .then(() => {
                    document.getElementById("newsletter-email").value = "";
                    alert("You are on the list! Check your email to confirm.");
                  })
                  .catch(() =>
                    alert("Something went wrong. Please try again."),
                  );
              }}
              style={{
                background: C.warmBlack,
                color: C.white,
                border: "none",
                padding: "14px 28px",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Subscribe
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            {[
              {
                icon: <InstagramIcon />,
                href: "https://www.instagram.com/mariahakinbi/",
                label: "Instagram",
              },
              { icon: <YoutubeIcon />, href: "https://www.youtube.com/@mariahakinbi", label: "YouTube" },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                onClick={() => track("social_click", { platform: s.label })}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.85)",
                  transition: "background 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "rgba(255,255,255,0.15)")
                }
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: C.warmBlack,
          padding: isMobile ? "32px 20px" : "40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 18,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 8,
          }}
        >
          money with <span style={{ color: C.sage }}>mariah</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 12 : 24,
            marginBottom: 12,
            flexWrap: "wrap",
          }}
        >
          {[
            ["Privacy Policy", "/privacy.html"],
            ["Terms of Service", "/terms.html"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.6)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.35)")
              }
            >
              {label}
            </a>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          © 2026 Money with Mariah · Educational content only, not financial
          advice
        </div>
      </footer>
    </div>
  );
}
