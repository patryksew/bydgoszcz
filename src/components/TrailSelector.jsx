import { trails } from '../data/trails';
import { translations } from '../data/translations';

export default function TrailSelector({ lang, onSelectTrail }) {
  const t = translations[lang] || translations.pl;

  return (
    <div style={containerStyle}>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' }}>{t.chooseTrail}</h1>
      <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Wybierz trasę i rozpocznij przygodę</p>
      <div style={trailsContainerStyle}>
        {trails.map((trail) => (
          <div
            key={trail.id}
            style={trailCardStyle}
            onClick={() => onSelectTrail(trail)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '2rem', opacity: 0.1 }}>
              🗺️
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
  backgroundColor: '#f5f7fa'
};

const trailsContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '30px',
  justifyContent: 'center',
  marginTop: '40px',
  padding: '0 20px'
};

const trailCardStyle = {
  padding: '35px',
  border: 'none',
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  backgroundColor: 'white',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
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

