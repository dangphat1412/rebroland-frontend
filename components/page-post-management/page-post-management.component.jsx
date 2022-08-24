import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Confirm,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Item,
  Label,
  List,
  Loader,
  Modal,
  Radio,
  Statistic,
  Table,
} from "semantic-ui-react";
import {
  DetailPostContainer,
  PaginationContainer,
  PostManagementPageContainer,
} from "./page-post-management.styles";
import calculatePrice from "../../utils/calculatePrice";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";
import Pagination from "../pagination/pagination.component";
import {
  changePostStatus,
  getDetailPost,
  searchPosts,
} from "../../actions/admin";
import Map from "../map/map.component";
import ReactImageGallery from "react-image-gallery";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import ViewPostModal from "../modal-view-post/modal-view-post.component";

const PostManagementPage = ({ postsData, setTotalResult }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [data, setData] = useState(postsData);
  const [listPost, setListPost] = useState(postsData.posts);
  const [loading, setLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [sortValue, setSortValue] = useState(0);
  const [openView, setOpenView] = useState(false);
  const [params, setParams] = useState({});
  const [detailPost, setDetailPost] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState(null);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(params, value, 0);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    setLoading(true);
    const posts = await searchPosts(params, sortValue, pageNo);
    setData(posts);
    setListPost(posts.posts);
    setTotalResult(posts.totalResult);
    console.log(posts);
    setLoading(false);
  };

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setParams(data);
    fetchAPI(data, 0, 0);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChangeStatus = async () => {
    const status = await changePostStatus(selectedPostIndex, setErrorMessage);
    console.log(status);
    if (status === 200) {
      const list = [...listPost];
      const index = list.findIndex((post) => post.postId === selectedPostIndex);
      list[index].block = !list[index].block;
      setListPost(list);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Chủ bài đăng bị khoá tài khoản",
          description: <p>{errorMessage}</p>,
        });
      }, 100);
    }
    setOpenConfirm(false);
  };

  return (
    <PostManagementPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
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
                  text: "Tất cả",
                  value: 0,
                },
                {
                  key: 1,
                  text: "Đang hoạt động",
                  value: 1,
                },
                {
                  key: 5,
                  text: "Hết hạn",
                  value: 5,
                },
                {
                  key: 2,
                  text: "Hạ bài",
                  value: 2,
                },
                {
                  key: 3,
                  text: "Giao dịch xong",
                  value: 3,
                },
                {
                  key: 4,
                  text: "Không hoạt động",
                  value: 4,
                },
              ]}
              className="filter"
              value={sortValue}
              onChange={handleFilterOption}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      {listPost.length > 0 ? (
        <>
          <Table padded color="yellow" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign="center">
                  Mã bài đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Bài đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Người đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Ngày đăng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Trạng thái
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Hành động
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Xem chi tiết
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {listPost.length > 0 &&
                listPost.map((post, index) => (
                  <Table.Row key={index} style={{ cursor: "pointer" }}>
                    <Table.Cell singleLine textAlign="center">
                      {post.postId}
                    </Table.Cell>
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
                            <Item.Description>
                              {post.description}
                            </Item.Description>
                            <Item.Extra>
                              {post.ward}, {post.district}, {post.province}
                            </Item.Extra>
                          </Item.Content>
                        </Item>
                      </Item.Group>
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      <b>{post.user.fullName}</b> <br />
                      {post.user.phone}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {post.startDate}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      {post.block === false && post.status.id === 1 && (
                        <Label circular color="green">
                          ĐANG HOẠT ĐỘNG
                        </Label>
                      )}
                      {post.block === false && post.status.id === 2 && (
                        <Label circular color="orange">
                          HẠ BÀI
                        </Label>
                      )}
                      {post.block === false && post.status.id === 5 && (
                        <Label circular color="orange">
                          HẾT HẠN
                        </Label>
                      )}
                      {post.block === false && post.status.id === 3 && (
                        <Label circular color="blue">
                          GIAO DỊCH XONG
                        </Label>
                      )}
                      {post.block === true && (
                        <Label circular color="red">
                          KHÔNG HOẠT ĐỘNG
                        </Label>
                      )}
                    </Table.Cell>
                    <Table.Cell singleLine textAlign="center">
                      <Radio
                        toggle
                        onChange={() => {
                          setSelectedPostIndex(post.postId);
                          setOpenConfirm(true);
                        }}
                        checked={post.block === false}
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Icon
                        circular
                        inverted
                        color="teal"
                        name="eye"
                        style={{ cursor: "pointer" }}
                        onClick={async () => {
                          setOpenView(true);
                          setPostLoading(true);
                          const detailPost = await getDetailPost(post.postId);
                          setDetailPost(detailPost);
                          setPostLoading(false);
                        }}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
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
        <>
          <br />
          <Header as="h4">Không có bài đăng nào</Header>
        </>
      )}

      <ViewPostModal
        loading={loading}
        openViewPost={openView}
        setOpenViewPost={setOpenView}
        post={detailPost}
      />

      <Confirm
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Xác nhận chuyển đổi trạng thái bài đăng"
        open={openConfirm}
        onCancel={() => {
          setOpenConfirm(false);
        }}
        onConfirm={handleChangeStatus}
      />
    </PostManagementPageContainer>
  );
};

export default PostManagementPage;
