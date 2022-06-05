import React from "react";
import { Modal, TransitionablePortal } from "semantic-ui-react";
import ForgotPassword from "../forgot-password/forgot-password.component";
import Login from "../login/login.component";
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
}) => {
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

  const handleCloseAllModals = () => {
    setLoginOpen(false);
    setRegisterOpen(false);
    setForgotPasswordOpen(false);
    setOtpResetPasswordOpen(false);
    setResetPasswordOpen(false);
  };

  return (
    <ModalContainer>
      <TransitionablePortal
        open={loginOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={loginOpen}
          onClose={() => {
            setLoginOpen(false);
          }}
          closeIcon
        >
          <Modal.Header style={{ fontFamily: "Tahoma" }}>
            Đăng nhập
          </Modal.Header>
          <Modal.Content>
            <Login handleOpenForgotPassword={handleOpenForgotPassword} />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Chưa có tài khoản?{" "}
              <span onClick={handleOpenRegister}>Đăng ký</span> tại đây
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>

      <TransitionablePortal
        open={registerOpen}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal
          centered={false}
          size="mini"
          open={registerOpen}
          onClose={() => {
            setRegisterOpen(false);
          }}
          closeIcon
        >
          <Modal.Header>Đăng ký tài khoản</Modal.Header>
          <Modal.Content>
            <Register />
          </Modal.Content>
          <Modal.Actions>
            <ModalFooter>
              Đã có tài khoản? <span onClick={handleOpenLogin}>Đăng nhập</span>{" "}
              tại đây
            </ModalFooter>
          </Modal.Actions>
        </Modal>
      </TransitionablePortal>

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
    </ModalContainer>
  );
};

export default LoginRegisterModal;
