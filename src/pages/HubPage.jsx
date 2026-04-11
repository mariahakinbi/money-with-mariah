import { useState, useEffect, useRef } from "react";
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

function track(event, params = {}) {
  try {
    if (window.gtag) window.gtag("event", event, params);
  } catch (e) {}
}

const ROUTING_CARDS = [
  {
    icon: "\u{1F4BC}",
    title: "Money Coaching",
    desc: "Build a system for your money. Stop guessing, start growing.",
    href: "/coaching",
    external: false,
    label: "EXPLORE COACHING",
  },
  {
    icon: "\u{1F331}",
    title: "Coast FIRE Planning",
    desc: "Find out how close you are to making work optional.",
    href: "/coastfire",
    external: false,
    label: "PLAN YOUR PATH",
  },
  {
    icon: "\u{1F381}",
    title: "Free Resources",
    desc: "Coast FIRE calculator, book recommendations, and the blog.",
    href: "https://coastfirecalc.io",
    external: true,
    label: "OPEN CALCULATOR",
  },
];

const MILESTONES = [
  { date: "2014", age: "age 21", title: "First Investment", body: "Made my first investment during a college internship. I had no idea what I was doing, but I started." },
  { date: "2015", age: "", title: "Graduated College", body: "Graduated with a degree I knew I did not want to use full-time. I did not know much about investing, but I knew the more I put in early, the better for future-Mariah." },
  { date: "2018", age: "", title: "First Full Time Job", body: "Started at $79K and immediately set up my 401k at $500 a month. Future me thanks past me." },
  { date: "Jan 2021", age: "", title: "$105K Net Worth", body: "Hit 6-figure net worth, mainly from consistent contributions to my 401k and Roth IRA." },
  { date: "Jun 2022", age: "", title: "$125K Net Worth", body: "Started maxing out my 401k contributions. Discovered Coast FIRE around this time, which changed how I thought about my entire financial plan." },
  { date: "Jan 2023", age: "", title: "$274K Net Worth", body: "Kept contributing through the 2022 downturn. Buying when the market was down turned out to be one of the best things I did. Started AFC classes in December." },
  { date: "Dec 2023", age: "", title: "$328K Net Worth", body: "Consistent contributions and compound growth doing the heavy lifting." },
  { date: "Jul 2024", age: "", title: "$420K Net Worth", body: "Crossed $400K. The system just works when you leave it alone." },
  { date: "Dec 2024", age: "", title: "$464K Net Worth", body: "Kept investing, kept giving, kept living. Another year of the system doing its thing." },
  { date: "Dec 2025", age: "", title: "$566K Net Worth", body: "On track to retire at 48 on $5K/month. Work is becoming a choice, not a requirement." },
];

const QUESTIONS = [
  {
    q: "What does your ideal life look like five years from now?",
    options: [
      { text: "Working a job I love with a real safety net", scores: { coast: 3, barista: 1 } },
      { text: "Working part time on something flexible and meaningful", scores: { barista: 3, coast: 1 } },
      { text: "Fully retired with a simple, low cost lifestyle", scores: { lean: 3 } },
      { text: "Fully retired with travel, comfort, and zero compromises", scores: { fat: 3 } },
    ],
  },
  {
    q: "How do you feel about your spending right now?",
    options: [
      { text: "I keep it tight and would rather save than spend", scores: { lean: 3, coast: 1 } },
      { text: "Comfortable middle of the road with room for what I love", scores: { coast: 3, barista: 1 } },
      { text: "I want to spend freely without tracking every dollar", scores: { fat: 3 } },
      { text: "I just want enough to cover bills without working full time", scores: { barista: 3 } },
    ],
  },
  {
    q: "How do you actually want to spend your time?",
    options: [
      { text: "Doing meaningful work on my own terms", scores: { coast: 3, barista: 2 } },
      { text: "A mix of part time work and creative projects", scores: { barista: 3 } },
      { text: "Travel, hobbies, and not thinking about money", scores: { fat: 3 } },
      { text: "Quiet and simple days at home", scores: { lean: 3 } },
    ],
  },
  {
    q: "What feels like enough money for your future self?",
    options: [
      { text: "Enough to cover the basics, nothing fancy", scores: { lean: 3 } },
      { text: "Enough to live comfortably and give generously", scores: { coast: 3 } },
      { text: "Enough to cover benefits while I work part time", scores: { barista: 3 } },
      { text: "Enough to never worry about a price tag", scores: { fat: 3 } },
    ],
  },
];

const RESULTS = {
  coast: {
    title: "Coast FIRE",
    desc: "You want freedom without giving up work entirely. Coast FIRE means investing aggressively early so your portfolio grows on its own, and you only need to cover today's expenses going forward.",
    cta: "See My Coast FIRE Plan",
    href: "/coastfire",
    external: false,
  },
  lean: {
    title: "Lean FIRE",
    desc: "You value simplicity and freedom over flashy spending. Lean FIRE means hitting financial independence with a tight, intentional budget and reclaiming your time as early as possible.",
    cta: "Build Your Money System",
    href: "/coaching",
    external: false,
  },
  fat: {
    title: "Fat FIRE",
    desc: "You want financial independence without lowering your standard of living. Fat FIRE means building a larger nest egg so retirement looks like comfort, travel, and zero compromises.",
    cta: "Build Your Money System",
    href: "/coaching",
    external: false,
  },
  barista: {
    title: "Barista FIRE",
    desc: "You want a mix of meaningful part time work and real freedom. Barista FIRE means saving enough that part time income covers your lifestyle while your investments keep growing in the background.",
    cta: "Book a Free Discovery Call",
    href: "https://calendly.com",
    external: true,
  },
};

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

export default function HubPage() {
  const isMobile = useIsMobile();
  const quizRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    if (modalShown) return;
    const timer = setTimeout(() => {
      setModalOpen(true);
      setModalShown(true);
    }, 30000);

    const onScroll = () => {
      if (!quizRef.current) return;
      const rect = quizRef.current.getBoundingClientRect();
      if (rect.bottom < window.innerHeight * 0.5) {
        setModalOpen(true);
        setModalShown(true);
        clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [modalShown]);

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
      <Hero isMobile={isMobile} />
      <RoutingCardsSection isMobile={isMobile} />
      <TimelineSection isMobile={isMobile} />
      <div ref={quizRef}>
        <QuizSection isMobile={isMobile} />
      </div>
      <AboutSection isMobile={isMobile} />
      <NewsletterSection isMobile={isMobile} />
      <SocialSection />
      <Footer isMobile={isMobile} />
      {modalOpen && <LeadMagnetModal onClose={() => setModalOpen(false)} />}
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
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            margin: 0,
            color: C.warmBlack,
            fontWeight: 500,
          }}
        >
          money with{" "}
          <span style={{ color: C.sage, fontStyle: "italic" }}>mariah</span>
        </h1>
      </div>
    </nav>
  );
}

function Hero({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px 40px" : "100px 24px 60px",
        background: C.cream,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <img
          src="/profpic_square.png"
          alt="Mariah"
          style={{
            width: 200,
            height: 200,
            maxWidth: "60vw",
            maxHeight: "60vw",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: 32,
            border: `4px solid ${C.sageLight}`,
            boxShadow: `0 8px 32px ${C.sage}20`,
          }}
        />
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 30 : 46,
            lineHeight: 1.2,
            margin: 0,
            marginBottom: 24,
            color: C.warmBlack,
            fontWeight: 500,
          }}
        >
          I help people build wealth, give generously, and make work optional.
        </h2>
        <p
          style={{
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.6,
            color: C.warmGray,
            margin: 0,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Personal finance coaching, Coast FIRE planning, and free tools to
          take control of your money.
        </p>
      </div>
    </section>
  );
}

function RoutingCardsSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "40px 24px 60px" : "60px 24px 100px",
        background: C.cream,
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {ROUTING_CARDS.map((card, i) => (
          <RoutingCard key={i} {...card} />
        ))}
      </div>
    </section>
  );
}

function RoutingCard({ icon, title, desc, href, external, label }) {
  const [hover, setHover] = useState(false);
  const sharedStyle = {
    background: C.white,
    border: `1px solid ${C.sageLight}`,
    borderRadius: 16,
    padding: 32,
    textDecoration: "none",
    color: C.warmBlack,
    display: "block",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    transform: hover ? "translateY(-4px)" : "translateY(0)",
    boxShadow: hover
      ? `0 12px 32px ${C.sage}25`
      : `0 2px 8px ${C.sage}10`,
    cursor: "pointer",
  };

  const inner = (
    <>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          margin: 0,
          marginBottom: 12,
          fontWeight: 500,
          color: C.warmBlack,
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
          marginBottom: 20,
        }}
      >
        {desc}
      </p>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 12,
          color: C.sage,
          letterSpacing: 1,
          fontWeight: 500,
        }}
      >
        {label} {"\u2192"}
      </span>
    </>
  );

  const onClick = () => track("hub_card_click", { card: title });

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={sharedStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link
      to={href}
      style={sharedStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      {inner}
    </Link>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 12,
        color: C.sage,
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

function SectionHeading({ children, isMobile }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: isMobile ? 30 : 42,
        lineHeight: 1.2,
        margin: 0,
        marginBottom: 32,
        color: C.warmBlack,
        fontWeight: 500,
      }}
    >
      {children}
    </h2>
  );
}

function TimelineSection({ isMobile }) {
  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.white,
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>My Journey</SectionLabel>
          <SectionHeading isMobile={isMobile}>From $0 to $500k+</SectionHeading>
        </div>
        <div
          style={{
            position: "relative",
            paddingLeft: isMobile ? 40 : 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: isMobile ? 12 : "50%",
              top: 8,
              bottom: 8,
              width: 2,
              background: C.sageLight,
              transform: isMobile ? "none" : "translateX(-1px)",
            }}
          />
          {MILESTONES.map((m, i) => (
            <TimelineItem
              key={i}
              milestone={m}
              index={i}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ milestone, index, isMobile }) {
  const isLeft = !isMobile && index % 2 === 0;
  const isRight = !isMobile && index % 2 === 1;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: isMobile
          ? "flex-start"
          : isLeft
            ? "flex-start"
            : "flex-end",
        marginBottom: 40,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: isMobile ? -32 : "50%",
          top: 12,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: C.sage,
          border: `3px solid ${C.cream}`,
          transform: isMobile ? "none" : "translateX(-50%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          width: isMobile ? "100%" : "44%",
          paddingLeft: isMobile ? 0 : isRight ? 32 : 0,
          paddingRight: isMobile ? 0 : isLeft ? 32 : 0,
          textAlign: isMobile ? "left" : isLeft ? "right" : "left",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 12,
            color: C.sage,
            letterSpacing: 1,
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {milestone.date}
          {milestone.age ? ` \u00B7 ${milestone.age}` : ""}
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            margin: 0,
            marginBottom: 8,
            color: C.warmBlack,
            fontWeight: 500,
          }}
        >
          {milestone.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: C.warmGray,
            margin: 0,
          }}
        >
          {milestone.body}
        </p>
      </div>
    </div>
  );
}

function computeScores(history) {
  const s = { coast: 0, lean: 0, fat: 0, barista: 0 };
  history.forEach((opt) => {
    Object.entries(opt.scores).forEach(([k, v]) => {
      s[k] = (s[k] || 0) + v;
    });
  });
  return s;
}

function getWinner(s) {
  return Object.entries(s).reduce((a, b) => (b[1] > a[1] ? b : a))[0];
}

function QuizSection({ isMobile }) {
  const [history, setHistory] = useState([]);
  const [done, setDone] = useState(false);
  const step = history.length;

  function answer(option) {
    const newHistory = [...history, option];
    setHistory(newHistory);
    if (newHistory.length >= QUESTIONS.length) {
      setDone(true);
      track("quiz_complete", {
        result: getWinner(computeScores(newHistory)),
      });
    }
  }

  function back() {
    if (history.length > 0) {
      setHistory(history.slice(0, -1));
    }
  }

  function reset() {
    setHistory([]);
    setDone(false);
  }

  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.cream,
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionLabel>Find Your Path</SectionLabel>
          <SectionHeading isMobile={isMobile}>
            What type of FIRE are you?
          </SectionHeading>
        </div>
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.sageLight}`,
            borderRadius: 20,
            padding: isMobile ? 28 : 48,
            boxShadow: `0 8px 32px ${C.sage}15`,
          }}
        >
          {!done ? (
            <QuizQuestion
              question={QUESTIONS[step]}
              step={step}
              total={QUESTIONS.length}
              onAnswer={answer}
              onBack={back}
              canGoBack={step > 0}
            />
          ) : (
            <QuizResult
              result={RESULTS[getWinner(computeScores(history))]}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function QuizQuestion({ question, step, total, onAnswer, onBack, canGoBack }) {
  const progress = ((step + 1) / total) * 100;
  return (
    <div>
      {canGoBack && (
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            color: C.warmGray,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 16,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {"\u2190"} Back
        </button>
      )}
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: C.sage,
          letterSpacing: 1.5,
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        QUESTION {step + 1} OF {total}
      </div>
      <div
        style={{
          height: 4,
          background: C.sageLight,
          borderRadius: 2,
          marginBottom: 28,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: C.sage,
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 26,
          margin: 0,
          marginBottom: 28,
          color: C.warmBlack,
          fontWeight: 500,
          lineHeight: 1.3,
        }}
      >
        {question.q}
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {question.options.map((opt, i) => (
          <QuizOption key={i} text={opt.text} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  );
}

function QuizOption({ text, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left",
        padding: "16px 20px",
        background: hover ? C.sageLight : C.cream,
        border: `1px solid ${hover ? C.sage : C.sageLight}`,
        borderRadius: 10,
        fontSize: 15,
        fontFamily: "'DM Sans', sans-serif",
        color: C.warmBlack,
        cursor: "pointer",
        transition: "all 0.15s ease",
        lineHeight: 1.5,
      }}
    >
      {text}
    </button>
  );
}

function QuizResult({ result, onReset }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: C.sage,
          letterSpacing: 2,
          marginBottom: 12,
          fontWeight: 500,
        }}
      >
        YOUR RESULT
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 38,
          margin: 0,
          marginBottom: 20,
          color: C.warmBlack,
          fontWeight: 500,
        }}
      >
        {result.title}
      </h3>
      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          color: C.warmGray,
          margin: 0,
          marginBottom: 32,
          maxWidth: 520,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {result.desc}
      </p>
      {result.external ? (
        <a
          href={result.href}
          target="_blank"
          rel="noopener noreferrer"
          style={resultBtnStyle}
        >
          {result.cta}
        </a>
      ) : (
        <Link to={result.href} style={resultBtnStyle}>
          {result.cta}
        </Link>
      )}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={onReset}
          style={{
            background: "none",
            border: "none",
            color: C.warmGray,
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Take the quiz again
        </button>
      </div>
    </div>
  );
}

const resultBtnStyle = {
  display: "inline-block",
  background: C.sage,
  color: C.white,
  textDecoration: "none",
  padding: "16px 32px",
  borderRadius: 10,
  fontSize: 15,
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 500,
  letterSpacing: 0.3,
};

function AboutSection({ isMobile }) {
  const stats = [
    { value: "$566K", label: "Net Worth" },
    { value: "38%", label: "Invested" },
    { value: "17%", label: "Given" },
    { value: "$0", label: "Debt" },
  ];

  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.white,
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>About</SectionLabel>
        <SectionHeading isMobile={isMobile}>Hi, I am Mariah</SectionHeading>
        <p
          style={{
            fontSize: isMobile ? 16 : 18,
            lineHeight: 1.7,
            color: C.warmGray,
            margin: 0,
            marginBottom: 40,
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          I am a personal finance coach helping people build a money system
          they actually use. I believe wealth is a tool for generosity and
          freedom, not a scoreboard. I share what is working for me and the
          people I coach so you can do the same.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: C.cream,
                border: `1px solid ${C.sageLight}`,
                borderRadius: 14,
                padding: "24px 16px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 26 : 32,
                  color: C.sage,
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
      </div>
    </section>
  );
}

function NewsletterSection({ isMobile }) {
  const [status, setStatus] = useState("idle");

  function subscribe() {
    const input = document.getElementById("hub-newsletter-email");
    const email = input ? input.value : "";
    if (!email) return;
    track("newsletter_signup", { location: "hub" });
    fetch("https://app.kit.com/forms/9197742/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email }),
    })
      .then(() => {
        if (input) input.value = "";
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  return (
    <section
      style={{
        padding: isMobile ? "60px 24px" : "100px 24px",
        background: C.sageLight,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <SectionLabel>Newsletter</SectionLabel>
        <SectionHeading isMobile={isMobile}>Join the Newsletter</SectionHeading>
        <p
          style={{
            fontSize: isMobile ? 16 : 17,
            lineHeight: 1.6,
            color: C.warmGray,
            margin: 0,
            marginBottom: 32,
          }}
        >
          Weekly insights on Coast FIRE, index fund investing, and building
          wealth without giving up what you love.
        </p>
        {status === "success" ? (
          <SuccessMessage text="On its way! Check your email to confirm." />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 12,
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              <input
                id="hub-newsletter-email"
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  borderRadius: 10,
                  border: `1px solid ${C.sage}`,
                  fontSize: 15,
                  fontFamily: "'DM Sans', sans-serif",
                  background: C.white,
                  color: C.warmBlack,
                  outline: "none",
                }}
              />
              <button
                onClick={subscribe}
                style={{
                  background: C.sage,
                  color: C.white,
                  border: "none",
                  padding: "16px 28px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  letterSpacing: 0.3,
                }}
              >
                Subscribe
              </button>
            </div>
            {status === "error" && (
              <div
                style={{
                  marginTop: 16,
                  fontSize: 14,
                  color: "#B85C5C",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Something went wrong. Please try again.
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function SuccessMessage({ text }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: C.white,
        border: `1px solid ${C.sage}`,
        borderRadius: 12,
        padding: "18px 24px",
        color: C.sageDark,
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 15,
        fontWeight: 500,
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: C.sage,
          color: C.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <span>{text}</span>
    </div>
  );
}

function SocialSection() {
  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com/mariahakinbi",
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        padding: "40px 24px",
        background: C.cream,
        textAlign: "center",
      }}
    >
      <div style={{ display: "inline-flex", gap: 16 }}>
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            onClick={() => track("social_click", { network: s.name })}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: C.white,
              border: `1px solid ${C.sageLight}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.sage,
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.sage;
              e.currentTarget.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.white;
              e.currentTarget.style.color = C.sage;
            }}
          >
            {s.svg}
          </a>
        ))}
      </div>
    </section>
  );
}

function Footer({ isMobile }) {
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
          2026 Money with Mariah. Educational content only, not financial advice.
        </p>
      </div>
    </footer>
  );
}

function LeadMagnetModal({ onClose }) {
  const [status, setStatus] = useState("idle");

  function submit() {
    const input = document.getElementById("hub-leadmagnet-email");
    const email = input ? input.value : "";
    if (!email) return;
    track("lead_magnet_signup", { location: "hub_modal" });
    fetch("https://app.kit.com/forms/9197742/subscriptions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email_address: email }),
    })
      .then(() => {
        if (input) input.value = "";
        setStatus("success");
      })
      .catch(() => setStatus("error"));
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(44, 44, 44, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: C.cream,
          border: `2px solid ${C.sage}`,
          borderRadius: 20,
          padding: 40,
          maxWidth: 480,
          width: "100%",
          position: "relative",
          boxShadow: `0 20px 60px rgba(0,0,0,0.25)`,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "transparent",
            border: "none",
            fontSize: 22,
            color: C.warmGray,
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          {"\u00D7"}
        </button>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: C.sage,
                color: C.white,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26,
                margin: 0,
                marginBottom: 10,
                color: C.warmBlack,
                fontWeight: 500,
              }}
            >
              On its way!
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: C.warmGray,
                margin: 0,
              }}
            >
              Check your email to confirm.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: C.sage,
                letterSpacing: 2,
                marginBottom: 12,
                fontWeight: 500,
              }}
            >
              FREE GUIDE
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 28,
                margin: 0,
                marginBottom: 12,
                color: C.warmBlack,
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              Get My $150K Money System
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: C.warmGray,
                margin: 0,
                marginBottom: 24,
              }}
            >
              See exactly where every dollar of my $150K salary goes. Real
              numbers, real system, real results.
            </p>
            <input
              id="hub-leadmagnet-email"
              type="email"
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: 10,
                border: `1px solid ${C.sage}`,
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                background: C.white,
                color: C.warmBlack,
                outline: "none",
                marginBottom: 12,
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={submit}
              style={{
                width: "100%",
                background: C.sage,
                color: C.white,
                border: "none",
                padding: "16px 24px",
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                letterSpacing: 0.3,
              }}
            >
              Send Me the Guide
            </button>
            {status === "error" && (
              <div
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "#B85C5C",
                  fontFamily: "'DM Sans', sans-serif",
                  textAlign: "center",
                }}
              >
                Something went wrong. Please try again.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
