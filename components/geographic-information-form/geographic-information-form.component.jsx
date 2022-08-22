import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import {
  getDistricts,
  getProvinces,
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

  const [options, setOptions] = useState({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

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
      const provinceId = dataProvinces.provinces.filter(
        (province) => province.value === value
      )[0].key;
      fetchDistrictAPI(provinceId);
    }
    if (name === "district") {
      const districtId = dataProvinces.districts.filter(
        (district) => district.value === value
      )[0].key;
      fetchWardsAPI(districtId);
    }
    setValue(name, value);
  };

  useEffect(() => {
    fetchProvinceAPI();
    if (post) {
      const fetchProvinces = async () => {
        let provinceId;

        if (post.province) {
          const provincesData = await getProvinces();
          provinceId = provincesData.filter(
            (province) => province.name === post.province
          )[0].code;
          fetchDistrictAPI(provinceId);
        }
        if (post.district) {
          const districtsData = await getDistricts(provinceId);
          const districtId = districtsData.districts.filter(
            (district) => district.name === post.district
          )[0].code;
          fetchWardsAPI(districtId);
        }
      };
      fetchProvinces();
    }
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
          value: province.name,
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
          value: district.name,
        };
      }),
    }));
    setDataProvinces((prev) => ({
      ...prev,
      wards: [],
    }));
    setValue("district", post ? post.district : null);
    setValue("ward", post ? post.ward : null);
  };

  const fetchWardsAPI = async (id) => {
    const wardsData = await getWards(id);
    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.name };
      }),
    }));
    setValue("ward", post ? post.ward : null);
  };

  return (
    <FormGeographicInformationContainer size="large">
      <Header as="h1">Thông tin địa lý</Header>
      <Form.Group widths={2}>
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
          defaultValue={getValues("province")}
          requiredField
        />
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
          defaultValue={getValues("district")}
          error={errors.district}
          requiredField
        />
      </Form.Group>
      <Form.Group widths={2}>
        <InputField
          {...register("ward", { required: "Xã/Phường không được để trống" })}
          fieldType="select"
          label="Phường/Xã"
          name="ward"
          placeholder="Chọn Phường/Xã"
          options={dataProvinces.wards}
          onChange={handleChange}
          defaultValue={getValues("ward")}
          error={errors.ward}
          requiredField
        />

        <InputField
          {...register("address")}
          label="Địa chỉ"
          name="address"
          placeholder="Nhập địa chỉ"
          onChange={handleChange}
          defaultValue={getValues("address")}
          onFocus={(e) => {
            setValue("address", getValues("address"));
          }}
        />
      </Form.Group>
      {/* missing loading */}
      <Form.Field>
        <label>Vị trí trên bản đồ</label>
        <Map position={position} options={options} />
        <Grid>
          <Grid.Row>
            <Grid.Column>
              {coordinatesFields.map((field, index) => {
                return (
                  <Form.Group widths="equal" key={field.id}>
                    <InputField
                      name={`coordinates[${index}].latitude`}
                      {...register(`coordinates[${index}].latitude`, {
                        validate: {
                          isCoordinate: (value) =>
                            !value ||
                            /^(-?\d+(\.\d+)?)$/.test(value) ||
                            "Toạ độ không hợp lệ",
                          checkNull: (value) =>
                            (!value &&
                              getValues(`coordinates[${index}].longitude`) &&
                              "Nhập toạ độ") ||
                            true,
                        },
                      })}
                      placeholder="Nhập vĩ độ"
                      onChange={(e) => {
                        setValue(
                          `coordinates[${index}].latitude`,
                          e.target.value
                        );
                      }}
                      defaultValue={getValues(`coordinates[${index}].latitude`)}
                      onFocus={(e) => {
                        setValue(
                          `coordinates[${index}].latitude`,
                          getValues(`coordinates[${index}].latitude`)
                        );
                      }}
                      error={
                        errors.coordinates && errors.coordinates[index].latitude
                      }
                    />
                    <InputField
                      name={`coordinates.[${index}].longitude`}
                      {...register(`coordinates[${index}].longitude`, {
                        validate: {
                          isCoordinate: (value) =>
                            !value ||
                            /^(-?\d+(\.\d+)?)$/.test(value) ||
                            "Toạ độ không hợp lệ",
                          checkNull: (value) =>
                            (!value &&
                              getValues(`coordinates[${index}].latitude`) &&
                              "Nhập toạ độ") ||
                            true,
                        },
                      })}
                      placeholder="Nhập kinh độ"
                      onChange={(e) => {
                        setValue(
                          `coordinates[${index}].longitude`,
                          e.target.value
                        );
                      }}
                      defaultValue={getValues(
                        `coordinates[${index}].longitude`
                      )}
                      onFocus={(e) => {
                        setValue(
                          `coordinates[${index}].longitude`,
                          getValues(`coordinates[${index}].longitude`)
                        );
                      }}
                      error={
                        errors.coordinates &&
                        errors.coordinates[index].longitude
                      }
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
