import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { useCountdown } from "@/hooks/useCountdown";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SuccessRegistrationView } from "./sections/SuccessRegistrationView";

const API_URL = import.meta.env.VITE_API_URL || "https://brain-hack-api.vercel.app";

const LEVELS = ["L1", "L2", "L3", "M1", "M2"];

type FormData = {
  full_name: string;
  email: string;
  phone: string;
  registration_number: string;
  level: string;
  speciality: string;
  portfolio_link: string;
};

const empty: FormData = {
  full_name: "", email: "", phone: "", registration_number: "", level: "", speciality: "", portfolio_link: "",
};

export const EnrollPage = (): JSX.Element => {
  const { t } = useLang();
  const [, setLocation] = useLocation();
  const regStartDate = new Date("2026-04-07T00:00:00Z");
  const regDeadline = new Date("2026-04-14T23:59:59Z");
  
  const { expired: hasStarted, days: sDays, hours: sHours, minutes: sMins, seconds: sSecs } = useCountdown(regStartDate);
  const { expired: regClosed } = useCountdown(regDeadline);
  const isNotStarted = !hasStarted;

  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successData, setSuccessData] = useState<FormData | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [emailStatus, setEmailStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check if user has already registered on this device
    const savedData = localStorage.getItem("brainhack_registered");
    if (savedData) {
      try {
        setSuccessData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved registration data");
      }
    }

    // Debug helpers for console
    (window as any).showSuccess = () => {
      setSuccessData({
        full_name: "Test Participant", email: "test@example.com", phone: "0555 123 456",
        registration_number: "2024DEBUG", level: "M1", speciality: "Frontend Development",
        portfolio_link: "https://github.com/debug"
      });
    };

    (window as any).clearSuccess = () => {
      localStorage.removeItem("brainhack_registered");
      window.location.reload();
    };

    // --- SECURITY: ANTI-F12 & ANTI-RIGHT-CLICK ---
    const preventDevTools = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const preventRightClick = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Invisible debugger trap (pauses Execution if DevTools is open)
    const devToolsTrap = setInterval(() => {
      const start = performance.now();
      debugger;
      const end = performance.now();
      if (end - start > 100) {
        // DevTools likely open, could add logic here but debugger itself is the deterrent
      }
    }, 1000);

    window.addEventListener("keydown", preventDevTools);
    window.addEventListener("contextmenu", preventRightClick);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", preventDevTools);
      window.removeEventListener("contextmenu", preventRightClick);
      clearInterval(devToolsTrap);
      delete (window as any).showSuccess;
      delete (window as any).clearSuccess;
    };
  }, []);

  // Debounced email verification
  useEffect(() => {
    const email = form.email.trim();
    if (!email) {
      setEmailStatus("idle");
      return;
    }

    // Basic regex check before hitting the API
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailStatus("invalid");
      return;
    }

    const timer = setTimeout(async () => {
      setEmailStatus("checking");
      try {
        const res = await fetch(`${API_URL}/api/check-email`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.available) {
          setEmailStatus("available");
        } else {
          setEmailStatus("taken");
        }
      } catch (err) {
        console.error("Email verification failed:", err);
        setEmailStatus("idle");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [form.email]);

  // --- SECURITY: SANITIZATION ---
  const sanitizeInput = (val: string) => {
    // Basic sanitization to strip characters often used in SQL injection/XSS
    // Note: Real protection MUST be on the backend.
    return val.replace(/[<>'"\\;]/g, "").trim();
  };

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let val = e.target.value;
    if (field !== "level" && field !== "speciality") {
      val = sanitizeInput(val);
    }
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((er) => ({ ...er, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    const requiredFields: (keyof FormData)[] = ["full_name", "email", "phone", "registration_number", "level", "speciality"];
    
    requiredFields.forEach((k) => {
      if (!form[k].trim()) {
        errs[k] = t.enroll.required;
      }
    });

    // Enhanced Validations
    if (!errs.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        errs.email = "Invalid email format";
      }
    }

    if (!errs.phone) {
      // Algerian format: 05, 06, or 07 followed by 8 digits
      const phoneRegex = /^(05|06|07)\d{8}$/;
      if (!phoneRegex.test(form.phone)) {
        errs.phone = "Must be a valid Algerian phone number (e.g. 0555123456)";
      }
    }

    if (!errs.registration_number) {
      // Allow only numbers and letters (prevents many injection tokens)
      const regRegex = /^[a-zA-Z0-9]+$/;
      if (!regRegex.test(form.registration_number)) {
        errs.registration_number = "Registration number must be alphanumeric";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setApiError("");
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      let data: { error?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      
      if (res.status === 201) {
        localStorage.setItem("brainhack_registered", JSON.stringify(form));
        setSuccessData(form);
        setSubmitting(false);

        // Separate email sending from the main registration flow
        // The user sees the success screen immediately, while this happens
        // in the background from the browser.
        fetch(`${API_URL}/api/send-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }).catch((err) => console.error("Could not trigger confirmation email:", err));

        return;
      } else if (res.status === 409) {
        setApiError(data.error || t.enroll.errorDuplicate);
      } else if (res.status === 403) {
        setApiError(t.enroll.closedMsg);
      } else {
        setApiError(data.error || t.enroll.errorGeneral);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setApiError(t.enroll.errorGeneral);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: keyof FormData) => {
    const isError = errors[field] || (field === "email" && (emailStatus === "taken" || emailStatus === "invalid"));
    const isSuccess = field === "email" && emailStatus === "available";
    
    return `form-input w-full bg-[#0a1628] border rounded-xl px-5 py-4 text-[#e6f7ff] text-sm placeholder-[#7fa6bd60] transition-all duration-300 ${
      isError ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]" : 
      isSuccess ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]" : 
      "border-[#198acd40] focus:border-[#3ed2ff] focus:shadow-[0_0_15px_rgba(62,210,255,0.15)]"
    }`;
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-16 relative overflow-x-clip bg-[#000101]">
      {/* Global Scroll-Driven Background Grid */}
      <div 
        className="parallax-grid bg-grid-tech"
        style={{ 
          backgroundPosition: `${scrollY * 0.05}px ${scrollY * -0.12}px`,
        }}
      />
      
      {/* Global Vignette Overlay */}
      <div className="bg-vignette" />

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

      <LanguageSwitcher />

      {/* Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#3ed2ff1a] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#198acd18] rounded-full blur-[100px] pointer-events-none" />

      {/* Back button */}
      <button
        id="enroll-back-btn"
        onClick={() => setLocation("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-[#7fa6bd] hover:text-[#3ed2ff] transition-colors text-base"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        {t.enroll.back}
      </button>

      {/* Header */}
      <div className="relative z-10 flex flex-col items-center mb-10 mt-8 text-center">
        <img className="w-[70px] h-[70px] object-cover mb-5" alt="Club logo" src="/assets/club-logo.webp" />
        <h1
          className="text-transparent leading-none mb-2"
          style={{
            fontSize: "clamp(42px, 9vw, 80px)",
            background: "radial-gradient(50% 50% at 84% 12%, rgba(250,253,255,1) 0%, rgba(23,178,232,1) 80%, rgba(47,85,143,0.75) 100%)",
            WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
          }}
        >
          BrainHack
        </h1>
        <p className="text-[#7fa6bd] text-base mb-2">{t.enroll.title}</p>
        <div className="w-14 h-[3px] bg-[#28bbe8] rounded-full" />
      </div>

      {/* Registration Not Started */}
      {isNotStarted ? (
        <div className="relative z-10 w-full max-w-lg bg-[#0a1628] border border-[#198acd40] rounded-2xl px-8 py-12 flex flex-col items-center gap-6 text-center shadow-[0_0_60px_rgba(62,210,255,0.06)]">
          <div className="text-5xl mb-2 animate-bounce">⏳</div>
          <div className="flex flex-col gap-2">
            <h2 className="text-[#e6f7ff] text-2xl font-bold tracking-tight">{t.enroll.notStartedTitle}</h2>
            <p className="text-[#7fa6bd] text-sm leading-relaxed max-w-[380px]">{t.enroll.notStartedMsg}</p>
          </div>
          
          {/* Countdown timer for start */}
          <div className="flex gap-4 mt-2">
            {[
              { val: sDays, label: t.countdown.days },
              { val: sHours, label: t.countdown.hours },
              { val: sMins, label: t.countdown.minutes },
              { val: sSecs, label: t.countdown.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="bg-[#198acd15] border border-[#3ed2ff30] rounded-lg w-14 h-14 flex items-center justify-center mb-1">
                  <span className="text-[#3ed2ff] text-xl font-mono font-bold">
                    {String(item.val).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[#7fa6bd] text-[10px] uppercase tracking-wider">{item.label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setLocation("/")}
            className="mt-4 bg-[#3ed2ff10] text-[#3ed2ff] border border-[#3ed2ff30] px-8 py-3 rounded-[50px] hover:bg-[#3ed2ff20] transition-all cursor-pointer text-sm font-semibold"
          >
            {t.enroll.back}
          </button>
        </div>
      ) : regClosed ? (
        <div className="relative z-10 w-full max-w-lg bg-[#0a1628] border border-[#198acd40] rounded-2xl px-8 py-12 flex flex-col items-center gap-4 text-center">
          <div className="text-4xl mb-2">🔒</div>
          <h2 className="text-[#e6f7ff] text-2xl font-bold">{t.enroll.closedTitle}</h2>
          <p className="text-[#7fa6bd] text-sm leading-relaxed max-w-[380px]">{t.enroll.closedMsg}</p>
          <button
            onClick={() => setLocation("/")}
            className="mt-4 bg-[#3ed2ff] text-[#000101] px-8 py-3 rounded-[50px] hover:bg-[#5ddcff] transition-colors cursor-pointer"
          >
            {t.enroll.back}
          </button>
        </div>
      ) : !successData ? (
        /* Form - Shown before successful registration */
        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-full max-w-xl bg-[#0a1628] border border-[#198acd30] rounded-2xl px-6 md:px-10 py-10 flex flex-col gap-5"
          style={{ boxShadow: "0 0 60px rgba(62,210,255,0.06)" }}
          noValidate
        >
          {apiError && (
            <div className="bg-red-900/30 border border-red-500/40 rounded-xl px-5 py-3 text-red-400 text-sm text-center">
              {apiError}
            </div>
          )}

          {/* Full Name */}
          <div className="flex flex-col gap-1.5" id="enroll-name-group">
            <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-name">{t.enroll.fullName}</label>
            <input id="enroll-name" type="text" placeholder={t.enroll.fullNamePh} value={form.full_name} onChange={set("full_name")} className={inputClass("full_name")} />
            {errors.full_name && <span className="text-red-400 text-xs">{errors.full_name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5" id="enroll-email-group">
            <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-email">{t.enroll.email}</label>
            <div className="relative">
              <input id="enroll-email" type="email" placeholder={t.enroll.emailPh} value={form.email} onChange={set("email")} className={inputClass("email")} />
              {emailStatus === "checking" && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-[#3ed2ff] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {emailStatus === "available" && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && <span className="text-red-400 text-xs">{errors.email}</span>}
            {emailStatus === "taken" && <span className="text-red-400 text-xs">Email already registered</span>}
            {emailStatus === "invalid" && form.email.trim() !== "" && (
              <span className="text-red-400 text-xs">Invalid email format</span>
            )}
          </div>

          {/* Phone + Reg in 2 cols */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 flex-1" id="enroll-phone-group">
              <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-phone">{t.enroll.phone}</label>
              <input id="enroll-phone" type="tel" placeholder={t.enroll.phonePh} value={form.phone} onChange={set("phone")} className={inputClass("phone")} />
              {errors.phone && <span className="text-red-400 text-xs">{errors.phone}</span>}
            </div>
            <div className="flex flex-col gap-1.5 flex-1" id="enroll-reg-group">
              <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-reg">{t.enroll.regNumber}</label>
              <input id="enroll-reg" type="text" placeholder={t.enroll.regNumberPh} value={form.registration_number} onChange={set("registration_number")} className={inputClass("registration_number")} />
              {errors.registration_number && <span className="text-red-400 text-xs">{errors.registration_number}</span>}
            </div>
          </div>

          {/* Level + Speciality in 2 cols */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-1.5 flex-1" id="enroll-level-group">
              <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-level">{t.enroll.level}</label>
              <select
                id="enroll-level"
                value={form.level}
                onChange={set("level")}
                className={`${inputClass("level")} cursor-pointer`}
                style={{ colorScheme: "dark" }}
              >
                <option value="" disabled>{t.enroll.levelPh}</option>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.level && <span className="text-red-400 text-xs">{errors.level}</span>}
            </div>
            <div className="flex flex-col gap-1.5 flex-1" id="enroll-spec-group">
              <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-spec">{t.enroll.speciality}</label>
              <select
                id="enroll-spec"
                value={form.speciality}
                onChange={set("speciality")}
                className={`${inputClass("speciality")} cursor-pointer`}
                style={{ colorScheme: "dark" }}
              >
                <option value="" disabled>{t.enroll.specialityPh}</option>
                {t.enroll.specialities.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.speciality && <span className="text-red-400 text-xs">{errors.speciality}</span>}
            </div>
          </div>

          {/* Portfolio Link */}
          <div className="flex flex-col gap-1.5" id="enroll-portfolio-group">
            <label className="text-[#7fa6bd] text-sm" htmlFor="enroll-portfolio">{t.enroll.portfolio} <span className="text-[#7fa6bd60] text-xs">({t.enroll.optional})</span></label>
            <input id="enroll-portfolio" type="url" placeholder={t.enroll.portfolioPh} value={form.portfolio_link} onChange={set("portfolio_link")} className={inputClass("portfolio_link")} />
          </div>

          {/* Submit */}
          <button
            id="enroll-submit-btn"
            type="submit"
            disabled={submitting}
            className="w-full mt-2 bg-[#3ed2ff] text-[#000101] text-base md:text-lg py-4 rounded-[50px] hover:bg-[#5ddcff] transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                {t.enroll.submitting}
              </>
            ) : t.enroll.submit}
          </button>
        </form>
      ) : (
        <SuccessRegistrationView data={successData} />
      )}
    </div>
  );
};
