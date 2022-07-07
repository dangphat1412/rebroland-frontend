import React from "react";
import {
  Button,
  Card,
  Feed,
  Form,
  Grid,
  Radio,
  Segment,
} from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  DatePickerContainer,
  MyProfilePageContainer,
  ProfileContainer,
} from "./page-my-profile.styles";

const MyProfilePage = () => {
  return (
    <MyProfilePageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel />
          </Grid.Column>
          <Grid.Column width={13}>
            <ProfileContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">Thông tin cá nhân</Card.Header>
              </Card.Content>
              <Card.Content>
                <Form>
                  <Form.Group widths={2}>
                    <Form.Input fluid label="Họ và tên" />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <Form.Input fluid label="Email" />
                  </Form.Group>
                  <Form.Field
                    control={DatePickerContainer}
                    label="Ngày sinh"
                    className="dob"
                  />
                  <Form.Group inline>
                    <label>Giới tính</label>
                    <Form.Field
                      control={Radio}
                      label="Nam"
                      value="1"
                      //   checked={value === "1"}
                      //   onChange={this.handleChange}
                    />
                    <Form.Field
                      control={Radio}
                      label="Nữ"
                      value="2"
                      //   checked={value === "2"}
                      //   onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <InputField
                      //   {...register("province", {
                      //     required: "Tỉnh/Thành phố không được để trống",
                      //   })}
                      fieldType="select"
                      label="Tỉnh/Thành phố"
                      name="province"
                      placeholder="Chọn Tỉnh/Thành phố"
                      //   options={dataProvinces.provinces}
                      //   onChange={handleChange}
                      //   error={errors.province}
                      //   requiredField
                    />
                    <InputField
                      //   {...register("district", {
                      //     required: "Quận/Huyện không được để trống",
                      //   })}
                      fieldType="select"
                      label="Quận/Huyện"
                      name="district"
                      placeholder="Chọn Quận/Huyện"
                      //   options={dataProvinces.districts}
                      //   onChange={handleChange}
                      //   error={errors.district}
                      //   requiredField
                    />
                  </Form.Group>
                  <Form.Group widths={2}>
                    <InputField
                      //   {...register("ward", {
                      //     required: "Xã/Phường không được để trống",
                      //   })}
                      fieldType="select"
                      label="Phường/Xã"
                      name="ward"
                      placeholder="Chọn Phường/Xã"
                      //   options={dataProvinces.wards}
                      //   onChange={handleChange}
                      //   error={errors.ward}
                      //   requiredField
                    />
                    <InputField
                      //   {...register("ward")}
                      label="Địa chỉ"
                      name="address"
                      placeholder="Nhập địa chỉ"
                      //   onChange={handleChange}
                    />
                  </Form.Group>
                  <Button>Lưu thông tin cá nhân</Button>
                </Form>
              </Card.Content>
            </ProfileContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyProfilePageContainer>
  );
};

export default MyProfilePage;
