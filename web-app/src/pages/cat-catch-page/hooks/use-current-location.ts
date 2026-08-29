import { useEffect } from "react";
import { useCatCatchStore } from "../model/use-cat-catch-store";

export const useCurrentLocation = () => {
  const { location, setLocation, setLocationName } = useCatCatchStore();

  const fetchPosition = () => {
    if (!navigator.geolocation) {
      setLocation({
        error: "Геолокація не підтримується цим пристроєм",
        isFetching: false,
      });
      return;
    }

    setLocation({ isFetching: true, error: null });

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        setLocation({
          lat,
          lng,
          accuracy,
          error: null,
          isFetching: false,
        });

        // Try reverse geocoding via free Nominatim API or fallback
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&addressdetails=1`,
            {
              headers: {
                "Accept-Language": "uk,en",
              },
            }
          );
          if (res.ok) {
            const data = await res.json();
            const road =
              data.address?.road ||
              data.address?.suburb ||
              data.address?.neighbourhood ||
              "";
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "";
            const name = [road, city].filter(Boolean).join(", ");
            if (name) {
              setLocationName(name);
            }
          }
        } catch {
          // Ignore reverse geocode failures
        }
      },
      (err) => {
        console.warn("Geolocation catch error:", err.message);
        setLocation({
          error: "Доступ до геолокації вимкнено або недоступний",
          isFetching: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  };

  useEffect(() => {
    fetchPosition();
  }, []);

  return {
    location,
    fetchPosition,
  };
};
