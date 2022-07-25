import React, {useState} from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const ResetPassword = () => {
  return (
    <div>
      <Form>
        <InputField
          label="Mật khẩu mới"
          name="password"
        //   value={phone}
          errorMsg="Số điện thoại không được để trống"
        //   handleChange={handleChange}
          required
        />
        <InputField
          label="Nhập lại mật khẩu mới"
          name="confirmPassword"
        //   value={phone}
          errorMsg="Số điện thoại không được để trống"
        //   handleChange={handleChange}
          required
        />
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit">Thay đổi mật khẩu</Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default ResetPassword;
