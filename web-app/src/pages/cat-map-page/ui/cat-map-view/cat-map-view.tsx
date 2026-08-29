import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { useCatMapStore } from "../../model/use-cat-map-store";
import type { Cat } from "../../model/types";
import s from "./cat-map-view.module.scss";

// Component to programmatically re-center the map when store mapCenter changes
const MapRecenterController = ({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);

  return null;
};

export const CatMapView = () => {
  const { cats, mapCenter, zoom, userLocation, focusCat, setSelectedCat } =
    useCatMapStore();

  // Create custom HTML marker icons for cats with photo avatar & rarity borders
  const createCatMarkerIcon = (cat: Cat) => {
    const rarity = (cat.rarity || "Common").toLowerCase();
    return L.divIcon({
      className: `${s.catMarkerDiv} ${s[rarity] || ""}`,
      html: `
        <div class="${s.markerPinWrapper}">
          <div class="${s.markerAvatarContainer}">
            <img src="${cat.image_url}" alt="${cat.name}" class="${s.markerImg}" />
          </div>
          <div class="${s.markerTail}"></div>
        </div>
      `,
      iconSize: [46, 56],
      iconAnchor: [23, 56],
      popupAnchor: [0, -56],
    });
  };

  // User current location marker icon
  const userLocationIcon = useMemo(() => {
    return L.divIcon({
      className: s.userLocationDiv,
      html: `<div class="${s.userPulse}"><div class="${s.userDot}"></div></div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }, []);

  return (
    <div className={s.mapWrapper}>
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className={s.leafletMap}
      >
        <MapRecenterController center={mapCenter} zoom={zoom} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* User Location Marker & Circle */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={userLocationIcon}
            >
              <Popup className={s.userPopup}>
                <div className={s.popupContent}>
                  <strong>📍 Ви тут</strong>
                </div>
              </Popup>
            </Marker>
            {userLocation.accuracy && (
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={Math.min(userLocation.accuracy, 200)}
                pathOptions={{
                  fillColor: "var(--md-sys-color-primary)",
                  fillOpacity: 0.15,
                  color: "var(--md-sys-color-primary)",
                  weight: 1,
                }}
              />
            )}
          </>
        )}

        {/* Cat Markers */}
        {cats.map((cat) => (
          <Marker
            key={cat.id}
            position={[cat.latitude, cat.longitude]}
            icon={createCatMarkerIcon(cat)}
            eventHandlers={{
              click: () => {
                setSelectedCat(cat);
              },
            }}
          >
            <Popup className={s.catPopup}>
              <div className={s.popupCard}>
                <img
                  src={cat.image_url}
                  alt={cat.name}
                  className={s.popupImg}
                />
                <div className={s.popupInfo}>
                  <div className={s.popupHeader}>
                    <h3 className={s.popupTitle}>{cat.name}</h3>
                    <span className={`${s.rarityBadge} ${s[(cat.rarity || "Common").toLowerCase()]}`}>
                      {cat.rarity || "Common"}
                    </span>
                  </div>

                  {cat.breed && <p className={s.popupBreed}>{cat.breed}</p>}

                  <p className={s.popupDate}>
                    🗓️ {new Date(cat.created_at).toLocaleDateString("uk-UA", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <button
                    type="button"
                    className={s.detailsBtn}
                    onClick={() => focusCat(cat)}
                  >
                    🔍 Деталі картки
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
