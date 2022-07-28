import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Message,
  Radio,
} from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyProfilePageContainer,
  ProfileContainer,
} from "./page-my-profile.styles";
import { useForm } from "react-hook-form";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "../../actions/vietnam-provinces";
import { updateUser } from "../../actions/auth";

const MyProfilePage = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    setError,
    clearError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      gender: (user.gender ? 1 : 0) || 1,
      dob: new Date(user.dob) || new Date(),
      province: user.province,
      district: user.district,
      ward: user.ward,
      address: user.address,
      description: user.description,
      avatar: user.avatar,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Họ và tên không được để trống" });
    register("email");
    register("dob", { validate: { isBefore } });
    register("gender");
    register("province");
    register("district");
    register("ward");
    register("address");
    register("description");
    register("avatar");
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const isBefore = (date) => {
    if (!date) {
      return false;
    }
    const minDate = new Date();
    minDate.setFullYear(new Date().getFullYear() - 18);
    return date < minDate;
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

  const handleDateChange = (value) => {
    setValue("dob", value);
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

  const onSubmit = async (data) => {
    await updateUser(data, setErrorMessage);
  };

  return (
    <MyProfilePageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <ProfileContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">Thông tin cá nhân</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={9} centered>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        error={errorMessage !== null}
                      >
                        <Message
                          error
                          list={errorMessage}
                          onDismiss={() => setErrorMessage(null)}
                        />
                        <Form.Group widths={2}>
                          <InputField
                            label="Họ và tên"
                            name="fullName"
                            defaultValue={getValues("fullName")}
                            onChange={async (e, { name, value }) => {
                              setValue(name, value);
                            }}
                            error={errors.fullName}
                            requiredField
                          />
                          <InputField
                            label="Số điện thoại"
                            value={user.phone}
                            disabled
                          />
                        </Form.Group>
                        <Form.Group widths={2}>
                          <InputField
                            label="Email"
                            name="email"
                            defaultValue={getValues("email")}
                            onChange={async (e, { name, value }) => {
                              setValue(name, value);
                            }}
                          />
                          <InputField
                            fieldType="datepicker"
                            label="Ngày sinh"
                            name="dob"
                            value={getValues("dob")}
                            onDateChange={handleDateChange}
                            error={errors.dob}
                          />
                        </Form.Group>

                        <Form.Group inline>
                          <label>Giới tính</label>
                          <Form.Field
                            control={Radio}
                            label="Nam"
                            name="gender"
                            value={1}
                            checked={watch("gender") === 1}
                            onChange={handleChange}
                          />
                          <Form.Field
                            control={Radio}
                            label="Nữ"
                            name="gender"
                            value={0}
                            checked={watch("gender") === 0}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group widths={2}>
                          <InputField
                            fieldType="select"
                            label="Tỉnh/Thành phố"
                            name="province"
                            placeholder="Chọn Tỉnh/Thành phố"
                            options={dataProvinces.provinces}
                            onChange={handleChange}
                          />
                          <InputField
                            fieldType="select"
                            label="Quận/Huyện"
                            name="district"
                            placeholder="Chọn Quận/Huyện"
                            options={dataProvinces.districts}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group widths={2}>
                          <InputField
                            fieldType="select"
                            label="Phường/Xã"
                            name="ward"
                            placeholder="Chọn Phường/Xã"
                            options={dataProvinces.wards}
                            onChange={handleChange}
                          />
                          <InputField
                            label="Địa chỉ"
                            name="address"
                            defaultValue={getValues("address")}
                            onChange={async (e, { name, value }) => {
                              setValue(name, value);
                            }}
                          />
                        </Form.Group>
                        <InputField
                          fieldType="textarea"
                          label="Mô tả"
                          name="description"
                          defaultValue={getValues("description")}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                        />
                        <InputField
                          label="Trang cá nhân Facebook"
                          // onChange={async (e, { name, value }) => {
                          //   setValue(name, value);
                          // }}
                        />
                        <InputField
                          label="Trang cá nhân Zalo"
                          // onChange={async (e, { name, value }) => {
                          //   setValue(name, value);
                          // }}
                        />
                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit" className="btnUpdate">
                              Cập nhật thông tin cá nhân
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </ProfileContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyProfilePageContainer>
  );
};

export default MyProfilePage;
