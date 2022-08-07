import styled from "styled-components";

export const HandleContactBackRequestContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .header {
    font-family: "Tahoma", san-serif !important;
  }
  .header-title {
    background: #ff9219 !important;
    .header {
      color: #fff !important;
    }
  }
  .ui.icon.input {
    width: 500px !important;
  }
  .customer-item {
    padding: 10px;
  }

  .header,
  .description {
    font-family: "Tahoma", sans-serif !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    -webkit-line-clamp: 2;
    margin-top: 1px !important;
  }
  .description {
    -webkit-line-clamp: 3;
    margin-top: 0px !important;
  }
  .ui.medium.image {
    height: 177px !important;
    width: 230px !important;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
