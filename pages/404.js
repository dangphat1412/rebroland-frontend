import React from "react";
import FourOhFourPage from "../components/page-404/page-404.component";
import SubHeader from "../components/sub-header/sub-header.component";

const FourOhFour = () => {
  return (
    <div>
      <SubHeader title="Không tìm thấy trang" background="/zyro-image.png" />
      <FourOhFourPage />
    </div>
  );
};

export default FourOhFour;
