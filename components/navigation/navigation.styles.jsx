import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const NavigationContainer = styled(Container)`
  position: fixed;
  width: 100%;
  height: 140px;
  color: #fff;
  font-family: "Tahoma", sans-serif !important;
  font-weight: bold !important;
  background-color: rgba(28, 28, 28, 0.3);
  z-index: 999;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.active {
    height: 80px;
    background-color: rgba(28, 28, 28, 0.9);
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
`;
