import styled from "styled-components";
import { Label } from "semantic-ui-react";
import SelectDatePicker from "@netojose/react-select-datepicker"

export const DatePicker = styled(SelectDatePicker)`
  div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    label {
      width: 120px;
      span {
        display: none;
      }
      select {
        height: 46px !important;
        border-radius: 6px !important;
      }
    }
  }
`;

export const FormContainer = styled.div`
  position: relative;
`;

export const ErrorMessage = styled(Label)`
    position: absolute !important;
    left: 340px;
    top: 28px;
    width: fit-content;
    z-index: 1;
`;