import { Card } from "semantic-ui-react";
import styled from "styled-components";

export const RealEstateItemContainer = styled(Card)`
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
      height: 100% !important;
      width: 100% !important;
      object-fit: cover;
    }
  }
  .card-item {
    .image {
      height: 215px !important;
      width: 100% !important;
      img {
        height: 100% !important;
        width: 100% !important;
        object-fit: cover;
      }
    }
  }

  img {
    margin: 0 0 !important;
    height: 100% !important;
    width: 100% !important;
    object-fit: cover;
  }

  .post-image {
    height: 195px;
    img {
      display: block;
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit;
    }
  }
`;
