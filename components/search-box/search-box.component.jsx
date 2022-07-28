import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Dropdown, Form } from "semantic-ui-react";
import {
  getDirections,
  getPropertyTypes,
  searchPosts,
} from "../../actions/post";
import {
  getDistrictById,
  getProvincesById,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import MultiRangeSlider from "../multi-range-slider/multi-range-slider.component";
import { FormSearchContainer, HomeSearchContainer } from "./search-box.styles";

const HANOI_PROVINCE_ID = 1;
const THACHTHAT_DISTRICT_ID = 276;

const SearchBox = ({ setData }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
      propertyTypes: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minArea: undefined,
      maxArea: undefined,
      directions: undefined,
      numberOfBedrooms: undefined,
    },
  });

  const [pricePlaceholder, setPricePlaceholder] = useState("Tất cả mức giá");
  const [areaPlaceholder, setAreaPlaceholder] = useState("Tất cả diện tích");

  const [directions, setDirections] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [numberOfBedrooms, setNumberOfBedrooms] = useState([
    { key: 0, value: 1, text: "Từ 1 phòng" },
    { key: 1, value: 2, text: "Từ 2 phòng" },
    { key: 2, value: 3, text: "Từ 3 phòng" },
    { key: 3, value: 4, text: "Từ 4 phòng" },
    { key: 4, value: 5, text: "Từ 5 phòng" },
  ]);

  useEffect(() => {
    (async () => {
      const data = await getDirections();
      setDirections(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getPropertyTypes();
      setPropertyTypes(
        data.map((d, index) => {
          return { key: index, value: d.id, text: d.name };
        })
      );
    })();
  }, []);

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
    const postData = await searchPosts(data);
    console.log("POSTS: ", postData);
    setData(postData);
  };

  if (router.pathname === "/")
    return (
      <HomeSearchContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <InputField
              fieldType="select"
              // label="Loại bất động sản"
              name="propertyType"
              placeholder="Loại bất động sản"
              options={propertyTypes}
              multiple
              onChange={(e, data) => {
                setValue("propertyTypes", data.value);
              }}
              width={3}
            />
            <InputField
              // label="Tìm kiếm từ khoá"
              name="key"
              placeholder="Tìm kiếm"
              onChange={handleChange}
              width={10}
            />
            <Form.Button fluid width={3}>
              Tìm kiếm
            </Form.Button>
          </Form.Group>
          <Form.Group widths="equal">
            <InputField
              fieldType="select"
              // label="Tỉnh/Thành phố"
              name="province"
              placeholder="Tỉnh/Thành phố"
              options={dataProvinces.provinces}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              // label="Quận/Huyện"
              name="district"
              placeholder="Quận/Huyện"
              options={dataProvinces.districts}
              onChange={handleChange}
            />
            <InputField
              fieldType="select"
              // label="Phường/Xã"
              name="ward"
              placeholder="Phường/Xã"
              options={dataProvinces.wards}
              onChange={handleChange}
            />
            <InputField
              fieldType="dropdown"
              // label="Mức giá"
              name="price"
              placeholder={pricePlaceholder}
              selection
              compact
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MultiRangeSlider
                    min={1}
                    max={30}
                    onChange={({ min, max }) => {
                      setPricePlaceholder(`${min} tỷ - ${max} tỷ`);
                      setValue("minPrice", min * 1000000000);
                      setValue("maxPrice", max * 1000000000);
                    }}
                    unit="tỷ"
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  text="Tất cả mức giá"
                  onClick={() => {
                    setPricePlaceholder("Tất cả mức giá");
                    setValue("minPrice", undefined);
                    setValue("maxPrice", undefined);
                  }}
                />
                <Dropdown.Item
                  text="≤ 800 triệu"
                  onClick={() => {
                    setPricePlaceholder("≤ 800 triệu");
                    setValue("minPrice", 0);
                    setValue("maxPrice", 800000000);
                  }}
                />
                <Dropdown.Item
                  text="800 triệu - 1 tỷ"
                  onClick={() => {
                    setPricePlaceholder("800 triệu - 1 tỷ");
                    setValue("minPrice", 800000000);
                    setValue("maxPrice", 1000000000);
                  }}
                />
                <Dropdown.Item
                  text="≥ 30 tỷ"
                  onClick={() => {
                    setPricePlaceholder("≥ 30 tỷ");
                    setValue("minPrice", 30000000000);
                    setValue("maxPrice", undefined);
                  }}
                />
                <Dropdown.Item
                  text="Thoả thuận"
                  onClick={() => {
                    setPricePlaceholder("Thoả thuận");
                    setValue("minPrice", 0);
                    setValue("maxPrice", 0);
                  }}
                />
              </Dropdown.Menu>
            </InputField>
            <InputField
              fieldType="dropdown"
              // label="Diện tích"
              name="area"
              placeholder={areaPlaceholder}
              selection
              compact
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MultiRangeSlider
                    min={0}
                    max={1000}
                    onChange={({ min, max }) => {
                      setAreaPlaceholder(`${min} m² - ${max} m²`);
                      setValue("minArea", min);
                      setValue("maxArea", max);
                    }}
                    unit="m²"
                  />
                </Dropdown.Item>
                <Dropdown.Item
                  text="Tất cả diện tích"
                  onClick={() => {
                    setAreaPlaceholder("Tất cả diện tích");
                    setValue("minArea", undefined);
                    setValue("maxArea", undefined);
                  }}
                />
                <Dropdown.Item
                  text="≥ 1000 m²"
                  onClick={() => {
                    setAreaPlaceholder("≥ 1000 m²");
                    setValue("minArea", 1000);
                    setValue("maxArea", undefined);
                  }}
                />
                <Dropdown.Item
                  text="Thoả thuận"
                  onClick={() => {
                    setAreaPlaceholder("Thoả thuận");
                    setValue("minArea", 0);
                    setValue("maxArea", 0);
                  }}
                />
              </Dropdown.Menu>
            </InputField>
            <InputField
              fieldType="dropdown"
              // label="Chọn hướng"
              options={directions}
              name="directions"
              placeholder="Chọn hướng"
              multiple
              onChange={(e, data) => {
                setValue("directions", data.value);
              }}
              compact
              selection
            />
            <InputField
              fieldType="dropdown"
              // label="Số phòng ngủ"
              options={numberOfBedrooms}
              name="numberOfBedrooms"
              placeholder="Chọn số phòng ngủ"
              onChange={handleChange}
              compact
              selection
            />
          </Form.Group>
        </Form>
      </HomeSearchContainer>
    );
  else {
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
          label="Loại bất động sản"
          name="propertyType"
          placeholder="Loại bất động sản"
          options={propertyTypes}
          multiple
          onChange={(e, data) => {
            setValue("propertyTypes", data.value);
          }}
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
            placeholder={pricePlaceholder}
            selection
            compact
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MultiRangeSlider
                  min={1}
                  max={30}
                  onChange={({ min, max }) => {
                    setPricePlaceholder(`${min} tỷ - ${max} tỷ`);
                    setValue("minPrice", min * 1000000000);
                    setValue("maxPrice", max * 1000000000);
                  }}
                  unit="tỷ"
                />
              </Dropdown.Item>
              <Dropdown.Item
                text="Tất cả mức giá"
                onClick={() => {
                  setPricePlaceholder("Tất cả mức giá");
                  setValue("minPrice", undefined);
                  setValue("maxPrice", undefined);
                }}
              />
              <Dropdown.Item
                text="≤ 800 triệu"
                onClick={() => {
                  setPricePlaceholder("≤ 800 triệu");
                  setValue("minPrice", 0);
                  setValue("maxPrice", 800000000);
                }}
              />
              <Dropdown.Item
                text="800 triệu - 1 tỷ"
                onClick={() => {
                  setPricePlaceholder("800 triệu - 1 tỷ");
                  setValue("minPrice", 800000000);
                  setValue("maxPrice", 1000000000);
                }}
              />
              <Dropdown.Item
                text="≥ 30 tỷ"
                onClick={() => {
                  setPricePlaceholder("≥ 30 tỷ");
                  setValue("minPrice", 30000000000);
                  setValue("maxPrice", undefined);
                }}
              />
              <Dropdown.Item
                text="Thoả thuận"
                onClick={() => {
                  setPricePlaceholder("Thoả thuận");
                  setValue("minPrice", 0);
                  setValue("maxPrice", 0);
                }}
              />
            </Dropdown.Menu>
          </InputField>
          <InputField
            fieldType="dropdown"
            label="Diện tích"
            name="area"
            placeholder={areaPlaceholder}
            selection
            compact
          >
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <MultiRangeSlider
                  min={0}
                  max={1000}
                  onChange={({ min, max }) => {
                    setAreaPlaceholder(`${min} m² - ${max} m²`);
                    setValue("minArea", min);
                    setValue("maxArea", max);
                  }}
                  unit="m²"
                />
              </Dropdown.Item>
              <Dropdown.Item
                text="Tất cả diện tích"
                onClick={() => {
                  setAreaPlaceholder("Tất cả diện tích");
                  setValue("minArea", undefined);
                  setValue("maxArea", undefined);
                }}
              />
              <Dropdown.Item
                text="≥ 1000 m²"
                onClick={() => {
                  setAreaPlaceholder("≥ 1000 m²");
                  setValue("minArea", 1000);
                  setValue("maxArea", undefined);
                }}
              />
              <Dropdown.Item
                text="Thoả thuận"
                onClick={() => {
                  setAreaPlaceholder("Thoả thuận");
                  setValue("minArea", 0);
                  setValue("maxArea", 0);
                }}
              />
            </Dropdown.Menu>
          </InputField>
        </Form.Group>
        <InputField
          fieldType="dropdown"
          label="Chọn hướng"
          options={directions}
          name="directions"
          placeholder="Chọn hướng"
          multiple
          onChange={(e, data) => {
            setValue("directions", data.value);
          }}
          compact
          selection
        />
        <InputField
          fieldType="dropdown"
          label="Số phòng ngủ"
          options={numberOfBedrooms}
          name="numberOfBedrooms"
          placeholder="Chọn số phòng ngủ"
          onChange={handleChange}
          compact
          selection
        />
        <Form.Button fluid>Tìm kiếm</Form.Button>
      </FormSearchContainer>
    );
  }
};

export default SearchBox;
