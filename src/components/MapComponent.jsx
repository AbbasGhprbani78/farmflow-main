import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const useMapInstance = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const mapInstance = document.querySelector(".leaflet-container");

    if (mapInstance && !map) {
      setMap(mapInstance.leafletElement);
    }
  }, [map]);

  return map;
};

const MapClickHandler = ({ onSetMarkPosition, onXChange, onYChange }) => {
  const map = useMapInstance();

  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onSetMarkPosition([lat, lng]);
      onXChange(lat);
      onYChange(lng);
    },
  });

  return null;
};

const MapComponent = ({
  x,
  y,
  markerPosition,
  onSetMarkPosition,
  onXChange,
  onYChange,
}) => {
  const map = useMapInstance();
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {

    console.log("Map Component Effect:", map, mapLoaded, markerPosition, x, y);
    if (!map || !mapLoaded) return;

    const initialCenter = [parseFloat(x) ?? 0, parseFloat(y) ?? 0];

    map.setView(markerPosition || initialCenter, map.getZoom());
  }, [map, mapLoaded, markerPosition, x, y]);


  const popupContent = (
    <Popup>
      Location: {markerPosition ? markerPosition[0] : x || 0},{" "}
      {markerPosition ? markerPosition[1] : y || 0}
    </Popup>
  );

  return (
    <MapContainer
      key={`${x}-${y}`}
      center={markerPosition}
      zoom={15}
      style={{ height: "100%", width: "100%", borderRadius: "8px" }}
    >
      {mapLoaded && (
        <MapClickHandler
          onSetMarkPosition={onSetMarkPosition}
          onXChange={onXChange}
          onYChange={onYChange}
        />
      )}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={markerPosition}>
        {popupContent}
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
