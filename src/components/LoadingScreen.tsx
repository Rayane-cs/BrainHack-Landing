import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500); // More snappy experience
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000101] overflow-hidden">
      {/* Background technical grid and vignette */}
      <div className="absolute inset-0 bg-grid-tech opacity-20" />
      <div className="bg-vignette opacity-60" />

      <div className="relative flex flex-col items-center">
        <div className="cube-loader scale-150 mb-20">
          <div className="cube-top" />
          <div className="cube-wrapper">
            <span className="cube-span" style={{ "--i": 0 } as any} />
            <span className="cube-span" style={{ "--i": 1 } as any} />
            <span className="cube-span" style={{ "--i": 2 } as any} />
            <span className="cube-span" style={{ "--i": 3 } as any} />
          </div>
        </div>
        
        <p className="text-[#3ed2ff] text-[0.65rem] tracking-[0.4em] font-mono opacity-80 animate-pulse mt-8">
          INITIATING BRAINHACK...
        </p>
      </div>

      <div className="absolute bottom-20 flex flex-col items-center">
        <div className="w-12 h-12 relative mb-4 opacity-40">
           <img src="/assets/club-logo.webp" alt="" className="animate-pulse" />
        </div>
        <div className="text-[#3ed2ff50] font-mono text-[10px] tracking-[0.5em] uppercase">InfoBrains v4.1</div>
      </div>
    </div>
  );
};
