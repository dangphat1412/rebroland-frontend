import styled from "styled-components";

export const MyFollowingPropertiesContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .header,
  .button,
  .item {
    font-family: "Tahoma", san-serif !important;
  }

  .item {
    padding: 15px !important;
  }
  .my-following-property {
    position: relative;
    & .filter {
      position: absolute;
      right: 10px;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
