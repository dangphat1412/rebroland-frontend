import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Grid, Message } from "semantic-ui-react";
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

  useEffect(() => {
    register("phone", {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Số điện thoại là số Việt Nam và có 10 chữ số",
      },
    });
    register("amount", {
      required: "Nhập số tiền bạn muốn nạp",
      min: {
        value: 10000,
        message: "Số tiền giao dịch tối thiểu 10.000VNĐ",
      },
      max: {
        value: 50000000,
        message: "Số tiền giao dịch tối thiểu 50.000.000VNĐ",
      },
      valueAsNumber: true,
    });
    register("content", {
      required: "Nhập nội dung chuyển khoản",
    });
  }, [register]);

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
                <Card.Header textAlign="center">Chuyển khoản</Card.Header>
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
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.phone}
                          requiredField
                        />
                        <InputField
                          type="number"
                          label="Số tiền (VNĐ)"
                          placeholder="Nhập số tiền"
                          name="amount"
                          onChange={(e, { name, value }) => {
                            e.target.validity.valid && setValue(name, value);
                          }}
                          value={watch("amount")}
                          min={0}
                          error={errors.amount}
                          requiredField
                        />
                        <InputField
                          label="Nội dung"
                          placeholder="Nhập nội dung chuyển khoản"
                          name="content"
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
          toast={toast}
        />
      </ModalItem>
    </TransferPageContainer>
  );
};

const OtpTransfer = ({ transferData, setOpenOtpTransfer, toast }) => {
  const [transfer, setTransfer] = useState(transferData.transferData);
  const [counter, setCounter] = useState(transferData.tokenTime * 60);
  const [errorMessage, setErrorMessage] = useState(null);

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
      setTransfer((prev) => ({ ...prev, token: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleTransfer(transfer, setErrorMessage);
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

export default TransferPage;
