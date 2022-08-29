import React from "react";
import { Header } from "semantic-ui-react";
import { FourOhFourContainer } from "./page-404.styles";

const FourOhFourPage = () => {
  return (
    <FourOhFourContainer>
      <Header as="h1">404 - Không tìm thấy trang</Header>
    </FourOhFourContainer>
  );
};

export default FourOhFourPage;
