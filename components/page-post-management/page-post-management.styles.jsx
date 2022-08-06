import { Modal } from "semantic-ui-react";
import styled from "styled-components";

export const PostManagementPageContainer = styled.div`
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
    -webkit-line-clamp: 1;
    margin-top: 1px !important;
  }
  .description {
    -webkit-line-clamp: 2;
    margin-top: 0px !important;
  }
  .ui.medium.image {
    height: 120px !important;
    width: 200px !important;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
`;

export const DetailPostContainer = styled(Modal)`
  height: 900px;
  over-flow: auto;
`;

export const PaginationContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;
