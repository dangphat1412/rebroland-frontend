import React from "react";
import { Button, Card, Icon, Image, Item, List } from "semantic-ui-react";
import Link from "next/link";
import { RealEstateItemContainer } from "./item-real-estate.styles";
import convertToSlug from "../../utils/convertToSlug";
import { followPost } from "../../actions/post";
import calculatePrice from "../../utils/calculatePrice";
import options from "../../utils/directionList";

const RealEstateItem = ({
  user,
  post,
  followingPosts,
  setFollowingPosts,
  toast,
  type,
}) => {
  const { price, pricePerSquare } = calculatePrice(post);
  const directionName = options.find(
    (option) => option.id === post.directionId
  );
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
        }, 100);
  };

  return (
    <Link
      href={
        user && user.currentRole === 3
          ? `/nha-moi-gioi/bat-dong-san/${convertToSlug(post.title)}-${
              post.postId
            }`
          : `/bat-dong-san/${convertToSlug(post.title)}-${post.postId}`
      }
    >
      <RealEstateItemContainer fluid>
        {type === "card" ? (
          <>
            <Image
              src={post.thumbnail || "/default-thumbnail.png"}
              wrapped
              ui={false}
              alt="real estate"
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
              className="post-image"
            />
            <Card.Content>
              <Card.Header>{post.title}</Card.Header>
              <List horizontal size="large" style={{ marginBottom: "0px" }}>
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
              </List>
              <List
                horizontal
                size="large"
                style={{ marginTop: "0px", display: "block" }}
              >
                {post.numberOfBedroom > 0 && (
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        {post.numberOfBedroom}{" "}
                        <span className="kikor kiko-bedroom"></span>
                      </List.Header>
                    </List.Content>
                  </List.Item>
                )}

                {post.numberOfBathroom > 0 && (
                  <List.Item>
                    <List.Content>
                      <List.Header>
                        {post.numberOfBedroom}{" "}
                        <span className="kikor kiko-bathroom"></span>
                      </List.Header>
                    </List.Content>
                  </List.Item>
                )}

                {directionName && (
                  <List.Item>
                    <List.Content>
                      <List.Header>{directionName.name} </List.Header>
                    </List.Content>
                  </List.Item>
                )}
              </List>
              <Card.Description>{post.description}</Card.Description>

              <div>
                <div>{post.district + ", " + post.province}</div>

                {post.startDate}
                {(!user || (user && user.id !== post.user.id)) && (
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
              </div>
            </Card.Content>
          </>
        ) : (
          <Item.Group>
            <Item>
              <Item.Image
                size="medium"
                src={post.thumbnail || "/default-thumbnail.png"}
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

                    {post.numberOfBedroom > 0 && (
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            {post.numberOfBedroom}{" "}
                            <span className="kikor kiko-bedroom"></span>
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    )}

                    {post.numberOfBathroom > 0 && (
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            {post.numberOfBedroom}{" "}
                            <span className="kikor kiko-bathroom"></span>
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    )}

                    {directionName && (
                      <List.Item>
                        <List.Content>
                          <List.Header>
                            {directionName.name}{" "}
                            {/* <span className="kikor kiko-rise-prices"></span> */}
                          </List.Header>
                        </List.Content>
                      </List.Item>
                    )}
                  </List>
                </Item.Description>
                <Item.Description>{post.description}</Item.Description>
                <Item.Extra>
                  {(!user || (user && user.id !== post.user.id)) && (
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
                  <div>
                    {(post.address ? post.address + ", " : "") +
                      post.ward +
                      ", " +
                      post.district +
                      ", " +
                      post.province}
                  </div>
                  <span>{post.startDate}</span>
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
