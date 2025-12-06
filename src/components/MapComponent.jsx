import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Napraw ikony Leaflet (problem z webpack/vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Komponent do aktualizacji widoku mapy
function MapUpdater({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

const MapComponent = ({
  initialCenter = [53.1235, 18.0084], // Bydgoszcz
  zoom = 13,
  targetLocations = [],
  proximityRadius = 100, // metry
  onProximityEnter = null,
  onProximityExit = null
}) => {
  const [userPosition, setUserPosition] = useState(null);
  const [error, setError] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState(new Set());
  const previousNearbyRef = useRef(new Set());
  const watchIdRef = useRef(null);

  // Funkcja do obliczania odległości między dwoma punktami (w metrach)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  // Sprawdź bliskość do lokalizacji docelowych
  useEffect(() => {
    if (!userPosition || !targetLocations.length) return;

    const currentNearby = new Set();

    targetLocations.forEach((target, index) => {
      const distance = calculateDistance(
        userPosition.lat,
        userPosition.lng,
        target.lat,
        target.lng
      );

      if (distance <= proximityRadius) {
        currentNearby.add(index);

        // Jeśli wcześniej nie byliśmy blisko, wywołaj callback
        if (!previousNearbyRef.current.has(index) && onProximityEnter) {
          onProximityEnter(target, distance, index);
        }
      } else {
        // Jeśli wcześniej byliśmy blisko, a teraz nie jesteśmy, wywołaj callback
        if (previousNearbyRef.current.has(index) && onProximityExit) {
          onProximityExit(target, distance, index);
        }
      }
    });

    setNearbyLocations(currentNearby);
    previousNearbyRef.current = currentNearby;
  }, [userPosition, targetLocations, proximityRadius, onProximityEnter, onProximityExit]);

  // Obsługa GPS
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolokalizacja nie jest wspierana przez twoją przeglądarkę');
      return;
    }

    const handleSuccess = (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      setUserPosition({
        lat: latitude,
        lng: longitude,
        accuracy: accuracy
      });
      setError(null);
    };

    const handleError = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError('Odmówiono dostępu do lokalizacji');
          break;
        case error.POSITION_UNAVAILABLE:
          setError('Informacja o lokalizacji jest niedostępna');
          break;
        case error.TIMEOUT:
          setError('Upłynął czas oczekiwania na lokalizację');
          break;
        default:
          setError('Wystąpił nieznany błąd');
          break;
      }
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 20000, // Zwiększono z 5s do 20s
      maximumAge: 10000 // Pozwól na użycie pozycji sprzed 10s
    };

    // Rozpocznij śledzenie pozycji
    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      options
    );

    // Cleanup
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const mapCenter = userPosition
    ? [userPosition.lat, userPosition.lng]
    : initialCenter;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {error && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#ff4444',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
        zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
        }}>
          {error}
          {error.includes('Odmówiono') && (
            <button
              onClick={() => navigator.geolocation.getCurrentPosition(() => {}, () => {}, {})}
              style={{
                marginLeft: '15px',
                padding: '5px 10px',
                border: '1px solid white',
                backgroundColor: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Spróbuj ponownie
            </button>
          )}
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater center={userPosition ? [userPosition.lat, userPosition.lng] : null} />

        {/* Marker użytkownika */}
        {userPosition && (
          <>
            <Marker position={[userPosition.lat, userPosition.lng]}>
              <Popup>
                <strong>Twoja lokalizacja</strong>
                <br />
                Dokładność: {userPosition.accuracy?.toFixed(0)} m
              </Popup>
            </Marker>

            {/* Okrąg dokładności */}
            <Circle
              center={[userPosition.lat, userPosition.lng]}
              radius={userPosition.accuracy || 50}
              pathOptions={{
                color: '#3388ff',
                fillColor: '#3388ff',
                fillOpacity: 0.1
              }}
            />
          </>
        )}

        {/* Markery lokalizacji docelowych */}
        {targetLocations.map((location, index) => {
          const isNearby = nearbyLocations.has(index);
          const distance = userPosition
            ? calculateDistance(
                userPosition.lat,
                userPosition.lng,
                location.lat,
                location.lng
              )
            : null;

          return (
            <div key={index}>
              <Marker
                position={[location.lat, location.lng]}
                icon={L.icon({
                  iconUrl: isNearby
                    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
                    : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41]
                })}
              >
                <Popup>
                  <strong>{location.name || `Lokalizacja ${index + 1}`}</strong>
                  <br />
                  {location.description && (
                    <>
                      {location.description}
                      <br />
                    </>
                  )}
                  {distance !== null && (
                    <>
                      Odległość: {distance.toFixed(0)} m
                      <br />
                      {isNearby && <strong style={{ color: 'green' }}>W pobliżu!</strong>}
                    </>
                  )}
                </Popup>
              </Marker>

              <Circle
                center={[location.lat, location.lng]}
                radius={proximityRadius}
                pathOptions={{
                  color: isNearby ? '#4CAF50' : '#ff6b6b',
                  fillColor: isNearby ? '#4CAF50' : '#ff6b6b',
                  fillOpacity: 0.1,
                  dashArray: '5, 10'
                }}
              />
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

