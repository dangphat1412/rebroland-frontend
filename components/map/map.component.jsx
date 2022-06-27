import {
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import { MapContainer } from "./map.styles";

const Map = ({ position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJ_D4F8z-sZmHnyQ9hw_GJf7TyRbkzj8c",
  });

  const options = {
    strokeColor: "red",
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  if (!isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={17}
        center={position[0]}
        mapContainerClassName="map-container"
      >
        <Polygon path={position} options={options} />
        {/* {position.length === 1 ? (
          <Marker position={position[0]} />
        ) : (
          <Polygon path={position} options={options} />
        )} */}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
