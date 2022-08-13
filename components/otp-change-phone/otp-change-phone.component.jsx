import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Form, Grid, Message } from "semantic-ui-react";
import { changePhone, otpChangePhone } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";

const OtpChangePhone = ({ phoneData, setOpenOtpChangePhone, toast }) => {
  const [phone, setPhone] = useState(phoneData.phoneData);
  const [counter, setCounter] = useState(phoneData.tokenTime * 60);
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
    setPhone((prev) => ({ ...prev, token: "" }));
    const res = await otpChangePhone(phone, setErrorMessage);
    if (res.status === 200) {
      setPhone(res.data.phoneData);
      setCounter(res.data.tokenTime * 60);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = await changePhone(phone, setErrorMessage);
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

export default OtpChangePhone;
