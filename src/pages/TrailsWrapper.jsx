import { useLanguage } from "../hooks/useLanguage";
import Trails from "./Trails";

export default function TrailsWrapper() {
  const { lang } = useLanguage();

  return <Trails lang={lang} />;
}

