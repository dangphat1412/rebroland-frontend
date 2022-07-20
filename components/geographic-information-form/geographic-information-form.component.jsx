import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import {
  getDistrictById,
  getDistricts,
  getProvinces,
  getProvincesById,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import Map from "../map/map.component";
import { useFieldArray } from "react-hook-form";
import { FormGeographicInformationContainer } from "./geographic-information-form.styles";

const GeographicInformationForm = ({
  register,
  errors,
  control,
  getValues,
  setValue,
  post,
}) => {
  const {
    fields: coordinatesFields,
    append: coordinatesAppend,
    remove: coordinatesRemove,
  } = useFieldArray({ control, name: "coordinates" });

  const [position, setPosition] = useState([
    { lat: 21.01286, lng: 105.526657 },
  ]);

  const handleCheck = () => {
    setPosition(
      getValues("coordinates").map((coordinate) => {
        return {
          lat: parseFloat(coordinate.latitude),
          lng: parseFloat(coordinate.longitude),
        };
      })
    );
  };

  const handleChange = (e, { name, value }) => {
    if (name === "province") {
      setValue(name, e.target.innerText);
      fetchDistrictAPI(value);
    } else if (name === "district") {
      setValue(name, e.target.innerText);
      fetchWardsAPI(value);
    } else if (name === "ward") {
      setValue(name, e.target.innerText);
    } else {
      setValue(name, value);
    }
  };

  useEffect(() => {
    console.log(position);
  });

  useEffect(() => {
    fetchProvinceAPI();
  }, []);

  const [dataProvinces, setDataProvinces] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const fetchProvinceAPI = async () => {
    const provincesData = await getProvinces();
    setDataProvinces((prev) => ({
      ...prev,
      provinces: provincesData.map((province) => {
        return {
          key: province.code,
          text: province.name,
          value: province.code,
        };
      }),
    }));
  };

  const fetchDistrictAPI = async (id) => {
    const districtsData = await getDistricts(id);
    setDataProvinces((prev) => ({
      ...prev,
      districts: districtsData.districts.map((district) => {
        return {
          key: district.code,
          text: district.name,
          value: district.code,
        };
      }),
    }));
  };

  const fetchWardsAPI = async (id) => {
    const wardsData = await getWards(id);
    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.code };
      }),
    }));
  };

  return (
    <FormGeographicInformationContainer size="large">
      <Header as="h1">Thông tin địa lý</Header>
      <Form.Group widths={2}>
        {!post ? (
          <InputField
            {...register("province", {
              required: "Tỉnh/Thành phố không được để trống",
            })}
            fieldType="select"
            label="Tỉnh/Thành phố"
            name="province"
            placeholder="Chọn Tỉnh/Thành phố"
            options={dataProvinces.provinces}
            onChange={handleChange}
            error={errors.province}
            requiredField
          />
        ) : (
          <InputField
            label="Tỉnh/Thành phố"
            value={getValues("province")}
            requiredField
            disabled
          />
        )}
        {!post ? (
          <InputField
            {...register("district", {
              required: "Quận/Huyện không được để trống",
            })}
            fieldType="select"
            label="Quận/Huyện"
            name="district"
            placeholder="Chọn Quận/Huyện"
            options={dataProvinces.districts}
            onChange={handleChange}
            error={errors.district}
            requiredField
          />
        ) : (
          <InputField
            label="Quận/Huyện"
            value={getValues("district")}
            requiredField
            disabled
          />
        )}
      </Form.Group>
      <Form.Group widths={2}>
        {!post ? (
          <InputField
            {...register("ward", { required: "Xã/Phường không được để trống" })}
            fieldType="select"
            label="Phường/Xã"
            name="ward"
            placeholder="Chọn Phường/Xã"
            options={dataProvinces.wards}
            onChange={handleChange}
            error={errors.ward}
            requiredField
          />
        ) : (
          <InputField
            label="Phường/Xã"
            value={getValues("ward")}
            requiredField
            disabled
          />
        )}
        {!post ? (
          <InputField
            {...register("address")}
            label="Địa chỉ"
            name="address"
            placeholder="Nhập địa chỉ"
            onChange={handleChange}
          />
        ) : (
          <InputField label="Địa chỉ" value={getValues("address")} disabled />
        )}
      </Form.Group>
      {/* missing loading */}
      <Form.Field>
        <label>Vị trí trên bản đồ</label>
        <Map position={position} />
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
                        getValues("coordinates")[index].latitude =
                          e.target.value;
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
                        size="large"
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
                  size="large"
                  onClick={() => {
                    coordinatesAppend({});
                  }}
                >
                  Thêm toạ độ
                </Button>
                <Button
                  positive
                  type="button"
                  onClick={handleCheck}
                  size="large"
                >
                  Kiểm tra trên bản đồ
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    </FormGeographicInformationContainer>
  );
};

export default GeographicInformationForm;
