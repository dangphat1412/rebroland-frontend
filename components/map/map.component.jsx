import {
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { MapContainer } from "./map.styles";

const Map = ({ postProperty, setPostProperty, handleChange }) => {
  const [position, setPosition] = useState({ lat: 21.012639, lng: 105.526507 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBPrWdOpVJ4LhAiLCLSfwK-0i3E1q27R7s",
  });

  const paths = [
    { lat: 21.024373, lng: 106.104876 },
    { lat: 21.024373, lng: 106.104785 },
    { lat: 21.024315, lng: 106.104789 },
    { lat: 21.024326, lng: 106.104886 },
  ];

  const options = {
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };

  const handleClick = () => {
    setPosition({
      lat: parseFloat(postProperty.latitude),
      lng: parseFloat(postProperty.longitude),
    });
  };

  if (!isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={17}
        center={position}
        mapContainerClassName="map-container"
      >
        <Marker position={position} />
      </GoogleMap>
      <Form.Group widths={3}>
        <Form.Input
          fluid
          placeholder="Nhập vĩ độ"
          name="latitude"
          value={postProperty.latitude}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          placeholder="Nhập kinh độ"
          name="longitude"
          value={postProperty.longitude}
          onChange={handleChange}
        />
        <Form.Button onClick={handleClick}>Kiểm tra trên bản đồ</Form.Button>
      </Form.Group>
    </MapContainer>
  );
};

export default Map;
