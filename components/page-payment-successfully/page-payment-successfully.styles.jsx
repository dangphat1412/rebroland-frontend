import styled from "styled-components";

export const PaymentSuccessfullyPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .label,
  .value,
  .header,
  .button {
    font-family: "Tahoma", san-serif !important;
  }

  .money-info {
    background: #ff9219;
    padding-top: 30px;
    padding-bottom: 30px;

    .ui.statistic {
      .label {
        text-transform: none;
        font-size: 20px;
      }
      .label,
      .value {
        color: white;
      }
    }
  }
  .btn-return-home {
    color: #fff !important;
    background: #ff9219 !important;
  }
`;
