import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Grid } from "semantic-ui-react";
import { getOtpToken, registerUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";

const Register = ({ handleOpenOtpRegister, setUserRegister }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("fullName", { required: "Họ tên không được để trống" });
    register("phone", {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Số điện thoại là số Việt Nam và có 10 chữ số",
      },
    });
    register("password", {
      required: "Mật khẩu không được để trống",
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        message: "Mật khẩu chứa ít nhất 8 ký tự, gồm chữ hoa, thường và số",
      },
    });
    register("confirmPassword", {
      required: "Xác nhận mật khẩu không được để trống",
    });
  }, []);

  const onSubmit = async (user) => {
    const status = await getOtpToken(user);
    if (status === 200) {
      setUserRegister({ ...user });
      handleOpenOtpRegister();
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await getOtpToken(user);
  //   setUserRegister({ ...user });
  //   handleOpenOtpRegister();
  // };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Họ và tên"
          name="fullName"
          placeholder="Nhập họ và tên"
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.fullName}
        />

        <InputField
          label="Số điện thoại"
          name="phone"
          placeholder="Nhập số điện thoại"
          onChange={(e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.phone}
        />

        <InputField
          label="Mật khẩu"
          type="password"
          name="password"
          placeholder="Nhập mật khẩu"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.password}
        />

        <InputField
          label="Xác nhận mật khẩu"
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.confirmPassword}
        />

        {/* 
        <InputField
          label="Số điện thoại"
          name="phone"
          value={user.phone}
          errorMsg="Số điện thoại không đúng định dạng"
          regex="(84|0[3|5|7|8|9])+([0-9]{8})\b"
          handleChange={handleChange}
        />
        <InputField
          type="password"
          label="Mật khẩu"
          name="password"
          value={user.password}
          errorMsg="Mật khẩu không đúng định dạng"
          regex="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$"
          handleChange={handleChange}
        />
        <InputField
          type="password"
          label="Xác nhận mật khẩu"
          name="confirmPassword"
          value={confirmPassword}
          errorMsg="Mật khẩu không khớp"
          regex={user.password}
          handleChange={handleChangeConfirmPassword}
        /> */}

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
