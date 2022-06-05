import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { LoginContainer } from "./login.styles";

const Login = ({ handleOpenForgotPassword }) => {
  const [user, setUser] = useState({
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {};

  return (
    <LoginContainer>
      <Form>
        <InputField
          label="Số điện thoại"
          name="phone"
          value={user.phone}
          errorMsg="Số điện thoại không được để trống"
          handleChange={handleChange}
          required
        />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={user.password}
          errorMsg="Mật khẩu không được để trống"
          handleChange={handleChange}
          required
        />
        <Grid>
          <Grid.Column width={8}>
            <Form.Checkbox label="Duy trì đăng nhập" />
          </Grid.Column>
          <Grid.Column textAlign="right" width={8} className="forgot-password">
            <div onClick={handleOpenForgotPassword}>Quên mật khẩu</div>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit">Đăng nhập</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </LoginContainer>
  );
};

export default Login;
