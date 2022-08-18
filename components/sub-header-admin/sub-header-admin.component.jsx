import React from "react";
import { SubHeaderAdminContainer } from "./sub-header-admin.styles";

const SubHeaderAdmin = ({ title, subtitle }) => {
  return (
    <SubHeaderAdminContainer>
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
    </SubHeaderAdminContainer>
  );
};

export default SubHeaderAdmin;
