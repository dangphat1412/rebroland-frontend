import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
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
      key: (searchParams && searchParams.key) || undefined,
      propertyTypes: (searchParams && searchParams.propertyTypes) || undefined,
      province: (searchParams && searchParams.province) || undefined,
      district: (searchParams && searchParams.district) || undefined,
      ward: (searchParams && searchParams.ward) || undefined,
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
      districts: [],
      wards: [],
    }));
    setValue("district", searchParams && searchParams.district);
    setValue("ward", searchParams && searchParams.ward);
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
    setValue("ward", searchParams && searchParams.ward);
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
        name="propertyTypes"
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
        clearable
        name="province"
        placeholder="Tỉnh/Thành phố"
        options={dataProvinces.provinces}
        onChange={handleChange}
        defaultValue={searchParams && searchParams.province}
      />
      <InputField
        fieldType="select"
        clearable
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
        clearable
        name="ward"
        placeholder="Phường/Xã"
        options={dataProvinces.wards}
        onChange={handleChange}
        defaultValue={searchParams && searchParams.ward}
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
      <Form.Button fluid>Tìm kiếm</Form.Button>
    </FormSearchContainer>
  );
};

export default SearchBoxBroker;
