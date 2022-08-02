import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "semantic-ui-react";
import { getPropertyTypes } from "../../actions/post";
import { searchBrokers } from "../../actions/user";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../actions/vietnam-provinces";
import InputField from "../input-field/input-field.component";
import { FormSearchContainer } from "./search-box-broker.styles";

const SearchBoxBroker = ({
  setData,
  setParams,
  setSortValue,
  setTotalResult,
}) => {
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
  }, []);

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

  const onSubmit = async (data, e) => {
    console.log("data: ", data);
    const brokersData = await searchBrokers(data);
    console.log(brokersData);
    setData(brokersData);
    setTotalResult(brokersData.totalResult);
    setParams(data);
    setSortValue(0);
  };

  return (
    <FormSearchContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>Tìm kiếm Nhà môi giới</h1>
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
      <Form.Button fluid>Tìm kiếm</Form.Button>
    </FormSearchContainer>
  );
};

export default SearchBoxBroker;
