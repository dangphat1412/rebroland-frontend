import { Card } from "semantic-ui-react";
import styled from "styled-components";

export const TransferPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
`;

export const TransferContainer = styled(Card)`
  .header,
  .button {
    font-family: "Tahoma", san-serif !important;
  }
  .button {
    color: #fff;
    background: #ff9219;
  }
`;
