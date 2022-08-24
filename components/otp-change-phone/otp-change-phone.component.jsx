import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Button, Form, Grid, Header, Message } from "semantic-ui-react";
import { changePhone, otpChangePhone } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";

const OtpChangePhone = ({ phoneData, setOpenOtpChangePhone, toast }) => {
  const [phone, setPhone] = useState(phoneData.phoneData);
  const [counter, setCounter] = useState(phoneData.tokenTime * 60);
  const [remainTime, setRemainTime] = useState(phoneData.remainTime);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setPhone((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const data = await otpChangePhone(phone, setErrorMessage);
    if (data) {
      console.log(data);
      setPhone(data.phoneData);
      setCounter(data.tokenTime * 60);
      setPhone((prev) => ({ ...prev, token: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await changePhone(
      phone,
      setPhone,
      setErrorMessage,
      remainTime,
      setRemainTime
    );
    if (status === 200) {
      setOpenOtpChangePhone(false);
      setTimeout(() => {
        toast({
          type: "success",
          title: "Thay đổi số điện thoại",
          description: <p>Thay đổi số điện thoại thành công</p>,
        });
      }, 100);
    }
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
              value={phone.token}
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
                  disabled={!phone.token || phone.token.length < 6}
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
                    setOpenOtpChangePhone(false);
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

export default OtpChangePhone;
