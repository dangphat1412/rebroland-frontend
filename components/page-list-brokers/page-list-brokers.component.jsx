import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  Grid,
  Icon,
  Image,
  Loader,
  Pagination,
  Segment,
} from "semantic-ui-react";
import { getListBrokers } from "../../actions/user";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import {
  ListBrokersContainer,
  PaginationContainer,
} from "./page-list-brokers.styles";

const ListBrokersPage = ({ brokersData }) => {
  const [data, setData] = useState(brokersData || {});

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(activePage);
  };

  const fetchAPI = async (page) => {
    const brokers = await getListBrokers(page);
    setData(brokers);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <ListBrokersContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12}>
            {data.length === 0 ? (
              <Segment basic>
                <Loader active inline="centered" />
              </Segment>
            ) : data.listBroker.length === 0 ? (
              <>Không tìm thấy kết quả phù hợp</>
            ) : (
              <>
                <Card.Group itemsPerRow={4}>
                  {data &&
                    data.listBroker.map((broker, index) => (
                      <BrokerItem key={index} broker={broker} />
                    ))}
                </Card.Group>
                <PaginationContainer>
                  <Pagination
                    activePage={data.pageNumber}
                    boundaryRange={1}
                    siblingRange={1}
                    ellipsisItem={{
                      content: <Icon name="ellipsis horizontal" />,
                      icon: true,
                    }}
                    totalPages={data.totalPage}
                    onPageChange={handlePaginationChange}
                  />
                </PaginationContainer>
              </>
            )}
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
