import { useState } from 'react'
import { MapWithProximity } from '../modules/proximity-notifications'

function MapWrapper() {
  const [notifications, setNotifications] = useState([]);

  const targetLocations = [
    {
      lat: 50.0647,
      lng: 19.9450,
      name: "Kraków Main Square",
      description: "Historic center of Kraków"
    },
    {
      lat: 50.0670,
      lng: 19.9931,
      name: "Tauron Arena Kraków",
      description: "Modern event and sports hall"
    }
  ];

  const handleProximityEnter = (location, distance) => {
    const message = `You are near: ${location.name} (${distance.toFixed(0)}m)`;
    console.log('Entered zone:', message);

    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        type: 'enter',
        message,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('You are near your destination!', {
        body: message,
        icon: '/vite.svg'
      });
    }
  };

  const handleProximityExit = (location) => {
    const message = `You have left the area of: ${location.name}`;
    console.log('Exited zone:', message);

    setNotifications(prev => [
      ...prev,
      {
        id: Date.now(),
        type: 'exit',
        message,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        padding: '10px',
        backgroundColor: '#1a1a1a',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>GPS Proximity Notifications</h1>
        <button
          onClick={requestNotificationPermission}
          style={{ padding: '8px 16px', cursor: 'pointer' }}
        >
          Enable notifications
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapWithProximity
          targetLocations={targetLocations}
          mapOptions={{
            initialCenter: [50.0647, 19.9450],
            zoom: 14,
            proximityRadius: 100
          }}
          onProximityEnter={handleProximityEnter}
          onProximityExit={handleProximityExit}
        />

        {notifications.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            maxWidth: '300px',
            maxHeight: '400px',
            overflow: 'auto',
            zIndex: 1000
          }}>
            <div style={{
              padding: '10px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <strong>Notifications</strong>
              <button
                onClick={clearNotifications}
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '0.8rem'
                }}
              >
                Clear
              </button>
            </div>
            {notifications.map(notif => (
              <div
                key={notif.id}
                style={{
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: notif.type === 'enter' ? '#e8f5e9' : '#fff3e0'
                }}
              >
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                  {notif.message}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '4px' }}>
                  {notif.timestamp}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MapWrapper

