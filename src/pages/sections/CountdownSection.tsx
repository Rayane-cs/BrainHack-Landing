import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountdown } from "@/hooks/useCountdown";
import { SectionTitle } from "./SectionTitle";

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-[#3ed2ff] leading-none"
        style={{ fontSize: "clamp(36px, 7vw, 60px)", fontVariantNumeric: "tabular-nums", minWidth: "2.2ch", display: "inline-block", textAlign: "center" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[#e6f7ff] text-xs md:text-sm mt-1">{label}</span>
    </div>
  );
}

function CountdownTimer({ label, targetDate, dateLabel, expired }: { label: string; targetDate: Date; dateLabel: string; expired: boolean }) {
  const { t } = useLang();
  const { days, hours, minutes, seconds } = useCountdown(targetDate);
  const sep = <span className="text-[#3ed2ff] pb-5 md:pb-6" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>:</span>;

  if (expired) {
    return (
      <div className="flex flex-col items-center gap-3 z-10">
        <span className="text-[#28bbe8] text-base md:text-xl text-center">{label}</span>
        <span className="text-[#7fa6bd] text-lg px-6 py-3 border border-[#333] rounded-xl">{t.countdown.closed}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 z-10">
      <span className="text-[#28bbe8] text-base md:text-xl text-center whitespace-nowrap">{label}</span>
      <div className="flex items-end gap-1 md:gap-2">
        <TimeUnit value={days}    label={t.countdown.days} />
        {sep}
        <TimeUnit value={hours}   label={t.countdown.hours} />
        {sep}
        <TimeUnit value={minutes} label={t.countdown.minutes} />
        {sep}
        <TimeUnit value={seconds} label={t.countdown.seconds} />
      </div>
      <span className="text-[#fafdff8f] text-sm">{dateLabel}</span>
    </div>
  );
}

export const CountdownSection = (): JSX.Element => {
  const { t } = useLang();
  const regDeadline    = new Date("2026-04-15T23:59:59Z");
  const hackathonStart = new Date("2026-04-17T09:00:00Z");
  const regCountdown   = useCountdown(regDeadline);
  const hackCountdown  = useCountdown(hackathonStart);

  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <div
        ref={ref}
        id="countdown"
        className={`relative w-full flex flex-col items-center pt-20 pb-12 px-4 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      >
        <SectionTitle>{t.countdown.title}</SectionTitle>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-14 md:gap-0 md:justify-between md:px-24">
          <CountdownTimer label={t.countdown.regEnds}  targetDate={regDeadline}    dateLabel={t.countdown.regDate}  expired={regCountdown.expired} />
          <div className="w-[80px] h-[2px] md:w-[2px] md:h-[60px] bg-gradient-to-r md:bg-gradient-to-b from-transparent via-[#3ed2ff40] to-transparent rounded-full" />
          <CountdownTimer label={t.countdown.hackStart} targetDate={hackathonStart} dateLabel={t.countdown.hackDate} expired={hackCountdown.expired} />
        </div>
      </div>
      
      {/* ── HACKATHON GHOST TEXT STRIP ── */}
      <div className="w-full py-4 md:py-6 overflow-hidden flex border-y border-[#3ed2ff15] relative z-20 bg-[#000101]">
        <div className="flex animate-marquee-slow whitespace-nowrap items-center gap-10 md:gap-16">
          {[...Array(20)].map((_, i) => (
            i % 2 === 0 ? (
              <span key={i} className="text-marquee-ghost text-3xl md:text-5xl">Hackathon</span>
            ) : (
              <img key={i} src="/assets/club-logo.webp" alt="" className="w-8 h-8 md:w-12 md:h-12 opacity-80 drop-shadow-[0_0_10px_rgba(62,210,255,0.2)]" />
            )
          ))}
        </div>
      </div>
    </>
  );
};
