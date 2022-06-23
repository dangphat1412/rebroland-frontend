import React from "react";
import { Modal, TransitionablePortal } from "semantic-ui-react";
import { ModalFooter } from "../login-register-modal/login-register-modal.styles";

const ModalItem = ({ header, footer, onOpen, onClose, children }) => {
  return (
    <TransitionablePortal
      open={onOpen}
      transition={{ animation: "scale", duration: 300 }}
    >
      <Modal
        centered={false}
        size="mini"
        open={onOpen}
        onClose={onClose}
        closeIcon
      >
        <Modal.Header style={{ fontFamily: "Tahoma, san-serif" }}>
          {header}
        </Modal.Header>
        <Modal.Content>{children}</Modal.Content>
        <Modal.Actions>
          <ModalFooter>{footer}</ModalFooter>
        </Modal.Actions>
      </Modal>
    </TransitionablePortal>
  );
};

export default ModalItem;
