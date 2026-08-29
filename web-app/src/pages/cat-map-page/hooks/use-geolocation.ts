import { useEffect, useState } from "react";
import type { UserLocation } from "../model/types";
import { useCatMapStore } from "../model/use-cat-map-store";

export const useGeolocation = () => {
  const { setUserLocation, setMapCenter } = useCatMapStore();
  const [error, setError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError("Геолокація не підтримується цим браузером");
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc: UserLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setUserLocation(loc);
        setMapCenter([loc.lat, loc.lng], 15);
        setIsLocating(false);
      },
      (err) => {
        console.warn("Geolocation error:", err.message);
        setError("Не вдалося отримати вашу поточну геопозицію");
        setIsLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    // Initial silent position request
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc: UserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          setUserLocation(loc);
        },
        () => {
          // Ignore initial failure silently
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  }, [setUserLocation]);

  return {
    requestLocation,
    error,
    isLocating,
  };
};
