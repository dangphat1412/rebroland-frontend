import React from "react";
import RealEstatePage from "../components/page-real-estate/page-real-estate.component";
import SubHeader from "../components/sub-header/sub-header.component";

const RealEstate = () => {
  return (
    <div>
      <SubHeader title="Bất động sản" />
      <RealEstatePage />
    </div>
  );
};

export default RealEstate;
