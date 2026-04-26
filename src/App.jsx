import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ions = [
  {
    id: "sodium",
    name: "נתרן",
    symbol: "Na⁺",
    emoji: "💧",
    color: "from-sky-400 to-blue-600",
    location: "בעיקר מחוץ לתאים ובנוזל הדם",
    role: "נתרן הוא אחד האלקטרוליטים המרכזיים ביותר בגוף. הוא עוזר לשמור על כמות המים הנכונה מחוץ לתאים, משתתף בהעברת אותות עצביים, מסייע לפעילות שרירים ומשפיע על לחץ הדם.",
    importance: "בלי איזון תקין של נתרן, הגוף מתקשה לשמור על נפח דם תקין, על לחץ דם יציב ועל תקשורת תקינה בין תאי עצב ושריר.",
    low: "חוסר בנתרן נקרא היפונתרמיה. הוא עלול לגרום לכאבי ראש, חולשה, בחילות, בלבול, עייפות, ובמצבים חמורים גם לפרכוסים או אובדן הכרה.",
    high: "עודף נתרן נקרא היפרנתרמיה. הוא יכול להופיע בהתייבשות, איבוד נוזלים או צריכת מלח גבוהה, ועלול לגרום לצמא חזק, יובש, בלבול וחולשה.",
    etymology: ["Sodium — שם אנגלי־מדעי שנקשר היסטורית למילה soda.", "Na — הסמל הכימי מגיע מן השם הלטיני־חדש Natrium.", "Natrium קשור ל-Natron, מלח מינרלי טבעי שהיה מוכר כבר בעת העתיקה.", "בעברית השם נתרן קשור לשורש/מונח קדום נתר."],
    discoverer: "סר המפרי דייבי (Humphry Davy)",
    life: "1778–1829",
    year: "1807",
    place: "המוסד המלכותי, לונדון, אנגליה",
    discovery: "דייבי בודד נתרן מתכתי בעזרת אלקטרוליזה של נתרן הידרוקסידי מותך, חומר שנקרא אז caustic soda.",
    visual: "היון Na⁺ הוא אטום נתרן שאיבד אלקטרון אחד ולכן נושא מטען חיובי. בגוף הוא נע בנוזלים ולא נראה בעין רגילה."
  },
  {
    id: "potassium",
    name: "אשלגן",
    symbol: "K⁺",
    emoji: "❤️",
    color: "from-emerald-400 to-green-600",
    location: "בעיקר בתוך התאים, במיוחד בתאי שריר ועצב",
    role: "אשלגן הוא אלקטרוליט חיוני לפעילות החשמלית של התאים. הוא חשוב במיוחד לקצב הלב, להעברת אותות עצביים, לכיווץ שרירים ולשמירה על איזון בין פנים התא לבין הנוזל שמחוץ לתא.",
    importance: "איזון האשלגן חשוב מאוד כי שינוי קטן מדי או גדול מדי ברמתו עלול להשפיע על פעילות הלב והשרירים.",
    low: "חוסר באשלגן נקרא היפוקלמיה. הוא עלול לגרום לחולשת שרירים, התכווצויות, עייפות, עצירות ולעיתים דפיקות לב או הפרעות קצב.",
    high: "עודף אשלגן נקרא היפרקלמיה. זה מצב שעלול להיות מסוכן, בעיקר בגלל השפעה אפשרית על קצב הלב.",
    etymology: ["Potassium — מן המילה Potash, כלומר pot + ash: אפר שהופק בתוך כלי או סיר.", "K — הסמל הכימי מגיע מן השם Kalium.", "Kalium קשור למילה alkali ולשורש הערבי al-qalyah.", "בעברית השם אשלגן קשור לאשלג."],
    discoverer: "סר המפרי דייבי (Humphry Davy)",
    life: "1778–1829",
    year: "1807",
    place: "המוסד המלכותי, לונדון, אנגליה",
    discovery: "דייבי בודד אשלגן בעזרת אלקטרוליזה של אשלגן הידרוקסידי מותך, שנקרא אז caustic potash.",
    visual: "היון K⁺ הוא אטום אשלגן שאיבד אלקטרון אחד. רוב האשלגן בגוף נמצא בתוך התאים."
  },
  {
    id: "calcium",
    name: "סידן",
    symbol: "Ca²⁺",
    emoji: "🦴",
    color: "from-violet-400 to-purple-700",
    location: "בעצמות, בשיניים, בדם ובתוך תאים בכמויות קטנות",
    role: "סידן חשוב לבניית עצמות ושיניים, לכיווץ שרירים, לקרישת דם, להעברת אותות עצביים ולתקשורת בין תאים.",
    importance: "סידן הוא גם חומר מבני וגם אות ביולוגי. הוא תומך בשלד, אבל גם משתתף בהפעלת שרירים ותגובות תאיות מהירות.",
    low: "חוסר בסידן נקרא היפוקלצמיה. הוא עלול לגרום לנימול, עוויתות שרירים, התכווצויות, חולשה ולעיתים הפרעות בקצב הלב.",
    high: "עודף סידן נקרא היפרקלצמיה. הוא עלול לגרום לצמא, השתנה מרובה, עצירות, עייפות, כאבי בטן ולעיתים בלבול.",
    etymology: ["Calcium — מן הלטינית calx, שפירושה סיד או אבן גיר.", "Ca — קיצור של Calcium.", "תרכובות סידן היו מוכרות בעת העתיקה באבן גיר, גיר וסיד.", "בעברית: סידן קשור לשם סיד."],
    discoverer: "סר המפרי דייבי (Humphry Davy), בעקבות עבודות של ברצליוס ופונטין",
    life: "דייבי: 1778–1829; ברצליוס: 1779–1848; פונטין: 1781–1874",
    year: "1808",
    place: "המוסד המלכותי, לונדון; ניסויים מקדימים בשוודיה",
    discovery: "דייבי בודד סידן בעזרת אלקטרוליזה בתהליך שכלל סיד ותחמוצת כספית, לאחר שעבודות קודמות הראו את אופי תרכובות הסידן.",
    visual: "היון Ca²⁺ הוא אטום סידן שאיבד שני אלקטרונים ולכן נושא מטען חיובי כפול."
  },
  {
    id: "magnesium",
    name: "מגנזיום",
    symbol: "Mg²⁺",
    emoji: "💪",
    color: "from-amber-400 to-orange-600",
    location: "בעיקר בתוך תאים, בשרירים ובעצמות",
    role: "מגנזיום משתתף במאות תגובות אנזימטיות, מסייע לייצור אנרגיה, להרפיית שרירים, לפעילות עצבית ולוויסות קצב הלב.",
    importance: "מגנזיום הוא כמו ‘עוזר עבודה’ של אנזימים רבים. הוא תומך באנרגיה תאית, בתפקוד שרירים ובאיזון מערכת העצבים.",
    low: "חוסר במגנזיום עלול לגרום להתכווצויות שרירים, רעד, עייפות, עצבנות, חולשה ולעיתים הפרעות בקצב הלב.",
    high: "עודף מגנזיום נדיר יחסית, אך עלול לגרום לחולשה, ישנוניות, ירידת לחץ דם והאטה בתפקוד שרירים ועצבים.",
    etymology: ["Magnesium — קשור לשם Magnesia, אזור גאוגרפי שממנו הגיעו שמות של כמה מינרלים.", "Mg — קיצור של Magnesium.", "Magnesia נקשרה היסטורית למגנזיה, מגנזיט ומינרלים דומים.", "השם מבטא את הקשר למינרלים שנמצאו באזור מגנסיה."],
    discoverer: "סר המפרי דייבי; ג׳וזף בלאק זיהה קודם שמגנזיה היא חומר נפרד",
    life: "דייבי: 1778–1829; ג׳וזף בלאק: 1728–1799",
    year: "1808",
    place: "המוסד המלכותי, לונדון; הזיהוי המוקדם נעשה בסקוטלנד",
    discovery: "דייבי בודד כמות קטנה של מגנזיום בעזרת אלקטרוליזה של תרכובות מגנזיום. מאוחר יותר הופק מגנזיום מתכתי בצורה ברורה יותר.",
    visual: "היון Mg²⁺ הוא אטום מגנזיום שאיבד שני אלקטרונים. הוא קטן יחסית ויעיל מאוד בהפעלה וייצוב של תגובות ביוכימיות."
  },
  {
    id: "chloride",
    name: "כלוריד",
    symbol: "Cl⁻",
    emoji: "🧪",
    color: "from-cyan-400 to-teal-600",
    location: "בעיקר מחוץ לתאים ובנוזל הדם",
    role: "כלוריד עוזר לשמור על מאזן נוזלים, איזון חומצה־בסיס, לחץ אוסמוטי, והוא חלק מחומצת הקיבה החיונית לעיכול.",
    importance: "כלוריד עובד יחד עם נתרן לשמירת איזון הנוזלים, ומסייע לגוף לשמור על רמת חומציות תקינה.",
    low: "חוסר בכלוריד עלול להופיע אחרי הקאות ממושכות או אובדן נוזלים, ועלול לגרום לחולשה, התייבשות ושינוי באיזון החומציות.",
    high: "עודף כלוריד עלול להופיע בהתייבשות או בהפרעות חומצה־בסיס, ולעיתים מלווה בשינויים ברמות נתרן וביקרבונט.",
    etymology: ["Chloride — הצורה היונית השלילית של Chlorine.", "Chlorine — מן היוונית chlōros, שפירושה ירקרק־צהבהב.", "Cl — קיצור של Chlorine.", "Chloride הוא יון כלור שקיבל אלקטרון ולכן נושא מטען שלילי."],
    discoverer: "קרל וילהלם שלה; דייבי הוכיח שמדובר ביסוד וקרא לו Chlorine",
    life: "שלה: 1742–1786; דייבי: 1778–1829",
    year: "1774; הוכר כיסוד בשנת 1810",
    place: "שוודיה; ההכרה כיסוד נקשרה לעבודתו של דייבי בלונדון",
    discovery: "שלה הפיק גז ירקרק־צהבהב מתגובה של מנגן דו־חמצני עם חומצה הידרוכלורית. דייבי הראה מאוחר יותר שמדובר ביסוד.",
    visual: "היון Cl⁻ הוא אטום כלור שקיבל אלקטרון ולכן נושא מטען שלילי."
  },
  {
    id: "phosphate",
    name: "פוספט",
    symbol: "PO₄³⁻",
    emoji: "⚡",
    color: "from-rose-400 to-pink-700",
    location: "בתאים, בעצמות, בשיניים ובדם",
    role: "פוספט חשוב לייצור אנרגיה תאית, למבנה DNA ו-RNA, לממברנות תאים ולחוזק העצמות והשיניים.",
    importance: "פוספט הוא חלק מרכזי ממולקולת ATP, שהיא מטבע האנרגיה של התא, ולכן הוא חיוני כמעט לכל פעילות תאית.",
    low: "חוסר בפוספט עלול לגרום לחולשה, כאבי שרירים, ירידה באנרגיה, בעיות בעצמות ולעיתים פגיעה בתפקוד תאי.",
    high: "עודף פוספט קשור לעיתים לתפקוד כליות ירוד ועלול להשפיע על מאזן סידן־זרחן ועל בריאות העצם וכלי הדם.",
    etymology: ["Phosphate — יון או מלח של חומצה זרחתית.", "Phosphorus — מן היוונית phōs = אור ו-phoros = נושא.", "משמעות השם: נושא האור או מביא האור.", "השם קשור לכך שזרחן לבן יכול לזהור בחושך."],
    discoverer: "הניג ברנד (Hennig Brand)",
    life: "בערך 1630–בערך 1710",
    year: "1669",
    place: "המבורג, גרמניה",
    discovery: "ברנד חיפש את אבן החכמים וניסה להפיק חומר יקר משתן. החומר שהתקבל זהר בחושך ונשרף בקלות.",
    visual: "פוספט הוא יון מורכב: אטום זרחן אחד מוקף בארבעה אטומי חמצן, עם מטען שלילי כולל."
  }
];

function playClick() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.17);
  } catch {
    // Sound is optional.
  }
}

function InfoBlock({ title, children, light }) {
  return (
    <div className={`rounded-3xl border p-5 ${light ? "bg-slate-100 border-slate-200" : "bg-white/10 border-white/10"}`}>
      <h3 className="font-black text-xl mb-2">{title}</h3>
      <div className={`${light ? "text-slate-700" : "text-white/75"} leading-8`}>{children}</div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(ions[0]);
  const [tab, setTab] = useState("role");
  const [dark, setDark] = useState(true);
  const [fontScale, setFontScale] = useState(1);
  const [copied, setCopied] = useState(false);

  const light = !dark;
  const pageClass = dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";
  const cardClass = dark ? "bg-white/10 border-white/15" : "bg-white border-slate-200 shadow-xl";
  const muted = dark ? "text-white/70" : "text-slate-700";
  const textSizeClass = fontScale === 0 ? "text-base" : fontScale === 1 ? "text-lg" : "text-xl";

  const facts = useMemo(() => [
    ["איזון הוא העיקר", "לא תמיד ‘יותר’ הוא טוב. הגוף צריך טווח מאוזן של אלקטרוליטים."],
    ["הכליות מנהלות את המערכת", "הכליות מסננות, שומרות או מפרישות אלקטרוליטים לפי צורכי הגוף."],
    ["ספורט והתייבשות משפיעים", "הזעה, שלשולים, הקאות או שתייה לא מאוזנת יכולים לשנות את הרמות."],
  ], []);

  const chooseIon = (ion) => {
    setSelected(ion);
    setTab("role");
    playClick();
  };

  const shareSite = async () => {
    const url = window.location.href;
    playClick();
    try {
      if (navigator.share) await navigator.share({ title: "אלקטרוליטים", url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      setCopied(false);
    }
  };

  const changeTextSize = (direction) => {
    playClick();
    setFontScale((value) => {
      if (direction === "up") return Math.min(2, value + 1);
      return Math.max(0, value - 1);
    });
  };

  return (
    <div dir="rtl" className={`min-h-screen p-6 overflow-hidden ${pageClass} ${textSizeClass}`}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className={`sticky top-3 z-30 mb-8 rounded-3xl border ${cardClass} backdrop-blur-xl p-3 flex flex-wrap gap-2 items-center justify-between`}>
          <div className="font-black">⚡ אלקטרוליטים</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { playClick(); setDark(!dark); }} className="rounded-full px-4 py-2 bg-blue-600 text-white font-bold">{dark ? "מצב בהיר" : "מצב כהה"}</button>
            <button onClick={shareSite} className="rounded-full px-4 py-2 bg-purple-600 text-white font-bold">{copied ? "הועתק!" : "שתף"}</button>
            <button onClick={() => changeTextSize("up")} className="rounded-full px-4 py-2 bg-emerald-600 text-white font-bold">A+</button>
            <button onClick={() => changeTextSize("down")} className="rounded-full px-4 py-2 bg-rose-600 text-white font-bold">A-</button>
          </div>
        </div>

        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
          <div className={`inline-flex rounded-full border px-4 py-2 mb-5 ${cardClass}`}>אתר לימודי אינטראקטיבי ⚡</div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4">אלקטרוליטים</h1>
          <p className={`${muted} leading-8 max-w-3xl mx-auto`}>
            אלקטרוליטים הם מינרלים בעלי מטען חשמלי. כאשר הם מומסים בנוזלי הגוף, הם מתפרקים ליונים ומאפשרים פעילות חשמלית חיונית בעצבים, בשרירים, בלב ובמערכת מאזן הנוזלים.
          </p>
        </motion.header>

        <section className={`rounded-[2rem] border p-6 sm:p-8 mb-10 ${cardClass}`}>
          <h2 className="text-3xl font-black mb-4">מה פירוש המילה “אלקטרוליט”?</h2>
          <p className={`${muted} leading-8 mb-4`}>המילה Electrolyte מורכבת מרעיון של חשמל ופירוק:</p>
          <ul className={`${muted} leading-8 list-disc pr-6 space-y-2`}>
            <li><b>Electro</b> — קשור לחשמל.</li>
            <li><b>Lyte / Lysis</b> — קשור לפירוק, המסה או התפרקות לחלקים.</li>
          </ul>
          <p className={`${muted} leading-8 mt-4`}>לכן אלקטרוליט הוא חומר שמתמוסס ומתפרק ליונים, והיונים האלה מסוגלים להוליך זרם חשמלי.</p>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 mb-10 place-items-center">
          {ions.map((ion, index) => (
            <motion.button key={ion.id} onClick={() => chooseIon(ion)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5 + index * 0.18, repeat: Infinity }} className={`rounded-full p-1 ${selected.id === ion.id ? "ring-4 ring-white/80" : ""}`}>
              <div className={`h-28 w-28 rounded-full bg-gradient-to-br ${ion.color} flex flex-col items-center justify-center shadow-2xl text-white`}>
                <div className="text-3xl">{ion.emoji}</div>
                <div className="text-2xl font-black">{ion.symbol}</div>
                <div className="text-sm font-bold">{ion.name}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[["role", "תפקיד"], ["balance", "חוסר / עודף"], ["visual", "איך נראה?"], ["etymology", "אטימולוגיה"], ["discovery", "גילוי"]].map(([key, label]) => (
            <button key={key} onClick={() => { playClick(); setTab(key); }} className={`rounded-full px-5 py-2 font-bold transition ${tab === key ? "bg-white text-slate-950" : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-200 text-slate-900 hover:bg-slate-300"}`}>{label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={selected.id + tab} initial={{ opacity: 0, x: 40, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -40, scale: 0.98 }} transition={{ duration: 0.35 }} className={`rounded-[2rem] border p-6 sm:p-8 shadow-2xl ${cardClass}`}>
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.color} p-5 mb-5 text-4xl text-white`}>{selected.emoji}</div>
            <h2 className="text-3xl font-black mb-2">{selected.name} <span className={dark ? "text-white/50" : "text-slate-500"}>{selected.symbol}</span></h2>
            <p className={dark ? "text-white/50 mb-6" : "text-slate-500 mb-6"}>{selected.location}</p>

            {tab === "role" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title="תפקיד בגוף">{selected.role}</InfoBlock><InfoBlock light={light} title="למה זה חשוב?">{selected.importance}</InfoBlock></div>}
            {tab === "balance" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title="כאשר יש חוסר">{selected.low}</InfoBlock><InfoBlock light={light} title="כאשר יש עודף">{selected.high}</InfoBlock></div>}
            {tab === "visual" && <InfoBlock light={light} title="מראה ברמה האטומית">{selected.visual}</InfoBlock>}
            {tab === "etymology" && <InfoBlock light={light} title="ניתוח אטימולוגי"><ul className="list-disc pr-6 space-y-2">{selected.etymology.map((line, index) => <li key={index}>{line}</li>)}</ul></InfoBlock>}
            {tab === "discovery" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title="שם המגלה">{selected.discoverer}</InfoBlock><InfoBlock light={light} title="שנות החיים">{selected.life}</InfoBlock><InfoBlock light={light} title="שנת הגילוי">{selected.year}</InfoBlock><InfoBlock light={light} title="מקום הגילוי">{selected.place}</InfoBlock><div className="md:col-span-2"><InfoBlock light={light} title="נסיבות הגילוי">{selected.discovery}</InfoBlock></div></div>}
          </motion.section>
        </AnimatePresence>

        <section className="mt-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/15 p-6 sm:p-8">
          <h2 className="text-3xl font-black mb-5">דברים חשובים שכדאי לזכור</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {facts.map(([title, text]) => <InfoBlock key={title} light={light} title={title}>{text}</InfoBlock>)}
          </div>
        </section>
      </div>
    </div>
  );
}
