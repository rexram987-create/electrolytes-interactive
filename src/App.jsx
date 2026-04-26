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
  } catch {}
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

  const selected = t.ions.find((ion) => ion.id === selectedId) || t.ions[0];
  const light = !dark;
  const pageClass = dark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";
  const cardClass = dark ? "bg-white/10 border-white/15" : "bg-white border-slate-200 shadow-xl";
  const muted = dark ? "text-white/70" : "text-slate-700";

  const tabs = useMemo(() => [["role", t.tabs.role], ["balance", t.tabs.balance], ["visual", t.tabs.visual], ["etymology", t.tabs.etymology], ["discovery", t.tabs.discovery]], [t]);

  return (
    <div dir={t.dir} className={`min-h-screen p-6 ${pageClass}`}>
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <button onClick={() => setLang(lang === "he" ? "en" : "he")} className="bg-indigo-600 text-white px-4 py-2 rounded-full">{t.languageButton}</button>
          <button onClick={() => setDark(!dark)} className="bg-blue-600 text-white px-4 py-2 rounded-full">{dark ? t.darkButton : t.lightButton}</button>
          <button onClick={() => setShowAbout(true)} className="bg-purple-600 text-white px-4 py-2 rounded-full">אודות</button>
        </div>

        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="mb-6">{t.subtitle}</p>

        {/* IONS */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
          {t.ions.map(i => (
            <button key={i.id} onClick={() => setSelectedId(i.id)} className="p-3 bg-white/10 rounded-xl">
              <div>{i.emoji}</div>
              <div>{i.symbol}</div>
              <div>{i.name}</div>
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div>{selected.role}</div>

        {/* FOOTER */}
        <div className="text-center mt-10 opacity-70">
          האתר נבנה על ידי ChatGPT ורם
        </div>

        {/* ABOUT MODAL */}
        <AnimatePresence>
          {showAbout && (
            <motion.div className="fixed inset-0 bg-black/70 flex items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <motion.div className="bg-white text-black p-6 rounded-2xl max-w-md text-center" initial={{scale:0.8}} animate={{scale:1}} exit={{scale:0.8}}>
                <h2 className="text-2xl font-bold mb-4">אודות</h2>
                <img src="/ram-profile.jpg" className="w-32 h-32 mx-auto rounded-full mb-4" />
                <p>נבנה על ידי רם בשיתוף ChatGPT</p>
                <button onClick={()=>setShowAbout(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">סגור</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
