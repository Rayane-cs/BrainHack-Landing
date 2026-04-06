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
