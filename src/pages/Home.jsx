import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../data/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = lang ? translations[lang] : translations.pl;

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '15px' }}>
      <img src="Logo.svg"  style={{ width: "180px", height: "auto" }}></img>
      </h1>

      <nav style={navStyle}>
        <Link to="/game" style={linkStyle}>
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(52,152,219,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <h2 style={{ fontSize: '1.8rem', color: '#34495e', marginBottom: '12px' }}>START</h2>
          </div>
        </Link>

        

        {/* Dodaj tutaj kolejne moduły w przyszłości */}
      </nav>
    </div>
  );
}

const containerStyle = {
 padding: "60px 20px",
  maxWidth: "1400px",
  margin: "0 auto",
  textAlign: "center",
  minHeight: "100vh",
  backgroundImage: "url('/BG.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};


const navStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 200px))", //rozmiar przycisku
  gap: "3000px",
  justifyContent: "center",
  marginTop: "50px",
  padding: "0 20px"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit"
};

const cardStyle = {
  padding: "6px 2px",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  position: "relative",
  overflow: "hidden"
};


