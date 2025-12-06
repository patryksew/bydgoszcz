import { useEffect, useRef, useMemo } from 'react';
import { calculateDistance } from './useGPS';

/**
 * Hook for monitoring proximity to target locations and triggering notifications
 * @param {Object} userPosition - Current user position {lat, lng}
 * @param {Array} targetLocations - Array of target locations [{lat, lng, name, ...}, ...]
 * @param {Object} options - Configuration options
 * @returns {Object} - nearbyLocations Set and notification functions
 */
export const useProximityNotifications = (
  userPosition,
  targetLocations = [],
  options = {}
) => {
  const {
    proximityRadius = 100,
    onProximityEnter = null,
    onProximityExit = null,
    enableSystemNotifications = true,
    notificationIcon = '/vite.svg'
  } = options;

  const previousNearbyRef = useRef(new Set());

  const nearbyLocations = useMemo(() => {
    if (!userPosition || !targetLocations.length) {
      return new Set();
    }

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
      }
    });

    return currentNearby;
  }, [userPosition, targetLocations, proximityRadius]);

  useEffect(() => {
    if (!userPosition || !targetLocations.length) return;

    nearbyLocations.forEach((index) => {
      if (!previousNearbyRef.current.has(index)) {
        const target = targetLocations[index];
        const distance = calculateDistance(
          userPosition.lat,
          userPosition.lng,
          target.lat,
          target.lng
        );

        if (onProximityEnter) {
          onProximityEnter(target, distance, index);
        }

        if (enableSystemNotifications && 'Notification' in window && Notification.permission === 'granted') {
          new Notification('You are near your destination!', {
            body: `${target.name || 'Location'} - ${distance.toFixed(0)}m away`,
            icon: notificationIcon
          });
        }
      }
    });

    previousNearbyRef.current.forEach((index) => {
      if (!nearbyLocations.has(index)) {
        const target = targetLocations[index];
        const distance = calculateDistance(
          userPosition.lat,
          userPosition.lng,
          target.lat,
          target.lng
        );

        if (onProximityExit) {
          onProximityExit(target, distance, index);
        }
      }
    });

    previousNearbyRef.current = new Set(nearbyLocations);
  }, [nearbyLocations, targetLocations, userPosition, onProximityEnter, onProximityExit, enableSystemNotifications, notificationIcon]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      return await Notification.requestPermission();
    }
    return Notification.permission;
  };

  return {
    nearbyLocations,
    requestNotificationPermission
  };
};

export default useProximityNotifications;

