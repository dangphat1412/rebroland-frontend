import {
  GoogleMap,
  Marker,
  Polygon,
  useLoadScript,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { MapContainer } from "./map.styles";

const Map = ({ getValues, control }) => {
  const {
    fields: coordinatesFields,
    append: coordinatesAppend,
    remove: coordinatesRemove,
  } = useFieldArray({ control, name: "coordinates" });

  const [position, setPosition] = useState([
    { lat: 21.01286, lng: 105.526657 },
  ]);
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

  const handleCheck = () => {
    getValues("coordinates").map((coordinate) => {
      return { lat: coordinate.latitude, lng: coordinate.longitude };
    });
  };

  if (!isLoaded) return <>Loading ...</>;
  return (
    <MapContainer>
      <GoogleMap
        zoom={17}
        center={position[0]}
        mapContainerClassName="map-container"
      >
        {position.length === 1 ? (
          <Marker position={position[0]} />
        ) : (
          <Polygon path={position} options={options} />
        )}
      </GoogleMap>

      <Grid>
        <Grid.Row>
          <Grid.Column>
            {coordinatesFields.map((field, index) => {
              return (
                <Form.Group widths="equal" key={field.id}>
                  <InputField
                    name={`coordinates[${index}].latitude`}
                    placeholder="Nhập vĩ độ"
                    onChange={(e) => {
                      getValues("coordinates")[index].latitude = e.target.value;
                    }}
                  />
                  <InputField
                    name={`coordinates.[${index}].longitude`}
                    placeholder="Nhập kinh độ"
                    onChange={(e) => {
                      getValues("coordinates")[index].longitude =
                        e.target.value;
                    }}
                  />
                  <Form.Field>
                    <Button
                      color="red"
                      type="button"
                      onClick={() => coordinatesRemove(index)}
                    >
                      Xoá toạ độ
                    </Button>
                  </Form.Field>
                </Form.Group>
              );
            })}
            <div>
              <Button
                primary
                type="button"
                onClick={() => {
                  coordinatesAppend({});
                }}
              >
                Thêm toạ độ
              </Button>
              <Button positive type="button" onClick={handleCheck}>
                Kiểm tra trên bản đồ
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MapContainer>
  );
};

export default Map;
