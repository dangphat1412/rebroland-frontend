import React from "react";
import {
  Button,
  Card,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  List,
  Segment,
} from "semantic-ui-react";
import Link from "next/link";
import { RealEstateItemContainer } from "./item-real-estate.styles";

const RealEstateItem = ({ post }) => {
  return (
    <Link href={`/bat-dong-san/${post.postId}`}>
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
                <Button floated="right" icon>
                  <Icon name="heart outline" size="big" />
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
