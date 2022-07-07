import { Card } from "semantic-ui-react";
import styled from "styled-components";
import SelectDatePicker from "@netojose/react-select-datepicker";

export const MyProfilePageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
`;

export const ProfileContainer = styled(Card)`
  .header {
    font-family: "Tahoma", san-serif !important;
  }
`;

export const DatePickerContainer = styled(SelectDatePicker)`
  div {
    display: flex;
    justify-content: space-between;
    width: 40%;
    label {
      width: 32%;
      span {
        display: none;
      }
      select {
        height: 38px !important;
        border-radius: 4px !important;
      }
    }
  }
`;
