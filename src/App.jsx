import React, { useMemo, useState, useEffect, useRef } from "react"; import { motion, AnimatePresence } from "framer-motion";

const clickSoundUrl = "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3";

const electrolytes = [ { id: "sodium", symbol: "Na⁺", name: "נתרן", emoji: "💧", charge: "יון חיובי", location: "בעיקר מחוץ לתאים", role: "שומר על מאזן הנוזלים, מסייע להעברת אותות עצביים ומשפיע על לחץ הדם.", low: "חולשה, כאבי ראש, בלבול ולעיתים בחילות.", high: "צמא חזק, יובש, בלבול ולעיתים סימני התייבשות.", etymology: [ "Sodium — מן המילה האנגלית/מדעית Sodium, שנקשרה היסטורית ל-soda ול-sodanum.", "Na — הסמל הכימי מגיע מן השם הלטיני־חדש Natrium.", "Natrium — קשור ל-Natron, מלח מינרלי טבעי שהיה מוכר במצרים ובאזורים קדומים, בעיקר כנתרן פחמתי מימי.", "פירוק רעיוני: Natron / Natrium = משפחת תרכובות נתרן; Sodium = השם האנגלי שנתן דייבי לאחר בידוד המתכת." ], discoverer: "סר המפרי דייבי (Humphry Davy)", scientistLife: "1778–1829", discoveryYear: "1807", discoveryPlace: "המוסד המלכותי, לונדון, אנגליה (Royal Institution, London)", discoveryCircumstances: "דייבי בודד נתרן מתכתי בעזרת אלקטרוליזה של נתרן הידרוקסידי מותך — חומר שנקרא אז caustic soda. הזרם החשמלי פירק את התרכובת ואפשר לקבל את המתכת החופשית, שאינה מופיעה בטבע במצב חופשי בגלל תגובתיותה הגבוהה.", gradient: "from-sky-300 to-blue-500", }, { id: "potassium", symbol: "K⁺", name: "אשלגן", emoji: "❤️", charge: "יון חיובי", location: "בעיקר בתוך התאים", role: "חיוני לפעילות תקינה של שרירים, עצבים וקצב הלב.", low: "חולשת שרירים, התכווצויות, עייפות ולעיתים דפיקות לב.", high: "עלול להשפיע על קצב הלב ודורש התייחסות רפואית.", etymology: [ "Potassium — מן המילה Potash, כלומר ‘אפר־סיר’: אפר צמחים או עץ שהושרה במים בתוך סיר, ואז התאדו המים וקיבלו מלחי אשלגן.", "K — הסמל הכימי מגיע מן Kalium.", "Kalium — קשור ל-alkali ולשורש הערבי al-qalyah, שפירושו אפר צמחים.", "פירוק רעיוני: pot + ash = סיר + אפר; Kalium = השם המדעי־לטיני שהוביל לסמל K." ], discoverer: "סר המפרי דייבי (Humphry Davy)", scientistLife: "1778–1829", discoveryYear: "1807", discoveryPlace: "המוסד המלכותי, לונדון, אנגליה (Royal Institution, London)", discoveryCircumstances: "דייבי בודד אשלגן מאלקטרוליזה של אשלגן הידרוקסידי מותך, שנקרא caustic potash. זה היה אחד המקרים הראשונים שבהם מתכת בודדה בעזרת אלקטרוליזה, והדבר הראה שהאשלג אינו חומר יחיד פשוט אלא מכיל יסוד מתכתי חדש.", gradient: "from-emerald-300 to-green-600", }, { id: "calcium", symbol: "Ca²⁺", name: "סידן", emoji: "🦴", charge: "יון חיובי דו־ערכי", location: "בעצמות, בדם ובתאים", role: "חשוב לעצמות, כיווץ שרירים, קרישת דם ותקשורת בין תאים.", low: "נימול, עוויתות שרירים ותחושת אי־שקט.", high: "צמא, עצירות, עייפות ולעיתים בלבול.", etymology: [ "Calcium — מן הלטינית calx, שפירושה סיד או אבן גיר.", "Ca — קיצור של Calcium.", "Calx — קשור לחומרים עתיקים כמו סיד, גיר ואבן גיר, שבהם תרכובות סידן היו מוכרות הרבה לפני בידוד היסוד עצמו.", "פירוק רעיוני: calx = סיד/גיר; calcium = היסוד שנמצא בבסיס תרכובות הסיד." ], discoverer: "סר המפרי דייבי (Humphry Davy), בהמשך לעבודתם של ינס יאקוב ברצליוס ומגנוס מרטין פון פונטין", scientistLife: "דייבי: 1778–1829; ברצליוס: 1779–1848; פון פונטין: 1781–1874", discoveryYear: "1808", discoveryPlace: "המוסד המלכותי, לונדון, אנגליה; הניסויים המקדימים של ברצליוס ופונטין נערכו בשוודיה", discoveryCircumstances: "תרכובות סידן היו ידועות אלפי שנים, אך היסוד בודד רק לאחר התפתחות האלקטרוליזה. דייבי השתמש בתערובת של סיד ומרקורי אוקסיד; האלקטרוליזה יצרה אמלגם של סידן־כספית, ולאחר סילוק הכספית התקבלה מתכת הסידן.", gradient: "from-violet-300 to-purple-600", }, { id: "magnesium", symbol: "Mg²⁺", name: "מגנזיום", emoji: "💪", charge: "יון חיובי דו־ערכי", location: "בתאים, בשרירים ובעצמות", role: "משתתף במאות תהליכים, כולל ייצור אנרגיה והרפיית שרירים.", low: "התכווצויות, רעד, עייפות ולעיתים הפרעות בקצב הלב.", high: "נדיר יותר, אך עלול לגרום לחולשה, ישנוניות וירידת לחץ דם.", etymology: [ "Magnesium — קשור לשם Magnesia, אזור גאוגרפי ביוון/אסיה הקטנה שממנו הגיעו שמות של כמה מינרלים.", "Mg — קיצור של Magnesium.", "Magnesia — שם היסטורי שנקשר למגנזיה, מגנזיט ומינרלים דומים; היה צורך להבדיל בינו לבין חומרים אחרים בעלי שמות דומים כמו מנגן ומגנטיט.", "פירוק רעיוני: Magnesia = מקום/משפחת מינרלים; Magnesium = היסוד שמזוהה עם תרכובות המגנזיה." ], discoverer: "סר המפרי דייבי (Humphry Davy); ג׳וזף בלאק זיהה קודם לכן שמגנזיה היא חומר נפרד", scientistLife: "דייבי: 1778–1829; ג׳וזף בלאק: 1728–1799", discoveryYear: "1808", discoveryPlace: "המוסד המלכותי, לונדון, אנגליה; הזיהוי המוקדם של מגנזיה כחומר נפרד נעשה בסקוטלנד", discoveryCircumstances: "דייבי בודד כמות קטנה של מתכת מגנזיום בעזרת אלקטרוליזה של מגנזיה לחה עם מרקורי אוקסיד. מאוחר יותר, בשנת 1831, אנטואן ביסי הכין מגנזיום בצורה מתכתית מגובשת וברורה יותר.", gradient: "from-amber-300 to-orange-500", }, { id: "chloride", symbol: "Cl⁻", name: "כלוריד", emoji: "🧪", charge: "יון שלילי", location: "בעיקר מחוץ לתאים", role: "עוזר לשמור על איזון חומצה־בסיס ומשתתף ביצירת חומצת הקיבה.", low: "יכול להופיע עם הקאות, חולשה ושינויים באיזון החומציות.", high: "יכול להופיע בהתייבשות או בשינויים במאזן החומצה־בסיס.", etymology: [ "Chloride — הצורה היונית השלילית של Chlorine.", "Chlorine — מן היוונית chlōros, שפירושה ירקרק־צהבהב או ירוק חיוור.", "Cl — קיצור של Chlorine.", "פירוק רעיוני: chlōros = צבע ירקרק־צהבהב; chlorine = הגז הירקרק־צהבהב; chloride = יון הכלור לאחר שקיבל אלקטרון." ], discoverer: "קרל וילהלם שלה (Carl Wilhelm Scheele); המפרי דייבי הוכיח שמדובר ביסוד ונתן את השם Chlorine", scientistLife: "שלה: 1742–1786; דייבי: 1778–1829", discoveryYear: "1774; הוכר כיסוד ונקרא Chlorine בשנת 1810", discoveryPlace: "שוודיה — מעבדתו של שלה; ההכרה כיסוד והשם Chlorine נקשרו לעבודתו של דייבי בלונדון", discoveryCircumstances: "שלה הפיק גז ירקרק־צהבהב כאשר הגיב מנגן דו־חמצני עם חומצה הידרוכלורית. הוא חשב שמדובר בתרכובת המכילה חמצן, לפי התפיסות הכימיות של התקופה. בשנת 1810 דייבי הראה שלא מדובר בתרכובת אלא ביסוד, וקרא לו Chlorine על שם צבעו.", gradient: "from-cyan-300 to-teal-600", }, { id: "phosphate", symbol: "PO₄³⁻", name: "פוספט", emoji: "⚡", charge: "יון שלילי", location: "בתאים, בעצמות ובדם", role: "מרכיב חשוב באנרגיה תאית, DNA, ממברנות תאים ובריאות העצם.", low: "חולשה, כאבי שרירים ופגיעה באנרגיה התאית.", high: "לעיתים קשור לתפקוד כליות ולמאזן סידן־זרחן.", etymology: [ "Phosphate — יון או מלח של חומצה זרחתית, המבוסס על היסוד Phosphorus.", "Phosphorus — מן היוונית phōs/phōt- = אור, ו-phoros = נושא/מביא.", "משמעות השם: ‘נושא האור’ או ‘מביא האור’, בגלל היכולת של זרחן לבן לזהור בחושך.", "פירוק רעיוני: phōs = אור; phoros = נושא; phosphorus = נושא אור; phosphate = צורת תרכובת/יון של זרחן מחומצן." ], discoverer: "הניג ברנד (Hennig Brand)", scientistLife: "בערך 1630–בערך 1710", discoveryYear: "1669", discoveryPlace: "המבורג, גרמניה", discoveryCircumstances: "ברנד, אלכימאי מהמבורג, חיפש את ‘אבן החכמים’ וניסה להפיק חומר יקר משתן. הוא נתן לשתן לעמוד, אידה אותו, חימם את השארית בחום גבוה ואסף אדים שהתעבו במים. החומר הלבן־שעוותי שהתקבל זהר בחושך ונשרף בקלות — זרחן לבן.", gradient: "from-rose-300 to-pink-600", }, ];

function IonOrb({ item, index, active, onClick }) { return ( <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.94 }} onClick={onClick} aria-label={בחר ${item.name}} className={relative rounded-full p-1 ${active ? "ring-4 ring-white/80" : ""}} animate={{ y: [0, -10, 0] }} transition={{ duration: 2.8 + index * 0.2, repeat: Infinity, ease: "easeInOut" }} > <div className={h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-gradient-to-br ${item.gradient} shadow-2xl flex flex-col items-center justify-center text-white border border-white/40}> <div className="text-2xl mb-1">{item.emoji}</div> <div className="text-2xl font-black tracking-wide">{item.symbol}</div> <div className="text-sm font-semibold">{item.name}</div> </div> <motion.div className="absolute inset-0 rounded-full border border-white/40" animate={{ scale: [1, 1.28, 1], opacity: [0.45, 0, 0.45] }} transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.18 }} /> </motion.button> ); }

function BodyMap({ active }) { return ( <div className="relative mx-auto h-[430px] max-w-sm rounded-[2rem] bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl"> <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.28),_transparent_45%)]" /> <div className="absolute left-1/2 top-8 -translate-x-1/2 h-20 w-20 rounded-full bg-white/20 border border-white/40" /> <div className="absolute left-1/2 top-28 -translate-x-1/2 h-44 w-32 rounded-[3rem] bg-white/20 border border-white/40" /> <div className="absolute left-[72px] top-36 h-36 w-9 rounded-full bg-white/20 rotate-12" /> <div className="absolute right-[72px] top-36 h-36 w-9 rounded-full bg-white/20 -rotate-12" /> <div className="absolute left-[120px] top-[285px] h-32 w-10 rounded-full bg-white/20 rotate-6" /> <div className="absolute right-[120px] top-[285px] h-32 w-10 rounded-full bg-white/20 -rotate-6" />

<motion.div
    className="absolute left-1/2 top-[162px] -translate-x-1/2 rounded-full bg-red-400/80 p-3 shadow-lg text-3xl"
    animate={{ scale: active.id === "potassium" ? [1, 1.25, 1] : [1, 1.08, 1] }}
    transition={{ duration: 1.1, repeat: Infinity }}
  >
    ❤️
  </motion.div>

  <motion.div
    className="absolute left-1/2 top-[78px] -translate-x-1/2 rounded-full bg-indigo-400/80 p-2 shadow-lg text-3xl"
    animate={{ opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 1.5, repeat: Infinity }}
  >
    🧠
  </motion.div>

  {[...Array(18)].map((_, i) => (
    <motion.div
      key={i}
      className={`absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br ${active.gradient}`}
      style={{ left: `${20 + (i * 31) % 62}%`, top: `${20 + (i * 47) % 70}%` }}
      animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.5, 0.8] }}
      transition={{ duration: 1.5 + (i % 5) * 0.3, repeat: Infinity, delay: i * 0.12 }}
    />
  ))}

  <div className="absolute bottom-5 right-5 left-5 rounded-2xl bg-black/25 p-4 text-white text-right border border-white/10">
    <div className="text-sm opacity-80">המחשה פעילה בגוף</div>
    <div className="text-xl font-bold">{active.name} — {active.symbol}</div>
    <div className="text-sm mt-1 opacity-90">{active.location}</div>
  </div>
</div>

); }

export default function App() { const [selected, setSelected] = useState(electrolytes[0]); const [tab, setTab] = useState("role"); const [darkMode, setDarkMode] = useState(true); const [fontScale, setFontScale] = useState(1); const [copied, setCopied] = useState(false); const audioRef = useRef(null);

useEffect(() => { audioRef.current = new Audio(clickSoundUrl); audioRef.current.volume = 0.25; }, []);

const facts = useMemo(() => [ { emoji: "⚡", title: "הם מוליכים חשמל", text: "במים, אלקטרוליטים נושאים מטען חשמלי. לכן הם מאפשרים תקשורת בין עצבים ושרירים." }, { emoji: "🌊", title: "הם מאזנים נוזלים", text: "הגוף משתמש בהם כדי להחליט כמה מים יישארו בתוך התאים וכמה מחוץ להם." }, { emoji: "❤️", title: "הם משפיעים על הלב", text: "במיוחד אשלגן, מגנזיום וסידן. חוסר איזון משמעותי עלול להשפיע על קצב הלב." }, { emoji: "⚠️", title: "עודף וחוסר שניהם חשובים", text: "לא תמיד 'יותר' זה טוב. הגוף צריך טווח מאוזן, לא מקסימום." }, ], []);

const handleSelect = (item) => { setSelected(item); try { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.play(); } } catch (error) { console.log("Sound could not play", error); } };

const handleShare = async () => { const url = window.location.href; try { if (navigator.share) { await navigator.share({ title: "אלקטרוליטים — אתר אינטראקטיבי", url }); } else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } } catch (error) { console.log("Share cancelled or failed", error); } };

const pageClass = darkMode ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";

const softCard = darkMode ? "bg-white/10 border-white/15 text-white" : "bg-white border-slate-200 text-slate-950 shadow-xl";

const mutedText = darkMode ? "text-white/75" : "text-slate-700"; const faintText = darkMode ? "text-white/55" : "text-slate-500"; const innerCard = darkMode ? "bg-white/10 border-white/10" : "bg-slate-100 border-slate-200";

return ( <div dir="rtl" className={min-h-screen overflow-hidden ${pageClass}} style={{ fontSize: ${fontScale}rem }}> <div className="fixed inset-0 pointer-events-none"> <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" /> <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" /> <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" /> </div>

<header className="relative px-5 py-8 sm:py-14 max-w-7xl mx-auto">
    <div className={`sticky top-3 z-50 mb-8 rounded-3xl border ${softCard} backdrop-blur-xl p-3 flex flex-wrap gap-2 items-center justify-between`}>
      <div className="font-black">⚡ אלקטרוליטים</div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setDarkMode(!darkMode)} className="rounded-full px-4 py-2 bg-blue-600 text-white font-bold">
          {darkMode ? "מצב בהיר" : "מצב כהה"}
        </button>
        <button onClick={handleShare} className="rounded-full px-4 py-2 bg-purple-600 text-white font-bold">
          {copied ? "הועתק!" : "שתף"}
        </button>
        <button onClick={() => setFontScale((v) => Math.min(1.25, Number((v + 0.05).toFixed(2))))} className="rounded-full px-4 py-2 bg-emerald-600 text-white font-bold">A+</button>
        <button onClick={() => setFontScale((v) => Math.max(0.9, Number((v - 0.05).toFixed(2))))} className="rounded-full px-4 py-2 bg-rose-600 text-white font-bold">A-</button>
      </div>
    </div>

    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm mb-5 ${softCard}`}>
          <span>⚡</span>
          אתר לימודי אינטראקטיבי
        </div>
        <h1 className="text-4xl sm:text-6xl font-black leading-tight">
          אלקטרוליטים:<br />
          <span className="bg-gradient-to-l from-cyan-300 via-blue-300 to-purple-300 text-transparent bg-clip-text">המינרלים שמפעילים את הגוף</span>
        </h1>
        <p className={`mt-6 text-lg sm:text-xl leading-8 max-w-2xl ${mutedText}`}>
          אלקטרוליט הוא מינרל בעל מטען חשמלי. הוא קטן מאוד, בלתי נראה לעין, אבל חיוני לפעילות הלב, המוח, השרירים, מאזן הנוזלים והאנרגיה התאית.
        </p>
      </div>

      <div className="relative min-h-[360px] flex items-center justify-center">
        <motion.div className="absolute h-64 w-64 rounded-full border border-cyan-300/30" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute h-80 w-80 rounded-full border border-purple-300/25" animate={{ rotate: -360 }} transition={{ duration: 26, repeat: Infinity, ease: "linear" }} />
        <motion.div className="relative h-44 w-44 rounded-full bg-gradient-to-br from-cyan-300 to-blue-700 shadow-2xl flex flex-col items-center justify-center text-white" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 2.4, repeat: Infinity }}>
          <div className="text-5xl font-black">Na⁺</div>
          <div className="text-white/80">יון לדוגמה</div>
        </motion.div>
        {electrolytes.slice(1, 6).map((e, i) => (
          <motion.div
            key={e.id}
            className={`absolute rounded-full border px-3 py-2 text-sm shadow-xl ${softCard}`}
            style={{ right: `${18 + i * 14}%`, top: `${18 + (i % 3) * 22}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.65, 1, 0.65] }}
            transition={{ duration: 2 + i * 0.25, repeat: Infinity }}
          >
            {e.symbol}
          </motion.div>
        ))}
      </div>
    </motion.div>
  </header>

  <main className="relative max-w-7xl mx-auto px-5 pb-20 space-y-16">
    <section className={`rounded-[2rem] border p-6 sm:p-10 ${softCard}`}>
      <h2 className="text-3xl sm:text-4xl font-black mb-4">מה פירוש המילה ״אלקטרוליט״?</h2>
      <p className={`leading-8 mb-4 ${mutedText}`}>
        המילה ״אלקטרוליט״ מגיעה משילוב רעיוני של חשמל ופירוק/המסה. באנגלית: Electrolyte.
      </p>
      <ul className={`list-disc pr-6 space-y-2 leading-7 ${mutedText}`}>
        <li><b>Electro</b> — קשור לחשמל ⚡</li>
        <li><b>Lysis / Lyte</b> — קשור לפירוק, המסה או התפרקות לחלקים</li>
      </ul>
      <p className={`leading-8 mt-4 ${mutedText}`}>
        כלומר: אלקטרוליט הוא חומר שמתפרק ליונים כשהוא נמצא בנוזל — והיונים האלה יכולים להוליך חשמל.
      </p>
      <p className={`leading-8 mt-4 ${mutedText}`}>
        בגוף זה מתרחש בדם ובנוזלי הגוף: מינרלים מתמוססים, הופכים ליונים, ומאפשרים מעבר אותות חשמליים בין תאים, עצבים ושרירים.
      </p>
    </section>

    <section className="grid lg:grid-cols-[1fr_1.2fr] gap-8 items-center">
      <BodyMap active={selected} />
      <div>
        <h2 className="text-3xl sm:text-4xl font-black mb-4">איך אלקטרוליט “נראה”?</h2>
        <p className={`leading-8 mb-7 ${mutedText}`}>
          אלקטרוליט אינו נראה כמו איבר או חומר מוצק גדול. הוא בדרך כלל יון זעיר שמומס בנוזל: אטום או מולקולה עם מטען חשמלי, למשל Na⁺ או Cl⁻. לחצו על היונים כדי לראות תפקידים שונים.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 place-items-center">
          {electrolytes.map((item, index) => (
            <IonOrb key={item.id} item={item} index={index} active={selected.id === item.id} onClick={() => handleSelect(item)} />
          ))}
        </div>
      </div>
    </section>

    <section className="grid lg:grid-cols-2 gap-8 items-stretch">
      <div className={`border rounded-[2rem] overflow-hidden p-6 sm:p-8 ${softCard}`}>
        <div className="flex flex-wrap gap-3 mb-6">
          {[
            ["role", "תפקיד"],
            ["low", "חוסר"],
            ["high", "עודף"],
            ["discovery", "גילוי"],
            ["etymology", "אטימולוגיה"],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`rounded-full px-5 py-2 font-bold transition ${tab === key ? "bg-white text-slate-950" : darkMode ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-200 text-slate-900 hover:bg-slate-300"}`}>
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id + tab}
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ duration: 0.38 }}
          >
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.gradient} p-5 mb-5 shadow-xl text-4xl`}>
              {selected.emoji}
            </div>
            <h3 className="text-3xl font-black mb-2">{selected.name} <span className={faintText}>{selected.symbol}</span></h3>
            <p className={`${faintText} mb-5`}>{selected.charge} · {selected.location}</p>

            {tab !== "discovery" && tab !== "etymology" ? (
              <p className={`text-xl leading-9 ${mutedText}`}>
                {tab === "role" && selected.role}
                {tab === "low" && selected.low}
                {tab === "high" && selected.high}
              </p>
            ) : tab === "discovery" ? (
              <div className={`space-y-5 ${mutedText}`}>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className={`rounded-2xl border p-4 ${innerCard}`}><div className={faintText}>שם המגלה</div><div className="font-bold leading-7">{selected.discoverer}</div></div>
                  <div className={`rounded-2xl border p-4 ${innerCard}`}><div className={faintText}>שנות החיים</div><div className="font-bold leading-7">{selected.scientistLife}</div></div>
                  <div className={`rounded-2xl border p-4 ${innerCard}`}><div className={faintText}>שנת הגילוי</div><div className="font-bold leading-7">{selected.discoveryYear}</div></div>
                  <div className={`rounded-2xl border p-4 ${innerCard}`}><div className={faintText}>מקום הגילוי</div><div className="font-bold leading-7">{selected.discoveryPlace}</div></div>
                </div>
                <div className={`rounded-2xl border p-4 ${innerCard}`}>
                  <div className={`${faintText} mb-2`}>נסיבות הגילוי המדויקות</div>
                  <p className="leading-8">{selected.discoveryCircumstances}</p>
                </div>
              </div>
            ) : (
              <div className={`rounded-2xl border p-4 ${innerCard} ${mutedText}`}>
                <div className={`${faintText} mb-2`}>ניתוח אטימולוגי מפורק</div>
                <ul className="space-y-2 list-disc pr-5 leading-7">
                  {selected.etymology.map((line, index) => <li key={index}>{line}</li>)}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`border rounded-[2rem] overflow-hidden shadow-2xl p-6 sm:p-8 ${softCard}`}>
        <h2 className="text-3xl font-black mb-6">למה הם כל כך חשובים?</h2>
        <div className="space-y-4">
          {facts.map((fact, i) => (
            <motion.div key={fact.title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`rounded-3xl border p-5 flex gap-4 items-start ${innerCard}`}>
              <div className="rounded-2xl bg-slate-950 text-white p-3 shrink-0 text-2xl">{fact.emoji}</div>
              <div>
                <h3 className="font-black text-xl mb-1">{fact.title}</h3>
                <p className={`${mutedText} leading-7`}>{fact.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/15 p-6 sm:p-10">
      <h2 className="text-3xl sm:text-4xl font-black mb-8">דברים חשובים שכדאי לזכור</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: "בדיקות דם מציגות ריכוז", text: "הערכים מראים כמה יונים נמצאים בנפח מסוים של דם. לכן הם מספרים על איזון, לא רק על כמות מוחלטת." },
          { title: "הכליות הן מנהלות המערכת", text: "הן מסננות, שומרות או מפרישות אלקטרוליטים לפי הצורך, יחד עם הורמונים ומאזן המים." },
          { title: "ספורט, הקאות ושלשולים משפיעים", text: "איבוד נוזלים ומלחים בזיעה או במערכת העיכול יכול לשנות את האיזון במהירות." },
          { title: "שתייה מוגזמת גם עלולה להזיק", text: "הרבה מים בלי מספיק מלחים עלולים לדלל את הנתרן בדם." },
          { title: "תוספים אינם תמיד פתרון", text: "עודף של חלק מהאלקטרוליטים, במיוחד אשלגן, עלול להיות מסוכן." },
          { title: "סימנים חריגים דורשים בדיקה", text: "בלבול, חולשה קשה, עילפון, כאבים בחזה או דפיקות לב חריגות מצדיקים פנייה רפואית." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`rounded-3xl border p-6 ${innerCard}`}>
            <h3 className="text-xl font-black mb-3">{item.title}</h3>
            <p className={`${mutedText} leading-7`}>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className={`text-center rounded-[2rem] border p-8 sm:p-12 ${softCard}`}>
      <motion.div animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} className="inline-flex rounded-full bg-yellow-300/20 p-5 mb-5 text-4xl">
        ⚠️
      </motion.div>
      <h2 className="text-3xl font-black mb-4">הערה בריאותית חשובה</h2>
      <p className={`${mutedText} leading-8 max-w-3xl mx-auto`}>
        האתר הזה מיועד להסברה בלבד. פענוח ערכי אלקטרוליטים אמיתיים צריך להתבצע לפי בדיקות דם, מצב רפואי, תרופות, גיל, תפקוד כליות וסימפטומים. במקרה של תסמינים חריגים או ערכים קיצוניים — יש לפנות לרופא.
      </p>
    </section>
  </main>
</div>

); }