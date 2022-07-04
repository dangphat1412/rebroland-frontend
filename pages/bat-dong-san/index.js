import React from "react";
import SubHeader from "../../components/sub-header/sub-header.component";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import { getPosts } from "../../actions/post";

const RealEstate = ({ data }) => {
  console.log("data: ", data);
  return (
    <div>
      <SubHeader title="Bất động sản" />
      <RealEstatePage />
    </div>
  );
};

RealEstate.getInitialProps = async (ctx) => {
  const data = await getPosts();
  return {
    props: { data },
  };
};

export default RealEstate;
