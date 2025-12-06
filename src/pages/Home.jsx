import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={containerStyle}>
      <h1>Bydgoszcz - Projekt</h1>
      <p>Wybierz moduł do podglądu:</p>

      <nav style={navStyle}>
        <Link to="/trails" style={linkStyle}>
          <div style={cardStyle}>
            <h2>🚶 Trails</h2>
            <p>Moduł tras turystycznych</p>
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


