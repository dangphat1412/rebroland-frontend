import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";
import { MapContainer } from "./map.styles";

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAgACI_xKyoSUanFLQ92sDpD68715-08Mw",
  });
  if (isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={10}
        center={{ lat: 44, lng: -80 }}
        mapContainerClassName="map-container"
      ></GoogleMap>
    </MapContainer>
  );
};

export default Map;
