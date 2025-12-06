import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import Trails from "./pages/Trails";

function App() {
  const [lang, setLang] = useState(null);

  if (!lang) {
    return <LanguageSelector onSelect={setLang} />;
  }

  return <Trails lang={lang} />;
}

export default App;
