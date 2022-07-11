import styled from "styled-components";

export const DetailBrokerContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .header,
  .button,
  .item {
    font-family: "Tahoma", san-serif !important;
  }

  .button {
    background-color: #ff9219;
    color: white;
  }
  .social-media-list {
    display: flex !important;
    & img {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`;
