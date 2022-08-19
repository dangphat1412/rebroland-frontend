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
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const MyProfilePage = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
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
      facebookLink: user.facebookLink,
      zaloLink: user.zaloLink,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Họ và tên không được để trống" });
    register("email", {
      pattern: {
        value:
          /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
        message: "Nhập đúng định dạng Email",
      },
    });
    register("dob", { validate: { isBefore } });
    register("gender");
    register("province");
    register("district");
    register("ward");
    register("address");
    register("description");
    register("avatar");
    register("facebookLink", {
      pattern: {
        value:
          /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/,
        message: "Nhập đúng định dạng link Facebook",
      },
    });
    register("zaloLink", {
      pattern: {
        value:
          /^(?:(?:http|https):\/\/)?(?:www.)?zalo.me\/(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Nhập đúng định dạng link Zalo",
      },
    });
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
    if (user) {
      const fetchProvinces = async () => {
        let provinceId;
        if (user.province) {
          const provincesData = await getProvinces();
          provinceId = provincesData.filter(
            (province) => province.name === user.province
          )[0].code;
          fetchDistrictAPI(provinceId);
        }
        if (user.district) {
          const districtsData = await getDistricts(provinceId);
          const districtId = districtsData.districts.filter(
            (district) => district.name === user.district
          )[0].code;
          fetchWardsAPI(districtId);
        }
      };
      fetchProvinces();
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
    setDataProvinces((prev) => ({
      ...prev,
      wards: [],
    }));
    setValue("district", undefined);
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
    setValue("ward", undefined);
  };

  const handleDateChange = (value) => {
    setValue("dob", value);
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

  const onSubmit = async (data) => {
    const status = await updateUser(data, setErrorMessage);
    if (status === 200) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Thay đổi thông tin cá nhân",
          description: <p>Thay đổi thông tin cá nhân thành công</p>,
        });
      }, 100);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Thay đổi thông tin cá nhân",
          description: <p>Thay đổi thông tin cá nhân thất bại</p>,
        });
      }, 100);
    }
  };

  return (
    <MyProfilePageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
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
                            defaultValue={user.province}
                          />
                          <InputField
                            fieldType="select"
                            label="Quận/Huyện"
                            name="district"
                            placeholder="Chọn Quận/Huyện"
                            options={dataProvinces.districts}
                            onChange={handleChange}
                            defaultValue={user.district}
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
                            defaultValue={user.ward}
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
                          name="facebookLink"
                          defaultValue={getValues("facebookLink")}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.facebookLink}
                        />
                        <InputField
                          label="Trang cá nhân Zalo"
                          name="zaloLink"
                          defaultValue={getValues("zaloLink")}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.zaloLink}
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
