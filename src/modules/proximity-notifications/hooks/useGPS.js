import { useState, useEffect, useRef } from 'react';

/**
 * GPS geolocation hook
 * @param {Object} options - Geolocation options
 * @returns {Object} - Object with position, error, and control functions
 */
export const useGPS = (options = {}) => {
  const {
    enableHighAccuracy = true,
    timeout = 5000,
    maximumAge = 0,
    autoStart = true
  } = options;

  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const watchIdRef = useRef(null);

  const handleSuccess = useRef((pos) => {
    const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = pos.coords;
    setPosition({
      lat: latitude,
      lng: longitude,
      accuracy,
      altitude,
      altitudeAccuracy,
      heading,
      speed,
      timestamp: pos.timestamp
    });
    setError(null);
  }).current;

  const handleError = useRef((err) => {
    let errorMessage;
    switch (err.code) {
      case err.PERMISSION_DENIED:
        errorMessage = 'Geolocation permission denied';
        break;
      case err.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable';
        break;
      case err.TIMEOUT:
        errorMessage = 'Geolocation request timed out';
        break;
      default:
        errorMessage = 'An unknown error occurred';
        break;
    }
    setError(errorMessage);
  }).current;

  const startTracking = useRef(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    if (watchIdRef.current !== null) {
      return;
    }

    const geoOptions = {
      enableHighAccuracy,
      timeout,
      maximumAge
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      geoOptions
    );

    setIsTracking(true);
  }).current;

  const stopTracking = useRef(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      setIsTracking(false);
    }
  }).current;

  useEffect(() => {
    if (autoStart) {
      startTracking();
    }

    return () => {
      stopTracking();
    };
  }, [autoStart, startTracking, stopTracking]);

  return {
    position,
    error,
    isTracking,
    startTracking,
    stopTracking
  };
};

/**
 * Calculates the distance between two geographical points in meters
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} - Distance in meters
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

export default useGPS;

