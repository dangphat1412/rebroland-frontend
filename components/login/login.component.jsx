import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const Login = () => {
  const [user, setUser] = useState({
    emailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => { };
  
  return (
    <>
      <Form>
        <InputField
          label="Email hoặc số điện thoại"
          name="emailOrPhone"
          value={user.emailOrPhone}
          errorMsg="Email hoặc số điện thoại không được để trống"
          handleChange={handleChange} />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={user.password}
          errorMsg="Mật khẩu không được để trống"
          handleChange={handleChange} />
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit">Đăng nhập</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

export default Login;
