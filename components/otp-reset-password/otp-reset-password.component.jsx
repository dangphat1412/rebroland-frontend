import React, { useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const OtpResetPassword = ({ handleOpenResetPassword }) => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <Form>
        <InputField
          label="Nhập mã khôi phục mật khẩu"
          name="otp"
          value={otp}
          errorMsg="Số điện thoại không được để trống"
          handleChange={handleChange}
        />
        <Grid>
          <Grid.Column textAlign="center">
            <Button type="submit" onClick={handleOpenResetPassword}>
              Xác nhận
            </Button>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default OtpResetPassword;
