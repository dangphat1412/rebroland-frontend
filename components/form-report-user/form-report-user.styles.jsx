import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const FormReportContainer = styled.div`
  button {
    margin-top: 5px !important;
    font-family: "Tahoma", san-serif !important;
  }
  .ui.large.form {
    div {
      display: flex !important;
      input {
        margin-right: 5px;
      }
    }
    label[for="otherContent"] {
      font-weight: bold;
    }
    label[for="media"] {
      font-weight: bold;
    }
  }
  .error-field {
    color: red;
    font-weight: bold;
    font-size: 13px;
  }
  textarea {
    margin-bottom: 20px !important;
  }
  .alert-login-require {
    margin-top: 10px;
    color: red;
    font-weight: bold;
  }
`;

export const PreviewContainer = styled.div`
  height: 150px;
  display: flex;
  flex-wrap: nowrap !important;
  overflow-x: scroll;
`;

export const ImageContainer = styled.div`
  position: relative;
  flex: 0 0 auto !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  & img {
    width: 140px !important;
    height: 140px !important;
    padding: 9px;
    border-radius: 15px;
  }
`;

export const RemoveIcon = styled(Icon)`
  color: white !important;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
`;
