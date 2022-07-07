import styled from "styled-components";

export const MyPropertiesPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .item {
    padding: 15px !important;
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
  }
  .ui.medium.image {
    height: 215px !important;
    width: 300x !important;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .list {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
  }
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
