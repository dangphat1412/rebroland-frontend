import { Container, Image } from "semantic-ui-react";
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
  &.sticky {
    left: 0;
    right: 0;
    margin: 20px auto;
    width: inherit;
    box-sizing: border-box;
    transition: all .3s cubic-bezier(.165, .84, .44, 1);
  }

  .btn-radio {
    padding-left: 16px !important;
  }
`;

export const Menu = styled.div`
  margin-left: 95px;
  margin-right: 95px;
  letter-spacing: 1px;

  & a {
    font-size: 16px !important;
    color: white !important;

    &:hover {
      color: #fc9f1c !important;
    }
  }

  .drop-down {
    padding-top: 4px;
    padding-bottom: 4px;
    z-index: 900;
  }

  // .item {
  //   font-family: "Tahoma", san-serif !important;
  //   font-weight: bold !important;
  // }
`;

export const LogoContainer = styled(Image)`
  cursor: pointer;
`;
