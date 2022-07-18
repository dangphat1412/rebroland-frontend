import React, { useEffect, useState } from "react";
import { Form, Grid, Message } from "semantic-ui-react";
import { loginUser } from "../../actions/auth";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";
import { useForm } from "react-hook-form";
import { LoginContainer } from "./login.styles";

const Login = ({
  handleOpenForgotPassword,
  setLoginOpen,
  setLoading,
  setFollowingPosts,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    register("phone", { required: "Số điện thoại không được để trống" });
    register("password", { required: "Mật khẩu không được để trống" });
  }, []);

  const onSubmit = async (user) => {
    await loginUser(
      user,
      setErrorMessage,
      setLoginOpen,
      setLoading,
      setFollowingPosts
    );
  };

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
        <Message
          error
          list={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <InputField
          label="Số điện thoại"
          name="phone"
          placeholder="Nhập số điện thoại"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          error={errors.phone}
          requiredField
        />

        <InputField
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Nhập mật khẩu"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          icon={{
            name: "eye",
            circular: true,
            link: true,
            onClick: () => setShowPassword(!showPassword),
          }}
          error={errors.password}
          requiredField
        />

        <Grid>
          <Grid.Column width={8}>
            <Form.Checkbox label="Duy trì đăng nhập" />
          </Grid.Column>
          <Grid.Column textAlign="right" width={8} className="forgot-password">
            <span onClick={handleOpenForgotPassword}>Quên mật khẩu</span>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column textAlign="center">
            <CustomButton type="submit">Đăng nhập</CustomButton>
          </Grid.Column>
        </Grid>
      </Form>
    </LoginContainer>
  );
};

export default Login;
