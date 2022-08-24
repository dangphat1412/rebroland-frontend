import {
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { MapContainer } from "./map.styles";

const Map = ({ position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCuih1YVsnPiQJcSVTqM5vSWbPFpOvOric",
  });

  const [coordinates, setCoordinates] = useState(position || null);

  const [options, setOptions] = useState({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  useEffect(() => {
    setCoordinates(position);
  }, [position]);

  if (!isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={19}
        center={position[0]}
        mapContainerClassName="map-container"
      >
        {position.length === 1 && <Marker position={coordinates[0]} />}
        {position.length > 1 && (
          <Polygon path={coordinates} options={options} />
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
