import styled from "styled-components";

export const MyDerivativePropertyContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .header,
  .button,
  .item {
    font-family: "Tahoma", san-serif !important;
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

  .my-derivative-property {
    position: relative;
    & .filter {
      position: absolute;
      right: 10px;
    }
  }
  
  .list {
    margin: 10px 0px;
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
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
