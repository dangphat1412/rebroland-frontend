import React, { useEffect, useState } from "react";
import { Button, Icon, Item, List } from "semantic-ui-react";
import Link from "next/link";
import { RealEstateItemContainer } from "./item-real-estate.styles";
import convertToSlug from "../../utils/convertToSlug";
import { followPost } from "../../actions/post";

const RealEstateItem = ({
  user,
  post,
  followingPosts,
  setFollowingPosts,
  toast,
}) => {
  const handleFollowingPost = async (
    e,
    post,
    followingPosts,
    setFollowingPosts
  ) => {
    e.stopPropagation();
    user
      ? await followPost(post, followingPosts, setFollowingPosts)
      : setTimeout(() => {
          toast({
            type: "error",
            title: "Yêu cầu đăng nhập",
            description: <p>Đăng nhập để quan tâm bài viết</p>,
          });
        }, 1000);
  };

  return (
    <Link
      href={
        !post.postId || post.postId === 0
          ? `/bat-dong-san/${convertToSlug(post.title)}-${post.derivativeId}`
          : `/bat-dong-san/${convertToSlug(post.title)}-${post.postId}.${
              post.derivativeId
            }`
      }
    >
      <RealEstateItemContainer fluid>
        <Item.Group>
          <Item>
            <Item.Image
              size="medium"
              src={
                post.thumbnail ||
                "https://www.phoenixpropertymaster.com/wp-content/uploads/2021/12/Real-Estate.jpg"
              }
              label={
                post.postId && post.postId !== 0
                  ? {
                      color: "red",
                      content: "Bài phái sinh",
                      icon: "copy outline",
                      ribbon: true,
                    }
                  : null
              }
            />
            <Item.Content className="item-content">
              <Item.Header>{post.title}</Item.Header>
              <Item.Description>
                <List horizontal size="large">
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        {post.unitPrice.id === 1 &&
                          (post.price >= 1000000000
                            ? post.price / 1000000000 + " tỷ"
                            : post.price / 1000000 + " triệu")}
                        {post.unitPrice.id === 2 &&
                          (post.price * post.area >= 1000000000
                            ? (post.price * post.area) / 1000000000 + " tỷ"
                            : (post.price * post.area) / 1000000 + " triệu")}
                        {post.unitPrice.id === 3 && "Thoả thuận"}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        {post.unitPrice.id === 1 &&
                          (post.price / post.area / 1000000000 >= 1000000000
                            ? Math.round(
                                (post.price / post.area / 1000000000) * 10
                              ) /
                                10 +
                              " tỷ/m²"
                            : Math.round(
                                (post.price / post.area / 1000000) * 10
                              ) /
                                10 +
                              " triệu/m²")}
                        {post.unitPrice.id === 2 &&
                          (post.price >= 1000000000
                            ? Math.round((post.price / 1000000000) * 10) / 10 +
                              " tỷ/m²"
                            : Math.round((post.price / 1000000) * 10) / 10 +
                              " triệu/m²")}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Content>
                      <List.Header>{post.area}m²</List.Header>
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
                {user.id !== post.user.id && (
                  <Button
                    floated="right"
                    icon
                    basic
                    onClick={(e) => {
                      handleFollowingPost(
                        e,
                        post,
                        followingPosts,
                        setFollowingPosts
                      );
                    }}
                  >
                    <Icon
                      name="heart"
                      color={
                        followingPosts &&
                        followingPosts.filter(
                          (followingPost) =>
                            followingPost.postId === post.postId &&
                            followingPost.derivativeId === post.derivativeId
                        ).length > 0
                          ? "red"
                          : null
                      }
                    />
                  </Button>
                )}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </RealEstateItemContainer>
    </Link>
  );
};

export default RealEstateItem;
