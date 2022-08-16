import React, { useRef, useState } from "react";
import { Form, Grid, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import { forgotPasswordUser } from "../../actions/auth";

const ForgotPassword = ({
  setForgotPasswordData,
  handleOpenOtpForgotPassword,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (user) => {
    const data = await forgotPasswordUser(user, setErrorMessage);
    if (data) {
      console.log(data);
      setForgotPasswordData(data);
      handleOpenOtpForgotPassword();
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
        <Message
          error
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <InputField
          label="Số điện thoại"
          name="phone"
          placeholder="Nhập số điện thoại"
          {...register("phone", {
            required: "Số điện thoại không được để trống",
            pattern: {
              value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
              message: "Số điện thoại là số Việt Nam và có 10 chữ số",
            },
          })}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.phone}
          requiredField
        />
        <InputField
          label="Mật khẩu mới"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu mới"
          {...register("password", {
            required: "Mật khẩu không được để trống",
            pattern: {
              value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
              message:
                "Mật khẩu chứa ít nhất 8 ký tự, gồm chữ hoa, thường và số",
            },
          })}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.password}
          requiredField
        />

        <InputField
          label="Xác nhận mật khẩu mới"
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          {...register("confirmPassword", {
            required: "Xác nhận mật khẩu không được để trống",
            validate: (value) =>
              value === password.current || "Mật khẩu không khớp",
          })}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.confirmPassword}
          requiredField
        />

        <Grid>
          <Grid.Column textAlign="center">
            <CustomButton type="submit">
              Nhận mã khôi phục mật khẩu
            </CustomButton>
          </Grid.Column>
        </Grid>
      </Form>
    </div>
  );
};

export default ForgotPassword;
