import { useState } from "react";
import "./NarrationModal.css";
import { dialogs } from "../data/dialogs";
import { translations } from "../data/translations";

export default function NarrationModal({ avatar, dialogId, lang, onFinish }) {
  const lines = dialogs[dialogId]?.[lang] || dialogs[dialogId]?.pl;
  const [index, setIndex] = useState(0);
  const t = translations[lang] || translations.pl;

  const handleNext = () => {
    if (index < lines.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish();
    }
  };

  return (
    <>
      <div className="narr-overlay" />

      <div className="narr-container">
        {/* BIAŁA KARTA */}
        <div className="narr-card">
          {/* Tytuł */}
          <div className="narr-card-header">
            <h2>{t.twardowski}</h2>
          </div>

          {/* BUBBLE */}
          <div className="narr-bubble-new">
            {lines[index]}
          </div>

          {/* Przycisk */}
          <button className="narr-next-btn-new" onClick={handleNext}>
            {t.next} →
          </button>
        </div>

        {/* POSTAĆ TWARDOWSKIEGO */}
        <img src={avatar} alt="avatar" className="narr-big-avatar" />
      </div>
    </>
  );
}
