import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { otpRegisterUser, registerUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";

const OtpRegister = ({ registerData, setOtpRegisterOpen }) => {
  const [user, setUser] = useState(registerData.user);
  const [counter, setCounter] = useState(registerData.tokenTime * 60);
  const [remainTime, setRemainTime] = useState(registerData.remainTime);
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
      setUser((prev) => ({ ...prev, token: undefined }));
      setRemainTime(registerData.remainTime);
      setCounter(data.tokenTime * 60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await otpRegisterUser(
      user,
      setUser,
      setErrorMessage,
      setOtpRegisterOpen,
      remainTime,
      setRemainTime
    );
  };

  return (
    <div>
      {remainTime && remainTime > 0 ? (
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
                <Button
                  type="submit"
                  disabled={!user.token || user.token.length < 6}
                  style={{
                    color: "#fff",
                    background: "#ff9219",
                    fontFamily: "Tahoma",
                  }}
                >
                  Xác nhận
                </Button>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                Số lần nhập còn lại:{" "}
                <span style={{ color: "#ff9219" }}>{remainTime}</span>
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
      ) : (
        <>
          <Header as="h3" style={{ fontFamily: "Tahoma" }}>
            Bạn đã nhập quá số lần quy định.
            <br /> Hãy thử lại sau.
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <CustomButton
                  type="button"
                  onClick={() => {
                    setOtpRegisterOpen(false);
                  }}
                >
                  Đóng
                </CustomButton>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      )}
    </div>
  );
};

export default OtpRegister;
