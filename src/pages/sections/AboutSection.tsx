import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionTitle } from "./SectionTitle";

export const AboutSection = (): JSX.Element => {
  const { t, lang } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id="about"
      className={`relative w-full flex flex-col items-center py-16 px-4 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
    >
      <div className="relative z-10"><SectionTitle>{t.about.title}</SectionTitle></div>
      <p className="relative z-10 text-base md:text-lg text-center max-w-[750px] leading-relaxed font-poppins mb-16">
        <span className="text-[#fafdff]">{t.about.text1}</span>
        <span className="text-[#198acd]">{t.about.highlight}</span>
        <span className="text-[#fafdff]">{t.about.text2}</span>
      </p>

      {/* ── ABOUT STATS CARDS (Bento Grid) ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4">
        
        {/* Card 1: 36 Participants */}
        <div className="relative lg:col-span-2 md:col-span-2 flex items-center h-[12.5rem] md:h-[15rem] border-[3px] border-[#3ed2ff] rounded-3xl bg-gradient-to-r from-[#3ed2ff30] to-transparent shadow-[0_0_20px_rgba(62,210,255,0.15)] transition-transform duration-300 hover:scale-[1.02] stagger-1 overflow-visible">
          <span className={`absolute ${lang === 'ar' ? '-right-6' : '-left-6'} -bottom-16 text-[220px] md:text-[280px] font-bold text-white/[0.04] leading-none select-none pointer-events-none blur-sm z-0`}>{t.about.stats[0]?.value}</span>
          <div className="relative z-10 flex w-full h-full rounded-3xl overflow-hidden">
            <div className={`flex flex-col justify-center items-start text-start p-8 md:p-12 w-[60%] z-20`}>
              <span className="text-[#fafdff] text-7xl md:text-[90px] font-bold leading-none mb-2 z-20">{t.about.stats[0]?.value}</span>
              <span className="text-[#3ed2ff] text-2xl md:text-3xl font-bold mb-1 capitalize tracking-wide z-20">{t.about.stats[0]?.label}</span>
              <p className="text-[#7fa6bd] text-sm leading-snug font-poppins opacity-90 z-20">{t.about.stats[0]?.desc}</p>
            </div>
          </div>
          <div className={`absolute ${lang === 'ar' ? 'left-[10px] md:left-[-20px]' : 'right-[10px] md:right-[-20px]'} top-1/2 -translate-y-1/2 w-[140px] md:w-[250px] z-30 pointer-events-none`}>
            <img src="/assets/Person.webp" alt="Participants" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(62,210,255,0.3)] animate-float" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Card 4: 1 Winner */}
        <div className="relative lg:row-span-2 flex items-center justify-center min-h-[18.75rem] mt-[40px] lg:mt-0 lg:min-h-[31.25rem] border-[3px] border-[#3ed2ff] rounded-[30px] bg-gradient-to-t from-[#3ed2ff40] to-transparent shadow-[0_0_20px_rgba(62,210,255,0.15)] transition-transform duration-300 hover:scale-[1.02] stagger-4 overflow-visible">
          <span className="absolute left-[-10px] md:-left-[20px] lg:-left-[10px] -bottom-[40px] lg:-bottom-[60px] text-[300px] lg:text-[450px] font-bold text-white/[0.08] leading-none select-none pointer-events-none z-0 tracking-tighter">{t.about.stats[3]?.value}</span>
          <div className="relative z-10 flex flex-col justify-end w-full h-full p-8 lg:p-10 lg:pb-12 text-center rounded-[30px] overflow-hidden">
            <div className="z-20 mt-auto pt-[40px]">
              <span className="text-[#3ed2ff] text-[40px] md:text-[50px] font-bold capitalize tracking-tighter block mb-1 font-[Oughter-Regular]">{t.about.stats[3]?.label}</span>
              <p className="text-[#7fa6bd] text-sm md:text-[15px] font-light leading-snug font-poppins">{t.about.stats[3]?.desc}</p>
            </div>
          </div>
          <div className="absolute top-[-25px] md:-top-[80px] lg:-top-[100px] left-1/2 -translate-x-[25%] w-[160px] md:w-[280px] lg:w-[340px] z-30 pointer-events-none">
            <img src="/assets/Winner.webp" alt="Winner" className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(253,191,73,0.2)] animate-float-delayed" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Card 2: 2 Categories */}
        <div className="relative flex items-center h-[200px] md:h-[240px] border-[3px] border-[#3ed2ff] rounded-3xl bg-gradient-to-t from-[#3ed2ff30] to-transparent shadow-[0_0_20px_rgba(62,210,255,0.15)] transition-transform duration-300 hover:scale-[1.02] stagger-2 overflow-visible mt-8 md:mt-0 lg:mt-0">
          <span className={`absolute ${lang === 'ar' ? '-right-6' : '-left-6'} -bottom-6 text-[200px] md:text-[260px] font-bold text-white/[0.04] leading-none select-none pointer-events-none blur-sm z-0`}>{t.about.stats[1]?.value}</span>
          <div className="relative z-10 flex flex-col justify-end items-start text-start p-8 md:p-10 w-full h-full rounded-3xl overflow-hidden">
            <span className="text-[#fafdff] text-6xl md:text-7xl font-bold leading-none mb-1 md:mb-2 z-20">{t.about.stats[1]?.value}</span>
            <span className="text-[#3ed2ff] text-2xl md:text-3xl font-bold capitalize z-20">{t.about.stats[1]?.label}</span>
            <p className="text-[#7fa6bd] text-sm leading-snug font-poppins opacity-90 z-20 mt-1">{t.about.stats[1]?.desc}</p>
          </div>
          <div className={`absolute -top-[20px] md:-top-[30px] ${lang === 'ar' ? 'left-[-10px] md:left-[-20px]' : 'right-[-10px] md:right-[-20px]'} w-[130px] md:w-[110px] z-30 pointer-events-none`}>
             <img src="/assets/Number_2.webp" alt="Categories" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-bounce-small" loading="lazy" decoding="async" />
          </div>
        </div>

        {/* Card 3: 27 Hours */}
        <div className="relative flex items-center h-[200px] md:h-[240px] border-[3px] border-[#3ed2ff] rounded-3xl bg-gradient-to-t from-[#3ed2ff30] to-transparent shadow-[0_0_20px_rgba(62,210,255,0.15)] transition-transform duration-300 hover:scale-[1.02] stagger-3 overflow-visible mt-8 md:mt-0 lg:mt-0">
          <span className={`absolute ${lang === 'ar' ? '-right-6' : '-left-6'} -bottom-6 text-[180px] md:text-[220px] font-bold text-white/[0.04] leading-none select-none pointer-events-none blur-sm z-0`}>{t.about.stats[2]?.value}</span>
          <div className="relative z-10 flex flex-col justify-end items-start text-start p-8 md:p-10 w-full h-full rounded-3xl overflow-hidden">
            <span className="text-[#fafdff] text-6xl md:text-7xl font-bold leading-none mb-1 md:mb-2 z-20">{t.about.stats[2]?.value}</span>
            <span className="text-[#3ed2ff] text-2xl md:text-3xl font-bold capitalize z-20">{t.about.stats[2]?.label}</span>
            <p className="text-[#7fa6bd] text-sm leading-snug font-poppins opacity-90 z-20 mt-1">{t.about.stats[2]?.desc}</p>
          </div>
          <div className={`absolute -top-[20px] md:-top-[30px] ${lang === 'ar' ? '-left-[10px] md:-left-[20px]' : '-right-[10px] md:-right-[20px]'} w-[120px] md:w-[110px] z-30 pointer-events-none`}>
             <img src="/assets/Clock.webp" alt="Hours" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(62,210,255,0.3)] animate-float" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </div>
  );
};
