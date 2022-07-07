import React, { useState } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { getFollowingPostsByUser } from "../../actions/post";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import PaginationItem from "../pagination-item/pagination-item.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyFollowingPropertiesContainer,
  PaginationContainer,
} from "./page-my-following-properties.styles";

const MyFollowingPropertiesPage = ({
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  const [data, setData] = useState(postsData || {});

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(activePage);
  };

  const fetchAPI = async (page) => {
    const postData = await getFollowingPostsByUser(page);
    setData(postData);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <MyFollowingPropertiesContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel />
          </Grid.Column>
          <Grid.Column width={13}>
            {data.posts &&
              data.posts.map((post, index) => (
                <RealEstateItem
                  post={post}
                  key={index}
                  followingPosts={followingPosts}
                  setFollowingPosts={setFollowingPosts}
                />
              ))}
            <PaginationContainer>
              <PaginationItem
                activePage={data.pageNo}
                boundaryRange={1}
                siblingRange={1}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true,
                }}
                totalPages={data.totalPages}
                onPageChange={handlePaginationChange}
              />
            </PaginationContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyFollowingPropertiesContainer>
  );
};

export default MyFollowingPropertiesPage;
