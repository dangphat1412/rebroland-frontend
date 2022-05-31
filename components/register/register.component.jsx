import React, { useState, useEffect } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { getDistricts, getProvinces, getWards } from "../../actions/form";
import DatePickerField from "../date-picker-field/date-picker-field.component";
import InputField from "../input-field/input-field.component";

const Register = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    province: "",
    district: "",
    ward: "",
    dob: undefined
  });

  const [data, setData] = useState({
    provinces: [],
    districts: [],
    wards: []
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const [dob, setDob] = useState(new Date());
  const minDate = new Date(1900, 1, 1);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const onDateChange = (date) => {
    setUser((prev) => ({ ...prev, dob: date }));
    setDob(date);
  };

  const handleSelectProvince = (e, { value }) => {
    setUser((prev) => ({ ...prev, provinces: e.target.innerText }));
    fetchDistrictsAPI(value);
  }

  const handleSelectDistrict = (e, { value }) => {
    setUser((prev) => ({ ...prev, district: e.target.innerText }));
    fetchWardsAPI(value);
  }

  const handleSelectWard = (e) => {
    setUser((prev) => ({ ...prev, ward: e.target.innerText }));
  }

  useEffect(() => {
    fetchProvincesAPI();
  }, []);

  const fetchProvincesAPI = async () => {
    const provincesData = await getProvinces();

    setData((prev) => ({
      ...prev, provinces: provincesData.map((p) => {
        return { key: p.code, text: p.name, value: p.code }
      })
    }));
  };

  const fetchDistrictsAPI = async (provinceCode) => {
    const districtsData = await getDistricts(provinceCode);

    setData((prev) => ({
      ...prev, districts: districtsData.districts.map((d) => {
        return { key: d.code, text: d.name, value: d.code }
      })
    }));
  };

  const fetchWardsAPI = async (districtCode) => {
    const wardsData = await getWards(districtCode);

    setData((prev) => ({
      ...prev, wards: wardsData.wards.map((w) => {
        return { key: w.code, text: w.name, value: w.code }
      })
    }));
  };

  return (
    <>
      <Form>
        <InputField
          label="Họ và tên"
          name="fullName"
          value={user.fullName}
          errorMsg="Họ và tên không được để trống"
          handleChange={handleChange} />
        <InputField
          label="Email"
          name="email"
          value={user.email}
          errorMsg="Email không đúng định dạng"
          regex="^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$"
          handleChange={handleChange} />
        <InputField
          label="Số điện thoại"
          name="phone"
          value={user.phone}
          errorMsg="Số điện thoại không đúng định dạng"
          regex="(84|0[3|5|7|8|9])+([0-9]{8})\b"
          handleChange={handleChange} />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={user.password}
          errorMsg="Mật khẩu không đúng định dạng"
          regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
          handleChange={handleChange} />
        <InputField
          type="password"
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          value={user.confirmPassword}
          errorMsg="Mật khẩu không khớp"
          regex={user.password}
          handleChange={handleChange} />

        <DatePickerField
          label="Ngày tháng năm sinh"
          onDateChange={onDateChange}
          name="dob"
          date={user.dob || new Date()}
          minDate={minDate}
          maxDate={maxDate}
          errorMsg="It looks like you've entered the wrong date of birth."
        />
        <Form.Select
          fluid
          label="Tỉnh/Thành"
          options={data.provinces}
          placeholder="Tỉnh/Thành"
          onChange={handleSelectProvince}
        />
        <Form.Select
          fluid
          label="Quận/Huyện"
          options={data.districts}
          placeholder="Quận/Huyện"
          onChange={handleSelectDistrict}
        />
        <Form.Select
          fluid
          label="Phường/Xã"
          options={data.wards}
          placeholder="Phường/Xã"
          onChange={handleSelectWard}
        />
        <Form.Group inline>
          <label>Giới tính</label>
          <Form.Radio
            label="Nam"
            value="male"
          // checked={value === "sm"}
          // onChange={this.handleChange}
          />
          <Form.Radio
            label="Nữ"
            value="female"
          // checked={value === "md"}
          // onChange={this.handleChange}
          />
        </Form.Group>

        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit">Đăng ký</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

export default Register;
