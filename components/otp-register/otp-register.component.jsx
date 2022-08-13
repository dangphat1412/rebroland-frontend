import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Form, Grid, Message } from "semantic-ui-react";
import { otpRegisterUser, registerUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";

const OtpRegister = ({ registerData, setOtpRegisterOpen }) => {
  const [user, setUser] = useState(registerData.user);
  const [counter, setCounter] = useState(registerData.tokenTime * 60);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setUser((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const data = await registerUser(user, setErrorMessage);
    if (data) {
      console.log(data);
      setUser(data.user);
      setCounter(data.tokenTime * 60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await otpRegisterUser(user, setErrorMessage, setOtpRegisterOpen);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} error={errorMessage !== null}>
        <Message
          error
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Form.Field>
          <label>Nhập mã OTP được gửi về số điện thoại</label>
          <OtpInput
            value={user.token}
            onChange={handleChange}
            numInputs={6}
            isInputNum={true}
            separator={<span>&nbsp;</span>}
            containerStyle={{ justifyContent: "center" }}
            inputStyle={{ width: "3em", height: "3.5em", fontSize: "1.2em" }}
          />
        </Form.Field>
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
