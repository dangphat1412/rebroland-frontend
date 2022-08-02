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
  }
  .error-field {
    color: red;
    font-weight: bold;
    font-size: 13px;
  }
`;
