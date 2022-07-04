import React, { useState } from "react";
import { Modal, TransitionablePortal } from "semantic-ui-react";
import ForgotPassword from "../forgot-password/forgot-password.component";
import Login from "../login/login.component";
import ModalItem from "../modal-item/modal-item.component";
import OtpRegister from "../otp-register/otp-register.component";
import OtpResetPassword from "../otp-reset-password/otp-reset-password.component";
import Register from "../register/register.component";
import ResetPassword from "../reset-password/reset-password.component";
import { ModalContainer, ModalFooter } from "./login-register-modal.styles";

const LoginRegisterModal = ({
  loginOpen,
  setLoginOpen,
  registerOpen,
  setRegisterOpen,
  forgotPasswordOpen,
  setForgotPasswordOpen,
  otpResetPasswordOpen,
  setOtpResetPasswordOpen,
  resetPasswordOpen,
  setResetPasswordOpen,
  otpRegisterOpen,
  setOtpRegisterOpen,
  setLoading,
}) => {
  const [userRegister, setUserRegister] = useState();

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

  const handleOpenOtpResetPassword = () => {
    handleCloseAllModals();
    setOtpResetPasswordOpen(true);
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
    setOtpResetPasswordOpen(false);
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
          setUserRegister={setUserRegister}
        />
      </ModalItem>

      <TransitionablePortal
        open={forgotPasswordOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={forgotPasswordOpen}
          onClose={() => {
            setForgotPasswordOpen(false);
          }}
          closeIcon
        >
          <Modal.Header>Khôi phục mật khẩu</Modal.Header>
          <Modal.Content>
            <ForgotPassword
              handleOpenOtpResetPassword={handleOpenOtpResetPassword}
            />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Quay lại trang <span onClick={handleOpenLogin}>Đăng nhập</span>
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>

      <TransitionablePortal
        open={otpResetPasswordOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={otpResetPasswordOpen}
          onClose={() => {
            setOtpResetPasswordOpen(false);
          }}
          closeIcon
        >
          <Modal.Header>Khôi phục mật khẩu</Modal.Header>
          <Modal.Content>
            <OtpResetPassword
              handleOpenResetPassword={handleOpenResetPassword}
            />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Quay lại trang <span onClick={handleOpenLogin}>Đăng nhập</span>
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>

      <TransitionablePortal
        open={resetPasswordOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={resetPasswordOpen}
          onClose={() => {
            setResetPasswordOpen(false);
          }}
          closeIcon
        >
          <Modal.Header>Khôi phục mật khẩu</Modal.Header>
          <Modal.Content>
            <ResetPassword />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Quay lại trang <span onClick={handleOpenLogin}>Đăng nhập</span>
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>

      <TransitionablePortal
        open={otpRegisterOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={otpRegisterOpen}
          onClose={() => {
            setOtpRegisterOpen(false);
          }}
          closeIcon
        >
          <Modal.Header>Xác nhận mã OTP</Modal.Header>
          <Modal.Content>
            <OtpRegister
              userRegister={userRegister}
              setOtpRegisterOpen={setOtpRegisterOpen}
            />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Quay lại trang <span onClick={handleOpenRegister}>Đăng ký</span>
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>
    </ModalContainer>
  );
};

export default LoginRegisterModal;
