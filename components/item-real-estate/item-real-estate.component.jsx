import React, { useEffect, useState } from "react";
import { Button, Icon, Item, List } from "semantic-ui-react";
import Link from "next/link";
import { RealEstateItemContainer } from "./item-real-estate.styles";
import convertToSlug from "../../utils/convertToSlug";
import { followPost } from "../../actions/post";

const RealEstateItem = ({ post, followingPosts, setFollowingPosts }) => {
  const handleSaveProperty = (e, postId) => {
    e.stopPropagation();
    followPost(postId) &&
    followingPosts.filter(
      (followingPost) => followingPost.postId === post.postId
    ).length > 0
      ? setFollowingPosts(
          followingPosts.filter(
            (followingPost) => followingPost.postId !== post.postId
          )
        )
      : setFollowingPosts([...followingPosts, post]);
  };

  return (
    <Link href={`/bat-dong-san/${convertToSlug(post.title)}-${post.postId}`}>
      <RealEstateItemContainer fluid>
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={post.images[0].image} />
            <Item.Content className="item-content">
              <Item.Header>{post.title}</Item.Header>
              <Item.Description>
                <List horizontal size="large">
                  <List.Item>
                    <List.Content>
                      <List.Header>11 tỷ</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>260 triệu/m²</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>70m²</List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>Thanh Xuân, Hà Nội</List.Content>
                  </List.Item>
                </List>
              </Item.Description>
              <Item.Description>{post.description}</Item.Description>
              <Item.Extra>
                <span>{post.startDate}</span>
                <Button
                  floated="right"
                  icon
                  basic
                  onClick={(e) => {
                    handleSaveProperty(e, post.postId);
                  }}
                >
                  <Icon
                    name="heart"
                    color={
                      followingPosts.filter(
                        (followingPost) => followingPost.postId === post.postId
                      ).length > 0
                        ? "red"
                        : "null"
                    }
                  />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </RealEstateItemContainer>
    </Link>
  );
};

export default RealEstateItem;
