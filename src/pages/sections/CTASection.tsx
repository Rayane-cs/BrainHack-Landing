import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { useLocation } from "wouter";

export const CTASection = (): JSX.Element => {
  const { t } = useLang();
  const [, setLocation] = useLocation();
  const regDeadline = new Date("2026-04-15T23:59:59Z");
  const { expired } = useCountdown(regDeadline);

  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="enroll-cta"
      className={`w-full relative overflow-hidden py-20 md:py-32 px-4 flex flex-col items-center justify-center min-h-[500px] scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      style={{ background: "linear-gradient(135deg, #020c1f 0%, #041830 40%, #071e3d 70%, #030f22 100%)" }}
    >
      {/* BrainHack watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
        <span style={{
          fontSize: "clamp(100px, 22vw, 280px)",
          WebkitTextStroke: "2px rgba(62,210,255,0.12)",
          color: "rgba(62,210,255,0.04)",
          lineHeight: 1, letterSpacing: "-0.02em", userSelect: "none",
        }}>BrainHack</span>
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#3ed2ff12] blur-[100px] pointer-events-none" style={{ zIndex: 0 }} />
      <div className="absolute bottom-10 left-20 w-[180px] h-[90px] bg-[#17b2e815] blur-[70px] pointer-events-none rotate-[-20deg]" style={{ zIndex: 0 }} />
      <div className="absolute top-20 right-20 w-[120px] h-[120px] bg-[#198acd18] blur-[60px] pointer-events-none" style={{ zIndex: 0 }} />

      {expired ? (
        <>
          <h2 className="relative text-[#fafdff] text-3xl md:text-5xl text-center mb-4 stagger-1" style={{ zIndex: 1 }}>
            {t.cta.closed}
          </h2>
          <p className="relative text-[#7fa6bd] text-sm md:text-lg text-center max-w-[520px] mb-10 stagger-2" style={{ zIndex: 1 }}>
            {t.cta.closedSub}
          </p>
          <div
            className="relative px-14 py-4 rounded-[50px] border-2 border-[#333] text-[#7fa6bd] text-lg md:text-2xl cursor-not-allowed stagger-3"
            style={{ zIndex: 1 }}
          >
            {t.cta.closed}
          </div>
        </>
      ) : (
        <>
          <h2 className="relative text-[#fafdff] text-3xl md:text-5xl text-center mb-4 stagger-1" style={{ zIndex: 1 }}>
            {t.cta.title}
          </h2>
          <p className="relative text-[#7fa6bd] text-sm md:text-lg text-center max-w-[520px] mb-10 stagger-2" style={{ zIndex: 1 }}>
            {t.cta.sub}
          </p>
          <button
            id="cta-enroll-btn"
            onClick={() => setLocation("/enroll")}
            className="relative bg-[#3ed2ff] text-[#000101] text-lg md:text-2xl px-14 py-4 rounded-[50px] hover:bg-[#5ddcff] hover:scale-105 transition-all cursor-pointer stagger-3"
            style={{ zIndex: 1 }}
          >
            {t.cta.enroll}
          </button>
        </>
      )}
    </section>
  );
};
