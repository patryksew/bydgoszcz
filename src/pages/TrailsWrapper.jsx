import { useLanguage } from "../hooks/useLanguage";
import LanguageSelector from "../components/LanguageSelector";
import Trails from "./Trails";

export default function TrailsWrapper() {
  const { lang, setLang } = useLanguage();

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Trails lang={lang} />;
}

