import { useState } from "react";
import LanguageSelector from "../components/LanguageSelector";
import Trails from "./Trails";

export default function TrailsWrapper() {
  const [lang, setLang] = useState(null);

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Trails lang={lang} />;
}

