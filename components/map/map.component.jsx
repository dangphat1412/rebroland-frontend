import {
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { useState } from "react";
import { MapContainer } from "./map.styles";

const Map = ({ position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCuih1YVsnPiQJcSVTqM5vSWbPFpOvOric",
  });

  const [coordinates, setCoordinates] = useState(position || []);

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  };

  if (!isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={17}
        center={position[0]}
        mapContainerClassName="map-container"
      >
        {/* <Marker position={position[0]} /> */}
        {position.length === 1 && <Marker position={position[0]} />}
        {position.length > 1 && <Polygon path={position} options={options} />}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
