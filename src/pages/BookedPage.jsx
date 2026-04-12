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

const CHECKLIST = [
  { text: "Watch the video above", href: null },
  {
    text: "Fill out the pre-call questionnaire",
    href: "https://forms.gle/miQT4zT2ZXN3bUdK8",
  },
  { text: "Try the Coast FIRE calculator", href: "https://coastfirecalc.io" },
  {
    text: "Check your email for the calendar invite and Google Meet link",
    href: null,
  },
];

const FAQS = [
  {
    q: "What if I need to reschedule?",
    a: "Use the link in your calendar invite. I ask for at least 2 hours notice.",
  },
  {
    q: "What do I need to prepare?",
    a: "Fill out the questionnaire above and think about one question you want answered.",
  },
  {
    q: "How long is the call?",
    a: "15 minutes. I respect your time.",
  },
];

export default function BookedPage() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        background: C.cream,
        color: C.warmBlack,
        fontFamily: "'DM Sans', sans-serif",
        minHeight: "100vh",
      }}
    >
      <NavBar />
      <HeroSection isMobile={isMobile} />
      <VideoSection isMobile={isMobile} />
      <ChecklistSection isMobile={isMobile} />
      <FAQSection isMobile={isMobile} />
      <Footer />
    </div>
  );
}

function NavBar() {
  return (
    <nav
      style={{
        padding: "20px 24px",
        background: C.cream,
        borderBottom: `1px solid ${C.sageLight}`,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Link to="/" style={{ textDecoration: "none", color: C.warmBlack }}>
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
      </div>
    </nav>
  );
}

function HeroSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "48px 24px 0" : "72px 24px 0",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 32 : 44,
            lineHeight: 1.15,
            margin: 0,
            marginBottom: 14,
            color: C.sage,
            fontWeight: 500,
          }}
        >
          You are booked!
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 19,
            lineHeight: 1.6,
            color: C.warmGray,
            margin: 0,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Here is how to get the most out of our call.
        </p>
      </div>
    </section>
  );
}

function VideoSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "40px 24px" : "48px 24px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
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
            textAlign: "center",
          }}
        >
          Watch: What to expect on your discovery call
        </div>
      </div>
    </section>
  );
}

function ChecklistSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "20px 24px 40px" : "20px 24px 56px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {CHECKLIST.map((item, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                border: `1px solid ${C.sageLight}`,
                borderRadius: 12,
                padding: "18px 22px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: C.sage,
                  color: C.white,
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i + 1}
              </div>
              <div style={{ flex: 1 }}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{
                      fontSize: 16,
                      color: C.sage,
                      fontWeight: 500,
                      textDecoration: "underline",
                      textUnderlineOffset: 3,
                    }}
                  >
                    {item.text}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 16,
                      color: C.warmBlack,
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </span>
                )}
                {item.note && (
                  <div
                    style={{
                      fontSize: 13,
                      color: C.warmGray,
                      fontStyle: "italic",
                      marginTop: 4,
                    }}
                  >
                    {item.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ isMobile }) {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section
      style={{
        padding: isMobile ? "20px 24px 60px" : "20px 24px 80px",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: C.sage,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 12,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          FAQ
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 24 : 30,
            margin: 0,
            marginBottom: 24,
            color: C.warmBlack,
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          Common questions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((item, i) => (
            <div
              key={i}
              style={{
                background: C.white,
                border: `1px solid ${C.sageLight}`,
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
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
                <span>{item.q}</span>
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
                    transform:
                      openIdx === i ? "rotate(180deg)" : "rotate(0deg)",
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
              {openIdx === i && (
                <div
                  style={{
                    padding: "0 24px 22px",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: C.warmGray,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: "40px 24px 60px",
        background: C.cream,
        borderTop: `1px solid ${C.sageLight}`,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            margin: 0,
            marginBottom: 16,
            color: C.warmBlack,
            fontWeight: 500,
          }}
        >
          money with{" "}
          <span style={{ color: C.sage, fontStyle: "italic" }}>mariah</span>
        </h3>
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          <a
            href="/privacy.html"
            style={{
              fontSize: 13,
              color: C.warmGray,
              textDecoration: "none",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: 0.5,
            }}
          >
            Privacy Policy
          </a>
          <a
            href="/terms.html"
            style={{
              fontSize: 13,
              color: C.warmGray,
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
            color: C.warmGray,
            margin: 0,
            fontFamily: "'DM Mono', monospace",
            letterSpacing: 0.3,
            lineHeight: 1.6,
          }}
        >
          2026 Money with Mariah. Educational content only, not financial
          advice.
        </p>
      </div>
    </footer>
  );
}
