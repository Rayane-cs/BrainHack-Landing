import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { useLocation } from "wouter";

export const HackathonHeroSection = (): JSX.Element => {
  const { t } = useLang();
  const [, setLocation] = useLocation();
  const regDeadline = new Date("2026-04-15T23:59:59Z");
  const { expired } = useCountdown(regDeadline);

  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0 });

  const scrollToFaq = () => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  const goToEnroll  = () => setLocation("/enroll");

  return (
    <section
      ref={ref}
      id="hero"
      className={`w-full h-[100dvh] relative overflow-hidden flex flex-col items-center justify-center px-4 py-8 md:py-24 hero-reveal ${isVisible ? "scroll-visible" : ""}`}
    >
      {/* Brain */}
      <img className="absolute -bottom-[25%] -left-[25%] sm:-bottom-[55%] sm:-left-[13%] w-[80%] sm:w-[100%] max-w-[600px] sm:max-w-[800px] opacity-15 pointer-events-none select-none" alt="" src="/assets/brain-2.webp" loading="lazy" decoding="async" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[200px] bg-[#198acd20] rounded-full blur-[100px] pointer-events-none hidden md:block z-0" />
      <div className="absolute top-[-80px] right-0 w-[300px] h-[150px] bg-[#3ed2ff30] rounded-full rotate-[-62deg] blur-[80px] pointer-events-none z-0" />

      {/* Moving circles Behinde the Logo */}
      <div className="absolute top-20 right-10 sm:top-40 sm:right-20 w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-[#3ed2ff20] rounded-full blur-[40px] pointer-events-none animate-float z-0" />
      <div className="absolute bottom-20 left-5 sm:bottom-10 sm:left-10 w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] bg-[#17b2e820] rounded-full blur-[50px] pointer-events-none animate-float-delayed z-0" />

      <img
        className="relative z-10 w-[110px] h-[110px] md:w-[160px] md:h-[160px] object-cover mb-5 stagger-1 animate-bounce-small"
        style={{
          background: 'radial-gradient(circle, rgba(23,178,232,0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          boxShadow: '0 0 100px rgba(23,178,232,0.2), 0 0 10px rgba(23,178,232,0.1), 0 0 200px rgba(23,178,232,0.3), 0 0 0px rgba(23,178,232,0.2)'
        }}
        alt="Club logo" src="/assets/club-logo.webp"
      />

      <p className="relative z-10 text-[#7fa6bd] text-[10px] sm:text-sm md:text-lg text-center mb-2 stagger-2 max-w-[280px] sm:max-w-none mx-auto opacity-80 uppercase tracking-widest leading-relaxed">
        {t.hero.date}
      </p>

      <h1
        className="relative z-10 font-normal text-transparent text-center leading-none mb-3 stagger-3"
        style={{
          fontSize: "clamp(34px, 10vw, 150px)",
          background: "radial-gradient(50% 50% at 84% 12%, rgba(250,253,255,1) 0%, rgba(23,178,232,1) 80%, rgba(47,85,143,0.75) 100%)",
          WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
        }}
      >
        BrainHack
      </h1>

      <div className="relative z-10 flex items-baseline gap-3 mb-10 stagger-4">
        <span className="text-[#7fa6bd] text-lg md:text-2xl">{t.hero.by}</span>
        <span style={{ fontSize: "clamp(26px, 5.5vw, 54px)" }}>
          <span className="text-[#3ed2ff]">InfoBrains </span>
          <span className="text-white">2026</span>
        </span>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 stagger-5">
        {expired ? (
          <div className="w-[180px] px-10 h-[52px] flex items-center justify-center bg-[#1a1a2e] text-[#7fa6bd] text-base md:text-lg rounded-[50px] border border-[#333] cursor-not-allowed">
            {t.countdown.closed}
          </div>
        ) : (
          <button
            id="hero-enroll-btn"
            onClick={goToEnroll}
            className="w-[180px] px-10 h-[52px] flex items-center justify-center bg-[#3ed2ff] text-[#000101] text-base md:text-lg rounded-[50px] hover:bg-[#5ddcff] transition-colors cursor-pointer whitespace-nowrap"
          >
            {t.hero.enrollNow}
          </button>
        )}
        <a
          id="hero-question-btn"
          href="#faq"
          className="btn-slide w-[240px] px-10 h-[52px] flex items-center justify-center text-white text-base md:text-lg rounded-[50px] border-[3px] border-[#198acd] hover:bg-[#198acd20] transition-colors cursor-pointer whitespace-nowrap"
        >
          <span className="btn-text-one">{t.hero.question}</span>
          <span className="btn-text-two text-[#3ed2ff]">{t.hero.clickAsk}</span>
        </a>
      </div>

      {/* Mobilis Logo with Animation & Effects */}
      <div className="absolute top-6 left-6 md:top-auto md:left-auto md:bottom-10 md:right-10 z-20 group">
        <img
          className="w-[100px] md:w-[160px] object-contain opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110 drop-shadow-[0_0_15px_rgba(62,210,255,0.3)] animate-float"
          alt="Mobilis" src="/assets/mobilis-1-1.png" loading="lazy" decoding="async"
        />
        <div className="absolute inset-0 bg-[#3ed2ff10] blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      </div>
    </section>
  );
};
