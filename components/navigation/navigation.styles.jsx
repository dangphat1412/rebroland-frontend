import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const NavigationContainer = styled(Container)`
  position: fixed;
  width: 100%;
  height: 140px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  background-color: rgba(28, 28, 28, 0.3);
  z-index: 1;
  transition: all .5s cubic-bezier(.165, .84, .44, 1);
  &.active {
    height: 80px;
    background-color: rgba(28, 28, 28 ,0.9);
    transition: all .5s cubic-bezier(.165, .84, .44, 1);
  }
`;

