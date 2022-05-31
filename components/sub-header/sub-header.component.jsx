import React from "react";
import { SubHeaderContainer } from "./sub-header.styles";

const SubHeader = ({ title }) => {
  return (
    <SubHeaderContainer>
      <h1>{title}</h1>
    </SubHeaderContainer>
  );
};

export default SubHeader;
