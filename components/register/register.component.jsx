import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Grid, Message } from "semantic-ui-react";
import { registerUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";

const Register = ({ handleOpenOtpRegister, setRegisterData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (user) => {
    const data = await registerUser(user, setErrorMessage);
    if (data) {
      console.log(data);
      setRegisterData(data);
      handleOpenOtpRegister();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
        <Message
          error
          content={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <InputField
          label="Họ và tên"
          name="fullName"
          placeholder="Nhập họ và tên"
          {...register("fullName", { required: "Họ tên không được để trống" })}
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.fullName}
          requiredField
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
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.phone}
          requiredField
        />

        <InputField
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
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
          label="Xác nhận mật khẩu"
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
            <CustomButton type="submit">Đăng ký</CustomButton>
          </Grid.Column>
        </Grid>
      </Form>
    </>
  );
};

export default Register;
