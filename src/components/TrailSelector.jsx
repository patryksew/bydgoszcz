import { trails } from '../data/trails';
import { translations } from '../data/translations';

export default function TrailSelector({ lang, onSelectTrail }) {
  const t = translations[lang] || translations.pl;

  return (
    <div style={containerStyle}>
      <img src="Logo.svg"  style={{ width: "180px", height: "70px" }}></img>
     
      <div style={trailsContainerStyle}>
        {trails.map((trail, index) => (
          <div
            key={trail.id}
            style={{
              ...trailCardStyle,
              background: index === 1 ? "#cdcbcbff" : "white"
            }}
            onClick={() => {
              if (index === 0) {
                onSelectTrail(trail)}}}

            onMouseEnter={(e) => {
               if (index === 0) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }
            }}
            onMouseLeave={(e) => {
              if (index === 0) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }
            }}
          >
            <div style={{ background: index === 1 ? "#cdcbcbff" : "white", position: 'absolute', top: '20px', right: '20px', fontSize: '2rem', opacity: 0.9 }}>
               {index === 0 ? "🗺️" : "🔒"}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#34495e' }}>
              {trail.title[lang]}
            </h2>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6', marginBottom: '15px' }}>
              {trail.description[lang]}
            </p>
            <div style={infoStyle}>
              <span style={infoItemStyle}>⏱️ {trail.time}</span>
              <span style={infoItemStyle}>📏 {trail.distance}</span>
              <span style={infoItemStyle}>❓ {trail.questions.length} pytań</span>
            </div>
          </div>
        ))}
      </div>
      <h1 style={{ fontSize: '2.5rem', color: '#000000ff', marginBottom: '10px' }}>{t.chooseTrail}</h1>
      <p style={{ color: '#000000ff', fontSize: '1.1rem' }}>i rozpocznij przygodę</p>
    </div>
  );
}

const infoItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  fontWeight: '500',
  color: '#555'
};

const containerStyle = {
  padding: '40px 20px',
  maxWidth: '1200px',
  margin: '0 auto',
  textAlign: 'center',
  minHeight: '100vh',
  backgroundImage: "url('/BG.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
};

const trailsContainerStyle = {
   display: "grid",
  gridTemplateColumns: "1fr",  
  gap: "25px",
  width: "100%",
  maxWidth: "400px",
  margin: "20px auto 20px auto", 
  padding: "0 20px"
};

const trailCardStyle = {
  padding: '15px',
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0,0)',
  textAlign: 'left',
  position: 'relative',
  overflow: 'hidden'
};

const infoStyle = {
  marginTop: '20px',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  fontSize: '14px',
  color: '#666',
  paddingTop: '15px',
  borderTop: '1px solid #eee'
};

