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

  pre {
    font-family: "Tahoma", san-serif !important;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .list-property {
    position: relative;
    & .filter {
      position: absolute;
      right: 0px;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
