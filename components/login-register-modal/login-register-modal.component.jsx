import React, { useState } from "react";
import ForgotPassword from "../forgot-password/forgot-password.component";
import Login from "../login/login.component";
import ModalItem from "../modal-item/modal-item.component";
import OtpRegister from "../otp-register/otp-register.component";
import Register from "../register/register.component";
import { ModalContainer } from "./login-register-modal.styles";
import OtpForgotPassword from "../otp-forgot-password/otp-forgot-password.component";

const LoginRegisterModal = ({
  loginOpen,
  setLoginOpen,
  registerOpen,
  setRegisterOpen,
  forgotPasswordOpen,
  setForgotPasswordOpen,
  otpForgotPasswordOpen,
  setOtpForgotPasswordOpen,
  setResetPasswordOpen,
  otpRegisterOpen,
  setOtpRegisterOpen,
  setLoading,
  followingPosts,
  setFollowingPosts,
}) => {
  const [registerData, setRegisterData] = useState();
  const [forgotPasswordData, setForgotPasswordData] = useState();

  const handleOpenRegister = () => {
    handleCloseAllModals();
    setRegisterOpen(true);
  };

  const handleOpenLogin = () => {
    handleCloseAllModals();
    setLoginOpen(true);
  };

  const handleOpenForgotPassword = () => {
    handleCloseAllModals();
    setForgotPasswordOpen(true);
  };

  const handleOpenOtpForgotPassword = () => {
    handleCloseAllModals();
    setOtpForgotPasswordOpen(true);
  };

  const handleOpenResetPassword = () => {
    handleCloseAllModals();
    setResetPasswordOpen(true);
  };

  const handleOpenOtpRegister = () => {
    handleCloseAllModals();
    setOtpRegisterOpen(true);
  };

  const handleCloseAllModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setForgotPasswordOpen(false);
    setOtpForgotPasswordOpen(false);
    setResetPasswordOpen(false);
    setOtpRegisterOpen(false);
  };

  return (
    <ModalContainer>
      {/* Login */}
      <ModalItem
        header="Đăng nhập"
        footer={
          <>
            Chưa có tài khoản? <span onClick={handleOpenRegister}>Đăng ký</span>{" "}
            tại đây
          </>
        }
        onOpen={loginOpen}
        onClose={() => {
          setLoginOpen(false);
        }}
      >
        <Login
          handleOpenForgotPassword={handleOpenForgotPassword}
          setLoginOpen={setLoginOpen}
          setLoading={setLoading}
          setFollowingPosts={setFollowingPosts}
        />
      </ModalItem>

      {/* Register */}
      <ModalItem
        header="Đăng ký tài khoản"
        onOpen={registerOpen}
        onClose={() => {
          setRegisterOpen(false);
        }}
        footer={
          <>
            Đã có tài khoản? <span onClick={handleOpenLogin}>Đăng nhập</span>{" "}
            tại đây
          </>
        }
      >
        <Register
          handleOpenOtpRegister={handleOpenOtpRegister}
          setRegisterData={setRegisterData}
        />
      </ModalItem>

      {/* Forgot password */}
      <ModalItem
        header="Quên mật khẩu"
        onOpen={forgotPasswordOpen}
        onClose={() => {
          setForgotPasswordOpen(false);
        }}
        footer={
          <>
            Quay lại trang <span onClick={handleOpenLogin}>Đăng nhập</span>
          </>
        }
      >
        <ForgotPassword
          setForgotPasswordData={setForgotPasswordData}
          handleOpenOtpForgotPassword={handleOpenOtpForgotPassword}
        />
      </ModalItem>

      {/* OTP forgot password */}
      <ModalItem
        header="Nhập mã khôi phục mật khẩu"
        onOpen={otpForgotPasswordOpen}
        onClose={() => {
          setOtpForgotPasswordOpen(false);
        }}
        footer={
          <>
            Quay lại trang <span onClick={handleOpenLogin}>Đăng nhập</span>
          </>
        }
      >
        <OtpForgotPassword
          setOtpForgotPasswordOpen={setOtpForgotPasswordOpen}
          forgotPasswordData={forgotPasswordData}
          handleOpenLogin={handleOpenLogin}
        />
      </ModalItem>

      {/* OTP Register */}
      <ModalItem
        header="Xác nhận mã OTP"
        footer={
          <>
            Quay lại trang <span onClick={handleOpenRegister}>Đăng ký</span>
          </>
        }
        onOpen={otpRegisterOpen}
        onClose={() => {
          setOtpRegisterOpen(false);
        }}
      >
        <OtpRegister
          registerData={registerData}
          setOtpRegisterOpen={setOtpRegisterOpen}
        />
      </ModalItem>
    </ModalContainer>
  );
};

export default LoginRegisterModal;
