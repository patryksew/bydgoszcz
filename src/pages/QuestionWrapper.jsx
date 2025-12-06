import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import LanguageSelector from "../components/LanguageSelector";
import Question from "./Question";

export default function QuestionWrapper() {
  const { lang, setLang } = useLanguage();
  const [points, setPoints] = useState(0);

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Question points={points} setPoints={setPoints} lang={lang} />;
}
