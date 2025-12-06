import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../data/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = lang ? translations[lang] : translations.pl;

  return (
    <div style={containerStyle}>
      <h1>{t.appTitle}</h1>
      <p>{t.chooseModule}</p>

      <nav style={navStyle}>
        <Link to="/trails" style={linkStyle}>
          <div style={cardStyle}>
            <h2>🚶 {t.trailsModule}</h2>
            <p>{t.trailsDescription}</p>
          </div>
        </Link>

        <Link to="/questions" style={linkStyle}>
          <div style={cardStyle}>
            <h2>❓ {t.questionsModule}</h2>
            <p>{t.questionsDescription}</p>
          </div>
        </Link>

        <Link to="/map" style={linkStyle}>
          <div style={cardStyle}>
            <h2>🗺️ {t.mapModule}</h2>
            <p>{t.mapDescription}</p>
          </div>
        </Link>

        {/* Dodaj tutaj kolejne moduły w przyszłości */}
      </nav>
    </div>
  );
}

const containerStyle = {
  padding: "40px 20px",
  maxWidth: "1200px",
  margin: "0 auto",
  textAlign: "center"
};

const navStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "center",
  marginTop: "40px"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit"
};

const cardStyle = {
  padding: "30px",
  border: "2px solid #ddd",
  borderRadius: "12px",
  minWidth: "250px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};


