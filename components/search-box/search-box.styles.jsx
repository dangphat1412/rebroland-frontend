import { Container } from "semantic-ui-react";
import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  margin-top: -80px;
  padding: 30px;
  border-radius: 8px;
  z-index: 1;
  background: #fcfcfc;
  background: linear-gradient(#fff, #fcfcfc);
  box-shadow: 0 7px 10px 2px rgb(0 0 0 / 6%);

  .options {
    margin-top: 10px !important;
    margin-bottom: 0px !important;
  }
`;
