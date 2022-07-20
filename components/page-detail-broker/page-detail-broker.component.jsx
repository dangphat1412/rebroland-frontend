import React, { useState } from "react";
import {
  Button,
  Card,
  Dimmer,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Loader,
  Segment,
  Tab,
} from "semantic-ui-react";
import FormContactBroker from "../form-contact-broker/form-contact-broker.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import { DetailBrokerContainer } from "./page-detail-broker.styles";

const DetailBrokerPage = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
}) => {
  const [userDetail, setUserDetail] = useState(postsData.user);
  const [data, setData] = useState(postsData.lists);
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(propertyType, sortValue, activePage);

  const handleOnTabChange = (e, { activeIndex }) => {
    setPropertyType(activeIndex);
    setSortValue(0);
    fetchAPI(activeIndex, 0, 0);
  };

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(propertyType, value, 0);
  };

  const fetchAPI = async (propertyType, sortValue, pageNo) => {
    setLoading(true);
    const posts = await getFollowingPostsByUser(
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <DetailBrokerContainer>
      <Grid>
        <Grid.Row>
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
          <Grid.Column width={8}>
            <Segment>
              <Item.Group>
                <Item>
                  <Item.Image
                    size="small"
                    src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                  />
                  <Item.Content>
                    <Item.Header>{userDetail.fullName}</Item.Header>
                    <Item.Description>
                      <Icon name="mobile alternate" />
                      {userDetail.phone}
                    </Item.Description>
                    <Item.Description>
                      <Icon name="mail outline" />
                      {userDetail.email}
                    </Item.Description>
                    <Item.Description>
                      <Icon name="map marker alternate" />
                      <span>Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh</span>
                    </Item.Description>
                    <Item.Description className="social-media-list">
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="https://cdn.icon-icons.com/icons2/2108/PNG/512/facebook_icon_130940.png"
                          alt="fb"
                          size="mini"
                        />
                      </a>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src="https://cdn1.iconfinder.com/data/icons/logos-brands-in-colors/2500/zalo-seeklogo.com-512.png"
                          alt="fb"
                          size="mini"
                        />
                      </a>
                    </Item.Description>
                  </Item.Content>
                </Item>
              </Item.Group>
            </Segment>
            <Segment>
              <Header as="h2">Thông tin về tôi</Header>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi dolorem molestiae ullam mollitia odit tempore sint
                officiis delectus magnam! Aperiam optio labore sapiente itaque
                illo possimus accusamus numquam nam reiciendis.
              </div>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi dolorem molestiae ullam mollitia odit tempore sint
                officiis delectus magnam! Aperiam optio labore sapiente itaque
                illo possimus accusamus numquam nam reiciendis.
              </div>
              {/* <div>
                <pre>{post.description}</pre>
              </div> */}
            </Segment>
            <div className="list-property">
              <Header as="h2">Danh sách bất động sản</Header>
              <Dropdown
                selection
                options={options}
                className="filter"
                value={sortValue}
                onChange={handleFilterOption}
              />
              <Dimmer active={loading} inverted>
                <Loader>Đang tải dữ liệu</Loader>
              </Dimmer>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                  {
                    menuItem: "Tất cả bất động sản",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Nhà ở",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Chung cư",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                        />
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Đất nền",
                    render: () => (
                      <Tab.Pane as="div" attached={false}>
                        {" "}
                        <ListProperty
                          user={user}
                          data={data}
                          followingPosts={followingPosts}
                          setFollowingPosts={setFollowingPosts}
                          handlePaginationChange={handlePaginationChange}
                        />
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </div>
          </Grid.Column>
          <Grid.Column width={4}>
            <Segment>
              <FormContactBroker />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </DetailBrokerContainer>
  );
};

const ListProperty = ({
  user,
  data,
  followingPosts,
  setFollowingPosts,
  handlePaginationChange,
}) => {
  return (
    <>
      <Card.Group itemsPerRow={3}>
        {data.posts &&
          data.posts.map((post, index) => (
            <RealEstateItem
              type="card"
              user={user}
              post={post}
              key={index}
              followingPosts={followingPosts}
              setFollowingPosts={setFollowingPosts}
            />
          ))}
      </Card.Group>
      {data.totalPage > 1 && (
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
  );
};

const options = [
  {
    key: 0,
    text: "Thông thường",
    value: 0,
  },
  {
    key: 1,
    text: "Giá từ thấp đến cao",
    value: 1,
  },
  {
    key: 2,
    text: "Giá từ cao đến thấp",
    value: 2,
  },
  {
    key: 3,
    text: "Giá trên m² từ thấp đến cao",
    value: 3,
  },
  {
    key: 4,
    text: "Giá trên m² từ cao đến thấp",
    value: 4,
  },
  {
    key: 5,
    text: "Diện tích từ bé đến lớn",
    value: 5,
  },
  {
    key: 6,
    text: "Diện tích từ lớn đến bé",
    value: 6,
  },
];

export default DetailBrokerPage;
