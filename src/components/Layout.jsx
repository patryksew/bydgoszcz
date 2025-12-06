import { Link, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang, setLang } = useLanguage();

  return (
    <div>
      <nav style={navStyle}>
        {!isHome && (
          <Link to="/" style={linkStyle}>
            ← Powrót do strony głównej
          </Link>
        )}

        {lang && (
          <div style={langSwitcherStyle}>
            <span style={langLabelStyle}>Język: </span>
            <button
              onClick={() => setLang("pl")}
              style={lang === "pl" ? activeLangButton : langButton}
            >
              🇵🇱 PL
            </button>
            <button
              onClick={() => setLang("en")}
              style={lang === "en" ? activeLangButton : langButton}
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
  padding: "15px 20px",
  backgroundColor: "#f0f0f0",
  borderBottom: "1px solid #ddd",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  fontSize: "16px"
};

const langSwitcherStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px"
};

const langLabelStyle = {
  fontSize: "14px",
  color: "#666"
};

const langButton = {
  padding: "6px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fff",
  cursor: "pointer",
  fontSize: "14px",
  transition: "all 0.2s"
};

const activeLangButton = {
  ...langButton,
  backgroundColor: "#007bff",
  color: "#fff",
  borderColor: "#007bff"
};

