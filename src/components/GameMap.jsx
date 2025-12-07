import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGPS, calculateDistance } from '../modules/proximity-notifications/hooks/useGPS';
import QuestionModal from './QuestionModal';
import { translations } from '../data/translations';
import NarrationModal from '../components/NarrationModal';


// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for target location
const targetIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

export default function GameMap({
  trail,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  points,
  attempts,
  lang,
  onCorrectAnswer,
  onWrongAnswer,
  onBackToTrails
}) {
  const t = translations[lang] || translations.pl;
  const [closedQuestionIndex, setClosedQuestionIndex] = useState(-1);

  const [showNarration, setShowNarration] = useState(true);

  const proximityRadius = 50; // 50 meters

  const { position, error } = useGPS({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000,
    autoStart: true
  });

  // Calculate if user is in proximity (memoized to avoid unnecessary recalculations)
  const isInProximity = useMemo(() => {
    if (!position || !currentQuestion) return false;

    const distance = calculateDistance(
      position.lat,
      position.lng,
      currentQuestion.lat,
      currentQuestion.long
    );

    return distance <= proximityRadius;
  }, [position, currentQuestion, proximityRadius]);

  // Show question modal when in proximity and user hasn't closed it for this specific question
  const showQuestion = isInProximity && closedQuestionIndex !== currentQuestionIndex;

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setClosedQuestionIndex(currentQuestionIndex);
      onCorrectAnswer();
    } else {
      onWrongAnswer();
    }
  };

  const handleCloseModal = () => {
    setClosedQuestionIndex(currentQuestionIndex);
  };

  const targetLocation = currentQuestion
    ? [currentQuestion.lat, currentQuestion.long]
    : [53.1235, 18.0084]; // Default to Bydgoszcz center

  const mapCenter = position
    ? [position.lat, position.lng]
    : targetLocation;

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={headerStyle}>
        <button
          onClick={onBackToTrails}
          style={backButtonStyle}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4a5f7f'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#34495e'}
        >
          <span>←</span>
          <span>{t.backToHome}</span>
        </button>
        <div style={infoStyle}>
          <span style={infoItemStyle}>
            <span>🎯</span>
            <span>{currentQuestionIndex + 1}/{totalQuestions}</span>
          </span>
          <span style={infoItemStyle}>
            <span>⭐</span>
            <span>{points} pkt</span>
          </span>
          <span style={infoItemStyle}>
            <span>🚶</span>
            <span>{trail.title[lang]}</span>
          </span>
        </div>
      </div>

      {/* Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        {error && (
          <div style={errorStyle}>
            ⚠️ {error}
          </div>
        )}

        <MapContainer
          center={mapCenter}
          zoom={16}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater center={position ? [position.lat, position.lng] : null} />

          {/* User position */}
          {position && (
            <>
              <Marker position={[position.lat, position.lng]}>
                <Popup>
                  <strong>Twoja lokalizacja</strong>
                  <br />
                  {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
                </Popup>
              </Marker>
              <Circle
                center={[position.lat, position.lng]}
                radius={position.accuracy || 10}
                pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.1 }}
              />
            </>
          )}

          {/* Target location */}
          {currentQuestion && (
            <>
              <Marker
                position={targetLocation}
                icon={targetIcon}
              >
                <Popup>
                  <strong>Cel pytania {currentQuestionIndex + 1}</strong>
                  <br />
                  Podejdź tutaj, aby odpowiedzieć na pytanie
                </Popup>
              </Marker>
              <Circle
                center={targetLocation}
                radius={proximityRadius}
                pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.1 }}
              />
            </>
          )}
        </MapContainer>

        {/* Distance indicator */}
        {position && currentQuestion && (
          <div style={distanceIndicatorStyle}>
            <span style={{ fontSize: '24px' }}>📍</span>
            <span>
              Odległość: <strong>{
                calculateDistance(
                  position.lat,
                  position.lng,
                  currentQuestion.lat,
                  currentQuestion.long
                ).toFixed(0)
              }m</strong>
            </span>
          </div>
        )}
      </div>

      {showNarration && (
        <NarrationModal
          avatar="/avatar.png"
          dialogId="intro"
          onFinish={() => setShowNarration(false)}
        />
      )}
      {/* Question Modal */}
      {showQuestion && currentQuestion && (
        <QuestionModal
          question={currentQuestion}
          lang={lang}
          attempts={attempts}
          onAnswer={handleAnswerSubmit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

const headerStyle = {
  padding: '20px 30px',
  backgroundColor: '#2c3e50',
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
};

const backButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#34495e',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const infoStyle = {
  display: 'flex',
  gap: '25px',
  flexWrap: 'wrap',
  alignItems: 'center'
};

const infoItemStyle = {
  fontSize: '16px',
  fontWeight: '500',
  padding: '8px 16px',
  backgroundColor: 'rgba(255,255,255,0.1)',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

const errorStyle = {
  position: 'absolute',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: '#e74c3c',
  color: 'white',
  padding: '15px 25px',
  borderRadius: '12px',
  zIndex: 1000,
  boxShadow: '0 4px 12px rgba(231,76,60,0.3)',
  fontSize: '14px',
  fontWeight: '500',
  maxWidth: '90%',
  textAlign: 'center'
};

const distanceIndicatorStyle = {
  position: 'absolute',
  bottom: '30px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  padding: '15px 30px',
  borderRadius: '30px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
  zIndex: 1000,
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#2c3e50',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

