import styled from "styled-components";

export const UserDetailPageContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  .user-detail {
    position: relative;
    & .filter {
      position: absolute;
      right: 10px;
    }
  }

  .social-media-list {
    display: flex !important;
    & img {
      margin-right: 5px;
      cursor: pointer;
    }
  }

  .header,
  .item {
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
  .real-estate-item {
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
    .image {
      height: 220px !important;
      width: 330px !important;
      img {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
      }
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
