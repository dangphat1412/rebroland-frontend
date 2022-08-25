import styled from "styled-components";

export const NotificationsContainer = styled.div`
  margin-top: 20px;
  margin-right: 95px;
  margin-left: 95px;
  .item {
    &:hover {
      background: rgba(0, 0, 0, 0.03) !important;
    }
  }
  .infinite-scroll-component {
    overflow: hidden !important;
  }
`;
