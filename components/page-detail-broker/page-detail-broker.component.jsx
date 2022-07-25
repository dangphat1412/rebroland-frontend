import React, { useState } from "react";
import {
  Card,
  Dimmer,
  Dropdown,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Loader,
  Segment,
  Tab,
} from "semantic-ui-react";
import FormContact from "../form-contact/form-contact.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import SearchBoxBroker from "../search-box-broker/search-box-broker.component";
import {
  DetailBrokerContainer,
  PaginationContainer,
} from "./page-detail-broker.styles";
import Pagination from "../pagination/pagination.component";
import options from "../../utils/RealEstateSortValue";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import { getPostsByUserDetail } from "../../actions/post";

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
    fetchAPI(userDetail.id, propertyType, sortValue, activePage - 1);

  const handleOnTabChange = (e, { activeIndex }) => {
    setPropertyType(activeIndex);
    setSortValue(0);
    fetchAPI(userDetail.id, activeIndex, 0, 0);
  };

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(userDetail.id, propertyType, value, 0);
  };

  const fetchAPI = async (userId, propertyType, sortValue, pageNo) => {
    setLoading(true);
    const posts = await getPostsByUserDetail(
      userId,
      propertyType,
      sortValue,
      pageNo
    );
    setData(posts.lists);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <DetailBrokerContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
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
                onTabChange={handleOnTabChange}
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
              <FormContact
                title="Liên lạc với nhà môi giới"
                toast={toast}
                userId={userDetail.id}
              />
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

export default DetailBrokerPage;
