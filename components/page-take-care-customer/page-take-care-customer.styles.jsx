import { Segment } from "semantic-ui-react";
import styled from "styled-components";

export const TakeCareCustomerContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;

  pre {
    font-family: "Tahoma", san-serif !important;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-top: 0px;
    width: 95%;
  }

  .item,
  .header,
  .button {
    font-family: "Tahoma", san-serif !important;
  }
  .button,
  .btn {
    color: #fff;
    background: #ff9219;
  }
  .user-avatar-small {
    height: 30px !important;
    width: 30px !important;
    object-fit: cover;
  }
  .user-avatar {
    width: 100px !important;
    height: 80px !important;
    object-fit: cover;
  }
  .ui.form {
    margin-top: -4px;
  }
  .ui.celled.selectable.sortable.table {
    margin-top: 0px;
    margin-bottom: 10px;
    padding: 0px;
  }
`;

export const ListPostContainer = styled(Segment)`
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
    -webkit-line-clamp: 2;
    margin-top: 0px !important;
  }
  .ui.small.image {
    height: 110px !important;
    width: 200px !important;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .ui.tiny.image.user-avatar {
    height: 90px !important;
    width: 90px !important;
  }
`;
