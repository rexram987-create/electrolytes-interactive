import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { content } from "./data";

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored === null ? fallback : JSON.parse(stored);
    } catch {
      return fallback;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* optional */ }
  }, [key, value]);
  return [value, setValue];
}

function InfoBlock({ title, children, light }) {
  return (
    <div className={`rounded-3xl border p-5 ${light ? "bg-slate-100 border-slate-200" : "bg-white/10 border-white/10"}`}>
      <h3 className="font-black text-xl mb-2">{title}</h3>
      <div className={`${light ? "text-slate-700" : "text-white/75"} leading-8`}>{children}</div>
    </div>
  );
}

function Dialog({ open, onClose, titleId, title, cardClass, children }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className={`relative w-full max-w-3xl rounded-[2rem] border ${cardClass} p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto`} initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}>
            <button ref={closeRef} onClick={onClose} aria-label={title} className="absolute top-4 end-4 rounded-full px-4 py-2 bg-rose-600 text-white font-black">×</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef(null);
  const [lang, setLang] = useStoredState("electrolytes-lang", "he");
  const [selectedId, setSelectedId] = useStoredState("electrolytes-ion", "sodium");
  const [dark, setDark] = useStoredState("electrolytes-dark", true);
  const [fontScale, setFontScale] = useStoredState("electrolytes-font", 1);
  const [sound, setSound] = useStoredState("electrolytes-sound", true);
  const [tab, setTab] = useState("role");
  const [copied, setCopied] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const t = content[lang] ?? content.he;
  const selected = t.ions.find((ion) => ion.id === selectedId) ?? t.ions[0];
  const light = !dark;
  const pageClass = dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";
  const cardClass = dark ? "bg-slate-900/90 border-white/15" : "bg-white border-slate-200 shadow-xl";
  const muted = dark ? "text-white/70" : "text-slate-700";
  const textSizeClass = fontScale === 0 ? "text-base" : fontScale === 1 ? "text-lg" : "text-xl";
  const tabs = useMemo(() => [["role", t.tabs.role], ["balance", t.tabs.balance], ["visual", t.tabs.visual], ["etymology", t.tabs.etymology], ["history", t.tabs.history]], [t]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
    document.title = lang === "he" ? "אלקטרוליטים — אתר לימודי אינטראקטיבי" : "Electrolytes — Interactive Learning Site";
  }, [lang, t.dir, dark]);

  const playClick = () => {
    if (!sound) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioRef.current) audioRef.current = new AudioContext();
      const context = audioRef.current;
      if (context.state === "suspended") context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(660, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.08);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.1, context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
      oscillator.connect(gain); gain.connect(context.destination);
      oscillator.start(); oscillator.stop(context.currentTime + 0.17);
    } catch { /* sound is optional */ }
  };

  const chooseIon = (ion) => { setSelectedId(ion.id); setTab("role"); playClick(); };
  const shareSite = async () => {
    playClick();
    try {
      if (navigator.share) await navigator.share({ title: t.title, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1600); }
    } catch { setCopied(false); }
  };

  const aboutTitle = lang === "he" ? "אודות האתר" : "About the site";
  const closeText = lang === "he" ? "סגור" : "Close";
  const aboutText = lang === "he" ? "האתר נבנה על ידי רם בשיתוף ChatGPT, כדי להפוך נושא מדעי ורפואי חשוב לחוויה לימודית ברורה, יפה ואינטראקטיבית." : "This site was built by Ram together with ChatGPT to turn an important scientific and medical topic into a clear, attractive, and interactive learning experience.";

  return (
    <div dir={t.dir} className={`min-h-screen p-4 sm:p-6 overflow-hidden ${pageClass} ${textSizeClass}`}>
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true"><div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" /><div className="absolute bottom-0 -left-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" /></div>
      <div className="relative max-w-6xl mx-auto">
        <nav aria-label={lang === "he" ? "כלי האתר" : "Site controls"} className={`sticky top-3 z-30 mb-8 rounded-3xl border ${cardClass} backdrop-blur-xl p-3 flex flex-wrap gap-2 items-center justify-between`}>
          <a href="#main-content" className="font-black rounded-full px-3 py-2">⚡ {t.title}</a>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => { playClick(); setShowAbout(true); }} className="rounded-full px-4 py-2 bg-purple-600 text-white font-bold">{aboutTitle}</button>
            <button onClick={() => { playClick(); setLang(lang === "he" ? "en" : "he"); setTab("role"); }} className="rounded-full px-4 py-2 bg-indigo-600 text-white font-bold">{t.languageButton}</button>
            <button onClick={() => { playClick(); setDark(!dark); }} className="rounded-full px-4 py-2 bg-blue-600 text-white font-bold">{dark ? t.darkButton : t.lightButton}</button>
            <button onClick={shareSite} className="rounded-full px-4 py-2 bg-fuchsia-600 text-white font-bold">{copied ? t.copied : t.share}</button>
            <button onClick={() => setSound(!sound)} aria-pressed={sound} className="rounded-full px-4 py-2 bg-amber-600 text-white font-bold">{sound ? t.soundOn : t.soundOff}</button>
            <button onClick={() => { playClick(); setFontScale(Math.min(2, fontScale + 1)); }} aria-label={lang === "he" ? "הגדל טקסט" : "Increase text size"} className="rounded-full px-4 py-2 bg-emerald-600 text-white font-bold">A+</button>
            <button onClick={() => { playClick(); setFontScale(Math.max(0, fontScale - 1)); }} aria-label={lang === "he" ? "הקטן טקסט" : "Decrease text size"} className="rounded-full px-4 py-2 bg-rose-600 text-white font-bold">A-</button>
          </div>
        </nav>

        <main id="main-content">
          <motion.header initial={reduceMotion ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
            <div className={`inline-flex rounded-full border px-4 py-2 mb-5 ${cardClass}`}>{t.badge}</div>
            <h1 className="text-4xl sm:text-6xl font-black mb-4">{t.title}</h1>
            <p className={`${muted} leading-8 max-w-3xl mx-auto`}>{t.subtitle}</p>
          </motion.header>

          <section className={`rounded-[2rem] border p-6 sm:p-8 mb-10 ${cardClass}`} aria-labelledby="word-title">
            <h2 id="word-title" className="text-3xl font-black mb-4">{t.wordTitle}</h2><p className={`${muted} leading-8 mb-4`}>{t.wordIntro}</p>
            <ul className={`${muted} leading-8 list-disc ${lang === "he" ? "pr-6" : "pl-6"} space-y-2`}><li>{t.electro}</li><li>{t.lyte}</li></ul><p className={`${muted} leading-8 mt-4`}>{t.wordSummary}</p>
          </section>

          <section aria-label={lang === "he" ? "בחירת אלקטרוליט" : "Choose an electrolyte"} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 mb-10 place-items-center">
            {t.ions.map((ion, index) => <motion.button key={ion.id} onClick={() => chooseIon(ion)} aria-pressed={selected.id === ion.id} whileHover={reduceMotion ? undefined : { scale: 1.08 }} whileTap={reduceMotion ? undefined : { scale: 0.94 }} animate={reduceMotion ? undefined : { y: [0, -7, 0] }} transition={reduceMotion ? undefined : { duration: 2.5 + index * 0.18, repeat: Infinity }} className={`rounded-full p-1 ${selected.id === ion.id ? "ring-4 ring-cyan-300" : ""}`}><div className={`h-28 w-28 rounded-full bg-gradient-to-br ${ion.color} flex flex-col items-center justify-center shadow-2xl text-white`}><span className="text-3xl" aria-hidden="true">{ion.emoji}</span><span className="text-2xl font-black">{ion.symbol}</span><span className="text-sm font-bold">{ion.name}</span></div></motion.button>)}
          </section>

          <div role="tablist" aria-label={lang === "he" ? "קטגוריות מידע" : "Information categories"} className="flex flex-wrap justify-center gap-3 mb-6">
            {tabs.map(([key, label]) => <button key={key} role="tab" aria-selected={tab === key} aria-controls="ion-panel" onClick={() => { playClick(); setTab(key); }} className={`rounded-full px-5 py-2 font-bold transition ${tab === key ? "bg-white text-slate-950" : dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-slate-200 text-slate-900 hover:bg-slate-300"}`}>{label}</button>)}
          </div>

          <AnimatePresence mode="wait"><motion.section id="ion-panel" role="tabpanel" key={selected.id + tab + lang} initial={reduceMotion ? false : { opacity: 0, x: 40, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, x: -40, scale: 0.98 }} className={`rounded-[2rem] border p-6 sm:p-8 shadow-2xl ${cardClass}`}>
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.color} p-5 mb-5 text-4xl text-white`} aria-hidden="true">{selected.emoji}</div><h2 className="text-3xl font-black mb-2">{selected.name} <span className={dark ? "text-white/50" : "text-slate-500"}>{selected.symbol}</span></h2><p className={dark ? "text-white/50 mb-6" : "text-slate-500 mb-6"}>{selected.location}</p>
            {tab === "role" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.role}>{selected.role}</InfoBlock><InfoBlock light={light} title={t.labels.importance}>{selected.importance}</InfoBlock></div>}
            {tab === "balance" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.low}>{selected.low}</InfoBlock><InfoBlock light={light} title={t.labels.high}>{selected.high}</InfoBlock></div>}
            {tab === "visual" && <InfoBlock light={light} title={t.labels.visual}>{selected.visual}</InfoBlock>}
            {tab === "etymology" && <InfoBlock light={light} title={t.labels.etymology}><ul className={`list-disc ${lang === "he" ? "pr-6" : "pl-6"} space-y-2`}>{selected.etymology.map((line) => <li key={line}>{line}</li>)}</ul></InfoBlock>}
            {tab === "history" && <div className="grid md:grid-cols-2 gap-5"><InfoBlock light={light} title={t.labels.elementHistory}>{selected.elementHistory}</InfoBlock><InfoBlock light={light} title={t.labels.biologyHistory}>{selected.biologyHistory}</InfoBlock></div>}
          </motion.section></AnimatePresence>

          <section className="mt-10 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/15 p-6 sm:p-8"><h2 className="text-3xl font-black mb-5">{t.factsTitle}</h2><div className="grid md:grid-cols-3 gap-5">{t.facts.map(([title, text]) => <InfoBlock key={title} light={light} title={title}>{text}</InfoBlock>)}</div></section>
          <section className={`mt-10 rounded-[2rem] border-2 border-amber-400/60 p-6 sm:p-8 ${dark ? "bg-amber-400/10" : "bg-amber-50"}`} aria-labelledby="medical-notice"><h2 id="medical-notice" className="text-3xl font-black mb-4">⚠️ {t.disclaimerTitle}</h2><p className={`${muted} leading-8 mb-3`}>{t.disclaimer}</p><p className="font-bold leading-8">{t.urgent}</p></section>
          <section className={`mt-10 rounded-[2rem] border p-6 sm:p-8 ${cardClass}`} aria-labelledby="sources-title"><h2 id="sources-title" className="text-3xl font-black mb-4">{t.sourcesTitle}</h2><p className={`${muted} leading-8 mb-5`}>{t.sourcesIntro}</p><ul className="grid md:grid-cols-2 gap-3">{t.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-cyan-400/30 px-4 py-3 font-bold underline decoration-cyan-400 hover:bg-cyan-400/10">{source.title} ↗</a></li>)}</ul></section>
        </main>
        <footer className={`mt-10 mb-4 text-center rounded-3xl border ${cardClass} p-5 ${muted}`}>{lang === "he" ? "האתר נבנה על ידי ChatGPT ורם" : "Built by ChatGPT and Ram"}</footer>
      </div>

      <Dialog open={showAbout} onClose={() => setShowAbout(false)} titleId="about-title" title={closeText} cardClass={cardClass}><div className="grid md:grid-cols-[220px_1fr] gap-6 items-center pt-8"><button onClick={() => setShowPhoto(true)} className="group block mx-auto rounded-full" aria-label={lang === "he" ? "הגדל את תמונת רם" : "Enlarge Ram's photo"}><img src="/ram-profile.jpg" alt={lang === "he" ? "תמונת פרופיל של רם" : "Portrait of Ram"} className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-white/30 shadow-2xl transition group-hover:scale-105" /></button><div><h2 id="about-title" className="text-3xl font-black mb-4">{aboutTitle}</h2><p className={`${muted} leading-8 mb-4`}>{aboutText}</p><button onClick={() => setShowAbout(false)} className="rounded-full px-6 py-3 bg-rose-600 text-white font-bold">{closeText}</button></div></div></Dialog>
      <Dialog open={showPhoto} onClose={() => setShowPhoto(false)} titleId="photo-title" title={closeText} cardClass="bg-transparent border-transparent"><h2 id="photo-title" className="sr-only">{lang === "he" ? "תמונת פרופיל מוגדלת של רם" : "Enlarged portrait of Ram"}</h2><img src="/ram-profile.jpg" alt={lang === "he" ? "תמונת פרופיל מוגדלת של רם" : "Enlarged portrait of Ram"} className="max-h-[78vh] max-w-full mx-auto rounded-[2rem] object-contain shadow-2xl border border-white/20" /></Dialog>
    </div>
  );
}
