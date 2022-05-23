import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const HeaderContainer = styled(Container)`
  position: fixed;
  width: 100%;
  height: 140px;
  color: #fff;
  font-family: "Poppins", sans-serif;
  background-color: rgba(28, 28, 28, 0.3);
  z-index: 1;
`;

export const NavContainer = styled.div`
  margin-left: 95px;
  margin-right: 95px;
`;
