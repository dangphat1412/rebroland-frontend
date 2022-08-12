import { Card } from "semantic-ui-react";
import styled from "styled-components";

export const CashOutPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
  .header {
    font-family: "Tahoma", san-serif !important;
  }
`;

export const CashOutContainer = styled(Card)`
  .header,
  .button {
    font-family: "Tahoma", san-serif !important;
  }
  .button {
    color: #fff;
    background: #ff9219;
  }
`;
