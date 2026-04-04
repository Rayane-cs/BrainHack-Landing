import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionTitle } from "./SectionTitle";

export const LocationSection = (): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id="location"
      className={`relative w-full flex flex-col items-center py-20 px-4 md:px-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
    >
      <div className="absolute top-10 left-1/4 w-[100px] h-[60px] bg-[#198acd20] rounded-lg blur-[40px] pointer-events-none rotate-[15deg]" />
      <SectionTitle>{t.location.title}</SectionTitle>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="relative flex-shrink-0 cursor-pointer group" onClick={() => window.open('https://maps.app.goo.gl/bByaV7BT2C2esUSu7', '_blank')}>
          <video
            className="w-full max-w-[380px] md:w-[440px] h-[200px] md:h-[240px] object-cover rounded-xl transition-all duration-500 group-hover:scale-[1.02]"
            style={{ border: "1.5px solid rgba(62,210,255,0.3)", boxShadow: "0 0 30px rgba(62,210,255,0.08)" }}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/assets/Mobilis_Agence.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-[#3ed2ff10] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center">
              <div className="text-[#3ed2ff] text-2xl mb-2">📍</div>
              <div className="text-[#fafdff] text-xs font-semibold tracking-wider">{t.location.viewMaps}</div>
            </div>
          </div>
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#3ed2ff] rounded-sm opacity-60" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#3ed2ff] rounded-sm opacity-60" />
        </div>
        
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3ed2ff] animate-pulse" />
            <span className="text-[#3ed2ff] text-xs font-mono tracking-[0.3em] uppercase">{t.location.venue}</span>
          </div>
          <h3 className="text-[#e6f7ff] text-3xl md:text-4xl font-bold tracking-tight">{t.location.name}</h3>
          <div className="w-12 h-[2px] bg-[#3ed2ff30] rounded-full" />
          
          <div className="text-[#7fa6bd] text-sm md:text-base leading-relaxed space-y-4 mt-2">
            <p><span className="text-white font-semibold">{t.location.address}:</span> {t.location.addressVal}</p>
            <p className="opacity-80">{t.location.day1}</p>
            <p className="opacity-80 font-light italic">{t.location.transport}</p>
            
            <button 
              onClick={() => window.open('https://maps.app.goo.gl/bByaV7BT2C2esUSu7', '_blank')}
              className="inline-flex items-center gap-2 mt-4 text-[#3ed2ff] bg-[#3ed2ff10] border border-[#3ed2ff20] px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3ed2ff20] transition-all group"
            >
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t.location.getDirections}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
