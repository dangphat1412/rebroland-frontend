import styled from "styled-components";

export const ModalViewPostContainer = styled.div`
  .header,
  .description,
  .label,
  .text {
    font-family: "Tahoma", sans-serif !important;
  }
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
