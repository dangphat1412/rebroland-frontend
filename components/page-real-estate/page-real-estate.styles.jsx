import { Form } from "semantic-ui-react";
import styled from "styled-components";

export const RealEstatePageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .item {
    padding: 10px !important;
  }
`;

export const FormSearchContainer = styled(Form)`
  h1 {
    font-family: "Tahoma", sans-serif !important;
  }
  label {
    color: white !important;
  }
  button {
    font-family: "Tahoma", sans-serif !important;
    background: #ff9219 !important;
    color: white !important;
  }
`;
