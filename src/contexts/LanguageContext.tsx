import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "fr" | "ar";

export const translations = {
  en: {
    dir: "ltr" as const,
    hero: {
      date: "April 17–18, 2026 · Mobilis Complex · Chlef · On-Site",
      by: "by", enrollNow: "Enroll Now",
      question: "Have a Question?", clickAsk: "Click to Ask",
    },
    sponsors: { title: "Our Sponsors" },
    countdown: {
      title: "Countdown", regEnds: "Registration Ends In",
      hackStart: "Hackathon Start In", days: "Days", hours: "Hours",
      minutes: "Minutes", seconds: "Seconds",
      regDate: "14 April, 2026", hackDate: "17 April, 2026",
      closed: "Registration Closed",
    },
    about: {
      title: "About",
      text1: "BrainHack is a ", highlight: "27-hour",
      text2: " innovation sprint where the brightest student minds come together to design and build impactful solutions. In a fast-paced environment, participants collaborate, prototype, and pitch ideas that address real-world challenges while pushing the boundaries of creativity and technology.",
      stats: [
        { value: "36", label: "Participants", desc: "Selected creative student minds" },
        { value: "2", label: "Categories", desc: "Education & Smart Cities" },
        { value: "27", label: "Hours", desc: "Of non-stop innovation sprint" },
        { value: "1", label: "Winner", desc: "Ultimate grand prize champion" }
      ]
    },
    tracks: {
      title: "Tracks",
      t1label: "Track 01", t1name: "Education",
      t1desc: "Reimagine the future of learning by building tools that make education more accessible, engaging, and effective. From AI-powered tutoring systems to collaborative learning platforms, your project can bridge the gap between students and quality education.",
      t2label: "Track 02", t2name: "Smart Cities",
      t2desc: "Design solutions that make urban life smarter, greener, and more efficient. Think traffic optimization, energy management, waste reduction, or public safety systems powered by real-time data.",
    },
    timeline: {
      title: "Timeline",
      events: [
        { label: "Registration Opens", date: "7 April, 2026" },
        { label: "Registration Deadline", date: "14 April, 2026" },
        { label: "Hackathon Start", date: "17 April, 2026 · 9am" },
        { label: "Hackathon End", date: "18 April, 2026 · 1pm" },
        { label: "Prize Ceremony", date: "19 April, 2026" },
      ],
    },
    schedule: {
      title: "Schedule",
      day1: {
        type: "Day 01",
        title: "Hackathon Day",
        time1: "9:00 AM - 12:00 PM",
        event1: "Opening & Team Formation",
        time2: "12:00 PM - 2:00 PM",
        event2: "Lunch Break & Prayer",
        time3: "2:00 PM - 8:00 PM",
        event3: "Hacking & Development",
        location: "Location: Mobilis Campus",
      },
      day2: {
        type: "Day 02",
        title: "Submission & Judging",
        time1: "Until 1:00 PM",
        event1: "Online Continuation",
        time2: "1:00 PM",
        event2: "Final Submissions Due",
        location: "Platform: Online",
      },
    },
    location: {
      title: "Location",
      venue: "Venue",
      name: "Mobilis Campus",
      address: "Address",
      addressVal: "Mobilis Headquarters, Chlef, Algeria",
      day1: "The first day is an in-person event at our campus.",
      transport: "Easily accessible by public transport and car.",
      getDirections: "Get Directions",
      viewMaps: "View on Maps",
    },
    faq: {
      title: "FAQ",
      questions: [
        { q: "Who can participate in BrainHack 2026?", a: "BrainHack is open exclusively to informatique students at the University of Hassiba Ben Bouali (UHBC), Chlef." },
        { q: "Do I need prior experience in programming?", a: "Not necessarily! BrainHack values diverse skills. While technical skills help, we also need designers, product managers, and creative problem-solvers." },
        { q: "What should I bring to the hackathon?", a: "Bring your laptop, charger, and any hardware you might need.Most importantly, bring your ideas, energy, and team spirit!" },
        { q: "Is residence provided for students from other cities?", a: "Unfortunately, we do not offer residence for participants coming from other cities." },
        { q: "What are the prizes for the winners?", a: "The prize details are a surprise! They will stay hidden until the prize day on April 19." },
      ],
      stillQ: "Still have questions?", sub: "Send us your question and we'll get back to you.",
      namePh: "Your name", emailPh: "Your email", questionPh: "What's your question?",
      send: "Send Question", sent: "Question sent!", sentSub: "We'll reach out to you shortly.", askAnother: "Ask another question",
    },
    cta: {
      title: "Ready to Build the Future?",
      sub: "Spots are limited — secure your place at BrainHack 2026 and compete for prizes, recognition, and the chance to turn your idea into reality.",
      enroll: "Enroll Now",
      closed: "Registration Closed",
      closedSub: "The registration window has ended. Thank you for your interest — see you next edition!",
    },
    footer: { text: "BrainHack 2026 is organized by InfoBrains — the computer science club of Hassiba Ben Bouali University, Chlef, Algeria." },
    enroll: {
      title: "Enrollment Form",
      subtitle: "Join BrainHack 2026",
      back: "Back",
      fullName: "Full Name", fullNamePh: "e.g. Ahmed Benali",
      email: "Email Address", emailPh: "you@example.com",
      phone: "Phone Number", phonePh: "e.g. 0555 123 456",
      regNumber: "Registration Number", regNumberPh: "e.g. 20230001",
      level: "Academic Level", levelPh: "Select your level",
      speciality: "Speciality", specialityPh: "Select your speciality",
      portfolio: "Portfolio Link", portfolioPh: "e.g. https://github.com/username",
      optional: "optional",
      submit: "Submit Registration",
      submitting: "Submitting...",
      closedTitle: "Registration Closed",
      closedMsg: "The registration window closed on April 14, 2026. Thank you for your interest — stay tuned for the next edition!",
      notStartedTitle: "Registration Starting Soon",
      notStartedMsg: "Registration for BrainHack 2026 will open on April 7, 2026. Stay tuned!",
      errorDuplicate: "This email address is already registered.",
      errorGeneral: "Something went wrong. Please try again.",
      required: "This field is required.",
      specialities: [
        "Frontend Development",
        "Backend Development",
        "Fullstack Development",
        "Artificial Intelligence",
        "Cybersecurity",
        "Data Science",
        "Mobile Development",
        "Other",
      ],
    },
    modal: {
      title: "Registration Received",
      subtitle: "Your application for BrainHack 2026 has been successfully submitted.",
      name: "Name", email: "Email", level: "Level", speciality: "Speciality",
      statusTitle: "Selection Process",
      statusPending: "Your application is now under technical review.",
      statusAccepted: "SELECTED",
      statusRejected: "NOT SELECTED",
      statusNote: "You will receive a final confirmation email regardless of the outcome (Selected/Not Selected) once the review is complete.",
      emailNote: "A registration confirmation email has been sent to your address. Please check it for more instructions.",
      detail: "Selection results will be announced shortly via email.",
      close: "Return Home",
    },
  },

  fr: {
    dir: "ltr" as const,
    hero: {
      date: "17–18 Avril 2026 · Complexe Mobilis · Chlef · Sur site",
      by: "par", enrollNow: "S'inscrire", question: "Une question ?", clickAsk: "Cliquer ici",
    },
    sponsors: { title: "Nos Sponsors" },
    countdown: {
      title: "Compte à rebours", regEnds: "Fin des inscriptions dans",
      hackStart: "Début du hackathon dans", days: "Jours", hours: "Heures",
      minutes: "Minutes", seconds: "Secondes",
      regDate: "14 Avril, 2026", hackDate: "17 Avril, 2026",
      closed: "Inscriptions fermées",
    },
    about: {
      title: "À propos",
      text1: "BrainHack est un sprint d'innovation de ", highlight: "27 heures",
      text2: " où les meilleurs esprits étudiants se réunissent pour concevoir et réaliser des solutions percutantes. Dans un environnement dynamique, les participants collaborent, prototypent et présentent des idées qui répondent aux défis du monde réel.",
      stats: [
        { value: "36", label: "Participants", desc: "Esprits créatifs sélectionnés" },
        { value: "2", label: "Catégories", desc: "Éducation & Villes intelligentes" },
        { value: "27", label: "Heures", desc: "De sprint d'innovation non-stop" },
        { value: "1", label: "Gagnant", desc: "Le grand champion du hackathon" }
      ]
    },
    tracks: {
      title: "Thèmes",
      t1label: "Thème 01", t1name: "Éducation",
      t1desc: "Réinventez l'avenir de l'apprentissage en créant des outils qui rendent l'éducation plus accessible, engageante et efficace.",
      t2label: "Thème 02", t2name: "Villes intelligentes",
      t2desc: "Concevez des solutions qui rendent la vie urbaine plus intelligente, plus écologique et plus efficace.",
    },
    timeline: {
      title: "Calendrier",
      events: [
        { label: "Ouverture des inscriptions", date: "7 Avril, 2026" },
        { label: "Clôture des inscriptions", date: "14 Avril, 2026" },
        { label: "Début du hackathon", date: "17 Avril, 2026 · 9h" },
        { label: "Fin du hackathon", date: "18 Avril, 2026 · 13h" },
        { label: "Remise des prix", date: "19 Avril, 2026" },
      ],
    },
    schedule: {
      title: "Programme",
      day1: {
        type: "Jour 01",
        title: "Jour du Hackathon",
        time1: "9h00 - 12h00",
        event1: "Ouverture & Formation des Équipes",
        time2: "12h00 - 14h00",
        event2: "Pause Déjeuner & Prière",
        time3: "14h00 - 20h00",
        event3: "Développement & Hacking",
        location: "Lieu : Campus Mobilis",
      },
      day2: {
        type: "Jour 02",
        title: "Soumission & Évaluation",
        time1: "Jusqu'à 13h00",
        event1: "Continuation en Ligne",
        time2: "13h00",
        event2: "Date Limite des Soumissions",
        location: "Plateforme : En Ligne",
      },
    },
    location: {
      title: "Emplacement",
      venue: "Lieu",
      name: "Campus Mobilis",
      address: "Adresse",
      addressVal: "Siège de Mobilis, Algérie",
      day1: "Le premier jour est un événement en personne sur notre campus.",
      transport: "Facilement accessible en transports en commun et en voiture.",
      getDirections: "Obtenir l'itinéraire",
      viewMaps: "Voir sur Maps",
    },
    faq: {
      title: "FAQ",
      questions: [
        { q: "Qui peut participer à BrainHack 2026?", a: "BrainHack est ouvert exclusivement aux étudiants en informatique de l'Université Hassiba Ben Bouali (UHBC), Chlef." },
        { q: "Ai-je besoin d'une expérience préalable en programmation?", a: "Pas nécessairement ! BrainHack valorise les compétences diverses. Bien que les compétences techniques aident, nous avons également besoin de concepteurs, de chefs de produit et de résolveurs de problèmes créatifs." },
        { q: "Que dois-je apporter au hackathon?", a: " Apportez votre ordinateur portable, votre chargeur et tout le matériel dont vous pourriez avoir besoin. Surtout, apportez vos idées, votre énergie et votre esprit d’équipe." },
        { q: "L'hébergement est-il assuré pour les étudiants venant d'autres villes ?", a: "Malheureusement, nous ne proposons pas d'hébergement pour les participants venant d'autres villes." },
        { q: "Quels sont les prix pour les gagnants ?", a: "Les détails des prix sont une surprise ! Ils resteront cachés jusqu'au jour de la remise des prix, le 19 avril." },
      ],
      stillQ: "Encore des questions?", sub: "Envoyez-nous votre question et nous vous répondrons.",
      namePh: "Votre nom", emailPh: "Votre email", questionPh: "Votre question ?",
      send: "Envoyer", sent: "Question envoyée !", sentSub: "Nous vous contacterons bientôt.", askAnother: "Poser une autre question",
    },
    cta: {
      title: "Prêt à construire le futur ?",
      sub: "Les places sont limitées — sécurisez votre participation à BrainHack 2026.",
      enroll: "S'inscrire",
      closed: "Inscriptions fermées",
      closedSub: "La période d'inscription est terminée. Merci de votre intérêt — à la prochaine édition !",
    },
    footer: { text: "BrainHack 2026 est organisé par InfoBrains — le club informatique de l'Université Hassiba Ben Bouali, Chlef, Algérie." },
    enroll: {
      title: "Formulaire d'inscription",
      subtitle: "Rejoignez BrainHack 2026",
      back: "Retour",
      fullName: "Nom complet", fullNamePh: "ex. Ahmed Benali",
      email: "Adresse email", emailPh: "vous@exemple.com",
      phone: "Numéro de téléphone", phonePh: "ex. 0555 123 456",
      regNumber: "Numéro d'inscription", regNumberPh: "ex. 20230001",
      level: "Niveau académique", levelPh: "Choisissez votre niveau",
      speciality: "Spécialité", specialityPh: "Choisissez votre spécialité",
      portfolio: "Lien du portfolio", portfolioPh: "ex. https://github.com/username",
      optional: "facultatif",
      submit: "Soumettre l'inscription",
      submitting: "Envoi en cours...",
      closedTitle: "Inscriptions fermées",
      closedMsg: "La période d'inscription s'est terminée le 14 avril 2026. Merci de votre intérêt !",
      notStartedTitle: "L'inscription commence bientôt",
      notStartedMsg: "L'inscription pour BrainHack 2026 ouvrira le 7 avril 2026. Restez à l'écoute !",
      errorDuplicate: "Cette adresse email est déjà inscrite.",
      errorGeneral: "Une erreur s'est produite. Veuillez réessayer.",
      required: "Ce champ est requis.",
      specialities: [
        "Développement Frontend",
        "Développement Backend",
        "Développement Fullstack",
        "Intelligence Artificielle",
        "Cybersécurité",
        "Science des données",
        "Développement Mobile",
        "Autre",
      ],
    },
    modal: {
      title: "Inscription Reçue",
      subtitle: "Votre candidature pour BrainHack 2026 a été soumise avec succès.",
      name: "Nom", email: "Email", level: "Niveau", speciality: "Spécialité",
      statusTitle: "Processus de Sélection",
      statusPending: "Votre candidature est actuellement en cours de révision technique.",
      statusAccepted: "SÉLECTIONNÉ",
      statusRejected: "NON SÉLECTIONNÉ",
      statusNote: "Vous recevrez un e-mail de confirmation final quel que soit le résultat (Sélectionné/Non Sélectionné) une fois la révision terminée.",
      emailNote: "Un e-mail de confirmation d'inscription a été envoyé à votre adresse. Veuillez le consulter pour plus d'instructions.",
      detail: "Les résultats de la sélection seront annoncés prochainement par e-mail.",
      close: "Retour à l'accueil",
    },
  },

  ar: {
    dir: "rtl" as const,
    hero: {
      date: "١٧–١٨ أبريل ٢٠٢٦ · مجمع موبيليس · شلف · حضوري",
      by: "بواسطة", enrollNow: "سجّل الآن",
      question: "لديك سؤال؟", clickAsk: "انقر هنا",
    },
    sponsors: { title: "رعاة الحدث" },
    countdown: {
      title: "العد التنازلي", regEnds: "نهاية التسجيل خلال",
      hackStart: "ينطلق الهاكاثون خلال", days: "أيام", hours: "ساعات",
      minutes: "دقائق", seconds: "ثواني",
      regDate: "١٤ أبريل ٢٠٢٦", hackDate: "١٧ أبريل ٢٠٢٦",
      closed: "انتهى التسجيل",
    },
    about: {
      title: "عن الحدث",
      text1: " BrainHack هو سباق ابتكار ", highlight: "٢٧ ساعة ",
      text2: "  تجتمع فيه أفضل العقول الطلابية لتصميم وبناء حلول مؤثرة. في بيئة سريعة الإيقاع، يتعاون المشاركون ويقومون ببناء نماذج أولية وتقديم أفكار تعالج تحديات العالم الحقيقي.",
      stats: [
        { value: "٣٦", label: "مشارك", desc: "من أفضل العقول الإبداعية" },
        { value: "٢", label: "فئتين", desc: "التعليم والمدن الذكية" },
        { value: "٢٧", label: "ساعة", desc: "من الابتكار المتواصل" },
        { value: "١", label: "فائز", desc: "بطل الجائزة الكبرى النهائي" }
      ]
    },
    tracks: {
      title: "المسارات",
      t1label: "المسار ٠١", t1name: "التعليم",
      t1desc: "أعد تصور مستقبل التعلم من خلال بناء أدوات تجعل التعليم أكثر سهولة في الوصول وإشراكًا وفعالية.",
      t2label: "المسار ٠٢", t2name: "المدن الذكية",
      t2desc: "صمم حلولاً تجعل الحياة الحضرية أكثر ذكاءً وخضرة وكفاءة.",
    },
    timeline: {
      title: "الجدول الزمني",
      events: [
        { label: "بداية التسجيل", date: "٧ أبريل ٢٠٢٦" },
        { label: "نهاية التسجيل", date: "١٤ أبريل ٢٠٢٦" },
        { label: "انطلاق الهاكاثون", date: "١٧ أبريل ٢٠٢٦ · ٩ص" },
        { label: "نهاية الهاكاثون", date: "١٨ أبريل ٢٠٢٦ · ١م" },
        { label: "يوم الجوائز", date: "١٩ أبريل ٢٠٢٦" },
      ],
    },
    schedule: {
      title: "البرنامج",
      day1: {
        type: "اليوم 01",
        title: "يوم الهاكاثون",
        time1: "9:00 ص - 12:00 م",
        event1: "الافتتاح وتشكيل الفرق",
        time2: "12:00 م - 2:00 م",
        event2: "استراحة الغداء والصلاة",
        time3: "2:00 م - 8:00 م",
        event3: "التطوير والهاكينغ",
        location: "الموقع: حرم موبيليس",
      },
      day2: {
        type: "اليوم 02",
        title: "التقديم والتقييم",
        time1: "حتى 1:00 م",
        event1: "الاستمرار عبر الإنترنت",
        time2: "1:00 م",
        event2: "موعد إغلاق التقديمات",
        location: "المنصة: عبر الإنترنت",
      },
    },
    location: {
      title: "الموقع",
      venue: "المكان",
      name: "مجمع موبيليس",
      address: "العنوان",
      addressVal: "المقر الرئيسي لموبيليس، الجزائر",
      day1: "اليوم الأول حضوري في مجمعنا.",
      transport: "سهولة الوصول عبر وسائل النقل العام والسيارة.",
      getDirections: "الحصول على الاتجاهات",
      viewMaps: "عرض على الخرائط",
    },
    faq: {
      title: "الأسئلة الشائعة",
      questions: [
        { q: "من يمكنه المشاركة في BrainHack 2026؟", a: "تظاهرة BrainHack مفتوحة حصرياً لطلبة الإعلام الآلي بجامعة حسيبة بن بوعلي بالشلف (UHBC)." },
        { q: "هل أحتاج إلى خبرة مسبقة في البرمجة؟", a: "ليس بالضرورة! تقدر BrainHack المهارات المتنوعة. في حين أن المهارات التقنية تساعدنا، فإننا نحتاج أيضًا إلى مصممين مبدعين ومديري منتجات ومحللين للمشاكل." },
        { q: "ماذا يجب أن أحضر إلى الهاكاثون؟", a: "أحضر الكمبيوتر المحمول والشاحن وأي أجهزة قد تحتاجها. قبل كل شيء، أحضر أفكارك وطاقتك وروح الفريق." },
        { q: "هل يتم توفير الإقامة للطلاب القادمين من مدن أخرى؟", a: "للأسف، نحن لا نوفر الإقامة للمشاركين القادمين من مدن أخرى." },
        { q: "ما هي الجوائز المقدمة للفائزين؟", a: "تفاصيل الجوائز مفاجأة! ستبقى مخفية حتى يوم توزيع الجوائز في 19 أبريل." },
      ],
      stillQ: "هل لا تزال لديك أسئلة؟", sub: "أرسل لنا سؤالك وسنرد عليك.",
      namePh: "اسمك", emailPh: "بريدك الإلكتروني", questionPh: "ما سؤالك؟",
      send: "إرسال", sent: "تم إرسال السؤال!", sentSub: "سنتواصل معك قريبًا.", askAnother: "اطرح سؤالاً آخر",
    },
    cta: {
      title: "هل أنت مستعد لبناء المستقبل؟",
      sub: "الأماكن محدودة — احجز مكانك في BrainHack 2026.",
      enroll: "سجّل الآن",
      closed: "انتهى التسجيل",
      closedSub: "انتهت فترة التسجيل. شكرًا لاهتمامك — نراك في الطبعة القادمة!",
    },
    footer: { text: "BrainHack 2026 منظَّم من قِبَل InfoBrains — نادي الإعلام الآلي بجامعة حسيبة بن بوعلي، الشلف، الجزائر." },
    enroll: {
      title: "نموذج التسجيل",
      subtitle: "انضم إلى BrainHack 2026",
      back: "رجوع",
      fullName: "الاسم الكامل", fullNamePh: "اللقب و الاسم",
      email: "البريد الإلكتروني", emailPh: "email@example.com",
      phone: "رقم الهاتف", phonePh: "05 00 00 00 00",
      regNumber: "رقم التسجيل", regNumberPh: "2024321391**",
      level: "المستوى الدراسي", levelPh: "اختر مستواك",
      speciality: "التخصص", specialityPh: "اختر تخصصك",
      portfolio: "رابط portfolio", portfolioPh: "https://github.com/username",
      optional: "اختياري",
      submit: "إرسال",
      submitting: "جارٍ الإرسال...",
      closedTitle: "تم التسجيل",
      closedMsg: "انتهت فترة التسجيل في ١٤ أبريل ٢٠٢٦. شكرًا لاهتمامك!",
      notStartedTitle: "التسجيل يبدأ قريباً",
      notStartedMsg: "سيفتح باب التسجيل لـ BrainHack 2026 في ٧ أبريل، ٢٠٢٦. كن في الموعد!",
      errorDuplicate: "البريد الإلكتروني مسجّل مسبقًا.",
      errorGeneral: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
      required: "هذا الحقل مطلوب.",
      specialities: [
        "تطوير الواجهة الأمامية",
        "تطوير الواجهة الخلفية",
        "التطوير الكامل",
        "الذكاء الاصطناعي",
        "الأمن السيبراني",
        "علم البيانات",
        "تطوير التطبيقات المحمولة",
        "أخرى",
      ],
    },
    modal: {
      title: "تم التسجيل بنجاح!",
      subtitle: "تم استلام طلبك.",
      name: "الاسم", email: "البريد الإلكتروني", level: "المستوى", speciality: "التخصص",
      statusTitle: "عملية الاختيار",
      statusPending: "طلبك قيد المراجعة الفنية حالياً.",
      statusAccepted: "مختار",
      statusRejected: "غير مختار",
      statusNote: "ستتلقى بريداً إلكترونياً للتأكيد النهائي بغض النظر عن النتيجة (مختار/غير مختار) بمجرد اكتمال المراجعة.",
      emailNote: "تم إرسال بريد تأكيد التسجيل إلى عنوانك. يرجى التحقق منه للحصول على مزيد من التعليمات.",
      detail: "سيتم الإعلان عن نتائج الاختيار قريباً عبر البريد الإلكتروني.",
      close: "العودة للرئيسية",
    },
  },
};

type TranslationSet = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: TranslationSet;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en", setLang: () => {}, t: translations.en,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("en");

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.dir = translations[l].dir;
    document.documentElement.lang = l;
  };

  useEffect(() => {
    document.documentElement.dir = "ltr";
    document.documentElement.lang = "en";
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as TranslationSet }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
