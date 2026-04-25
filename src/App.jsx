import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ions = [
  {
    id: "sodium",
    name: "נתרן",
    symbol: "Na⁺",
    emoji: "💧",
    color: "from-sky-400 to-blue-600",
    text: "נתרן הוא אלקטרוליט מרכזי מחוץ לתאים. הוא עוזר לשמור על מאזן הנוזלים בגוף, משתתף בהעברת אותות עצביים ומשפיע על לחץ הדם."
  },
  {
    id: "potassium",
    name: "אשלגן",
    symbol: "K⁺",
    emoji: "❤️",
    color: "from-emerald-400 to-green-600",
    text: "אשלגן נמצא בעיקר בתוך התאים. הוא חשוב מאוד לפעילות השרירים, מערכת העצבים וקצב הלב."
  }
];

export default function App() {
  const [selected, setSelected] = useState(ions[0]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 text-white p-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-10"
        >
          <h1 className="text-4xl sm:text-6xl font-black mb-4">
            אלקטרוליטים
          </h1>
          <p className="text-white/70 text-lg leading-8">
            מינרלים טעונים חשמלית שעוזרים לגוף להעביר אותות, להפעיל שרירים,
            לשמור על נוזלים ולתמוך בפעילות הלב.
          </p>
        </motion.header>

        <div className="flex justify-center gap-6 mb-10">
          {ions.map((ion) => (
            <motion.button
              key={ion.id}
              onClick={() => setSelected(ion)}
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

        <AnimatePresence mode="wait">
          <motion.section
            key={selected.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="rounded-[2rem] bg-white/10 border border-white/15 p-8 shadow-2xl"
          >
            <div className={`inline-flex rounded-3xl bg-gradient-to-br ${selected.color} p-5 mb-5 text-4xl`}>
              {selected.emoji}
            </div>

            <h2 className="text-3xl font-black mb-3">
              {selected.name} <span className="text-white/50">{selected.symbol}</span>
            </h2>

            <p className="text-white/75 leading-8 text-lg">
              {selected.text}
            </p>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}