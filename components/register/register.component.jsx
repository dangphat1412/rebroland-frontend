import React, { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../actions/vietnam-provinces";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";

const Register = ({ handleOpenOtpRegister }) => {
  const [user, setUser] = useState({
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    province: "",
    district: "",
    ward: "",
    gender: "male",
  });

  const [dataProvinces, setDataProvinces] = useState({
    provinces: [],
    districts: [],
    wards: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeGender = (e, { name, value }) => {
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // const [dob, setDob] = useState(new Date());
  // const minDate = new Date(1900, 1, 1);
  // const maxDate = new Date();
  // maxDate.setFullYear(maxDate.getFullYear() - 18);
  // const onDateChange = (date) => {
  //   setUser((prev) => ({ ...prev, dob: date }));
  //   setDob(date);
  // };

  const handleSelectProvince = (e, { value }) => {
    setUser((prev) => ({
      ...prev,
      province: e.target.innerText,
      district: "",
      ward: "",
    }));
    fetchDistrictsAPI(value);
  };

  const handleSelectDistrict = (e, { value }) => {
    setUser((prev) => ({ ...prev, district: e.target.innerText, ward: "" }));
    fetchWardsAPI(value);
  };

  const handleSelectWard = (e) => {
    setUser((prev) => ({ ...prev, ward: e.target.innerText }));
  };

  useEffect(() => {
    fetchProvincesAPI();
  }, []);

  const fetchProvincesAPI = async () => {
    const provincesData = await getProvinces();

    setDataProvinces((prev) => ({
      ...prev,
      provinces: provincesData.map((p) => {
        return { key: p.code, text: p.name, value: p.code };
      }),
    }));
  };

  const fetchDistrictsAPI = async (provinceCode) => {
    const districtsData = await getDistricts(provinceCode);

    setDataProvinces((prev) => ({
      ...prev,
      districts: districtsData.districts.map((d) => {
        return { key: d.code, text: d.name, value: d.code };
      }),
    }));
  };

  const fetchWardsAPI = async (districtCode) => {
    const wardsData = await getWards(districtCode);

    setDataProvinces((prev) => ({
      ...prev,
      wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.code };
      }),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleOpenOtpRegister();
  };

  useEffect(() => {
    console.log(user);
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputField
          label="Họ và tên"
          name="fullName"
          value={user.fullName}
          errorMsg="Họ và tên không được để trống"
          handleChange={handleChange}
          required
        />
        {/* <InputField
          label="Email"
          name="email"
          value={user.email}
          errorMsg="Email không đúng định dạng"
          regex="^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"
          handleChange={handleChange} /> */}
        <InputField
          label="Số điện thoại"
          name="phone"
          value={user.phone}
          errorMsg="Số điện thoại không đúng định dạng"
          regex="(84|0[3|5|7|8|9])+([0-9]{8})\b"
          handleChange={handleChange}
        />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={user.password}
          errorMsg="Mật khẩu không đúng định dạng"
          regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
          handleChange={handleChange}
        />
        <InputField
          type="password"
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          value={user.confirmPassword}
          errorMsg="Mật khẩu không khớp"
          regex={user.password}
          handleChange={handleChange}
        />

        {/* <DatePickerField
          label="Ngày tháng năm sinh"
          onDateChange={onDateChange}
          name="dob"
          date={user.dob || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          errorMsg="It looks like you've entered the wrong date of birth."
        /> */}
        <Form.Select
          fluid
          label="Tỉnh/Thành"
          options={dataProvinces.provinces}
          placeholder="Tỉnh/Thành"
          onChange={handleSelectProvince}
        />
        <Form.Select
          fluid
          label="Quận/Huyện"
          options={dataProvinces.districts}
          placeholder="Quận/Huyện"
          onChange={handleSelectDistrict}
        />
        <Form.Select
          fluid
          label="Phường/Xã"
          options={dataProvinces.wards}
          placeholder="Phường/Xã"
          onChange={handleSelectWard}
        />
        <Form.Group inline>
          <label>Giới tính</label>
          <Form.Radio
            label="Nam"
            name="gender"
            value="male"
            checked={user.gender === "male"}
            onChange={handleChangeGender}
          />
          <Form.Radio
            label="Nữ"
            value="female"
            name="gender"
            checked={user.gender === "female"}
            onChange={handleChangeGender}
          />
        </Form.Group>

        <Grid>
          <Grid.Column textAlign="center">
            <CustomButton type="submit">Đăng ký</CustomButton>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

export default Register;
