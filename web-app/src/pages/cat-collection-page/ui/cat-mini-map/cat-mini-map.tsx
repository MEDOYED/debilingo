import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import s from "./cat-mini-map.module.scss";

interface CatMiniMapProps {
  latitude: number;
  longitude: number;
}

export const CatMiniMap = ({
  latitude,
  longitude,
}: CatMiniMapProps) => {
  const pinIcon = L.divIcon({
    className: s.pinDiv,
    html: `<div class="${s.pinDot}">🐾</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });

  return (
    <div className={s.miniMapWrapper}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        className={s.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={pinIcon} />
      </MapContainer>
      <div className={s.overlayCoords}>
        📍 {latitude.toFixed(4)}, {longitude.toFixed(4)}
      </div>
    </div>
  );
};
