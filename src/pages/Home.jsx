import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../data/translations";

export default function Home() {
  const { lang } = useLanguage();
  const t = lang ? translations[lang] : translations.pl;

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '3rem', color: '#2c3e50', marginBottom: '15px' }}>{t.appTitle}</h1>
      <p style={{ fontSize: '1.3rem', color: '#7f8c8d', marginBottom: '20px' }}>{t.chooseModule}</p>

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
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🎮</div>
            <h2 style={{ fontSize: '1.8rem', color: '#34495e', marginBottom: '12px' }}>{t.gameModule}</h2>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6' }}>{t.gameDescription}</p>
          </div>
        </Link>

        <Link to="/trails" style={linkStyle}>
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(46,204,113,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🚶</div>
            <h2 style={{ fontSize: '1.8rem', color: '#34495e', marginBottom: '12px' }}>{t.trailsModule}</h2>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6' }}>{t.trailsDescription}</p>
          </div>
        </Link>

        <Link to="/questions" style={linkStyle}>
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(241,196,15,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>❓</div>
            <h2 style={{ fontSize: '1.8rem', color: '#34495e', marginBottom: '12px' }}>{t.questionsModule}</h2>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6' }}>{t.questionsDescription}</p>
          </div>
        </Link>

        <Link to="/map" style={linkStyle}>
          <div
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(155,89,182,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>🗺️</div>
            <h2 style={{ fontSize: '1.8rem', color: '#34495e', marginBottom: '12px' }}>{t.mapModule}</h2>
            <p style={{ fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6' }}>{t.mapDescription}</p>
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
  backgroundColor: "#f5f7fa"
};

const navStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
  justifyContent: "center",
  marginTop: "50px",
  padding: "0 20px"
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit"
};

const cardStyle = {
  padding: "40px 30px",
  border: "none",
  borderRadius: "16px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  backgroundColor: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  position: "relative",
  overflow: "hidden"
};


