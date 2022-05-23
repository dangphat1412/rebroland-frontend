import { Container } from "semantic-ui-react";
import styled from "styled-components";

export const SubnavContainer = styled(Container)`
  width: 100%;
  margin: 0 auto;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: 0.3px;
  color: #fff;
`;

export const Subnav = styled.div`
  margin-left: 95px;
  margin-right: 95px;
  padding: 20px 10px 20px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;

export const SloganContainer = styled.div`
  font-style: italic;
`;

export const InfoContainer = styled.div`
  & a {
    color: white;

    &:first-child {
      border-right: 1px solid white;
      margin-right: 20px;
      padding-right: 20px;
    }
  }
`;
