import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import Question from "./Question";

export default function QuestionWrapper() {
  const { lang } = useLanguage();
  const [points, setPoints] = useState(0);


  return <Question points={points} setPoints={setPoints} lang={lang} />;
}
