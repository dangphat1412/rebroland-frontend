import { Card } from "semantic-ui-react";
import styled from "styled-components";

export const CashOutPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
  .header {
    font-family: "Tahoma", san-serif !important;
  }
  .ui.page.modals.dimmer.transition.visible.active {
    & .ui.small.modal.transition.visible.active {
      & .actions {
        & .ui.button {
          display: none !important;
          font-family: "Tahoma", san-serif !important;
          background: red !important;
        }
      }
    }
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
