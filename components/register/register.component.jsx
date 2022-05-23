import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";

const Register = () => {
  return (
    <>
      <Form>
        <Form.Input label="Họ và tên" />
        <Form.Input label="Email" />
        <Form.Input label="Số điện thoại" />
        <Form.Input type="password" label="Mật khẩu" />
        <Form.Input type="date" label="Ngày tháng năm sinh" />
        <Form.Input label="Tỉnh/Thành" />
        <Form.Input label="Quận/Huyện" />
        <Form.Input label="Phường/Xã" />
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
