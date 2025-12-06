import { Link, Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div>
      {!isHome && (
        <nav style={navStyle}>
          <Link to="/" style={linkStyle}>
            ← Powrót do strony głównej
          </Link>
        </nav>
      )}

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
  zIndex: 1000
};

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  fontWeight: "500",
  fontSize: "16px"
};

