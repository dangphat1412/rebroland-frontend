import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, Grid, Header } from "semantic-ui-react";
import PropertyRecommendItem from "../property-recommend-item/property-recommend-item.component";
import { ListPropertiesRecommendContainer } from "./list-properties-recommend.styles";
import { getOutStandingPost } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const ListPropertiesRecommend = ({
  user,
  followingPosts,
  setFollowingPosts,
  outstandingData,
}) => {
  const [outstandingList, setOutstandingList] = useState(outstandingData || []);

  return (
    <ListPropertiesRecommendContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
      <Header as="h1">Bất động sản dành cho bạn</Header>
      <span className="divider-left"></span>
      <Card.Group itemsPerRow={5}>
        {outstandingList.length > 0 &&
          outstandingList.map((post, index) => (
            <RealEstateItem
              type="card"
              post={post}
              key={index}
              user={user}
              followingPosts={followingPosts}
              setFollowingPosts={setFollowingPosts}
              toast={toast}
            />
          ))}
      </Card.Group>
    </ListPropertiesRecommendContainer>
  );
};

export default ListPropertiesRecommend;
