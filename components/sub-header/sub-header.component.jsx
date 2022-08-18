import { useRouter } from "next/router";
import React from "react";
import { SubHeaderContainer } from "./sub-header.styles";

const SubHeader = ({ title, subtitle, background }) => {
  const router = useRouter();
  console.log(router);
  return (
    <SubHeaderContainer style={{ backgroundImage: `url("${background}")` }}>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </SubHeaderContainer>
  );
};

export default SubHeader;
