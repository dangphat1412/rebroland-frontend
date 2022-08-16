import Link from "next/link";
import React, { useState } from "react";
import {
  Dimmer,
  Dropdown,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  List,
  Loader,
  Popup,
  Tab,
  Table,
} from "semantic-ui-react";
import { getDerivativePostsByUser } from "../../actions/post";
import calculatePrice from "../../utils/calculatePrice";
import convertToSlug from "../../utils/convertToSlug";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyDerivativePropertyContainer,
  PaginationContainer,
} from "./page-my-derivative-property.styles";
import statusOptions from "../../utils/typePropertyOptions";

const MyDerivativePropertyPage = ({ user, postsData, setTotalResult }) => {
  const [data, setData] = useState(postsData || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [status, setStatus] = useState(0);

  const [detailPost, setDetailPost] = useState(null);
  const [openDropPost, setOpenDropPost] = useState(false);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(propertyType, status, sortValue, activePage - 1);

  const handleOnTabChange = (e, { activeIndex }) => {
    setPropertyType(activeIndex);
    setSortValue(0);
    setStatus(0);
    fetchAPI(activeIndex, 0, 0, 0);
  };

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(propertyType, status, value, 0);
  };

  const handleFilterStatusOption = (e, { value }) => {
    setStatus(value);
    fetchAPI(propertyType, value, 0, 0);
  };

  const fetchAPI = async (propertyType, status, sortValue, pageNo) => {
    setLoading(true);
    const posts = await getDerivativePostsByUser(
      propertyType,
      status,
      sortValue,
      pageNo
    );
    console.log(posts);
    setData(posts);
    setTotalResult(posts.totalResult);
    setLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <MyDerivativePropertyContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13} className="my-derivative-property">
            <Dropdown
              selection
              options={statusOptions}
              className="filter-status"
              value={status}
              onChange={handleFilterStatusOption}
            />
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
                        data={data}
                        setDetailPost={setDetailPost}
                        setOpenDropPost={setOpenDropPost}
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
                        data={data}
                        setDetailPost={setDetailPost}
                        setOpenDropPost={setOpenDropPost}
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
                        data={data}
                        setDetailPost={setDetailPost}
                        setOpenDropPost={setOpenDropPost}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: "Đất nền",
                  render: () => (
                    <Tab.Pane as="div" attached={false}>
                      <ListProperty
                        data={data}
                        setDetailPost={setDetailPost}
                        setOpenDropPost={setOpenDropPost}
                        handlePaginationChange={handlePaginationChange}
                      />
                    </Tab.Pane>
                  ),
                },
              ]}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </MyDerivativePropertyContainer>
  );
};

const ListProperty = ({
  data,
  handlePaginationChange,
  setDetailPost,
  setOpenDropPost,
}) => {
  return (
    <>
      {data.posts.length > 0 ? (
        <>
          <Table padded color="yellow">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign="center">
                  Bài đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Mã bài đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Trạng thái
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Hành động
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {data &&
                data.posts.map((post, index) => {
                  const directionName = options.find(
                    (option) => option.id === post.directionId
                  );
                  return (
                    <Table.Row key={index}>
                      <Table.Cell width={11}>
                        <Item.Group>
                          <Item>
                            <Item.Image
                              size="medium"
                              src={
                                (post && post.thumbnail) ||
                                "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
                              }
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
                              <List horizontal>
                                <List.Item>
                                  <List.Content>
                                    <List.Header>
                                      {calculatePrice(post).price}
                                    </List.Header>
                                  </List.Content>
                                </List.Item>
                                <List.Item>
                                  <List.Content>
                                    <List.Header>
                                      {calculatePrice(post).pricePerSquare}
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
                              <Item.Description>
                                {post.description}
                              </Item.Description>
                              <Item.Description>
                                {post.ward}, {post.district}, {post.province}
                              </Item.Description>
                              <Item.Extra>{post.startDate}</Item.Extra>
                            </Item.Content>
                          </Item>
                        </Item.Group>
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.postId}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.block === true && (
                          <Label circular color="red">
                            Bị chặn
                          </Label>
                        )}
                        {post.block === false && post.status.id === 1 && (
                          <>
                            <Label circular color="green">
                              {post.status.name}
                            </Label>
                            <br />
                            {/* <b>Ngày hết hạn: {post.endDate.split(" ")[0]}</b> */}
                          </>
                        )}
                        {post.block === false &&
                          (post.status.id === 2 || post.status.id === 5) && (
                            <Label circular color="red">
                              {post.status.name}
                            </Label>
                          )}
                        {post.block === false && post.status.id === 3 && (
                          <Label circular color="blue">
                            {post.status.name}
                          </Label>
                        )}
                        {post.block === false && post.status.id === 4 && (
                          <Label circular color="blue">
                            {post.status.name}
                          </Label>
                        )}
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Link
                          href={`/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi/${convertToSlug(
                            post.title
                          )}-${post.postId}`}
                        >
                          <Icon
                            circular
                            inverted
                            color="teal"
                            name="eye"
                            style={{ cursor: "pointer" }}
                          />
                        </Link>

                        <Popup
                          content="Chỉnh sửa bài viết"
                          trigger={
                            <Icon
                              circular
                              inverted
                              color="green"
                              name="edit outline"
                              style={{ cursor: "pointer" }}
                            />
                          }
                        />

                        {post.block === false && post.status.id === 1 && (
                          <Popup
                            content="Hạ bài"
                            trigger={
                              <Icon
                                style={{ cursor: "pointer" }}
                                circular
                                inverted
                                color="orange"
                                name="hand point down outline"
                                onClick={() => {
                                  setDetailPost(post);
                                  setOpenDropPost(true);
                                }}
                              />
                            }
                          />
                        )}

                        <Popup
                          content="Xoá bài viết"
                          trigger={
                            <Icon
                              style={{ cursor: "pointer" }}
                              circular
                              inverted
                              color="red"
                              name="trash alternate"
                              onClick={() => {
                                setOpenDeleteConfirm(true);
                              }}
                            />
                          }
                        />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>

            {/* <Confirm
        open={openDeleteConfirm}
        content="Xác nhận xoá bài viết"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      /> */}
          </Table>
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
        </>
      ) : (
        <Header>Không có bất động sản nào</Header>
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

export default MyDerivativePropertyPage;
