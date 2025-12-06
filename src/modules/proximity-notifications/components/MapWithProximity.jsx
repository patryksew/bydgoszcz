import { useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useGPS, calculateDistance } from '../hooks/useGPS';

// Fix Leaflet icons (webpack/vite issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
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

/**
 * MapWithProximity - Complete map component with GPS tracking and proximity notifications
 * @param {Array} targetLocations - Locations to monitor
 * @param {Object} mapOptions - Map configuration
 * @param {Object} gpsOptions - GPS configuration
 * @param {Function} onProximityEnter - Callback when entering proximity
 * @param {Function} onProximityExit - Callback when exiting proximity
 */
const MapWithProximity = ({
  targetLocations = [],
  mapOptions = {},
  gpsOptions = {},
  onProximityEnter = null,
  onProximityExit = null
}) => {
  const {
    initialCenter = [50.0647, 19.9450],
    zoom = 13,
    proximityRadius = 100
  } = mapOptions;

  const { position, error } = useGPS({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000,
    autoStart: true,
    ...gpsOptions
  });

  const previousNearbyRef = useRef(new Set());

  const nearbyLocations = useMemo(() => {
    if (!position || !targetLocations.length) {
      return new Set();
    }

    const currentNearby = new Set();

    targetLocations.forEach((target, index) => {
      const distance = calculateDistance(
        position.lat,
        position.lng,
        target.lat,
        target.lng
      );

      if (distance <= proximityRadius) {
        currentNearby.add(index);
      }
    });

    return currentNearby;
  }, [position, targetLocations, proximityRadius]);

  useEffect(() => {
    if (!position || !targetLocations.length) return;

    nearbyLocations.forEach((index) => {
      if (!previousNearbyRef.current.has(index) && onProximityEnter) {
        const target = targetLocations[index];
        const distance = calculateDistance(
          position.lat,
          position.lng,
          target.lat,
          target.lng
        );
        onProximityEnter(target, distance, index);
      }
    });

    previousNearbyRef.current.forEach((index) => {
      if (!nearbyLocations.has(index) && onProximityExit) {
        const target = targetLocations[index];
        const distance = calculateDistance(
          position.lat,
          position.lng,
          target.lat,
          target.lng
        );
        onProximityExit(target, distance, index);
      }
    });

    previousNearbyRef.current = new Set(nearbyLocations);
  }, [nearbyLocations, targetLocations, position, onProximityEnter, onProximityExit]);

  const mapCenter = position ? [position.lat, position.lng] : initialCenter;

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

        <MapUpdater center={position ? [position.lat, position.lng] : null} />

        {position && (
          <>
            <Marker position={[position.lat, position.lng]}>
              <Popup>
                <strong>Your Location</strong>
                <br />
                Accuracy: {position.accuracy?.toFixed(0)} m
              </Popup>
            </Marker>

            <Circle
              center={[position.lat, position.lng]}
              radius={position.accuracy || 50}
              pathOptions={{
                color: '#3388ff',
                fillColor: '#3388ff',
                fillOpacity: 0.1
              }}
            />
          </>
        )}

        {targetLocations.map((location, index) => {
          const isNearby = nearbyLocations.has(index);
          const distance = position
            ? calculateDistance(
                position.lat,
                position.lng,
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
                  <strong>{location.name || `Location ${index + 1}`}</strong>
                  <br />
                  {location.description && (
                    <>
                      {location.description}
                      <br />
                    </>
                  )}
                  {distance !== null && (
                    <>
                      Distance: {distance.toFixed(0)} m
                      <br />
                      {isNearby && <strong style={{ color: 'green' }}>Nearby!</strong>}
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

export default MapWithProximity;

