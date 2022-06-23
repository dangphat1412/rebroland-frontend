import Link from "next/link";
import React from "react";
import { Card, Header, Icon, Image, List } from "semantic-ui-react";
import { CardContainer } from "./property-recommend-item.styles";

const PropertyRecommendItem = () => {
  return (
    <Link href="/thong-tin-chi-tiet">
      <CardContainer>
        <Image
          src="https://bannha24.vn/wp-content/uploads/2019/05/59921530_10157291478184122_3733079316192296960_n.jpg"
          wrapped
          ui={false}
          alt="card"
        />
        <Card.Content>
          <Card.Header className="header">
            Bán nhà mặt phố Nghĩa Tân. Lô góc, 2 mặt phố, DT 36/55m2 5T
          </Card.Header>
          <Card.Meta>
            <span>3 ngày trước</span>
          </Card.Meta>
          <Card.Description>
            <List horizontal>
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
            </List>
            <Header as="h6" icon floated="right" color="red">
              <Icon name="bookmark outline" />
            </Header>
            <div>Cầu Giấy, Hà Nội</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Được đăng bởi <span style={{ fontWeight: "bold" }}>Nguyễn Văn A</span>
        </Card.Content>
      </CardContainer>
    </Link>
  );
};

export default PropertyRecommendItem;
