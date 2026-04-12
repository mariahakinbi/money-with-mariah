import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const C = {
  dark: "#242424",
  darkCard: "#2F2F2F",
  darkAlt: "#2A2A2A",
  sage: "#8B9E7E",
  sageDark: "#6B7E5E",
  sageLight: "#D4DFC8",
  gold: "#C4A35A",
  goldLight: "#E8D6A8",
  white: "#FFFFFF",
  textLight: "#E8E5E0",
  textMuted: "rgba(255,255,255,0.72)",
  textDim: "rgba(255,255,255,0.55)",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.15)",
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
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
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
    icon: "\u{1F3AF}",
    title: "You are investing, but you have no plan.",
    body: "Money goes into your 401k and maybe a brokerage, but you have no idea if it is enough.",
  },
  {
    icon: "\u{1F522}",
    title: "You do not know your number.",
    body: "You have heard of FIRE but have no idea what your actual Coast FIRE number is.",
  },
  {
    icon: "\u{23F3}",
    title: "You feel like you will be working forever.",
    body: "Retiring at 65 feels like the only option, even though you earn good money.",
  },
  {
    icon: "\u{1F305}",
    title: "You want to enjoy life now, not just later.",
    body: "You do not want to sacrifice travel, food, and fun for decades.",
  },
];

const OUTCOMES = [
  {
    title: "Share where you are",
    body: "Tell me about your investments, your income, and what financial freedom looks like to you.",
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
  "You earn $80K+ and are investing but have no long-term plan",
  "You want work to be optional by your 40s or 50s",
  "You invest in index funds (or want to) but are not sure if it is enough",
  "You want to travel, give, and live well without sacrificing your future",
  "You have heard of FIRE but do not know which path is right",
  "You are tired of vague advice and want someone to look at your actual numbers",
];

const FAQS = [
  {
    q: "Is this really free?",
    a: "Yes. No strings attached. It is a real conversation about your finances, not a sales pitch.",
  },
  {
    q: "What is Coast FIRE?",
    a: "The point where your investments will grow to support your retirement on their own, without additional contributions. Once you hit that number, you only need to earn enough for current expenses. Work becomes optional.",
  },
  {
    q: "Do you give investment advice?",
    a: "I share what I personally do (index funds, target date funds), but I am not a registered investment advisor. Coaching is educational, not advisory.",
  },
  {
    q: "I do not make $150K. Is this for me?",
    a: "Yes. Coast FIRE works at any income. I started at $79K.",
  },
  {
    q: "What if I am in debt?",
    a: "Totally fine. We can talk about prioritizing debt payoff alongside building toward financial independence.",
  },
  {
    q: "What happens after the call?",
    a: "You leave with a clear next step. If coaching fits, I share the options ($197 roadmap session or $497 three-month coaching package). If not, you still leave with value.",
  },
];

export default function CoastFirePage() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        background: C.dark,
        color: C.textLight,
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

function CTAButton({ children, variant = "sage", onClick, position }) {
  const variants = {
    sage: {
      background: C.sage,
      color: C.white,
      border: `2px solid ${C.sage}`,
      shadow: `0 6px 20px ${C.sage}50`,
    },
    white: {
      background: C.white,
      color: C.sageDark,
      border: `2px solid ${C.white}`,
      shadow: "0 6px 20px rgba(0,0,0,0.35)",
    },
    gold: {
      background: C.gold,
      color: C.dark,
      border: `2px solid ${C.gold}`,
      shadow: `0 6px 20px ${C.gold}45`,
    },
  };
  const v = variants[variant];
  return (
    <a
      href={BOOKING_HREF}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        track("cta_click", {
          page: "coastfire",
          position: position || variant,
        });
        if (onClick) onClick();
      }}
      style={{
        display: "inline-block",
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
        background: v.background,
        color: v.color,
        border: v.border,
        boxShadow: v.shadow,
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
        color: light ? "rgba(255,255,255,0.85)" : C.textMuted,
        fontFamily: "'DM Sans', sans-serif",
        fontStyle: "italic",
      }}
    >
      {children}
    </p>
  );
}

function SectionLabel({ children, color }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: color || C.gold,
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

function SectionHeading({ children, isMobile, color }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? 30 : 42,
        lineHeight: 1.2,
        margin: 0,
        color: color || C.white,
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
        background: C.dark,
        borderBottom: `1px solid ${C.border}`,
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
            color: C.white,
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
            coast fire{" "}
            <span style={{ color: C.sage, fontStyle: "italic" }}>coach</span>
          </h1>
        </Link>
        <a
          href={BOOKING_HREF}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            track("cta_click", { page: "coastfire", position: "nav" })
          }
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
        background: C.dark,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "inline-block",
            background: `${C.sage}25`,
            border: `1px solid ${C.sage}`,
            color: C.sage,
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            padding: "8px 18px",
            borderRadius: 999,
            letterSpacing: 1.5,
            fontWeight: 500,
            marginBottom: 28,
            textTransform: "uppercase",
          }}
        >
          Coast FIRE Coach
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 32 : 50,
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 24,
            color: C.white,
            fontWeight: 500,
          }}
        >
          Find out how close you are to{" "}
          <span style={{ color: C.gold, fontStyle: "italic" }}>
            making work optional
          </span>
          .
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.6,
            color: C.textMuted,
            margin: 0,
            marginBottom: 36,
            maxWidth: 620,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Book a free 15-minute call. We will look at your numbers, estimate
          your Coast FIRE target, and talk about your next step toward financial
          freedom.
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
          background: C.darkCard,
          border: `1px solid ${C.borderStrong}`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: `0 12px 40px rgba(0,0,0,0.5)`,
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
              background: `${C.sage}25`,
              border: `2px solid ${C.sage}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width={isMobile ? 24 : 32}
              height={isMobile ? 24 : 32}
              viewBox="0 0 24 24"
              fill={C.sage}
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
          color: C.textDim,
          letterSpacing: 0.5,
        }}
      >
        Watch: How Coast FIRE works
      </div>
    </div>
  );
}

function SocialProof({ isMobile }) {
  const stats = [
    { value: "$566K", label: "Net Worth (2025)", color: C.gold },
    { value: "$38K", label: "Invested in 2025", color: C.sage },
    { value: "$17K", label: "Given in 2025", color: C.sage },
    { value: "$0", label: "Debt", color: C.gold },
  ];
  return (
    <section
      style={{
        padding: isMobile ? "32px 24px" : "44px 24px",
        background: C.dark,
      }}
    >
      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          background: C.darkCard,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: isMobile ? "28px 16px" : "36px 24px",
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
                fontSize: isMobile ? 24 : 34,
                color: s.color,
                fontWeight: 500,
                marginBottom: 6,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: C.textDim,
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
        background: C.dark,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Sound familiar?</SectionLabel>
          <SectionHeading isMobile={isMobile}>
            You are doing the right things. But something still feels off.
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
        background: C.darkCard,
        border: `1px solid ${C.border}`,
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
          color: C.white,
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
          color: C.textMuted,
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
          <SectionLabel color="rgba(255,255,255,0.85)">
            What You Get
          </SectionLabel>
          <SectionHeading isMobile={isMobile} color={C.white}>
            A real conversation about your path to financial freedom.
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
            maxWidth: 800,
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
          <CTAButton variant="white" position="what_you_get">
            {MAIN_CTA_TEXT}
          </CTAButton>
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
        background: C.dark,
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
              border: `3px solid ${C.sage}`,
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
                color: C.white,
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              I built $500K+ on 9-5 income. No inheritance. No crypto. Just a
              system.
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: C.textMuted,
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
                background: `${C.gold}1F`,
                color: C.gold,
                border: `1px solid ${C.gold}`,
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
            { value: "$566K", label: "Net Worth (2025)", color: C.gold },
            { value: "$38K", label: "Invested in 2025", color: C.sage },
            { value: "$17K", label: "Given in 2025", color: C.sage },
            { value: "$0", label: "Debt", color: C.gold },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: C.darkCard,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "18px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 22 : 28,
                  color: s.color,
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
                  color: C.textDim,
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
        <FAQList items={FAQS} page="coastfire" />
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <CTAButton position="about_faq">{MAIN_CTA_TEXT}</CTAButton>
          <CTANote>
            15 minutes could change how you think about your future.
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
        background: C.darkCard,
        border: `1px solid ${C.border}`,
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
          color: C.white,
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
            color: C.textMuted,
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
        background: C.darkAlt,
        color: C.white,
        textAlign: "center",
        borderTop: `1px solid ${C.border}`,
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
          Ready to find out how close you are?
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.6,
            color: C.textMuted,
            margin: 0,
            marginBottom: 36,
          }}
        >
          Book a free 15-minute call. We will look at your numbers, estimate
          your Coast FIRE target, and talk about your next step toward financial
          freedom.
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
        background: C.dark,
        borderTop: `1px solid ${C.border}`,
        color: C.textDim,
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
              color: C.textDim,
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
              color: C.textDim,
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
              color: C.textDim,
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
            color: "rgba(255,255,255,0.4)",
          }}
        >
          2026 Money with Mariah. Educational content only, not financial
          advice.
        </p>
      </div>
    </footer>
  );
}
