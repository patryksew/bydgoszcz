import { translations } from "../data/translations";

export default function LanguageSelector({ onSelect }) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>{translations.en.chooseLanguage} / {translations.pl.chooseLanguage}</h1>

      <button onClick={() => onSelect("pl")} style={buttonStyle}>
        🇵🇱 Polski
      </button>

      <button onClick={() => onSelect("en")} style={buttonStyle}>
        🇬🇧 English
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "12px 25px",
  margin: "10px",
  fontSize: "18px",
  cursor: "pointer"
};
