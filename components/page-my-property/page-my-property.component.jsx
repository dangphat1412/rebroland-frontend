import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Confirm,
  Dimmer,
  Dropdown,
  Form,
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
  extendPost,
  getPostById,
  getPostsByUser,
  getPricePerDay,
} from "../../actions/post";
import convertToSlug from "../../utils/convertToSlug";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  MyPropertiesPageContainer,
  PaginationContainer,
} from "./page-my-property.styles";
import options from "../../utils/RealEstateSortValue";
import statusOptions from "../../utils/typePropertyOptions";
import calculatePrice from "../../utils/calculatePrice";
import ModalItem from "../modal-item/modal-item.component";
import { useForm } from "react-hook-form";
import PaymentInformationForm from "../payment-information-form/payment-information-form.component";
import { default as directionList } from "../../utils/directionList";
import EditPostForm from "../form-edit-post/form-edit-post.component";
import Router from "next/router";

const MyPropertyPage = ({ user, postsData, setTotalResult }) => {
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
    const posts = await getPostsByUser(propertyType, status, sortValue, pageNo);
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
    <MyPropertiesPageContainer>
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
                        setData={setData}
                        user={user}
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
                        user={user}
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
                        data={data}
                        user={user}
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
    </MyPropertiesPageContainer>
  );
};

const ListProperty = ({ user, data, setData, handlePaginationChange }) => {
  const [postList, setPostList] = useState(data.posts);
  const [openExtendPost, setOpenExtendPost] = useState(false);
  const [openReupPost, setOpenReupPost] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDropPost, setOpenDropPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);
  const [detailPost, setDetailPost] = useState(null);
  const [editedPost, setEditedPost] = useState(null);
  const [priceData, setPriceData] = useState(null);

  const [editedLoading, setEditedLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      const data = await getPricePerDay();
      setPriceData(data);
    };

    fetchAPI();
  }, []);

  return (
    <>
      {data.posts.length > 0 ? (
        <>
          <Table padded selectable color="yellow">
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
                data.posts.length > 0 &&
                data.posts.map((post, index) => (
                  <RealEstateItem
                    post={post}
                    key={index}
                    setOpenExtendPost={setOpenExtendPost}
                    setDetailPost={setDetailPost}
                    setOpenEditPost={setOpenEditPost}
                    setOpenReupPost={setOpenReupPost}
                    setEditedPost={setEditedPost}
                    setEditedLoading={setEditedLoading}
                    setOpenDropPost={setOpenDropPost}
                    setOpenDeletePost={setOpenDeletePost}
                  />
                ))}
            </Table.Body>
          </Table>
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
      ) : (
        <Header>Không có bất động sản nào</Header>
      )}
      <ModalItem
        header="Gia hạn bài viết"
        size="small"
        onOpen={openExtendPost}
        onClose={() => {
          setOpenExtendPost(false);
        }}
      >
        {detailPost && (
          <>
            <FormExtendPost
              user={user}
              data={data}
              setData={setData}
              priceData={priceData}
              detailPost={detailPost}
              setOpenExtendPost={setOpenExtendPost}
              setPostList={setPostList}
              postList={postList}
            />
          </>
        )}
      </ModalItem>

      <ModalItem
        header="Đăng lại"
        size="small"
        onOpen={openReupPost}
        onClose={() => {
          setOpenReupPost(false);
        }}
      >
        {detailPost && (
          <>
            <FormReupPost
              user={user}
              priceData={priceData}
              detailPost={detailPost}
              setOpenExtendPost={setOpenExtendPost}
              setOpenReupPost={setOpenExtendPost}
              setPostList={setPostList}
              postList={postList}
            />
          </>
        )}
      </ModalItem>

      <ModalItem
        header="Chỉnh sửa bài viết"
        size="small"
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
        open={openDropPost}
        header="Xác nhận hạ bài"
        content="Bạn có chắc chắn muốn hạ bài không? Nếu bạn hạ bài bạn sẽ mất những ngày còn lại"
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

      <Confirm
        open={openDeletePost}
        header="Xác nhận xoá bài viết"
        content="Bạn có chắc chắn muốn xoá bài viết không?"
        onCancel={() => {
          setOpenDeletePost(false);
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

const FormExtendPost = ({
  user,
  priceData,
  detailPost,
  setOpenExtendPost,
  data,
  setData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearError,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numberOfPostedDay: 7,
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (timeData, e) => {
    const status = await extendPost(detailPost.postId, timeData);
    if (status === 201) {
      Router.reload();
    }
  };

  return (
    <>
      {priceData && detailPost && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PaymentInformationForm
            user={user}
            priceData={priceData}
            setValue={setValue}
            getValues={getValues}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Form>
      )}
    </>
  );
};

const FormReupPost = ({
  user,
  priceData,
  detailPost,
  setOpenReupPost,
  postList,
  setPostList,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearError,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      numberOfPostedDay: 7,
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data, e) => {
    const status = await extendPost(detailPost.postId, data);
    if (status === 201) {
      Router.reload();
    }
  };

  return (
    <>
      {priceData && detailPost && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PaymentInformationForm
            user={user}
            priceData={priceData}
            setValue={setValue}
            getValues={getValues}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        </Form>
      )}
    </>
  );
};

const RealEstateItem = ({
  post,
  setOpenExtendPost,
  setOpenEditPost,
  setDetailPost,
  setEditedPost,
  setEditedLoading,
  setOpenReupPost,
  setOpenDropPost,
  setOpenDeletePost,
}) => {
  const { price, pricePerSquare } = calculatePrice(post);
  const directionName = directionList.find(
    (option) => option.id === post.directionId
  );
  return (
    <Table.Row>
      <Table.Cell width={11}>
        <Item.Group>
          <Item>
            <Item.Image
              size="medium"
              src={
                post.thumbnail ||
                "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
              }
            />
            <Item.Content className="item-content">
              <Item.Header>{post.title}</Item.Header>
              <List horizontal size="large">
                <List.Item>
                  <List.Content>
                    <List.Header>
                      {post.unitPrice.id === 3 ? "Thoả thuận" : price}
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>
                      {post.unitPrice.id !== 3 && pricePerSquare}
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
                      <List.Header>{directionName.name}</List.Header>
                    </List.Content>
                  </List.Item>
                )}
              </List>
              <Item.Description>{post.description}</Item.Description>
              <Item.Extra>
                {post.ward}, {post.district}, {post.province}
              </Item.Extra>
              <Item.Extra>{post.startDate}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Table.Cell>
      <Table.Cell textAlign="center">{post.postId}</Table.Cell>
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
            <b>Ngày hết hạn: {post.endDate.split(" ")[0]}</b>
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
      <Table.Cell singleLine textAlign="center">
        <Popup
          content="Xem bài viết"
          trigger={
            <Icon
              circular
              inverted
              color="teal"
              name="eye"
              style={{ cursor: "pointer" }}
              onClick={async () => {
                Router.push(
                  `/trang-ca-nhan/bat-dong-san-cua-toi/${convertToSlug(
                    post.title
                  )}-${post.postId}`
                );
              }}
            />
          }
        />

        {post.status.id !== 3 && (
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
                  const postData = await getPostById(post.postId);
                  setEditedPost(postData.post);
                  setEditedLoading(false);
                }}
              />
            }
          />
        )}

        {post.block === false && post.status.id === 5 && (
          <Popup
            content="Gia hạn bài viết"
            trigger={
              <Icon
                style={{ cursor: "pointer" }}
                circular
                inverted
                color="orange"
                name="clock outline"
                onClick={() => {
                  setDetailPost(post);
                  setOpenExtendPost(true);
                }}
              />
            }
          />
        )}

        {post.block === true && (
          <Popup
            content="Khiếu nại"
            trigger={
              <Icon
                style={{ cursor: "pointer" }}
                circular
                inverted
                color="orange"
                name="file alternate outline"
                onClick={() => {
                  // setDetailPost(post);
                  // setOpenExtendPost(true);
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

        <Link href="/">
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
                  setOpenDeletePost(true);
                }}
              />
            }
          />
        </Link>
      </Table.Cell>
    </Table.Row>
  );
};

export default MyPropertyPage;
