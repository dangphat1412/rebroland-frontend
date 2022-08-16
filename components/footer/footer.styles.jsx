import styled from "styled-components";

export const FooterContainer = styled.div`
  margin-top: 100px;

  .header {
    font-family: "Tahoma", san-serif !important;
  }

  h3 {
    text-transform: uppercase !important;
    font-family: "Tahoma", san-serif !important;
    letter-spacing: 0.5px;
    span {
      color: rgb(255 131 79) !important;
    }
  }

  .property-content {
    font-size: 16px !important;
    display: flex !important;
    justify-content: space-between !important;
    margin-bottom: 5px;
    & .kikor {
      width: 20px;
      margin-right: 10px;
    }
    & .property-header {
      font-weight: bold !important;
      display: flex !important;
    }
    & .property-description {
      padding-right: 160px;
    }
  }

  .divider-left {
    display: block;
    border-top: 4px solid #ff9219;
    width: 45px;
    margin: 20px 0 30px 0;
  }
`;
