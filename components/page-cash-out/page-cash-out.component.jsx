import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import {
  Button,
  Card,
  Confirm,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Radio,
} from "semantic-ui-react";
import { getAllBanks } from "../../actions/bank";
import { handleCashout, otpCashout } from "../../actions/payment";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import ModalItem from "../modal-item/modal-item.component";
import UserPanel from "../user-panel/user-panel.component";
import { CashOutContainer, CashOutPageContainer } from "./page-cash-out.styles";

const CashOutPage = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: 1,
      content: `${user.fullName.trim()} rút tiền`,
    },
  });

  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null);
  const [listBank, setListBank] = useState([]);
  const [openOtpCashout, setOpenOtpCashout] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [cashoutData, setCashoutData] = useState({});
  const [content, setContent] = useState(null);

  const handleChange = (e, { name, value }) => {
    console.log(value);
    setValue(name, value);
  };

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getAllBanks();
      setListBank(
        data.data.map((bank) => {
          return {
            key: bank.id,
            text: `${bank.shortName} - ${bank.name}`,
            value: bank.shortName,
            content: (
              <Header as="h5">
                <Image circular src={bank.logo} size="massive" />
                <Header.Content>
                  {bank.shortName}
                  <Header.Subheader>{bank.name}</Header.Subheader>
                </Header.Content>
              </Header>
            ),
          };
        })
      );
    };

    fetchAPI();
  }, []);

  const onSubmit = async (data, e) => {
    const cashout = await otpCashout(data, setErrorMessage);
    if (cashout) {
      console.log(cashout);
      setCashoutData(cashout);
      setOpenOtpCashout(true);
    }
  };

  return (
    <CashOutPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <CashOutContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">Rút tiền</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={6} centered>
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
                        <Form.Field>
                          <b>Chọn hình thức rút tiền</b>
                        </Form.Field>
                        <Form.Field>
                          <Radio
                            label="Rút tiền trực tiếp (Nhận tiền trực tiếp tại cơ sở của RebroLand)"
                            name="type"
                            value={1}
                            checked={watch("type") === 1}
                            onChange={(e, { name, value }) => {
                              setValue(name, value);
                            }}
                          />
                        </Form.Field>
                        <Form.Field>
                          <Radio
                            label="Chuyển tiền đến tài khoản ngân hàng"
                            name="type"
                            value={2}
                            checked={watch("type") === 2}
                            onChange={(e, { name, value }) => {
                              setValue(name, value);
                            }}
                          />
                        </Form.Field>
                        {getValues("type") === 2 && (
                          <>
                            <InputField
                              fieldType="select"
                              label="Tên ngân hàng"
                              name="bankName"
                              {...register("bankName", {
                                validate: (value) =>
                                  (getValues("type") === 2 &&
                                    !value &&
                                    "Tên ngân hàng không được để trống") ||
                                  true,
                              })}
                              placeholder="Chọn ngân hàng"
                              options={listBank}
                              search
                              searchInput={{ type: "text" }}
                              error={errors.bankName}
                              onChange={handleChange}
                              requiredField
                            />
                            <InputField
                              label="Số tài khoản"
                              placeholder="Nhập số tài khoản"
                              name="accountNumber"
                              {...register("accountNumber", {
                                validate: (value) =>
                                  (getValues("type") === 2 &&
                                    !value &&
                                    "Số tài khoản không được để trống") ||
                                  true,
                              })}
                              onChange={(e, { name, value }) => {
                                setValue(name, value.replace(/[^0-9]/g, ""));
                              }}
                              value={watch("accountNumber")}
                              error={errors.accountNumber}
                              requiredField
                            />
                            <InputField
                              label="Tên tài khoản"
                              {...register("accountName", {
                                validate: (value) =>
                                  (getValues("type") === 2 &&
                                    !value &&
                                    "Tên tài khoản không được để trống") ||
                                  true,
                              })}
                              placeholder="Nhập tên tài khoản"
                              name="accountName"
                              onChange={(e, { name, value }) => {
                                setValue(
                                  name,
                                  value.replace(/[^a-z ]/gi, "").toUpperCase()
                                );
                              }}
                              value={watch("accountName")}
                              error={errors.accountName}
                              requiredField
                            />
                          </>
                        )}
                        <InputField
                          label="Số tiền (VNĐ)"
                          placeholder="Nhập số tiền"
                          name="money"
                          {...register("money", {
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
                            watch("money") &&
                            new Intl.NumberFormat().format(watch("money"))
                          }
                          error={errors.money}
                          requiredField
                        />
                        <InputField
                          label="Nội dung"
                          placeholder="Nhập nội dung chuyển khoản"
                          name="content"
                          {...register("content")}
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.content}
                          requiredField
                          defaultValue={getValues("content")}
                        />

                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit" className="btnUpdate">
                              Tiếp tục
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </CashOutContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalItem
        header="Xác nhận OTP"
        onOpen={openOtpCashout}
        onClose={() => {
          setOpenOtpCashout(false);
        }}
      >
        <OtpCashout
          cashoutData={cashoutData}
          setOpenOtpCashout={setOpenOtpCashout}
          setOpenConfirm={setOpenConfirm}
          setContent={setContent}
        />
      </ModalItem>
      <Confirm
        open={openConfirm}
        header="Thông báo"
        content={content}
        onCancel={() => {
          setOpenConfirm(false);
          router.reload();
        }}
        onConfirm={() => {
          setOpenConfirm(false);
          router.reload();
        }}
      />
    </CashOutPageContainer>
  );
};

const OtpCashout = ({
  cashoutData,
  setOpenOtpCashout,
  setOpenConfirm,
  setContent,
}) => {
  const [cashout, setCashout] = useState(cashoutData.cashoutData);
  const [counter, setCounter] = useState(cashoutData.tokenTime * 60);
  const [remainTime, setRemainTime] = useState(cashoutData.remainTime);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleChange = (value) => {
    setCashout((prev) => ({ ...prev, token: value }));
  };

  const handleResentOtp = async () => {
    const data = await otpCashout(cashout, setErrorMessage);
    if (data) {
      console.log(data);
      setCashout(data.cashoutData);
      setCashout((prev) => ({ ...prev, token: undefined }));
      setCounter(data.tokenTime * 60);
      setRemainTime(data.remainTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(cashout);
    const data = await handleCashout(
      cashout,
      setCashout,
      setErrorMessage,
      setRemainTime,
      remainTime
    );
    if (data) {
      setOpenOtpCashout(false);
      setOpenConfirm(true);
      setContent(data);
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
              value={cashout.token}
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
                  disabled={!cashout.token || cashout.token.length < 6}
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
                    setOpenOtpCashout(false);
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

export default CashOutPage;
