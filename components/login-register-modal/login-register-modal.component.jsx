import React from "react";
import { Modal, TransitionablePortal } from "semantic-ui-react";
import Login from "../login/login.component";
import Register from "../register/register.component";
import { ModalFooter } from "./login-register-modal.styles";

const LoginRegisterModal = ({
  loginOpen,
  setLoginOpen,
  registerOpen,
  setRegisterOpen,
}) => {
  const handleOpenRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleOpenLogin = () => {
    setRegisterOpen(false);
    setLoginOpen(true);
  };

  return (
    <>
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
          <Modal.Header>Đăng nhập</Modal.Header>
          <Modal.Content>
            <Login
              setLoginOpen={setLoginOpen}
              setRegisterOpen={setRegisterOpen}
            />
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
    </>
  );
};

export default LoginRegisterModal;
