import styled from "styled-components";

export const AdminContainer = styled.div`
  .header {
    font-family: "Tahoma", sans-serif !important;
  }
  .admin-menu {
    height: 100vh !important;
    & .item {
      font-family: "Tahoma", san-serif !important;
      text-align: left !important;
      font-size: 16px;
      display: flex !important;
      flex-direction: row !important;
      & span {
        padding-right: 10px;
      }
    }
  }
`;
