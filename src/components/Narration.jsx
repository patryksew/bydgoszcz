import { useState } from "react";
import "./Narration.css";
import { dialogs } from "../data/dialogs";   // IMPORT DIALOGÓW

export default function Narration({ avatar, dialogId, onFinish }) {
  const lines = dialogs[dialogId]; // wczytanie właściwych dialogów

  const [index, setIndex] = useState(0);

  function handleClick() {
    if (index < lines.length - 1) {
      setIndex(index + 1);
    } else {
      onFinish(); // koniec narracji
    }
  }

  return (
    <div className="narration-wrapper" onClick={handleClick}>
      <div className="narration-avatar">
        <img src={avatar} alt="postać" />
      </div>

      <div className="narration-bubble">
        <p>{lines[index]}</p>
      </div>
    </div>
  );
}
