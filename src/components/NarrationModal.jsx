import { useState } from "react";
import "./NarrationModal.css";
import { dialogs } from "../data/dialogs";

export default function NarrationModal({ avatar, dialogId, onFinish }) {
  const lines = dialogs[dialogId] || [];
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < lines.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish(); // koniec dialogu
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="narr-overlay" onClick={handleNext} />

      {/* Modal */}
      <div className="narr-modal">
        {/* Header */}
        <div className="narr-header">
          <h2 className="narr-title">💬 Dialog</h2>
        </div>

        <div className="narr-content">
          <div className="narr-body">
            <img src={avatar} alt="postać" className="narr-avatar" />

            <div className="narr-bubble">
              <p>{lines[index]}</p>
            </div>
          </div>

          <button className="narr-next-btn" onClick={handleNext}>
            Dalej →
          </button>
        </div>
      </div>
    </>
  );
}
