import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const ForgotPassword = ({ handleOpenOtpResetPassword }) => {
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    setPhone(e.target.value);
  };

  return (
    <div>
      <Form>
        <InputField
          label="Số điện thoại"
          name="phone"
          value={phone}
          errorMsg="Số điện thoại không được để trống"
          handleChange={handleChange}
          required
        />
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit" onClick={handleOpenOtpResetPassword}>
              Nhận mã khôi phục mật khẩu
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default ForgotPassword;
