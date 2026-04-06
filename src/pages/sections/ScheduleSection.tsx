import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionTitle } from "./SectionTitle";

interface FullMonthCalendarProps {
  targetDay: number;
  dayLabel: string; // "Day 1" or "Day 2"
}

const FullMonthCalendar = ({ targetDay, dayLabel }: FullMonthCalendarProps) => {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  // April 2026 starts on Wednesday (Index 3)
  const days = [];
  // Padding for Sun, Mon, Tue
  days.push(null, null, null);
  for (let i = 1; i <= 30; i++) {
    days.push(i);
  }

  return (
    <div className="perspective-container w-full max-w-[400px] flex-shrink-0 animate-fade-in group">
      <div className="calendar-glass preserve-3d group-hover:rotate-x-6 group-hover:rotate-y-[-6deg] transition-transform duration-500 py-4 px-4 h-auto">
        {/* Calendar Header */}
        <div className="calendar-header mb-4">
          <div>
            <h4 className="text-[#3ed2ff] font-bold text-lg tracking-tight">APRIL</h4>
            <p className="text-[#7fa6bd] text-[10px] font-mono tracking-[0.3em]">2026</p>
          </div>
          <div className="w-8 h-8 rounded-full border border-[#3ed2ff20] flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-[#3ed2ff] animate-pulse" />
          </div>
        </div>

        {/* Week Day Names */}
        <div className="calendar-grid mb-2">
          {weekDays.map((wd, i) => (
            <div key={`wd-${i}`} className="text-center calendar-day-name">{wd}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="calendar-grid">
          {days.map((day, i) => (
            <div key={`day-${i}`} className="calendar-cell">
              {day === targetDay ? (
                <div className="calendar-pop-circle scale-[1.1] md:scale-[1.2]">
                  <span className="text-white text-2xl font-bold leading-none">{day}</span>
                  <span className="text-[#3ed2ff] text-[8px] font-mono font-bold tracking-widest mt-1 uppercase">
                    {dayLabel}
                  </span>
                </div>
              ) : (
                day && <span className="opacity-40">{day}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ScheduleSection = (): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <>
      <div
        ref={ref}
        id="schedule"
        className={`relative w-full flex flex-col items-center py-20 px-4 md:px-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      >
        <div className="absolute top-10 right-1/4 w-[120px] h-[80px] bg-[#198acd15] rounded-lg blur-[60px] pointer-events-none rotate-[-15deg]" />
        <SectionTitle>{t.schedule.title}</SectionTitle>

        {/* Day 1 Section */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24 md:mb-40 z-20">
          <FullMonthCalendar targetDay={17} dayLabel="Day 1" />
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3ed2ff]" />
              <span className="text-[#3ed2ff] text-sm uppercase tracking-widest leading-none">{t.schedule.day1.type}</span>
            </div>
            <h3 className="text-[#e6f7ff] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">{t.schedule.day1.title}</h3>
            
            <div className="text-[#7fa6bd] text-sm leading-relaxed space-y-2 mt-2">
              <div className="flex flex-col items-center md:items-start group cursor-default">
                 <p className="text-[#e6f7ff] text-base font-medium">
                    <span className="text-[#3ed2ff] opacity-80">{t.schedule.day1.time1}:</span> {t.schedule.day1.event1}
                 </p>
              </div>
              <div className="flex flex-col items-center md:items-start group cursor-default">
                 <p className="text-[#e6f7ff] text-base font-medium">
                    <span className="text-[#3ed2ff] opacity-80">{t.schedule.day1.time2}:</span> {t.schedule.day1.event2}
                 </p>
              </div>
              <div className="flex flex-col items-center md:items-start group cursor-default">
                 <p className="text-[#e6f7ff] text-base font-medium">
                    <span className="text-[#3ed2ff] opacity-80">{t.schedule.day1.time3}:</span> {t.schedule.day1.event3}
                 </p>
              </div>
            </div>
            
            <p className="inline-flex items-center gap-3 mt-6 text-[#3ed2ff] bg-[#3ed2ff08] px-5 py-2.5 rounded-xl text-xs font-bold border border-[#3ed2ff15] shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {t.schedule.day1.location}
            </p>
          </div>
        </div>

        {/* Day 2 Section */}
        <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 z-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3ed2ff]" />
              <span className="text-[#3ed2ff] text-sm uppercase tracking-widest leading-none">{t.schedule.day2.type}</span>
            </div>
            <h3 className="text-[#e6f7ff] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight opacity-90">{t.schedule.day2.title}</h3>
            
            <div className="text-[#7fa6bd] text-sm leading-relaxed space-y-2 mt-2">
              <div className="flex flex-col items-center md:items-start group cursor-default">
                 <p className="text-[#e6f7ff] text-base font-medium">
                    <span className="text-[#3ed2ff] opacity-80">{t.schedule.day2.time1}:</span> {t.schedule.day2.event1}
                 </p>
              </div>
              <div className="flex flex-col items-center md:items-start group cursor-default">
                 <p className="text-[#e6f7ff] text-base font-medium">
                    <span className="text-[#3ed2ff] opacity-80">{t.schedule.day2.time2}:</span> {t.schedule.day2.event2}
                 </p>
              </div>
            </div>

            <p className="inline-flex items-center gap-3 mt-6 text-[#3ed2ff] bg-[#3ed2ff08] px-5 py-2.5 rounded-xl text-xs font-bold border border-[#3ed2ff15] shadow-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {t.schedule.day2.location}
            </p>
          </div>
          <FullMonthCalendar targetDay={18} dayLabel="Day 2" />
        </div>
      </div>

      {/* ── SPONSOR MARQUEE STRIP ── */}
      <div className="w-full py-3 md:py-4 overflow-hidden flex border-y border-[#3ed2ff20] relative z-10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] bg-[#000101]">
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#05090f] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#05090f] to-transparent z-10 pointer-events-none" />
        <div className="flex w-max animate-marquee-slow items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-16 md:gap-32 shrink-0 pr-16 md:pr-32">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`marquee-1-${i}`} className="flex items-center gap-16 md:gap-32">
                <img src="/assets/mobilis-1-1.png" alt="Mobilis" className="h-7 md:h-10 object-contain brightness-0 invert pointer-events-none select-none" loading="lazy" />
                <img src="/assets/wellmax-logo.webp" alt="Wellmax" className="h-7 md:h-10 object-contain brightness-0 invert filter grayscale opacity-60 pointer-events-none select-none" loading="lazy" />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-16 md:gap-32 shrink-0 pr-16 md:pr-32">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={`marquee-2-${i}`} className="flex items-center gap-16 md:gap-32">
                <img src="/assets/mobilis-1-1.png" alt="Mobilis" className="h-7 md:h-10 object-contain brightness-0 invert pointer-events-none select-none" loading="lazy" />
                <img src="/assets/wellmax-logo.webp" alt="Wellmax" className="h-7 md:h-10 object-contain brightness-0 invert filter grayscale opacity-60 pointer-events-none select-none" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
