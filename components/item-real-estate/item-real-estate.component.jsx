import React, { useEffect, useState } from "react";
import { Button, Card, Icon, Image, Item, List } from "semantic-ui-react";
import Link from "next/link";
import { RealEstateItemContainer } from "./item-real-estate.styles";
import convertToSlug from "../../utils/convertToSlug";
import { followPost } from "../../actions/post";
import calculatePrice from "../../utils/calculatePrice";

const RealEstateItem = ({
  user,
  post,
  followingPosts,
  setFollowingPosts,
  toast,
  type,
}) => {
  const { price, pricePerSquare } = calculatePrice(post);
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
    <Link href={`/bat-dong-san/${convertToSlug(post.title)}-${post.postId}`}>
      <RealEstateItemContainer fluid>
        {type === "card" ? (
          <>
            <Image src={post.thumbnail} wrapped ui={false} alt="real estate" />
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <Card.Description>{post.description}</Card.Description>
            </Card.Content>
          </>
        ) : (
          <Item.Group>
            <Item>
              <Item.Image
                size="medium"
                src={
                  post.thumbnail ||
                  "https://www.phoenixpropertymaster.com/wp-content/uploads/2021/12/Real-Estate.jpg"
                }
                label={
                  post.originalPost && post.originalPost !== 0
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
                          {post.unitPrice.id === 3 ? "Thoả thuận" : price}
                        </List.Header>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>
                          {post.unitPrice.id === 3 ? "" : pricePerSquare}
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
                              followingPost.postId === post.postId
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
        )}
      </RealEstateItemContainer>
    </Link>
  );
};

export default RealEstateItem;
