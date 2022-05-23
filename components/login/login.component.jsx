import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

const Login = () => {
  const [user, setUser] = useState();

  const handleSubmit = () => {};
  return (
    <>
      <Form>
        <Form.Input label="Email hoặc số điện thoại" />
        <Form.Input type="password" label="Mật khẩu" />
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
