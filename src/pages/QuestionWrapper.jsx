import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import Question from "./Question";

export default function TrailsWrapper() {
  const [lang, setLang] = useState(null);
  const [points, setPoints] = useState(0);

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Question points={points} setPoints = {setPoints} />;
}
