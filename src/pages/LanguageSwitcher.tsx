import { useLang, Lang } from "@/contexts/LanguageContext";

const langLabels: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "ar", flag: "🇩🇿", label: "AR" },
];

export const LanguageSwitcher = (): JSX.Element => {
  const { lang, setLang } = useLang();

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 px-1 py-1 rounded-full border border-[#198acd30]"
      style={{ background: "rgba(0,1,1,0.65)", backdropFilter: "blur(14px)" }}
    >
      {langLabels.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={label}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
            lang === code
              ? "bg-[#3ed2ff] text-[#000101] shadow-[0_0_10px_rgba(62,210,255,0.4)]"
              : "text-[#7fa6bd] hover:text-[#3ed2ff]"
          }`}
        >
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};
