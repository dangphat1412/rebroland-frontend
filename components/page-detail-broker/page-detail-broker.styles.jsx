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
    margin-bottom: 50px !important;
    & .filter {
      position: absolute;
      right: 0px;
    }
  }
  .broker-avatar {
    height: 168.5px !important;
    width: 168.5px !important;
    img {
      height: 100% !important;
      width: 100% !important;
      object-fit: cover;
    }
  }

  .vote {
    padding-left: 10px;
    &:hover {
      font-weight: bold;
    }
  }

  .rater-avatar {
    height: 30px !important;
    width: 30px !important;
    img {
      border-radius: 50% !important;
      object-fit: cover;
    }
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 10px !important;
  display: flex !important;
  justify-content: center;
`;
