import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  Card,
  Dropdown,
  Grid,
  Icon,
  Image,
  Pagination,
  Rating,
  Segment,
} from "semantic-ui-react";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import {
  ListBrokersContainer,
  PaginationContainer,
} from "./page-list-brokers.styles";

const ListBrokersPage = ({ brokersData, setTotalResult, searchParams }) => {
  console.log(brokersData);
  const router = useRouter();
  const [data, setData] = useState(brokersData || {});
  const [sortValue, setSortValue] = useState(searchParams.sortValue || 0);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(searchParams, value, 0);
  };

  const handlePaginationChange = (e, { activePage }) => {
    fetchAPI(searchParams, sortValue, activePage - 1);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    const data = { ...params, sortValue, pageNo };
    router.push(
      {
        pathname: "/danh-sach-nha-moi-gioi",
        query: { data: JSON.stringify(data) },
      },
      "/danh-sach-nha-moi-gioi",
      { scroll: true }
    );
  };

  useEffect(() => {
    setData(brokersData);
    setTotalResult(brokersData.totalResult);
    setSortValue(searchParams.sortValue || 0);
  }, [searchParams]);

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
              <SearchBoxBroker searchParams={searchParams} />
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
                      <BrokerItem
                        key={index}
                        broker={broker}
                        searchParams={searchParams}
                      />
                    ))}
                </Card.Group>
                {data.totalPages > 1 && (
                  <PaginationContainer>
                    <Pagination
                      activePage={data.pageNo}
                      boundaryRange={1}
                      siblingRange={1}
                      ellipsisItem={{
                        content: <Icon name="ellipsis horizontal" />,
                        icon: true,
                      }}
                      totalPages={data.totalPages}
                      onPageChange={handlePaginationChange}
                    />
                  </PaginationContainer>
                )}
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ListBrokersContainer>
  );
};

const BrokerItem = ({ broker, searchParams }) => {
  return (
    <Link
      href={{
        pathname: `/danh-sach-nha-moi-gioi/${broker.id}`,
        query: { data: JSON.stringify(searchParams) },
      }}
      as={`/danh-sach-nha-moi-gioi/${broker.id}`}
      passHref
    >
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
