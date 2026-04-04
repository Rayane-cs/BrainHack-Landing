import { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionTitle } from "./SectionTitle";

function TimelineNode({
  label, date, index, align, isRTL,
}: {
  label: string; date: string; index: number; align: "left" | "right"; isRTL: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isLeft = align === "left";

  return (
    <div
      ref={ref}
      className={`timeline-node timeline-node-hidden ${visible ? "timeline-node-visible" : ""}`}
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className={`timeline-content-left ${!isLeft ? "opacity-0 pointer-events-none" : ""}`}>
        {isLeft && (
          <div className={`flex flex-col gap-2 ${isRTL ? "items-start text-right" : "items-end text-left"}`}>
            <div className="relative group max-w-xs">
              <div className="absolute inset-0 bg-gradient-to-r from-[#3ed2ff20] to-[#17b2e820] rounded-xl blur-sm" />
              <div className="relative bg-gradient-to-br from-[#3ed2ff15] to-[#17b2e815] backdrop-blur-sm border border-[#3ed2ff30] rounded-xl p-4">
                <span className="text-[#3ed2ff] text-sm md:text-base font-semibold block leading-tight">{label}</span>
                <span className="text-[#fafdff] text-xs md:text-sm mt-1 block opacity-90">{date}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="timeline-dot" />
      <div className={`timeline-content-right ${isLeft ? "opacity-0 pointer-events-none" : ""}`}>
        {!isLeft && (
          <div className={`flex flex-col gap-2 ${isRTL ? "items-end text-left" : "items-start text-left"}`}>
            <div className="relative group max-w-xs">
              <div className="absolute inset-0 bg-gradient-to-l from-[#3ed2ff20] to-[#17b2e820] rounded-xl blur-sm" />
              <div className="relative bg-gradient-to-br from-[#3ed2ff15] to-[#17b2e815] backdrop-blur-sm border border-[#3ed2ff30] rounded-xl p-4">
                <span className="text-[#3ed2ff] text-sm md:text-base font-semibold block leading-tight">{label}</span>
                <span className="text-[#fafdff] text-xs md:text-sm mt-1 block opacity-90">{date}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function VerticalTimeline() {
  const { t, lang } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const isRTL = lang === "ar";

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-4xl mx-auto px-4 py-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="timeline-line" />
      {t.timeline.events.map((event, i) => {
        const visualAlign = i % 2 === 0 ? "left" : "right";
        return (
          <TimelineNode
            key={i}
            label={event.label}
            date={event.date}
            index={i}
            align={visualAlign}
            isRTL={isRTL}
          />
        );
      })}
    </div>
  );
}

export const TimelineSection = (): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} id="timeline" className={`relative w-full flex flex-col items-center py-16 px-4 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}>
      <SectionTitle>{t.timeline.title}</SectionTitle>
      <VerticalTimeline />
    </div>
  );
};
