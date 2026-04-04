import { useEffect, useState } from "react";
import { HackathonHeroSection } from "./sections/HackathonHeroSection";
import { SponsorShowcaseSection } from "./sections/SponsorShowcaseSection";
import { FAQSection } from "./sections/FAQSection";
import { CTASection } from "./sections/CTASection";
import { FooterSection } from "./sections/FooterSection";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CountdownSection } from "./sections/CountdownSection";
import { AboutSection } from "./sections/AboutSection";
import { TracksSection } from "./sections/TracksSection";
import { TimelineSection } from "./sections/TimelineSection";
import { ScheduleSection } from "./sections/ScheduleSection";
import { LocationSection } from "./sections/LocationSection";

export const Frame = (): JSX.Element => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col items-center relative min-h-screen">
      {/* Global Scroll-Driven Background Grid */}
      <div 
        className="parallax-grid bg-grid-tech"
        style={{ 
          backgroundPosition: `${scrollY * 0.05}px ${scrollY * -0.12}px`,
        }}
      />
      
      {/* Global Vignette Overlay */}
      <div className="bg-vignette" />

      <div className="relative z-10 w-full flex flex-col items-center">
        <LanguageSwitcher />

        {/* Back to Top Button */}
        <button
          onClick={(e) => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            e.currentTarget.blur();
          }}
          className={`fixed bottom-6 left-6 z-50 p-3 md:p-4 rounded-full border border-[#3ed2ff50] bg-[#00010190] backdrop-blur-md text-[#3ed2ff] hover:bg-[#3ed2ff20] hover:scale-110 shadow-[0_0_20px_rgba(62,210,255,0.15)] transition-all duration-300 group ${
            scrollY > 400 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          }`}
          aria-label="Back to Top"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <HackathonHeroSection />
        <SponsorShowcaseSection />
        
        {/* Modular Sections */}
        <CountdownSection />
        <AboutSection />
        <TracksSection />
        <TimelineSection />
        <ScheduleSection />
        <LocationSection />

        <FAQSection />
        <SponsorShowcaseSection isSecondary={true} />
        <CTASection />
        <FooterSection />
      </div>
    </div>
  );
};
