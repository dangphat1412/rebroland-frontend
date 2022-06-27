import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Form, Input, Radio } from "semantic-ui-react";
import {
  getDistrictById,
  getProvincesById,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import MultiRangeSlider from "../multi-range-slider/multi-range-slider.component";
import { FormSearchContainer } from "./search-box.styles";

const HANOI_PROVINCE_ID = 1;
const THACHTHAT_DISTRICT_ID = 276;

const SearchBox = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      key: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
    },
  });

  const [priceOpen, setPriceOpen] = useState(false);

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

  const handleChange = (e, { name, value }) => {
    name === "province" && fetchDistrictAPI();
    name === "district" && fetchWardsAPI();
    setValue(name, value);
  };

  const onSubmit = async (data, e) => {
    console.log("SEARCH: ", data);
  };

  return (
    <FormSearchContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>Tìm kiếm</h1>
      <InputField
        label="Tìm kiếm từ khoá"
        name="key"
        placeholder="Tìm kiếm"
        onChange={handleChange}
      />
      <InputField
        fieldType="select"
        label="Tỉnh/Thành phố"
        name="province"
        placeholder="Tỉnh/Thành phố"
        options={dataProvinces.provinces}
        onChange={handleChange}
      />
      <InputField
        fieldType="select"
        label="Quận/Huyện"
        name="district"
        placeholder="Quận/Huyện"
        options={dataProvinces.districts}
        onChange={handleChange}
      />
      <InputField
        fieldType="select"
        label="Phường/Xã"
        name="ward"
        placeholder="Phường/Xã"
        options={dataProvinces.wards}
        onChange={handleChange}
      />
      <Form.Group widths="equal">
        <InputField
          fieldType="dropdown"
          label="Mức giá"
          name="price"
          placeholder="Mức giá"
          onChange={handleChange}
          selection
          compact
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={(e) => {
                e.stopPropagation();
                console.log("CLICK");
              }}
            >
              <MultiRangeSlider
                min={0}
                max={5000}
                onChange={({ min, max }) =>
                  console.log(`min = ${min}, max = ${max}`)
                }
              />
            </Dropdown.Item>
            <Dropdown.Item text="Thoả thuận" />
          </Dropdown.Menu>
        </InputField>
        <InputField
          fieldType="dropdown"
          label="Diện tích"
          name="area"
          placeholder="Diện tích"
          selection
          compact
          // options={dataProvinces.provinces}
          // onChange={handleChange}
        >
          <Dropdown.Menu>
            <Dropdown.Item text="Thoả thuận" />
          </Dropdown.Menu>
        </InputField>
      </Form.Group>
      <Form.Button fluid>Tìm kiếm</Form.Button>
    </FormSearchContainer>
  );
};
export default SearchBox;
