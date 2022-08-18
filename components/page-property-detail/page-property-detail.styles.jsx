import { Icon, List, Segment, Statistic } from "semantic-ui-react";
import styled from "styled-components";

export const FormPropertyDetailContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
  position: relative;

  pre {
    font-family: "Tahoma", san-serif !important;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .button,
  .header {
    font-family: "Tahoma", san-serif !important;
  }
  .property {
    .column {
      margin-bottom: 20px !important;
    }
    & .property-content {
      font-size: 16px !important;
      display: flex !important;
      justify-content: space-between !important;
      & .kikor {
        margin-right: 7px;
      }
      & .property-header {
        font-weight: bold !important;
        display: flex !important;
      }
      & .property-description {
        padding-right: 160px;
      }
    }
  }
  .button {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .ui.horizontal.list:not(.celled) > .item:first-child {
    padding-left: 10px !important;
  }
  .btn-view-derivative {
    margin-top: 0px !important;
  }

  .image-gallery-slide-wrapper.bottom {
    height: 500px;
  }
  .image-gallery-slides,
  .image-gallery-swipe,
  .image-gallery-slide {
    height: 500px;
    background: rgba(0, 0, 0, 0.2);
  }
  .image-gallery-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
  }
`;

export const ShotInformationContainer = styled(Statistic.Group)`
  width: fit-content;
  .ui.statistic {
    margin-right: 30px !important;
    margin-left: 30px !important;
  }
  .label,
  .value {
    font-family: "Tahoma", sans-serif !important;
    text-transform: none !important;
  }
  .label {
    color: #999 !important;
  }
  .value {
    min-height: 0 !important;
  }
`;

export const ActionContainer = styled(List)`
  .item {
    padding: 10px !important;
  }
  a {
    display: flex;
    align-items: center;
    color: black;
    img {
      width: 24px !important;
      height: 24px !important;
      margin-right: 10px;
    }
  }
`;

export const UserInformationContainer = styled(Segment)`
  .prefix-user {
    color: #999;
    margin: 5px 0px;
  }
  a {
    font-weight: bold !important;
  }
`;

export const ContactInformationContainer = styled(Segment)`
  .information {
    font-size: 17px;
  }
`;

export const PreviewContainer = styled.div`
  height: 150px;
  display: flex;
  flex-wrap: nowrap !important;
  overflow-x: scroll;
`;

export const ImageContainer = styled.div`
  position: relative;
  flex: 0 0 auto !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  & img {
    width: 140px !important;
    height: 140px !important;
    padding: 9px;
    border-radius: 15px;
  }
`;

export const RemoveIcon = styled(Icon)`
  color: white !important;
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
`;
