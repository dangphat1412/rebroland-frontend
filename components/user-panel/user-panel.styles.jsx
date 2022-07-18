import styled from "styled-components";

export const UserPanelContainer = styled.div`
  .header {
    font-family: "Tahoma", san-serif !important;
  }
  img {
    width: 200px !important;
    height: 200px !important;
    margin-bottom: 20px;
  }
  .title-content {
    background: #ff9219 !important;
    .header {
      color: #fff !important;
    }
  }
  .list {
    & .header {
      display: flex !important;
    }
  }

  .kikor {
    margin-right: 10px;
    font-size: 18px;
  }
`;
