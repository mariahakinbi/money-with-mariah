import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const C = {
  cream: "#FAF7F2",
  sage: "#8B9E7E",
  sageDark: "#6B7E5E",
  sageLight: "#D4DFC8",
  warmBlack: "#2C2C2C",
  warmGray: "#6B6560",
  gold: "#C4A35A",
  white: "#FFFFFF",
};

const BOOKING_HREF = "https://calendar.app.google/bA5uSgSG736weSL5A";
const NAV_CTA_TEXT = "Book a Free Call";
const MAIN_CTA_TEXT = "Book Your Free Discovery Call";

function track(event, params = {}) {
  try {
    if (window.gtag) window.gtag("event", event, params);
  } catch (e) {}
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

const PAIN_CARDS = [
  {
    icon: "\u{1F4B8}",
    title: "You have no system.",
    body: "Money comes in and goes out but you have no idea where it all goes.",
  },
  {
    icon: "\u{1F4C8}",
    title: "You know you should invest, but you keep putting it off.",
    body: "The options feel overwhelming and you are afraid of making the wrong choice.",
  },
  {
    icon: "\u{1F61F}",
    title: "You feel guilty when you spend on yourself.",
    body: "Travel, dining out, hobbies. You enjoy them but wonder if you should be saving instead.",
  },
  {
    icon: "\u{1F4AC}",
    title: "You do not have anyone to talk to about money.",
    body: "Your friends do not talk about it. Your family gives outdated advice. You are figuring it out alone.",
  },
];

const OUTCOMES = [
  {
    title: "Share where you are",
    body: "Tell me about your income, your goals, and what feels off about your money right now.",
  },
  {
    title: "Get a fresh perspective",
    body: "I will share an honest observation or insight based on what you tell me.",
  },
  {
    title: "Ask me anything",
    body: "Bring your biggest money question. No topic is off limits.",
  },
  {
    title: "See if coaching is right for you",
    body: "If it makes sense to work together, I will explain how. If not, no pressure at all.",
  },
];

const FOR_YOU_IF = [
  "You earn good money but have no real system for it",
  "You want to start investing but do not know where to begin",
  "You feel guilty spending on things you love",
  "You want to be intentional with your money, not restrictive",
  "You are tired of generic advice that says just budget better",
  "You want someone who actually gets it",
];

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes. No strings attached. It is a real conversation about your finances, not a sales pitch.",
  },
  {
    q: "Do you give investment advice?",
    a: "I share what I personally do and why (index funds, target date funds), but I am not a registered investment advisor. Coaching is educational.",
  },
  {
    q: "What if I am in debt?",
    a: "Totally fine. We can talk about prioritizing debt payoff alongside building wealth.",
  },
  {
    q: "I do not make a lot of money. Is this for me?",
    a: "Yes. The system works at any income level. I started at $79K.",
  },
  {
    q: "What happens after the call?",
    a: "You leave with a clear next step. If coaching fits, I share the options ($197 roadmap session or $497 three-month coaching package). If not, no hard feelings.",
  },
];

export default function CoachingPage() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        background: C.white,
        color: C.warmBlack,
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <Hero isMobile={isMobile} />
      <SocialProof isMobile={isMobile} />
      <ProblemSection isMobile={isMobile} />
      <WhatYouGet isMobile={isMobile} />
      <AboutAndFAQ isMobile={isMobile} />
      <FinalCTA isMobile={isMobile} />
      <Footer />
    </div>
  );
}

function CTAButton({ children, variant = "sage", onClick, full = false, position }) {
  const variants = {
    sage: { background: C.sage, color: C.white, border: `2px solid ${C.sage}` },
    white: {
      background: C.white,
      color: C.sageDark,
      border: `2px solid ${C.white}`,
    },
    outline: {
      background: "transparent",
      color: C.sage,
      border: `2px solid ${C.sage}`,
    },
  };
  return (
    <a
      href={BOOKING_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("cta_click", { page: "coaching", position: position || variant });
        if (onClick) onClick();
      }}
      style={{
        display: full ? "block" : "inline-block",
        textAlign: "center",
        padding: "18px 36px",
        borderRadius: 12,
        fontSize: 16,
        fontWeight: 500,
        fontFamily: "'DM Sans', sans-serif",
        textDecoration: "none",
        letterSpacing: 0.3,
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.2s ease",
        boxShadow:
          variant === "sage"
            ? `0 4px 16px ${C.sage}40`
            : variant === "white"
              ? "0 4px 16px rgba(0,0,0,0.15)"
              : "none",
        ...variants[variant],
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {children}
    </a>
  );
}

function CTANote({ children, light = false }) {
  return (
    <p
      style={{
        marginTop: 14,
        marginBottom: 0,
        fontSize: 13,
        color: light ? "rgba(255,255,255,0.85)" : C.warmGray,
        fontFamily: "'DM Sans', sans-serif",
        fontStyle: "italic",
      }}
    >
      {children}
    </p>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: light ? "rgba(255,255,255,0.85)" : C.sage,
        letterSpacing: 2,
        textTransform: "uppercase",
        marginBottom: 12,
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children, isMobile, light = false }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? 30 : 42,
        lineHeight: 1.2,
        margin: 0,
        color: light ? C.white : C.warmBlack,
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
  );
}

function NavBar() {
  return (
    <nav
      style={{
        padding: "20px 24px",
        background: C.white,
        borderBottom: `1px solid ${C.sageLight}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: C.warmBlack,
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              margin: 0,
              fontWeight: 500,
            }}
          >
            money with{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>mariah</span>
          </h1>
        </Link>
        <a
          href={BOOKING_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("cta_click", { page: "coaching", position: "nav" })}
          style={{
            background: C.sage,
            color: C.white,
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: 0.3,
          }}
        >
          {NAV_CTA_TEXT}
        </a>
      </div>
    </nav>
  );
}

function Hero({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px 40px" : "100px 24px 60px",
        background: C.white,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 32 : 50,
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 24,
            color: C.warmBlack,
            fontWeight: 500,
          }}
        >
          Stop guessing with your money. Start building a system.
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.6,
            color: C.warmGray,
            margin: 0,
            marginBottom: 36,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Book a free 15-minute call. We will talk about where your money is
          going, what is working, and one thing you can change this week.
        </p>
        <CTAButton position="hero">{MAIN_CTA_TEXT}</CTAButton>
        <CTANote>
          Free. No pitch. Just a real conversation about your money.
        </CTANote>
        <div style={{ marginTop: 56 }}>
          <VideoPlaceholder isMobile={isMobile} />
        </div>
      </div>
    </section>
  );
}

function VideoPlaceholder({ isMobile }) {
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "56.25%",
          background: C.warmBlack,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 12px 40px ${C.sage}25`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: isMobile ? 64 : 84,
              height: isMobile ? 64 : 84,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(4px)",
            }}
          >
            <svg
              width={isMobile ? 24 : 32}
              height={isMobile ? 24 : 32}
              viewBox="0 0 24 24"
              fill={C.white}
            >
              <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: C.warmGray,
          letterSpacing: 0.5,
        }}
      >
        Watch: How I built $566K on 9-5 income
      </div>
    </div>
  );
}

function SocialProof({ isMobile }) {
  const stats = [
    { value: "$566K", label: "Net Worth (2025)" },
    { value: "$38K", label: "Invested in 2025" },
    { value: "$17K", label: "Given in 2025" },
    { value: "$0", label: "Debt" },
  ];
  return (
    <section
      style={{
        padding: isMobile ? "32px 24px" : "44px 24px",
        background: C.white,
        borderTop: `1px solid ${C.sageLight}`,
        borderBottom: `1px solid ${C.sageLight}`,
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: isMobile ? 16 : 24,
          textAlign: "center",
        }}
      >
        {stats.map((s, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 24 : 36,
                color: C.sage,
                fontWeight: 500,
                marginBottom: 4,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: C.warmGray,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProblemSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Sound familiar?</SectionLabel>
          <SectionHeading isMobile={isMobile}>
            You make good money. But you still feel behind.
          </SectionHeading>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 20,
            marginBottom: 48,
          }}
        >
          {PAIN_CARDS.map((card, i) => (
            <PainCard key={i} {...card} />
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <CTAButton position="problem">{MAIN_CTA_TEXT}</CTAButton>
          <CTANote>15 minutes. Find out where you actually stand.</CTANote>
        </div>
      </div>
    </section>
  );
}

function PainCard({ icon, title, body }) {
  return (
    <div
      style={{
        background: C.white,
        border: `1px solid ${C.sageLight}`,
        borderRadius: 16,
        padding: 28,
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 14 }}>{icon}</div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          margin: 0,
          marginBottom: 10,
          color: C.warmBlack,
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: C.warmGray,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function WhatYouGet({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.sage,
        color: C.white,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel light>What You Get</SectionLabel>
          <SectionHeading isMobile={isMobile} light>
            A real conversation about your money. No pitch, no pressure.
          </SectionHeading>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {OUTCOMES.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 14,
                padding: "24px 24px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  color: C.white,
                  fontWeight: 500,
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "rgba(255,255,255,0.88)",
                }}
              >
                {item.body}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.3)",
            margin: "8px auto 40px",
            maxWidth: 200,
          }}
        />
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? 24 : 30,
              margin: 0,
              marginBottom: 28,
              color: C.white,
              fontWeight: 500,
            }}
          >
            This call is for you if...
          </h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: 14,
            marginBottom: 48,
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {FOR_YOU_IF.map((text, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                fontSize: 15,
                lineHeight: 1.5,
                color: C.white,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: C.white,
                  color: C.sage,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>{text}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <CTAButton variant="white" position="what_you_get">{MAIN_CTA_TEXT}</CTAButton>
          <CTANote light>No commitment. Just clarity.</CTANote>
        </div>
      </div>
    </section>
  );
}

function AboutAndFAQ({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.white,
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? 24 : 36,
            textAlign: isMobile ? "center" : "left",
            marginBottom: 32,
          }}
        >
          <img
            src="/profpic_square.png"
            alt="Mariah"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: `3px solid ${C.sageLight}`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <SectionLabel>About</SectionLabel>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? 24 : 30,
                margin: 0,
                marginBottom: 14,
                color: C.warmBlack,
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              I built $566K on 9-5 income. No inheritance. No crypto.
              Just a system.
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: C.warmGray,
                margin: 0,
                marginBottom: 16,
              }}
            >
              I am Mariah, a 33-year-old data engineer pursuing my AFC
              certification. I give 17% of my take-home to causes I care about,
              invest 38% in index funds, and still spend freely on travel and
              great food.
            </p>
            <div
              style={{
                display: "inline-block",
                background: C.sageLight,
                color: C.sageDark,
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                padding: "6px 14px",
                borderRadius: 999,
                letterSpacing: 1,
                fontWeight: 500,
              }}
            >
              PURSUING AFC CERTIFICATION
            </div>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: isMobile ? 12 : 16,
            marginBottom: 64,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {[
            { value: "$566K", label: "Net Worth (2025)" },
            { value: "$38K", label: "Invested in 2025" },
            { value: "$17K", label: "Given in 2025" },
            { value: "$0", label: "Debt" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: C.cream,
                border: `1px solid ${C.sageLight}`,
                borderRadius: 12,
                padding: "18px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 22 : 26,
                  color: C.sage,
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: C.warmGray,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading isMobile={isMobile}>Common questions</SectionHeading>
        </div>
        <FAQList items={FAQS} page="coaching" />
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <CTAButton position="about_faq">{MAIN_CTA_TEXT}</CTAButton>
          <CTANote>
            15 minutes could change how you think about your money.
          </CTANote>
        </div>
      </div>
    </section>
  );
}

function FAQList({ items, page }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <FAQItem
          key={i}
          q={item.q}
          a={item.a}
          isOpen={openIdx === i}
          onToggle={() => {
            const opening = openIdx !== i;
            setOpenIdx(opening ? i : null);
            if (opening) {
              track("faq_toggle", { page, question: item.q });
            }
          }}
        />
      ))}
    </div>
  );
}

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div
      style={{
        background: C.cream,
        border: `1px solid ${C.sageLight}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "20px 24px",
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 16,
          color: C.warmBlack,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          lineHeight: 1.4,
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: C.sage,
            color: C.white,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div
          style={{
            padding: "0 24px 22px",
            fontSize: 15,
            lineHeight: 1.65,
            color: C.warmGray,
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

function FinalCTA({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.warmBlack,
        color: C.white,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 30 : 42,
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 20,
            color: C.white,
            fontWeight: 500,
          }}
        >
          Ready to take control of your money?
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            marginBottom: 36,
          }}
        >
          Book a free 15-minute call. We will talk about where you are, where
          you want to be, and one thing you can do this week.
        </p>
        <CTAButton position="final">{MAIN_CTA_TEXT}</CTAButton>
        <CTANote light>Free. 15 minutes. No obligation.</CTANote>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "32px 24px",
        background: C.warmBlack,
        borderTop: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.7)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            moneywithmariah.com
          </Link>
          <a
            href="/privacy.html"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            Privacy
          </a>
          <a
            href="/terms.html"
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.7)",
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            Terms
          </a>
        </div>
        <p
          style={{
            fontSize: 12,
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: 0.3,
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.55)",
          }}
        >
          2026 Money with Mariah. Educational content only, not financial
          advice.
        </p>
      </div>
    </footer>
  );
}
