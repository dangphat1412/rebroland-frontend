import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import { getPropertyTypes } from "../../actions/post";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import { FormSearchContainer } from "./search-box-broker.styles";
import { useRouter } from "next/router";

const SearchBoxBroker = ({ searchParams }) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
      propertyTypes: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
    },
  });

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [dataProvinces, setDataProvinces] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

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

      setValue("key", searchParams.key);
      setValue("propertyTypes", searchParams.propertyTypes);
      setValue("province", searchParams.province);
      setValue("district", searchParams.district);
      setValue("ward", searchParams.ward);
    }
  }, []);

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

  const onSubmit = async (data, e) => {
    router.push(
      {
        pathname: "/danh-sach-nha-moi-gioi",
        query: { data: JSON.stringify(data) },
      },
      "/danh-sach-nha-moi-gioi",
      { scroll: true }
    );
  };

  return (
    <FormSearchContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>Tìm kiếm Nhà môi giới</h1>
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
      <Form.Button fluid>Tìm kiếm</Form.Button>
    </FormSearchContainer>
  );
};

export default SearchBoxBroker;
