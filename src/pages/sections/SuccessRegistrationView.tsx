import { useLang } from "@/contexts/LanguageContext";
import { useLocation } from "wouter";

interface SuccessViewProps {
  data: {
    full_name: string;
    email: string;
    level: string;
    speciality: string;
  };
}

export const SuccessRegistrationView = ({ data }: SuccessViewProps): JSX.Element => {
  const { t, lang } = useLang();
  const [, setLocation] = useLocation();
  const isRTL = lang === "ar";

  return (
    <div 
      className="relative z-10 w-full max-w-2xl animate-fade-in"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="relative bg-[#0a1628] border border-[#3ed2ff30] rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_60px_rgba(62,210,255,0.1)]">
        {/* Top Glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3ed2ff] to-transparent" />
        
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-[#3ed2ff20] rounded-full animate-ping" />
            <div className="absolute inset-0 border-2 border-[#3ed2ff] rounded-full animate-spin-slow-reverse opacity-40 shadow-[0_0_30px_rgba(62,210,255,0.3)]" />
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-[#3ed2ff] drop-shadow-[0_0_10px_rgba(62,210,255,0.5)]" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-[#fafdff] text-3xl md:text-4xl font-bold mb-3 tracking-tight">{t.modal.title}</h2>
          <p className="text-[#7fa6bd] text-base md:text-lg opacity-80">{t.modal.subtitle}</p>
        </div>

        {/* Selection Status Pipeline */}
        <div className="bg-[#00010150] border border-[#198acd15] rounded-2xl p-6 mb-10">
          <h3 className="text-[#e6f7ff] text-sm font-mono tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
             <span className="w-2 h-2 bg-[#3ed2ff] rounded-full animate-pulse" />
             {t.modal.statusTitle}
          </h3>
          
          <div className="flex flex-col gap-6">
             <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-[#3ed2ff] flex items-center justify-center shrink-0 mt-1">
                   <div className="w-2 h-2 bg-[#3ed2ff] rounded-full" />
                </div>
                <div>
                   <p className="text-[#3ed2ff] font-semibold text-sm">{t.modal.statusPending}</p>
                   <p className="text-[#7fa6bd] text-[13px] mt-1">{t.modal.detail}</p>
                </div>
             </div>

             <div className="w-px h-8 bg-gradient-to-b from-[#3ed2ff50] to-transparent ml-[11px]" />

             <div className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-[#3ed2ff20] flex items-center justify-center shrink-0 mt-1">
                   <div className="w-1.5 h-1.5 bg-[#3ed2ff20] rounded-full" />
                </div>
                <div>
                   <p className="text-[#fafdff70] text-sm font-medium">{t.modal.statusNote}</p>
                   <div className="flex flex-wrap gap-4 mt-3">
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                         <span className="text-green-500 font-bold text-sm tracking-widest">{t.modal.statusAccepted}</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                         <span className="text-red-500 font-bold text-sm tracking-widest">{t.modal.statusRejected}</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Email Notification Alert */}
        <div className="flex items-center gap-4 bg-[#3ed2ff0a] border border-[#3ed2ff25] rounded-xl p-5 mb-10">
          <div className="w-10 h-10 rounded-full bg-[#3ed2ff20] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#3ed2ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[#3ed2ff] text-sm md:text-base leading-relaxed font-medium">
            {t.modal.emailNote}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={() => setLocation("/")}
            className="w-full sm:w-auto min-w-[220px] bg-[#3ed2ff] text-[#000101] text-base py-4 px-10 rounded-[50px] hover:bg-[#5ddcff] hover:scale-105 transition-all duration-300 font-bold shadow-[0_0_30px_rgba(62,210,255,0.2)]"
          >
            {t.modal.close}
          </button>
        </div>
      </div>

      {/* Decorative HUD Corner */}
      <div className="absolute -bottom-4 -right-4 w-32 h-32 border-b-2 border-r-2 border-[#3ed2ff20] rounded-br-[40px] pointer-events-none" />
      <div className="absolute -top-4 -left-4 w-32 h-32 border-t-2 border-l-2 border-[#3ed2ff20] rounded-tl-[40px] pointer-events-none" />
    </div>
  );
};
