import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const MilestoneItemContainer = styled.div`
  margin: 60px auto;
  display: flex;
  justify-content: center;
`;

export const IconContainer = styled(Icon)`
  color: #fc9f1c;
  margin-right: 30px !important;
`;

export const ContentContainer = styled.div`
  & h3 {
    text-transform: uppercase;
  }
`;
