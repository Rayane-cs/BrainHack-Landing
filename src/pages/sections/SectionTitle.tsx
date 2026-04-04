import React from "react";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-[#fafdff] text-center" style={{
        fontSize: "clamp(2rem, 8vw, 3.5rem)",
        lineHeight: "1.2",
        textShadow: "0 0 20px rgba(62,210,255,0.4), 0 0 40px rgba(62,210,255,0.2)"
      }}>{children}</h2>
      <div className="w-16 md:w-24 h-[3px] bg-[#28bbe8] rounded-full mt-3" />
    </div>
  );
}
