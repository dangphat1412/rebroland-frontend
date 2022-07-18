import { List, Segment, Statistic } from "semantic-ui-react";
import styled from "styled-components";

export const FormPropertyDetailContainer = styled.div`
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
