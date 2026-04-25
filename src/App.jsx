import React, { useState } from "react";
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
    etymology: [
      "Sodium — שם אנגלי־מדעי שנקשר היסטורית למילה soda.",
      "Na — הסמל הכימי של נתרן מגיע מן השם הלטיני־חדש Natrium.",
      "Natrium קשור ל-Natron, מלח מינרלי טבעי שהיה מוכר כבר בעת העתיקה.",
      "בעברית השם נתרן קשור לשורש/מונח מקראי־קדום נתר, המתייחס לחומר מנקה או מלח מינרלי."
    ],
    discoverer: "סר המפרי דייבי (Humphry Davy)",
    life: "1778–1829",
    year: "1807",
    place: "המוסד המלכותי, לונדון, אנגליה",
    discovery: "דייבי בודד נתרן מתכתי בעזרת אלקטרוליזה של נתרן הידרוקסידי מותך, חומר שנקרא אז caustic soda. הזרם החשמלי פירק את התרכובת ואפשר לקבל את המתכת החופשית."
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
    high: "עודף אשלגן נקרא היפרקלמיה. זה מצב שעלול להיות מסוכן, בעיקר בגלל השפעה אפשרית על קצב הלב. לעיתים אין סימנים ברורים עד שהמצב משמעותי.",
    etymology: [
      "Potassium — מן המילה Potash, כלומר pot + ash: אפר שהופק בתוך כלי או סיר.",
      "K — הסמל הכימי מגיע מן השם Kalium.",
      "Kalium קשור למילה alkali ולשורש הערבי al-qalyah, שפירושו אפר צמחים.",
      "בעברית השם אשלגן קשור לאשלג, חומר מינרלי עשיר בתרכובות אשלגן."
    ],
    discoverer: "סר המפרי דייבי (Humphry Davy)",
    life: "1778–1829",
    year: "1807",
    place: "המוסד המלכותי, לונדון, אנגליה",
    discovery: "דייבי בודד אשלגן בעזרת אלקטרוליזה של אשלגן הידרוקסידי מותך, שנקרא אז caustic potash. זה היה אחד המקרים הראשונים שבהם מתכת בודדה באמצעות אלקטרוליזה."
  }
];

function InfoBlock({ title, children }) {
  return (
    <div className="rounded-3xl bg-white/10 border border-white/10 p-5">
      <h3 className="font-black text-xl mb-2">{title}</h3>
      <div className="text-white/75 leading-8">{children}</div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(ions[0]);
  const [tab, setTab] = useState("role");

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <div className="inline-flex rounded-full bg-white/10 border border-white/15 px-4 py-2 mb-5">
            אתר לימודי אינטראקטיבי ⚡
          </div>

          <h1 className="text-4xl sm:text-6xl font-black mb-4">
            אלקטרוליטים
          </h1>

          <p className="text-white/70 text-lg leading-8 max-w-3xl mx-auto">
            אלקטרוליטים הם מינרלים בעלי מטען חשמלי. כאשר הם מומסים בנוזלי הגוף,
            הם מתפרקים ליונים ומאפשרים פעילות חשמלית חיונית בעצבים, בשרירים,
            בלב ובמערכת מאזן הנוזלים.
          </p>
        </motion.header>

        <section className="rounded-[2rem] bg-white/10 border border-white/15 p-6 sm:p-8 mb-10">
          <h2 className="text-3xl font-black mb-4">
            מה פירוש המילה “אלקטרוליט”?
          </h2>

          <p className="text-white/75 leading-8 mb-4">
            המילה Electrolyte מורכבת מרעיון של חשמל ופירוק:
          </p>

          <ul className="text-white/75 leading-8 list-disc pr-6 space-y-2">
            <li><b>Electro</b> — קשור לחשמל.</li>
            <li><b>Lyte / Lysis</b> — קשור לפירוק, המסה או התפרקות לחלקים.</li>
          </ul>

          <p className="text-white/75 leading-8 mt-4">
            לכן אלקטרוליט הוא חומר שמתמוסס ומתפרק ליונים, והיונים האלה מסוגלים
            להוליך זרם חשמלי.
          </p>
        </section>

        <div className="flex justify-center gap-6 mb-10">
          {ions.map((ion) => (
            <motion.button
              key={ion.id}
              onClick={() => {
                setSelected(ion);
                setTab("role");
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className={`rounded-full p-1 ${
                selected.id === ion.id ? "ring-4 ring-white/80" : ""
              }`}
            >
              <div className={`h-28 w-28 rounded-full bg-gradient-to-br ${ion.color} flex flex-col items-center justify-center shadow-2xl`}>
                <div className="text-3xl">{ion.emoji}</div>
                <div className="text-2xl font-black">{ion.symbol}</div>
                <div className="text-sm font-bold">{ion.name}</div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            ["role", "תפקיד"],
            ["balance", "חוסר / עודף"],
            ["etymology", "אטימולוגיה"],
            ["discovery", "גילוי"]
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-5 py-2 font-bold transition ${
                tab === key
                  ? "bg-white text-slate-950"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={selected.id + tab}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="rounded-[2rem] bg-white/10 border border-white/15 p-6 sm:p-8 shadow-2xl"
          >
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.color} p-5 mb-5 text-4xl`}>
              {selected.emoji}
            </div>

            <h2 className="text-3xl font-black mb-2">
              {selected.name} <span className="text-white/50">{selected.symbol}</span>
            </h2>

            <p className="text-white/50 mb-6">
              {selected.location}
            </p>

            {tab === "role" && (
              <div className="grid md:grid-cols-2 gap-5">
                <InfoBlock title="תפקיד בגוף">
                  {selected.role}
                </InfoBlock>

                <InfoBlock title="למה זה חשוב?">
                  {selected.importance}
                </InfoBlock>
              </div>
            )}

            {tab === "balance" && (
              <div className="grid md:grid-cols-2 gap-5">
                <InfoBlock title="כאשר יש חוסר">
                  {selected.low}
                </InfoBlock>

                <InfoBlock title="כאשר יש עודף">
                  {selected.high}
                </InfoBlock>
              </div>
            )}

            {tab === "etymology" && (
              <InfoBlock title="ניתוח אטימולוגי">
                <ul className="list-disc pr-6 space-y-2">
                  {selected.etymology.map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </InfoBlock>
            )}

            {tab === "discovery" && (
              <div className="grid md:grid-cols-2 gap-5">
                <InfoBlock title="שם המגלה">
                  {selected.discoverer}
                </InfoBlock>

                <InfoBlock title="שנות החיים">
                  {selected.life}
                </InfoBlock>

                <InfoBlock title="שנת הגילוי">
                  {selected.year}
                </InfoBlock>

                <InfoBlock title="מקום הגילוי">
                  {selected.place}
                </InfoBlock>

                <div className="md:col-span-2">
                  <InfoBlock title="נסיבות הגילוי">
                    {selected.discovery}
                  </InfoBlock>
                </div>
              </div>
            )}
          </motion.section>
        </AnimatePresence>

        <section className="mt-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/15 p-6 sm:p-8">
          <h2 className="text-3xl font-black mb-5">
            דברים חשובים שכדאי לזכור
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            <InfoBlock title="איזון הוא העיקר">
              לא תמיד “יותר” הוא טוב. הגוף צריך טווח מאוזן של אלקטרוליטים.
            </InfoBlock>

            <InfoBlock title="הכליות מנהלות את המערכת">
              הכליות מסננות, שומרות או מפרישות אלקטרוליטים לפי צורכי הגוף.
            </InfoBlock>

            <InfoBlock title="ספורט והתייבשות משפיעים">
              הזעה, שלשולים, הקאות או שתייה לא מאוזנת יכולים לשנות את הרמות.
            </InfoBlock>
          </div>
        </section>
      </div>
    </div>
  );