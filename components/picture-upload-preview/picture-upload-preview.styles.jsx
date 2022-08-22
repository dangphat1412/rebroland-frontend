import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const PictureUploadPreviewContainer = styled.div`
  .upload-placeholder {
    cursor: pointer;
  }
`;

export const PreviewContainer = styled.div`
  height: 250px;
  display: flex;
  flex-wrap: nowrap !important;
  overflow-x: scroll;
`;

export const ImageContainer = styled.div`
  position: relative;
  flex: 0 0 auto !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  width: 240px !important;
  height: 240px !important;
  & .ui.medium.image {
    width: 240px !important;
    height: 240px !important;
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
