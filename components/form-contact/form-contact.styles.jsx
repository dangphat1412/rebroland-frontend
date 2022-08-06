import { Form } from "semantic-ui-react";
import styled from "styled-components";

export const FormContactBrokerContainer = styled(Form)`
  .header {
    font-family: "Tahoma", sans-serif !important;
  }
  .alert-login-require {
    margin-top: 10px;
    color: red;
    font-weight: bold;
  }
  .disabled.field {
    opacity: 1 !important;
  }
  button {
    font-family: "Tahoma", sans-serif !important;
    background: #ff9219 !important;
    color: white !important;
  }
`;
