import React, {useState} from "react";
import { Form, Grid } from "semantic-ui-react";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";

const OtpRegister = () => {
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <Form>
        <InputField
          label="Nhập mã OTP được gửi về số điện thoại"
          name="otp"
          value={otp}
          errorMsg=""
          handleChange={handleChange}
        />
        <Grid>
          <Grid.Column textAlign="center">
            <CustomButton type="submit">Xác nhận</CustomButton>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default OtpRegister;
