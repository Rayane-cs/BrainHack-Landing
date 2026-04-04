import { useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-[#fafdff] text-center" style={{
        fontSize: "clamp(2rem, 8vw, 3.5rem)",
        lineHeight: "1.2",
        textShadow: "0 0 20px rgba(62,210,255,0.5), 0 0 40px rgba(62,210,255,0.3), 0 0 60px rgba(62,210,255,0.2)"
      }}>{children}</h2>
      <div className="w-16 md:w-24 h-[3px] bg-[#28bbe8] rounded-full mt-3" style={{
        boxShadow: "0 0 10px rgba(62,210,255,0.6), 0 0 20px rgba(62,210,255,0.4)"
      }} />
    </div>
  );
}

const API_URL = import.meta.env.VITE_API_URL || "https://brain-hack-api.vercel.app";

export const FAQSection = (): JSX.Element => {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", question: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const { ref: faqRef,  isVisible: faqVisible  } = useScrollReveal<HTMLDivElement>();
  const { ref: formRef, isVisible: formVisible  } = useScrollReveal<HTMLDivElement>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.question }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", question: "" });
      } else {
        const data = await res.json();
        setError(data.error || t.enroll.errorGeneral);
      }
    } catch {
      setError(t.enroll.errorGeneral);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="faq" className="w-full relative overflow-hidden py-20 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#3ed2ff18] rounded-full blur-[80px] pointer-events-none" />

      {/* Accordion */}
      <div
        ref={faqRef}
        className={`relative z-10 max-w-3xl mx-auto flex flex-col items-center scroll-hidden ${faqVisible ? "scroll-visible" : ""}`}
      >
        <SectionTitle>{t.faq.title}</SectionTitle>
        <div className="w-full flex flex-col gap-4 mb-16">
          {t.faq.questions.map((faq, i) => (
            <div
              key={i}
              className="border border-[#198acd40] rounded-2xl overflow-hidden"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <button
                id={`faq-item-${i}`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-[#0a1628] hover:bg-[#0d1e38] transition-colors"
              >
                <span className="text-[#e6f7ff] text-base md:text-lg pr-4">{faq.q}</span>
                <span
                  className="text-[#3ed2ff] text-2xl flex-shrink-0 transition-transform duration-300"
                  style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0)" }}
                >+</span>
              </button>
              {openIndex === i && (
                <div className="px-6 py-5 bg-[#060e1a] border-t border-[#198acd30]">
                  <p className="text-[#7fa6bd] text-sm md:text-base leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ask form */}
      <div
        ref={formRef}
        className={`relative z-10 max-w-3xl mx-auto scroll-hidden ${formVisible ? "scroll-visible" : ""}`}
      >
        <h3 className="text-[#e6f7ff] text-2xl md:text-3xl text-center mb-2">{t.faq.stillQ}</h3>
        <p className="text-[#7fa6bd] text-sm md:text-base text-center mb-8">{t.faq.sub}</p>
        {submitted ? (
          <div className="text-center py-10">
            <p className="text-[#3ed2ff] text-xl mb-2">{t.faq.sent}</p>
            <p className="text-[#7fa6bd] text-sm">{t.faq.sentSub}</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-[#198acd] text-sm underline">{t.faq.askAnother}</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                id="faq-name" type="text" placeholder={t.faq.namePh} required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input flex-1 bg-[#0a1628] border border-[#198acd40] rounded-xl px-5 py-4 text-[#e6f7ff] text-sm placeholder-[#7fa6bd60] transition-colors"
              />
              <input
                id="faq-email" type="email" placeholder={t.faq.emailPh} required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input flex-1 bg-[#0a1628] border border-[#198acd40] rounded-xl px-5 py-4 text-[#e6f7ff] text-sm placeholder-[#7fa6bd60] transition-colors"
              />
            </div>
            <textarea
              id="faq-question" placeholder={t.faq.questionPh} required rows={4} value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="form-input bg-[#0a1628] border border-[#198acd40] rounded-xl px-5 py-4 text-[#e6f7ff] text-sm placeholder-[#7fa6bd60] transition-colors resize-none"
            />
            <button
              id="faq-send-btn" type="submit" disabled={sending}
              className="self-center bg-[#3ed2ff] text-[#000101] text-base md:text-lg px-12 py-4 rounded-[50px] hover:bg-[#5ddcff] transition-colors cursor-pointer mt-2 disabled:opacity-60"
            >
              {sending ? "..." : t.faq.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
