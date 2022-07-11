import React from "react";
import { SubHeaderContainer } from "./sub-header.styles";

const SubHeader = ({ title, subtitle, background }) => {
  return (
    <SubHeaderContainer style={{ backgroundImage: `url("${background}")` }}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </SubHeaderContainer>
  );
};

export default SubHeader;
