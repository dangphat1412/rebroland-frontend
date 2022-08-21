import Link from "next/link";
import React, { useState } from "react";
import {
  Confirm,
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
import {
  deletepPost,
  dropPost,
  getDerivativePostsByUser,
  getPostById,
  reupPost,
} from "../../actions/post";
import calculatePrice from "../../utils/calculatePrice";
import convertToSlug from "../../utils/convertToSlug";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyDerivativePropertyContainer,
  PaginationContainer,
} from "./page-my-derivative-property.styles";
import statusOptions from "../../utils/typePropertyOptions";
import ModalItem from "../modal-item/modal-item.component";
import EditPostForm from "../form-edit-post/form-edit-post.component";
import Router, { useRouter } from "next/router";

const MyDerivativePropertyPage = ({ user, postsData, setTotalResult }) => {
  const router = useRouter();
  const [data, setData] = useState(postsData || {});
  const [loading, setLoading] = useState(false);
  const [propertyType, setPropertyType] = useState(0);
  const [sortValue, setSortValue] = useState(0);
  const [status, setStatus] = useState(0);

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
                        user={user}
                        data={data}
                        setData={setData}
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
                        setData={setData}
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
                        setData={setData}
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
                        user={user}
                        data={data}
                        setData={setData}
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

const ListProperty = ({ user, data, handlePaginationChange, setData }) => {
  const [detailPost, setDetailPost] = useState(null);
  const [openDropPost, setOpenDropPost] = useState(false);
  const [openReupPost, setOpenReupPost] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState(null);
  const [editedLoading, setEditedLoading] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  return (
    <>
      {data && data.posts.length > 0 ? (
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
                                "/default-thumbnail.png"
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
                            {post.endDate && (
                              <b>Ngày hết hạn: {post.endDate.split(" ")[0]}</b>
                            )}
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
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
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

                        {post.status.id !== 3 && post.block === false && (
                          <Popup
                            content="Chỉnh sửa bài viết"
                            trigger={
                              <Icon
                                circular
                                inverted
                                color="green"
                                name="edit outline"
                                style={{ cursor: "pointer" }}
                                onClick={async () => {
                                  setOpenEditPost(true);
                                  setEditedLoading(true);
                                  const postData = await getPostById(
                                    post.postId
                                  );
                                  setEditedPost(postData.post);
                                  setEditedLoading(false);
                                }}
                              />
                            }
                          />
                        )}

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

                        {post.block === false && post.status.id === 2 && (
                          <Popup
                            content="Đăng lại"
                            trigger={
                              <Icon
                                style={{ cursor: "pointer" }}
                                circular
                                inverted
                                color="orange"
                                name="redo"
                                onClick={() => {
                                  setDetailPost(post);
                                  setOpenReupPost(true);
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
                                setDetailPost(post);
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
      <Confirm
        open={openDropPost}
        header="Xác nhận hạ bài"
        content="Bạn có chắc chắn muốn hạ bài không?"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        onCancel={() => {
          setOpenDropPost(false);
        }}
        onConfirm={async () => {
          const status = await dropPost(detailPost.postId);
          if (status === 201) {
            const listData = data;
            const listArray = data.posts;
            const index = data.posts.findIndex(
              (p) => p.postId === detailPost.postId
            );
            listArray[index].status = { id: 2, name: "Hạ bài" };
            setData({ ...listData, posts: listArray });
            setOpenDropPost(false);
          }
        }}
      />

      <ModalItem
        header="Chỉnh sửa bài viết"
        size="large"
        onOpen={openEditPost}
        onClose={() => {
          setOpenEditPost(false);
          setEditedPost(null);
        }}
      >
        {editedPost && (
          <>
            <EditPostForm
              user={user}
              editedPost={editedPost}
              editedLoading={editedLoading}
              setEditedLoading={setEditedLoading}
            />
          </>
        )}
      </ModalItem>

      <Confirm
        open={openReupPost}
        content="Xác nhận đăng lại bài phái sinh"
        onCancel={() => {
          setOpenReupPost(false);
        }}
        onConfirm={async () => {
          const status = await reupPost(detailPost.postId);
          if (status === 201) {
            const listData = data;
            const listArray = data.posts;
            const index = data.posts.findIndex(
              (p) => p.postId === detailPost.postId
            );
            listArray[index].status = { id: 1, name: "Đang hoạt động" };
            setData({ ...listData, posts: listArray });
            setOpenReupPost(false);
          }
        }}
      />

      <Confirm
        open={openDeleteConfirm}
        header="Xác nhận xoá bài phái sinh"
        content="Bạn có chắc chắn muốn xoá bài viết không?"
        onCancel={() => {
          setOpenDeleteConfirm(false);
        }}
        onConfirm={async () => {
          const status = await deletepPost(detailPost.postId);
          if (status === 201) {
            Router.reload();
          }
        }}
      />
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
