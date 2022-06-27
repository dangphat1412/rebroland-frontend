import React from "react";
import { Icon, Pagination } from "semantic-ui-react";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import { PaginationContainer } from "./list-real-estate.styles";

const ListRealEstate = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <>
          <RealEstateItem post={post} />
        </>
      ))}
      <Pagination
        defaultActivePage={5}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true,
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={10}
      />
    </div>
  );
};

export default ListRealEstate;
