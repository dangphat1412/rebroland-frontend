import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Grid, Header, Message } from "semantic-ui-react";
import { handleTransfer, otpTransfer } from "../../actions/payment";
import InputField from "../input-field/input-field.component";
import ModalItem from "../modal-item/modal-item.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  TransferContainer,
  TransferPageContainer,
} from "./page-transfer.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import CustomButton from "../custom-button/custom-button.component";
import OtpInput from "react-otp-input";

const TransferPage = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [openOtpTransfer, setOpenOtpTransfer] = useState(false);
  const [transferData, setTransferData] = useState({});

  const onSubmit = async (data, e) => {
    const transferData = await otpTransfer(data, setErrorMessage);
    if (transferData) {
      console.log(transferData);
      setTransferData(transferData);
      setOpenOtpTransfer(true);
    }
  };

  return (
    <TransferPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <TransferContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">Chuyển tiền</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered={true}>
                  <Grid.Row>
                    <Grid.Column width={6} centered={true}>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        error={errorMessage !== null}
                      >
                        <Message
                          error
                          list={errorMessage}
                          hidden={errorMessage === null}
                          onDismiss={() => setErrorMessage(null)}
                        />
                        <InputField
                          label="Số điện thoại hưởng thụ"
                          placeholder="Nhập số điện thoại"
                          name="phone"
                          {...register("phone", {
                            required: "Số điện thoại không được để trống",
                            pattern: {
                              value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
                              message:
                                "Số điện thoại là số Việt Nam và có 10 chữ số",
                            },
                          })}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value.replace(/[^0-9]/g, ""));
                          }}
                          value={watch("phone")}
                          error={errors.phone}
                          requiredField
                        />
                        <InputField
                          label="Số tiền (VNĐ)"
                          placeholder="Nhập số tiền"
                          name="amount"
                          {...register("amount", {
                            required: "Số tiền không được để trống",
                            min: {
                              value: 10000,
                              message: "Số tiền tối thiểu 10,000 VNĐ",
                            },
                            max: {
                              value: 50000000,
                              message: "Số tiền tối đa 50,000,000 VNĐ",
                            },
                          })}
                          onChange={(e, { name, value }) => {
                            setValue(name, value.replace(/[^0-9]/g, ""));
                          }}
                          value={
                            watch("amount") &&
                            new Intl.NumberFormat().format(watch("amount"))
                          }
                          error={errors.amount}
                          requiredField
                        />
                        <InputField
                          label="Nội dung"
                          placeholder="Nhập nội dung chuyển khoản"
                          name="content"
                          {...register("content", {
                            required: "Nhập nội dung chuyển khoản",
                          })}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.content}
                          requiredField
                        />
                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit">Tiếp tục</Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </TransferContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalItem
        header="Xác nhận OTP"
        onOpen={openOtpTransfer}
        onClose={() => {
          setOpenOtpTransfer(false);
        }}
      >
        <OtpTransfer
          transferData={transferData}
          setOpenOtpTransfer={setOpenOtpTransfer}
          user={user}
          toast={toast}
        />
      </ModalItem>
    </TransferPageContainer>
  );
};

const OtpTransfer = ({ transferData, setOpenOtpTransfer, user, toast }) => {
  const [transfer, setTransfer] = useState(transferData.transferData);
  const [counter, setCounter] = useState(transferData.tokenTime * 60);
  const [remainTime, setRemainTime] = useState(transferData.remainTime);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPhone, setShowPhone] = useState(
    user.phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
  );

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setTransfer((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const data = await otpTransfer(transfer, setErrorMessage);
    console.log(data);
    if (data) {
      setTransfer(data.transferData);
      setCounter(data.tokenTime * 60);
      setTransfer((prev) => ({ ...prev, token: undefined }));
      setRemainTime(data.remainTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleTransfer(
      transfer,
      setTransfer,
      setErrorMessage,
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
            <label>Nhập mã OTP được gửi về số điện thoại {showPhone}</label>
            <OtpInput
              value={transfer.token}
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
                  disabled={!transfer.token || transfer.token.length < 6}
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
                    setOpenOtpTransfer(false);
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

export default TransferPage;
