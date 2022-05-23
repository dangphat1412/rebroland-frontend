import { Container } from "semantic-ui-react";
import styled from "styled-components";

export const NavContainer = styled(Container)`
  position: fixed;
  width: 100%;
  height: 80px;
  margin: 80px auto;
  padding 0 10px;
  top: 0px;
  background: rgba(255, 255, 255, 0);
  border-bottom: 1px groove rgba(255, 255, 255, 0);
  box-shadow: 5px 5px 2px rgba(23, 36, 52, 0);
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

export const Menu = styled.div`
  margin-left: 95px;
  margin-right: 95px;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;

  & a {
    color: white !important;

    &:hover {
      color: #fc9f1c!important;
    }
  }
`;
