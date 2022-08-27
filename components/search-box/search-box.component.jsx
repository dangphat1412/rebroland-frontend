import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dropdown, Form } from "semantic-ui-react";
import { getDirections, getPropertyTypes } from "../../actions/post";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import MultiRangeSlider from "../multi-range-slider/multi-range-slider.component";
import { FormSearchContainer, HomeSearchContainer } from "./search-box.styles";

const SearchBox = ({ searchParams }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      key: (searchParams && searchParams.key) || undefined,
      propertyTypes: (searchParams && searchParams.propertyTypes) || undefined,
      province: (searchParams && searchParams.province) || undefined,
      district: (searchParams && searchParams.district) || undefined,
      ward: (searchParams && searchParams.ward) || undefined,
      minPrice: (searchParams && searchParams.minPrice) || undefined,
      maxPrice: (searchParams && searchParams.maxPrice) || undefined,
      minArea: (searchParams && searchParams.minArea) || undefined,
      maxArea: (searchParams && searchParams.maxArea) || undefined,
      directions: (searchParams && searchParams.directions) || undefined,
      numberOfBedrooms:
        (searchParams && searchParams.numberOfBedrooms) || undefined,
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
    if (searchParams) {
      const fetchProvinces = async () => {
        let provinceId;

        if (searchParams.province) {
          const provincesData = await getProvinces();
          provinceId = provincesData.filter(
            (province) => province.name === searchParams.province
          )[0].code;
          fetchDistrictAPI(provinceId);
        }
        if (searchParams.district) {
          const districtsData = await getDistricts(provinceId);
          const districtId = districtsData.districts.filter(
            (district) => district.name === searchParams.district
          )[0].code;
          fetchWardsAPI(districtId);
        }
      };
      fetchProvinces();

      setValue("province", searchParams.province);
      setValue("district", searchParams.district);
      setValue("ward", searchParams.ward);
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
      districts: [],
      wards: [],
    }));
    setValue("district", undefined);
    setValue("ward", undefined);
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
      wards: [],
    }));
    setValue("ward", undefined);
  };

  const fetchWardsAPI = async (id) => {
    const wardsData = await getWards(id);
    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.name };
      }),
    }));
  };

  const handleChange = (e, { name, value }) => {
    if (name === "province") {
      setValue("district", null);
      setValue("ward", null);
      if (value) {
        const provinceId = dataProvinces.provinces.filter(
          (province) => province.value === value
        )[0].key;
        fetchDistrictAPI(provinceId);
      } else {
        setDataProvinces((prev) => ({
          ...prev,
          districts: [],
          wards: [],
        }));
      }
    }
    if (name === "district") {
      setValue("ward", null);
      if (value) {
        const districtId = dataProvinces.districts.filter(
          (district) => district.value === value
        )[0].key;
        fetchWardsAPI(districtId);
      } else {
        setDataProvinces((prev) => ({
          ...prev,
          wards: [],
        }));
      }
    }
    setValue(name, value || undefined);
  };

  const onSubmit = async (data, e) => {
    console.log("SEARCH: ", data);
    if (router.pathname === "/" || router.pathname === "/bat-dong-san") {
      router.push(
        {
          pathname: "/bat-dong-san",
          query: { data: JSON.stringify(data) },
        },
        "/bat-dong-san",
        { scroll: true }
      );
    }
    if (
      router.pathname === "/nha-moi-gioi" ||
      router.pathname === "/nha-moi-gioi/bat-dong-san"
    ) {
      router.push(
        {
          pathname: "/nha-moi-gioi/bat-dong-san",
          query: { data: JSON.stringify(data) },
        },
        "/nha-moi-gioi/bat-dong-san",
        { scroll: true }
      );
    }
  };

  if (router.pathname === "/" || router.pathname === "/nha-moi-gioi")
    return (
      <HomeSearchContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <InputField
              fieldType="select"
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
              name="province"
              placeholder="Tỉnh/Thành phố"
              options={dataProvinces.provinces}
              onChange={handleChange}
              value={watch("province")}
              clearable
            />
            <InputField
              fieldType="select"
              clearable
              name="district"
              placeholder="Quận/Huyện"
              options={dataProvinces.districts}
              onChange={handleChange}
              value={watch("district")}
            />
            <InputField
              fieldType="select"
              clearable
              name="ward"
              placeholder="Phường/Xã"
              options={dataProvinces.wards}
              onChange={handleChange}
              value={watch("ward")}
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
                {/* <Dropdown.Item
                  text="Thoả thuận"
                  onClick={() => {
                    setAreaPlaceholder("Thoả thuận");
                    setValue("minArea", 0);
                    setValue("maxArea", 0);
                  }}
                /> */}
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
              clearable
              options={numberOfBedrooms}
              name="numberOfBedrooms"
              placeholder="Chọn số phòng ngủ"
              onChange={handleChange}
              compact
              selection
            />
            <Button
              icon="refresh"
              type="button"
              onClick={() => {
                router.reload();
              }}
              style={{ height: "37px" }}
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
          defaultValue={searchParams && searchParams.key}
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
          defaultValue={searchParams && searchParams.propertyTypes}
        />
        <InputField
          fieldType="select"
          label="Tỉnh/Thành phố"
          name="province"
          placeholder="Tỉnh/Thành phố"
          options={dataProvinces.provinces}
          onChange={handleChange}
          defaultValue={searchParams && searchParams.province}
        />
        <InputField
          fieldType="select"
          label="Quận/Huyện"
          name="district"
          placeholder="Quận/Huyện"
          options={dataProvinces.districts}
          onChange={handleChange}
          defaultValue={searchParams && searchParams.district}
        />
        <InputField
          fieldType="select"
          label="Phường/Xã"
          name="ward"
          placeholder="Phường/Xã"
          options={dataProvinces.wards}
          onChange={handleChange}
          defaultValue={searchParams && searchParams.ward}
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
              {/* <Dropdown.Item
                text="Thoả thuận"
                onClick={() => {
                  setAreaPlaceholder("Thoả thuận");
                  setValue("minArea", 0);
                  setValue("maxArea", 0);
                }}
              /> */}
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
          defaultValue={searchParams && searchParams.directions}
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
          defaultValue={searchParams && searchParams.numberOfBedrooms}
        />
        <Button
          className="reset-button"
          type="button"
          icon="refresh"
          content="Đặt lại"
          onClick={() => {
            router.reload();
          }}
        />

        <Form.Button fluid className="search-button">
          Tìm kiếm
        </Form.Button>
      </FormSearchContainer>
    );
  }
};

export default SearchBox;
