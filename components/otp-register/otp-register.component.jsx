import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Form, Grid } from "semantic-ui-react";
import { getOtpToken, registerUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";

const OtpRegister = ({ userRegister, setOtpRegisterOpen }) => {
  const [user, setUser] = useState({ ...userRegister, token: "" });
  const [counter, setCounter] = useState(59);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setUser((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const status = await getOtpToken(user);
    if (status === 200) {
      setCounter(59);
    }
  };

  const handleSubmit = async (e) => {
    // console.log(user);
    e.preventDefault();
    await registerUser(user, setOtpRegisterOpen);
  };

  useEffect(() => {
    console.log(user);
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Nhập mã OTP được gửi về số điện thoại</label>
          <OtpInput
            value={user.token}
            onChange={handleChange}
            numInputs={6}
            separator={<span>&nbsp;</span>}
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{ width: "3em", height: "3.5em", fontSize: "1.2em" }}
          />
        </Form.Field>
        {/* <InputField
          label="Nhập mã OTP được gửi về số điện thoại"
          name="otp"
          value={user.token}
          errorMsg=""
          handleChange={handleChange}
        /> */}
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <CustomButton type="submit">Xác nhận</CustomButton>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              {counter > 0 ? (
                <>
                  Gửi lại mã OTP trong{" "}
                  <span style={{ color: "#ff9219" }}>
                    {counter / 60 >= 10 ? "" : "0"}
                    {Math.floor(counter / 60)}:{counter % 60 >= 10 ? "" : "0"}
                    {counter % 60}
                  </span>
                </>
              ) : (
                <div
                  style={{
                    color: "#ff9219",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={handleResentOtp}
                >
                  {" "}
                  Gửi lại mã OTP{" "}
                </div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </div>
  );
};

export default OtpRegister;
