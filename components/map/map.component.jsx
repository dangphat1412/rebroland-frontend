import {
  Autocomplete,
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { MapContainer } from "./map.styles";

const Map = ({ position, setValue, isDrag }) => {
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
        {position.length === 1 && (
          <Marker
            clickable
            draggable={isDrag && isDrag === true}
            onDragEnd={(e) => {
              setValue("coordinates", [
                { latitude: e.latLng.lat(), longitude: e.latLng.lng() },
              ]);
              console.log(e.latLng.lat());
            }}
            position={coordinates[0]}
          />
        )}
        {position.length > 1 && (
          <Polygon path={coordinates} options={options} />
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
