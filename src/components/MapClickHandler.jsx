import React from "react";
import { useMapEvents } from "react-leaflet";

const MapClickHandler = ({ onSetMarkPosition, onXChange, onYChange }) => {
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

export default MapClickHandler;
