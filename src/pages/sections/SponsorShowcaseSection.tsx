import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SponsorShowcaseSectionProps {
  isSecondary?: boolean;
}

export const SponsorShowcaseSection = ({ isSecondary = false }: SponsorShowcaseSectionProps): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={isSecondary ? "sponsors-secondary" : "sponsors"}
      className={`w-full bg-[#000101] overflow-hidden relative py-14 md:py-20 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
    >
      {!isSecondary && (
        <>
          <img
            className="absolute top-1/2 right-[-80px] -translate-y-1/2 w-[340px] md:w-[440px] opacity-25 pointer-events-none select-none"
            style={{ transform: "translateY(-50%) rotate(45deg)" }}
            alt="" src="/assets/brain-2.webp"
          />
          <div className="absolute top-[-60px] left-[-60px] w-[250px] h-[250px] bg-[#3ed2ff] rounded-full blur-[120px] opacity-20 pointer-events-none" />
          <div className="absolute top-10 left-10 w-[200px] h-[80px] bg-gradient-to-r from-[#17b2e840] to-[#3ed2ff30] rounded-lg blur-[60px] pointer-events-none rotate-[-15deg]" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center">
        {!isSecondary && (
          <h2 className="text-[#7fa6bd] text-xl md:text-2xl text-center mb-8 md:mb-12 stagger-1">
            {t.sponsors.title}
          </h2>
        )}

        <div className="flex flex-row items-end justify-center gap-12 sm:gap-24 md:gap-40 px-4 w-full">
          <div className="flex flex-col items-center stagger-2">
            <img className="h-7 sm:h-12 md:h-20 w-auto object-contain mb-3 sm:mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(62,210,255,0.2)] hover:scale-110 transition-transform duration-500" alt="Wellmax" src="/assets/wellmax-logo.webp" />
            <div className="w-[8rem] sm:w-[15rem] md:w-[22rem] h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#3ed2ff80] to-transparent rounded-full" />
          </div>

          <div className="flex flex-col items-center stagger-3">
            <img className="h-10 sm:h-20 md:h-32 w-auto object-contain mb-3 sm:mb-6 md:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-500" alt="Mobilis" src="/assets/mobilis-1-1.png" />
            <div className="w-[8rem] sm:w-[15rem] md:w-[22rem] h-[2px] md:h-[3px] bg-gradient-to-r from-transparent via-[#3ed2ff80] to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};
