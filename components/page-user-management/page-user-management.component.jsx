import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Confirm,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  List,
  Loader,
  Modal,
  Radio,
  Segment,
  Table,
} from "semantic-ui-react";
import {
  changeUserStatus,
  getPostsByUser,
  searchUsers,
} from "../../actions/admin";
import calculatePrice from "../../utils/calculatePrice";
import InputField from "../input-field/input-field.component";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  PostModalContainer,
  UserManagementPageContainer,
} from "./page-user-management.styles";

const UserManagementPage = ({ usersData, setTotalResult }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [data, setData] = useState(usersData || []);
  const [listUser, setListUser] = useState(usersData.list);
  const [userDetail, setUserDetail] = useState(null);
  const [postsData, setPostsData] = useState(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openViewPost, setOpenViewPost] = useState(false);
  const [sortValue, setSortValue] = useState(0);
  const [roleValue, setRoleValue] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const handleChangeStatus = async () => {
    const status = await changeUserStatus(selectedUserIndex);
    if (status === 200) {
      const list = [...listUser];
      const index = list.findIndex((user) => user.id === selectedUserIndex);
      list[index].block = list[index].block === true ? false : true;
      setListUser(list);
    }
    setOpenConfirm(false);
  };

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setRoleValue(0);
    setKeyword(data.key);
    fetchAPI(data.key, 0, 0, 0);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(keyword, roleValue, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(keyword, roleValue, value, 0);
  };

  const handleRoleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(keyword, value, sortValue, 0);
  };

  const fetchAPI = async (keyword, roleValue, sortValue, pageNo) => {
    setLoading(true);
    const posts = await searchUsers(keyword, roleValue, sortValue, pageNo);
    setData(posts);
    setListUser(posts.list);
    setTotalResult(posts.totalResult);
    setUserDetail(null);
    setLoading(false);
  };

  return (
    <UserManagementPageContainer>
      <Dimmer active={loading} inverted>
        <Loader>Đang tải dữ liệu</Loader>
      </Dimmer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="key"
                placeholder="Tìm kiếm người dùng"
                onChange={(e, { name, value }) => {
                  setValue(name, value.trim());
                }}
                action="Tìm kiếm"
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={12} textAlign="right">
            <Dropdown
              selection
              options={[
                {
                  key: 0,
                  text: "Tất cả người dùng",
                  value: 0,
                },
                {
                  key: 1,
                  text: "Người dùng thường",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Nhà môi giới",
                  value: 2,
                },
              ]}
              className="role-filter"
              value={sortValue}
              onChange={handleRoleFilterOption}
            />
            <Dropdown
              selection
              options={[
                {
                  key: 0,
                  text: "Tất cả trạng thái",
                  value: 0,
                },
                {
                  key: 1,
                  text: "Đang hoạt động",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Vô hiệu hoá",
                  value: 2,
                },
              ]}
              className="filter"
              value={sortValue}
              onChange={handleFilterOption}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {listUser && listUser.length > 0 ? (
        <Table size="large" selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine textAlign="center">
                Mã người dùng
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Tài khoản
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Họ và tên
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Vai trò
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Ngày tham gia
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Trạng thái
              </Table.HeaderCell>
              <Table.HeaderCell singleLine textAlign="center">
                Thao tác
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {listUser.length > 0 &&
              listUser.map((user, index) => {
                return (
                  <Table.Row
                    key={index}
                    style={{ cursor: "pointer" }}
                    active={user.id === selectedUserIndex}
                    onClick={async (e) => {
                      setSelectedUserIndex(user.id);
                      setUserDetail(user);
                      setUserLoading(true);
                      const data = await getPostsByUser(user.id, 0);
                      setPostsData(data);
                      setUserLoading(false);
                    }}
                  >
                    <Table.Cell singleLine textAlign="center">
                      {user.id}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      <Header as="h4" image>
                        <Image
                          src={user.avatar || "/default-avatar.png"}
                          avatar
                          className="user-avatar-small"
                        />
                        <Header.Content>{user.phone}</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {user.fullName}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {user.broker ? "Nhà môi giới" : "Người dùng"}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {user.startDate}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {user.block ? (
                        <Label circular color="red">
                          VÔ HIỆU HOÁ
                        </Label>
                      ) : (
                        <Label circular color="green">
                          ĐANG HOẠT ĐỘNG
                        </Label>
                      )}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      <Radio
                        toggle
                        onChange={() => {
                          setOpenConfirm(true);
                        }}
                        checked={!user.block}
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="7">
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
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      ) : (
        <Header as="h3">Không có người dùng nào</Header>
      )}
      <Confirm
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Xác nhận chuyển đổi trạng thái tài khoản"
        open={openConfirm}
        onCancel={() => {
          setOpenConfirm(false);
        }}
        onConfirm={handleChangeStatus}
      />
      {userDetail && (
        <>
          <Divider horizontal>
            <Header as="h4">
              <Icon name="tag" />
              Thông tin chi tiết người dùng
            </Header>
          </Divider>
          <Segment>
            <Dimmer active={userLoading} inverted>
              <Loader>Đang tải dữ liệu</Loader>
            </Dimmer>
            <Grid>
              <Grid.Row>
                <Grid.Column width={2}>
                  <Image
                    src={userDetail.avatar || "/default-avatar.png"}
                    size="medium"
                    circular
                    className="user-avatar-big"
                  />
                </Grid.Column>
                <Grid.Column width={4}>
                  <div className="user-information">
                    <label>Họ và tên:</label>
                    <span>{userDetail.fullName}</span>
                  </div>
                  <div className="user-information">
                    <label>Số điện thoại:</label>
                    <span>{userDetail.phone}</span>
                  </div>
                  <div className="user-information">
                    <label>Email:</label>
                    <span>
                      {userDetail.email ? userDetail.email : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Giới tính:</label>
                    <span>{userDetail.gender ? "Nam" : "Nữ"}</span>
                  </div>
                  <div className="user-information">
                    <label>Ngày sinh:</label>
                    <span>
                      {userDetail.dob ? userDetail.dob : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Số bài đăng:</label>
                    <span>
                      {postsData ? (
                        <>
                          <span>{postsData.totalResult} </span>
                          {postsData.totalResult > 0 && (
                            <span
                              onClick={() => {
                                setOpenViewPost(true);
                              }}
                              style={{ color: "blue", cursor: "pointer" }}
                            >
                              Xem tất cả
                            </span>
                          )}
                        </>
                      ) : (
                        "Đang cập nhật"
                      )}
                    </span>
                  </div>
                </Grid.Column>
                <Grid.Column width={5}>
                  <div className="user-information">
                    <label>Tỉnh/Thành phố:</label>
                    <span>
                      {userDetail.province
                        ? userDetail.province
                        : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Quận/Huyện:</label>
                    <span>
                      {userDetail.district
                        ? userDetail.district
                        : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Thị/Xã:</label>
                    <span>
                      {userDetail.ward ? userDetail.ward : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Địa chỉ:</label>
                    <span>
                      {userDetail.address
                        ? userDetail.address
                        : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Facebook:</label>
                    <span>
                      {userDetail.facebookLink
                        ? userDetail.facebookLink
                        : "Đang cập nhật"}
                    </span>
                  </div>
                  <div className="user-information">
                    <label>Zalo:</label>
                    <span>
                      {userDetail.zaloLink
                        ? userDetail.zaloLink
                        : "Đang cập nhật"}
                    </span>
                  </div>
                </Grid.Column>
                <Grid.Column width={4}>
                  <div className="user-information">
                    <label>Mô tả:</label>
                    <span>
                      {userDetail.description
                        ? userDetail.description
                        : "Đang cập nhật"}
                    </span>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
          {postsData && (
            <PostModalContainer
              size="large"
              closeIcon
              open={openViewPost}
              onClose={() => setOpenViewPost(false)}
            >
              <Modal.Header>
                Có tổng cộng {postsData.totalResult} bài đăng
              </Modal.Header>
              <Modal.Content>
                {postsData.posts.length > 0 &&
                  postsData.posts.map((post, index) => {
                    return (
                      <Item.Group key={index}>
                        <Item>
                          <Item.Image
                            size="medium"
                            src={post.thumbnail || "/default-thumbnail.png"}
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
                            <Item.Description>
                              <List horizontal size="large">
                                <List.Item>
                                  <List.Content>
                                    <List.Header>
                                      {post.unitPrice.id === 3
                                        ? "Thoả thuận"
                                        : calculatePrice(post).price}
                                    </List.Header>
                                  </List.Content>
                                </List.Item>
                                <List.Item>
                                  <List.Content>
                                    <List.Header>
                                      {post.unitPrice.id === 3
                                        ? ""
                                        : calculatePrice(post).pricePerSquare}
                                    </List.Header>
                                  </List.Content>
                                </List.Item>
                                <List.Item>
                                  <List.Content>
                                    <List.Header>{post.area}m²</List.Header>
                                  </List.Content>
                                </List.Item>
                              </List>
                            </Item.Description>
                            <Item.Description>
                              {post.description}
                            </Item.Description>
                            <Item.Extra>
                              <div>
                                {(post.address ? post.address + ", " : "") +
                                  post.ward +
                                  ", " +
                                  post.district +
                                  ", " +
                                  post.province}
                              </div>
                              <span>{post.startDate}</span>
                            </Item.Extra>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    );
                  })}
                <Dimmer active={postLoading} inverted>
                  <Loader>Đang tải dữ liệu</Loader>
                </Dimmer>
                <PaginationContainer>
                  <Pagination
                    activePage={postsData.pageNo}
                    boundaryRange={1}
                    siblingRange={1}
                    ellipsisItem={{
                      content: <Icon name="ellipsis horizontal" />,
                      icon: true,
                    }}
                    totalPages={postsData.totalPages}
                    onPageChange={async (e, { activePage }) => {
                      setPostLoading(true);
                      const data = await getPostsByUser(
                        selectedUserIndex,
                        activePage - 1
                      );
                      setPostsData(data);
                      setPostLoading(false);
                    }}
                  />
                </PaginationContainer>
              </Modal.Content>
            </PostModalContainer>
          )}
        </>
      )}
    </UserManagementPageContainer>
  );
};

export default UserManagementPage;
