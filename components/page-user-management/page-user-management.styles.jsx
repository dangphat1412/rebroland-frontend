import { Modal } from "semantic-ui-react";
import styled from "styled-components";

export const UserManagementPageContainer = styled.div`
  .header, .button {
    font-family: "Tahoma", san-serif !important;
  }
  .user-information {
    label {
        display: inline-block;
        width: 140px;
        text-align: left;
        font-weight: bold;
      }​
  }
  .user-avatar-small {
    width: 30px !important;
    height: 30px !important;
    object-fit: cover;
    margin-right: 20px;
  }
  .user-avatar-big {
    width: 150px !important;
    height: 150px !important;
    object-fit: cover;
    margin-right: 20px;
  }
  
`;

export const PostModalContainer = styled(Modal)`
  height: 900px;

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
    height: 140px !important;
    width: 200px !important;
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
