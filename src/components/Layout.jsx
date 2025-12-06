import { Link, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { translations } from "../data/translations";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang, setLang } = useLanguage();
  const t = lang ? translations[lang] : translations.pl;

  return (
    <div>
      <nav style={navStyle}>
        {!isHome && (
          <Link
            to="/"
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <span>←</span>
            <span>{t.backToHome}</span>
          </Link>
        )}

        {lang && (
          <div style={langSwitcherStyle}>
            <span style={langLabelStyle}>{t.language}:</span>
            <button
              onClick={() => setLang("pl")}
              style={lang === "pl" ? activeLangButton : langButton}
              onMouseEnter={(e) => {
                if (lang !== "pl") {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== "pl") {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              🇵🇱 PL
            </button>
            <button
              onClick={() => setLang("en")}
              style={lang === "en" ? activeLangButton : langButton}
              onMouseEnter={(e) => {
                if (lang !== "en") {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== "en") {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                }
              }}
            >
              🇬🇧 EN
            </button>
          </div>
        )}
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

const navStyle = {
  padding: "18px 30px",
  backgroundColor: "#2c3e50",
  borderBottom: "none",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "500",
  fontSize: "16px",
  transition: "all 0.2s",
  padding: "8px 16px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const langSwitcherStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px"
};

const langLabelStyle = {
  fontSize: "14px",
  color: "#ecf0f1",
  fontWeight: "500"
};

const langButton = {
  padding: "8px 16px",
  border: "2px solid rgba(255,255,255,0.3)",
  borderRadius: "8px",
  backgroundColor: "rgba(255,255,255,0.1)",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s",
  color: "white",
  fontWeight: "500"
};

const activeLangButton = {
  ...langButton,
  backgroundColor: "#3498db",
  borderColor: "#3498db",
  boxShadow: "0 2px 8px rgba(52,152,219,0.3)"
};

