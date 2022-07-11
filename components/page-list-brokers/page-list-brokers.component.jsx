import Link from "next/link";
import React from "react";
import { Card, Grid, Icon, Image, Segment } from "semantic-ui-react";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import { ListBrokersContainer } from "./page-list-brokers.styles";

const ListBrokersPage = ({ listBrokers }) => {
  return (
    <ListBrokersContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            <Card.Group itemsPerRow={4}>
              {listBrokers.map((broker, index) => {
                return <BrokerItem key={index} broker={broker} />;
              })}
            </Card.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              <SearchBoxBroker />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ListBrokersContainer>
  );
};

const BrokerItem = ({ broker }) => {
  return (
    <Link href={`/danh-sach-nha-moi-gioi/${broker.id}`} passHref>
      <Card>
        <Image
          src={
            broker.avatar ||
            "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
          }
          wrapped
          alt="broker"
          ui={false}
        />
        <Card.Content>
          <Card.Header>{broker.fullName}</Card.Header>
          <Card.Description>
            <Icon name="mobile alternate" />
            {broker.phone}
          </Card.Description>
          <Card.Description>
            <Icon name="mail outline" />
            phatnguyen1412@gmail.com
          </Card.Description>
          <Card.Description>
            <Icon name="map marker alternate" />
            <span>Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh</span>
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default ListBrokersPage;
