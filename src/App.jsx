import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "./data";

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
    // sound is optional
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
  const [lang, setLang] = useState("he");
  const t = content[lang];
  const [selectedId, setSelectedId] = useState("sodium");
  const [tab, setTab] = useState("role");
  const [dark, setDark] = useState(true);
  const [fontScale, setFontScale] = useState(1);
  const [copied, setCopied] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showBigPhoto, setShowBigPhoto] = useState(false);

  const selected = t.ions.find((ion) => ion.id === selectedId) || t.ions[0];
  const light = !dark;
  const pageClass = dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";
  const cardClass = dark ? "bg-white/10 border-white/15" : "bg-white border-slate-200 shadow-xl";
  const muted = dark ? "text-white/70" : "text-slate-700";
  const textSizeClass = fontScale === 0 ? "text-base" : fontScale === 1 ? "text-lg" : "text-xl";

  const tabs = useMemo(
    () => [["role", t.tabs.role], ["balance", t.tabs.balance], ["visual", t.tabs.visual], ["etymology", t.tabs.etymology], ["discovery", t.tabs.discovery]],
    [t]
  );

  const chooseIon = (ion) => {
    setSelectedId(ion.id);
    setTab("role");
    playClick();
  };

  const changeLanguage = () => {
    playClick();
    setLang((current) => (current === "he" ? "en" : "he"));
    setTab("role");
  };

  const shareSite = async () => {
    playClick();
    try {
      if (navigator.share) {
        await navigator.share({ title: t.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      }
    } catch {
      setCopied(false);
    }
  };

  const changeTextSize = (direction) => {
    playClick();
    setFontScale((value) => direction === "up" ? Math.min(2, value + 1) : Math.max(0, value - 1));
  };

  const aboutTitle = lang === "he" ? "אודות האתר" : "About the site";
  const aboutPhotoHint = lang === "he" ? "לחץ על התמונה כדי להגדיל" : "Click the photo to enlarge";
  const aboutText = lang === "he"
    ? "האתר נבנה על ידי רם בשיתוף ChatGPT, מתוך מטרה להפוך נושא מדעי ורפואי חשוב — אלקטרוליטים — לחוויה לימודית ברורה, יפה ואינטראקטיבית. האתר מציג מידע על תפקידם של יונים מרכזיים בגוף, מצבי חוסר ועודף, אטימולוגיה, גילוי היסטורי והסבר חזותי פשוט."
    : "This site was built by Ram together with ChatGPT, with the goal of turning an important scientific and medical topic — electrolytes — into a clear, beautiful, and interactive learning experience. It presents the roles of key ions in the body, low and high states, etymology, historical discovery, and simple visual explanations.";
  const aboutCredit = lang === "he" ? "רעיון, בחירה והובלה: רם. תכנון, קוד ועזרה: ChatGPT." : "Concept, direction, and decisions: Ram. Planning, code, and assistance: ChatGPT.";
  const closeText = lang === "he" ? "סגור" : "Close";
  const footerText = lang === "he" ? "האתר נבנה על ידי ChatGPT ורם" : "Built by ChatGPT and Ram";

  return (
    <div dir={t.dir} className={`min-h-screen p-6 overflow-hidden ${pageClass} ${textSizeClass}`}>
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className={`sticky top-3 z-30 mb-8 rounded-3xl border ${cardClass} backdrop-blur-xl p-3 flex flex-wrap gap-2 items-center justify-between`}>
          <div className="font-black">⚡ {t.title}</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { playClick(); setShowAbout(true); }} className="rounded-full px-4 py-2 bg-purple-600 text-white font-bold">{aboutTitle}</button>
            <button onClick={changeLanguage} className="rounded-full px-4 py-2 bg-indigo-600 text-white font-bold">{t.languageButton}</button>
            <button onClick={() => { playClick(); setDark(!dark); }} className="rounded-full px-4 py-2 bg-blue-600 text-white font-bold">{dark ? t.darkButton : t.lightButton}</button>
            <button onClick={shareSite} className="rounded-full px-4 py-2 bg-fuchsia-600 text-white font-bold">{copied ? t.copied : t.share}</button>
            <button onClick={() => changeTextSize("up")} className="rounded-full px-4 py-2 bg-emerald-600 text-white font-bold">A+</button>
            <button onClick={() => changeTextSize("down")} className="rounded-full px-4 py-2 bg-rose-600 text-white font-bold">A-</button>
          </div>
        </div>

        <motion.header initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
          <div className={`inline-flex rounded-full border px-4 py-2 mb-5 ${cardClass}`}>{t.badge}</div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4">{t.title}</h1>
          <p className={`${muted} leading-8 max-w-3xl mx-auto`}>{t.subtitle}</p>
        </motion.header>

        <section className={`rounded-[2rem] border p-6 sm:p-8 mb-10 ${cardClass}`}>
          <h2 className="text-3xl font-black mb-4">{t.wordTitle}</h2>
          <p className={`${muted} leading-8 mb-4`}>{t.wordIntro}</p>
          <ul className={`${muted} leading-8 list-disc ${lang === "he" ? "pr-6" : "pl-6"} space-y-2`}>
            <li>{t.electro}</li>
            <li>{t.lyte}</li>
          </ul>
          <p className={`${muted} leading-8 mt-4`}>{t.wordSummary}</p>
        </section>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 mb-10 place-items-center">
          {t.ions.map((ion, index) => (
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
          {tabs.map(([key, label]) => (
            <button key={key} onClick={() => { playClick(); setTab(key); }} className={`rounded-full px-5 py-2 font-bold transition ${tab === key ? "bg-white text-slate-950" : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-200 text-slate-900 hover:bg-slate-300"}`}>{label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section key={selected.id + tab + lang} initial={{ opacity: 0, x: 40, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -40, scale: 0.98 }} transition={{ duration: 0.35 }} className={`rounded-[2rem] border p-6 sm:p-8 shadow-2xl ${cardClass}`}>
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.color} p-5 mb-5 text-4xl text-white`}>{selected.emoji}</div>
            <h2 className="text-3xl font-black mb-2">{selected.name} <span className={dark ? "text-white/50" : "text-slate-500"}>{selected.symbol}</span></h2>
            <p className={dark ? "text-white/50 mb-6" : "text-slate-500 mb-6"}>{selected.location}</p>

            {tab === "role" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.role}>{selected.role}</InfoBlock><InfoBlock light={light} title={t.labels.importance}>{selected.importance}</InfoBlock></div>}
            {tab === "balance" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.low}>{selected.low}</InfoBlock><InfoBlock light={light} title={t.labels.high}>{selected.high}</InfoBlock></div>}
            {tab === "visual" && <InfoBlock light={light} title={t.labels.visual}>{selected.visual}</InfoBlock>}
            {tab === "etymology" && <InfoBlock light={light} title={t.labels.etymology}><ul className={`list-disc ${lang === "he" ? "pr-6" : "pl-6"} space-y-2`}>{selected.etymology.map((line, index) => <li key={index}>{line}</li>)}</ul></InfoBlock>}
            {tab === "discovery" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.discoverer}>{selected.discoverer}</InfoBlock><InfoBlock light={light} title={t.labels.life}>{selected.life}</InfoBlock><InfoBlock light={light} title={t.labels.year}>{selected.year}</InfoBlock><InfoBlock light={light} title={t.labels.place}>{selected.place}</InfoBlock><div className="md:col-span-2"><InfoBlock light={light} title={t.labels.discovery}>{selected.discovery}</InfoBlock></div></div>}
          </motion.section>
        </AnimatePresence>

        <section className="mt-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/15 p-6 sm:p-8">
          <h2 className="text-3xl font-black mb-5">{t.factsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {t.facts.map(([title, text]) => <InfoBlock key={title} light={light} title={title}>{text}</InfoBlock>)}
          </div>
        </section>

        <footer className={`mt-10 mb-4 text-center rounded-3xl border ${cardClass} p-5 ${muted}`}>
          {footerText}
        </footer>
      </div>

      <AnimatePresence>
        {showAbout && (
          <motion.div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowAbout(false)}>
            <motion.div className={`w-full max-w-3xl rounded-[2rem] border ${cardClass} p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto`} initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 30 }} onClick={(e) => e.stopPropagation()}>
              <div className="grid md:grid-cols-[220px_1fr] gap-6 items-center">
                <div className="text-center">
                  <button onClick={() => { playClick(); setShowBigPhoto(true); }} className="group block mx-auto">
                    <img src="/ram-profile.jpg" alt="Ram profile" className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-white/30 shadow-2xl transition group-hover:scale-105" />
                  </button>
                  <div className={`${muted} text-sm mt-3`}>{aboutPhotoHint}</div>
                </div>

                <div>
                  <h2 className="text-3xl font-black mb-4">{aboutTitle}</h2>
                  <p className={`${muted} leading-8 mb-4`}>{aboutText}</p>
                  <div className={`rounded-3xl border ${light ? "bg-slate-100 border-slate-200" : "bg-white/10 border-white/10"} p-4 ${muted} leading-8`}>
                    {aboutCredit}
                  </div>
                  <button onClick={() => { playClick(); setShowAbout(false); }} className="mt-5 rounded-full px-6 py-3 bg-rose-600 text-white font-bold">{closeText}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBigPhoto && (
          <motion.div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBigPhoto(false)}>
            <motion.div className="relative" initial={{ scale: 0.85 }} animate={{ scale: 1 }} exit={{ scale: 0.85 }} onClick={(e) => e.stopPropagation()}>
              <img src="/ram-profile.jpg" alt="Ram profile large" className="max-h-[86vh] max-w-[92vw] rounded-[2rem] object-contain shadow-2xl border border-white/20" />
              <button onClick={() => { playClick(); setShowBigPhoto(false); }} className="absolute top-3 right-3 rounded-full px-4 py-2 bg-rose-600 text-white font-bold">×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
