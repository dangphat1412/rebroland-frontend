import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";
import {
  getDistrictById,
  getProvincesById,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import Map from "../map/map.component";
import { useFieldArray } from "react-hook-form";

const HANOI_PROVINCE_ID = 1;
const THACHTHAT_DISTRICT_ID = 276;

const GeographicInformationForm = ({
  register,
  errors,
  control,
  getValues,
  setValue,
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
    getValues("coordinates").map((coordinate) => {
      return { lat: coordinate.latitude, lng: coordinate.longitude };
    });
  };

  const handleChange = (e, { name, value }) => {
    name === "province" && fetchDistrictAPI();
    name === "district" && fetchWardsAPI();
    setValue(name, value);
  };

  useEffect(() => {
    fetchProvinceAPI();
  }, []);

  const [dataProvinces, setDataProvinces] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const fetchProvinceAPI = async () => {
    const provincesData = await getProvincesById(HANOI_PROVINCE_ID);
    setDataProvinces((prev) => ({
      ...prev,
      provinces: [
        {
          key: provincesData.code,
          text: provincesData.name,
          value: provincesData.name,
        },
      ],
    }));
  };

  const fetchDistrictAPI = async () => {
    const districtsData = await getDistrictById(THACHTHAT_DISTRICT_ID);
    setDataProvinces((prev) => ({
      ...prev,
      districts: [
        {
          key: districtsData.code,
          text: districtsData.name,
          value: districtsData.name,
        },
      ],
    }));
  };

  const fetchWardsAPI = async () => {
    const wardsData = await getWards(THACHTHAT_DISTRICT_ID);
    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.name };
      }),
    }));
  };

  return (
    <Segment size="large">
      <h1>Thông tin địa lý</h1>
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
          error={errors.ward}
          requiredField
        />
        <InputField
          {...register("ward")}
          label="Địa chỉ"
          name="address"
          placeholder="Nhập địa chỉ"
          onChange={handleChange}
        />
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
      </Form.Field>
    </Segment>
  );
};

export default GeographicInformationForm;
