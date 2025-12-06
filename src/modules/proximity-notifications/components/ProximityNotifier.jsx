import { useGPS } from '../hooks/useGPS';
import { useProximityNotifications } from '../hooks/useProximityNotifications';

/**
 * ProximityNotifier - Headless component for GPS tracking and proximity notifications
 * @param {Array} targetLocations - Array of locations to monitor
 * @param {Object} gpsOptions - GPS configuration options
 * @param {Object} proximityOptions - Proximity monitoring options
 * @param {Function} children - Render prop function receiving GPS and proximity data
 */
const ProximityNotifier = ({
  targetLocations = [],
  gpsOptions = {},
  proximityOptions = {},
  children
}) => {
  const { position, error, isTracking, startTracking, stopTracking } = useGPS({
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000,
    autoStart: true,
    ...gpsOptions
  });

  const { nearbyLocations, requestNotificationPermission } = useProximityNotifications(
    position,
    targetLocations,
    {
      proximityRadius: 100,
      enableSystemNotifications: true,
      ...proximityOptions
    }
  );

  if (children) {
    return children({
      position,
      error,
      isTracking,
      nearbyLocations,
      startTracking,
      stopTracking,
      requestNotificationPermission
    });
  }

  return null;
};

export default ProximityNotifier;

