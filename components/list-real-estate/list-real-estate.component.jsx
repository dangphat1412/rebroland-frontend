import React from "react";
import RealEstateItem from "../item-real-estate/item-real-estate.component";

const ListRealEstate = ({ posts }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <>
            <RealEstateItem post={post} />
          </>
        ))}
    </>
  );
};

export default ListRealEstate;
