import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export const FooterSection = (): JSX.Element => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`w-full border-t border-[#198acd20] py-10 px-4 flex flex-col items-center gap-4 relative overflow-hidden scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-[#3ed2ff08] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-5 right-10 w-[80px] h-[40px] bg-[#17b2e810] rounded-lg blur-[30px] pointer-events-none rotate-[25deg]" />
      <img className="w-[56px] h-[56px] object-cover opacity-80 relative z-10" alt="InfoBrains logo" src="/assets/club-logo.webp" />
      <p className="text-[#7fa6bd] text-sm text-center max-w-[480px] leading-relaxed relative z-10">{t.footer.text}</p>
      <a
        href="https://www.linkedin.com/in/kslra/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 text-xs text-[#4a7a90] hover:text-[#3ed2ff] transition-colors duration-300 mt-2"
      >
        Made by <span className="underline underline-offset-2">ub</span>
      </a>
    </footer>
  );
};
