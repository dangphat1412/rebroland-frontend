import { Item } from "semantic-ui-react";
import styled from "styled-components";

export const ItemContainer = styled(Item.Group)`
  .header,
  .description {
    width: 100%;
    font-family: "Tahoma", sans-serif !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    -webkit-line-clamp: 2;
  }
  .description {
    -webkit-line-clamp: 3;
  }
`;
