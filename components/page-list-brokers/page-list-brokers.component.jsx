import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  Dimmer,
  Dropdown,
  Grid,
  Icon,
  Image,
  Loader,
  Pagination,
  Rating,
  Segment,
} from "semantic-ui-react";
import { searchBrokers } from "../../actions/user";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import {
  ListBrokersContainer,
  PaginationContainer,
} from "./page-list-brokers.styles";

const ListBrokersPage = ({ brokersData, setTotalResult }) => {
  const [data, setData] = useState(brokersData || {});
  const [sortValue, setSortValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState(null);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(params, value, 0);
  };

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(params, sortValue, activePage - 1);
  };

  const fetchAPI = async (params, sortValue, page) => {
    setLoading(true);
    const brokersData = await searchBrokers(params, sortValue, page);
    setData(brokersData);
    setTotalResult(brokersData.totalResult);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ListBrokersContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Dropdown
              fluid
              selection
              options={options}
              className="filter"
              value={sortValue}
              onChange={handleFilterOption}
            />
            <Segment
              style={{
                backgroundImage: "url('/zyro-image.png')",
                color: "white",
              }}
            >
              <SearchBoxBroker
                setData={setData}
                setParams={setParams}
                setSortValue={setSortValue}
                setTotalResult={setTotalResult}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            {data.list.length === 0 ? (
              <>Không tìm thấy kết quả phù hợp</>
            ) : (
              <>
                <Card.Group itemsPerRow={4}>
                  {data &&
                    data.list.map((broker, index) => (
                      <BrokerItem key={index} broker={broker} />
                    ))}
                </Card.Group>
                {data.totalPage > 1 && (
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
                )}
              </>
            )}
            <Dimmer active={loading} inverted>
              <Loader>Đang tải dữ liệu</Loader>
            </Dimmer>
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
            <Rating
              maxRating={5}
              defaultRating={broker.avgRate.toFixed()}
              icon="star"
              size="mini"
              disabled
            />
            <b> {broker.avgRate}</b>
          </Card.Description>
          <Card.Description>
            <Icon name="mobile alternate" />
            {broker.phone}
          </Card.Description>
          <Card.Description>
            <Icon name="mail outline" />
            {broker.email ? broker.email : "Đang cập nhật"}
          </Card.Description>
          <Card.Description>
            <Icon name="map marker alternate" />
            {broker.province && broker.district && broker.ward
              ? broker.ward + ", " + broker.district + ", " + broker.province
              : "Đang cập nhật"}
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  );
};

const options = [
  {
    key: 0,
    text: "Lượt bình chọn",
    value: 0,
  },
  // {
  //   key: 1,
  //   text: "Số giao dịch thành công",
  //   value: 1,
  // },
];

export default ListBrokersPage;
