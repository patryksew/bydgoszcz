import { translations } from "../data/translations";

export default function LanguageSelector({ onSelect }) {
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🌍</div>
        <h1 style={titleStyle}>
          {translations.en.chooseLanguage} / {translations.pl.chooseLanguage}
        </h1>
        <p style={subtitleStyle}>Select your preferred language</p>

        <div style={buttonsContainerStyle}>
          <button
            onClick={() => onSelect("pl")}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(52,152,219,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🇵🇱</span>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>Polski</span>
          </button>

          <button
            onClick={() => onSelect("en")}
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(52,152,219,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🇬🇧</span>
            <span style={{ fontSize: '20px', fontWeight: '600' }}>English</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f7fa',
  padding: '20px'
};

const contentStyle = {
  textAlign: 'center',
  backgroundColor: 'white',
  padding: '60px 40px',
  borderRadius: '20px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  maxWidth: '600px'
};

const titleStyle = {
  fontSize: '2rem',
  color: '#2c3e50',
  marginBottom: '10px',
  fontWeight: '700'
};

const subtitleStyle = {
  fontSize: '1.1rem',
  color: '#7f8c8d',
  marginBottom: '40px'
};

const buttonsContainerStyle = {
  display: 'flex',
  gap: '30px',
  justifyContent: 'center',
  flexWrap: 'wrap'
};

const buttonStyle = {
  padding: '30px 50px',
  fontSize: '18px',
  cursor: 'pointer',
  backgroundColor: 'white',
  border: '2px solid #e0e0e0',
  borderRadius: '15px',
  transition: 'all 0.3s',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  minWidth: '200px'
};
