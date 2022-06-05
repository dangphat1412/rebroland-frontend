import React from "react";
import FormPropertyDetail from "../components/form-property-detail/form-property-detail.component";
import Navigation from "../components/navigation/navigation.component";
import SubHeader from "../components/sub-header/sub-header.component";

const PropertyDetail = () => {
  return (
    <div>
      <Navigation />
      <SubHeader title="Thông tin chi tiết" />
      <FormPropertyDetail />
    </div>
  );
};

export default PropertyDetail;
