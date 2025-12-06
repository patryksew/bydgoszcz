# Proximity Notifications Module

A standalone React module for GPS tracking and proximity-based notifications.

## Features

- 📍 Real-time GPS tracking
- 🔔 Proximity notifications (system & custom)
- 🗺️ Optional map visualization with Leaflet
- ⚡ Lightweight and dependency-optimized
- 🎯 Easy integration into any React app

## Installation

This module requires:
- React 18+
- (Optional) react-leaflet & leaflet for map features

```bash
npm install react-leaflet leaflet
```

## Usage

### 1. Headless Mode (without map)

```jsx
import { ProximityNotifier } from './modules/proximity-notifications';

function App() {
  const locations = [
    { lat: 50.0647, lng: 19.9450, name: "Main Square" },
    { lat: 50.0670, lng: 19.9931, name: "Arena" }
  ];

  return (
    <ProximityNotifier
      targetLocations={locations}
      proximityOptions={{
        proximityRadius: 100,
        onProximityEnter: (location, distance) => {
          console.log(`Near ${location.name}: ${distance}m`);
        },
        onProximityExit: (location) => {
          console.log(`Left ${location.name}`);
        }
      }}
    >
      {({ position, error, requestNotificationPermission }) => (
        <div>
          <button onClick={requestNotificationPermission}>
            Enable Notifications
          </button>
          {position && <p>Lat: {position.lat}, Lng: {position.lng}</p>}
          {error && <p>Error: {error}</p>}
        </div>
      )}
    </ProximityNotifier>
  );
}
```

### 2. With Map

```jsx
import { MapWithProximity } from './modules/proximity-notifications';

function App() {
  const locations = [
    { lat: 50.0647, lng: 19.9450, name: "Main Square" },
    { lat: 50.0670, lng: 19.9931, name: "Arena" }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <MapWithProximity
        targetLocations={locations}
        mapOptions={{
          initialCenter: [50.0647, 19.9450],
          zoom: 14,
          proximityRadius: 100
        }}
        onProximityEnter={(location, distance) => {
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Nearby!', {
              body: `${location.name} - ${distance.toFixed(0)}m`
            });
          }
        }}
      />
    </div>
  );
}
```

### 3. Using Hooks Directly

```jsx
import { useGPS, calculateDistance } from './modules/proximity-notifications';

function MyComponent() {
  const { position, error } = useGPS({
    enableHighAccuracy: true,
    timeout: 10000
  });

  const target = { lat: 50.0647, lng: 19.9450 };
  
  const distance = position 
    ? calculateDistance(position.lat, position.lng, target.lat, target.lng)
    : null;

  return (
    <div>
      {distance && <p>Distance to target: {distance.toFixed(0)}m</p>}
    </div>
  );
}
```

## API Reference

### `useGPS(options)`

Hook for GPS tracking.

**Options:**
- `enableHighAccuracy` (boolean) - Use high accuracy mode
- `timeout` (number) - Timeout in ms
- `maximumAge` (number) - Max age of cached position
- `autoStart` (boolean) - Start tracking automatically

**Returns:**
- `position` - Current position object
- `error` - Error message if any
- `isTracking` - Boolean tracking state
- `startTracking()` - Start tracking function
- `stopTracking()` - Stop tracking function

### `useProximityNotifications(position, locations, options)`

Hook for proximity monitoring.

**Options:**
- `proximityRadius` (number) - Radius in meters
- `onProximityEnter` (function) - Callback when entering
- `onProximityExit` (function) - Callback when exiting
- `enableSystemNotifications` (boolean) - Enable system notifications

### `calculateDistance(lat1, lon1, lat2, lon2)`

Calculate distance between two points in meters using Haversine formula.

## License

MIT

