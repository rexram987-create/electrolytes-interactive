import React, { useState } from "react";
import { content } from "./data";

export default function App() {
  const [lang, setLang] = useState("he");
  const t = content[lang];

  const [selectedId, setSelectedId] = useState("sodium");
  const [tab, setTab] = useState("role");
  const [dark, setDark] = useState(true);

  const selected = t.ions.find(i => i.id === selectedId);

  return (
    <div dir={t.dir} className={`${dark ? "bg-black text-white" : "bg-white text-black"} min-h-screen p-6`}>

      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <button onClick={() => setLang(lang === "he" ? "en" : "he")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full">
          {t.languageButton}
        </button>

        <button onClick={() => setDark(!dark)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full">
          {dark ? t.darkButton : t.lightButton}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
      <p className="mb-6">{t.subtitle}</p>

      {/* IONS */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        {t.ions.map(i => (
          <button key={i.id} onClick={() => setSelectedId(i.id)}
            className="p-3 bg-gray-800 rounded-xl">
            <div>{i.emoji}</div>
            <div>{i.symbol}</div>
            <div>{i.name}</div>
          </button>
        ))}
      </div>

      {/* TABS */}
      <div className="flex gap-2 mb-6">
        {Object.entries(t.tabs).map(([key,label]) => (
          <button key={key} onClick={()=>setTab(key)}
            className="px-3 py-1 bg-gray-700 rounded-full">
            {label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="space-y-4">
        {tab === "role" && <>
          <div>{selected.role}</div>
          <div>{selected.importance}</div>
        </>}

        {tab === "balance" && <>
          <div>{selected.low}</div>
          <div>{selected.high}</div>
        </>}

        {tab === "visual" && <div>{selected.visual}</div>}

        {tab === "etymology" && (
          <ul>{selected.etymology.map((e,i)=><li key={i}>{e}</li>)}</ul>
        )}

        {tab === "discovery" && <>
          <div>{selected.discoverer}</div>
          <div>{selected.life}</div>
          <div>{selected.year}</div>
          <div>{selected.place}</div>
          <div>{selected.discovery}</div>
        </>}
      </div>

    </div>
  );
}
