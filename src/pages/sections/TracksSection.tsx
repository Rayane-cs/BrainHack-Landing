import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionTitle } from "./SectionTitle";

export const TracksSection = (): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id="tracks"
      className={`relative w-full flex flex-col items-center py-16 px-4 md:px-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
    >
      <div className="absolute top-10 left-1/4 w-[100px] h-[60px] bg-[#198acd20] rounded-lg blur-[40px] pointer-events-none rotate-[15deg]" />
      <div className="absolute bottom-20 right-1/4 w-[80px] h-[100px] bg-[#3ed2ff15] rounded-full blur-[50px] pointer-events-none" />
      <SectionTitle>{t.tracks.title}</SectionTitle>

      {/* Track 1 */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-20 stagger-1">
        <div className="relative flex-shrink-0">
          <img
            className="w-full max-w-[400px] md:w-[440px] h-[220px] md:h-[250px] object-cover rounded-xl"
            style={{ border: "1.5px solid rgba(62,210,255,0.3)", boxShadow: "0 0 30px rgba(62,210,255,0.08)" }}
            alt="Education" src="/assets/education-track.webp" loading="lazy" decoding="async"
          />
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#3ed2ff] rounded-sm" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#3ed2ff] rounded-sm" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3ed2ff]" />
            <span className="text-[#3ed2ff] text-sm uppercase tracking-widest">{t.tracks.t1label}</span>
          </div>
          <span className="text-[#e6f7ff] text-2xl md:text-[32px]">{t.tracks.t1name}</span>
          <div className="w-10 h-[2px] bg-[#198acd] rounded-full hidden md:block" />
          <span className="text-[#7fa6bd] text-sm md:text-base leading-relaxed max-w-[420px] font-poppins">{t.tracks.t1desc}</span>
        </div>
      </div>

      {/* Track 2 */}
      <div className="w-full max-w-5xl flex flex-col-reverse md:flex-row items-center gap-10 md:gap-14 mb-12 stagger-2">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#3ed2ff]" />
            <span className="text-[#3ed2ff] text-sm uppercase tracking-widest">{t.tracks.t2label}</span>
          </div>
          <span className="text-[#e6f7ff] text-2xl md:text-[32px]">{t.tracks.t2name}</span>
          <div className="w-10 h-[2px] bg-[#198acd] rounded-full hidden md:block" />
          <span className="text-[#7fa6bd] text-sm md:text-base leading-relaxed max-w-[420px] font-poppins">{t.tracks.t2desc}</span>
        </div>
        <div className="relative flex-shrink-0 md:ml-auto">
          <img
            className="w-full max-w-[400px] md:w-[440px] h-[220px] md:h-[250px] object-cover rounded-xl"
            style={{ border: "1.5px solid rgba(62,210,255,0.3)", boxShadow: "0 0 30px rgba(62,210,255,0.08)" }}
            alt="Smart Cities" src="/assets/smartcities-track.webp" loading="lazy" decoding="async"
          />
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#3ed2ff] rounded-sm" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#3ed2ff] rounded-sm" />
        </div>
      </div>
    </div>
  );
};
