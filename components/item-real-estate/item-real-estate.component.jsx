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

const RealEstateItem = () => {
  return (
    <Link href="/thong-tin-chi-tiet">
      <RealEstateItemContainer fluid>
        <Item.Group>
          <Item>
            <Item.Image
              size="medium"
              src="https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
            />
            <Item.Content className="item-content">
              <Item.Header>
                Biệt thự đường Ngô Thời Nhiệm Q3, DT: 20x25m, T 1L ST, giá
                105tr/th
              </Item.Header>
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
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Aliquid fugiat, quis ad dolores natus veritatis voluptatibus
                  fugit. Expedita
                </div>
              </Item.Description>
              <Item.Extra>
                <span>3 ngày trước</span>
                <Button floated="right" icon>
                  <Icon name="bookmark outline" size="big" />
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
