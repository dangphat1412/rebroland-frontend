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

      <DetailPostContainer
        size="large"
        open={openView}
        onClose={() => {
          setOpenView(false);
        }}
      >
        {detailPost ? (
          <>
            <Modal.Header>Chi tiết bài đăng</Modal.Header>
            <Modal.Content>
              <DetailPost post={detailPost} />
            </Modal.Content>
          </>
        ) : (
          <Dimmer active={postLoading} inverted>
            <Loader>Đang tải dữ liệu</Loader>
          </Dimmer>
        )}
      </DetailPostContainer>
    </PostManagementPageContainer>
  );
};

const DetailPost = ({ post }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      post.images.map((item) => {
        return {
          original: item.image,
          thumbnail: item.image,
        };
      })
    );
  }, [post.images]);

  return (
    <>
      <Header as="h3">{post.title}</Header>
      <Breadcrumb
        icon="right angle"
        sections={[
          {
            key: "province",
            content: `${post.province}`,
            link: true,
          },
          {
            key: "district",
            content: `${post.district}`,
            link: true,
          },
          { key: "ward", content: `${post.ward}`, link: true },
          {
            key: "address",
            content: `${post.address}`,
            active: true,
          },
        ]}
      />
      <Divider />
      <Grid>
        <Grid.Row>
          <Grid.Column verticalAlign="middle">
            <Statistic.Group floated="left">
              <Statistic>
                <Statistic.Label>Loại bất động sản</Statistic.Label>
                <Statistic.Value text>{post.propertyType.name}</Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Mức giá</Statistic.Label>
                <Statistic.Value text>
                  {post.unitPrice.id === 3
                    ? "Thoả thuận"
                    : calculatePrice(post).price}
                </Statistic.Value>
              </Statistic>
              <Statistic>
                <Statistic.Label>Diện tích</Statistic.Label>
                <Statistic.Value text>{post.area} m²</Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Header as="h2">Hình ảnh</Header>
      {post.images && (
        <ReactImageGallery
          items={items}
          showIndex={true}
          disableKeyDown={false}
          originalHeight={200}
          thumbnailPosition="left"
        />
      )}
      <Header as="h2">Thông tin mô tả</Header>
      <div>
        <pre>{post.description}</pre>
      </div>
      <Header as="h2">Đặc điểm bất động sản</Header>
      <Grid columns={3} className="property" divided="vertically">
        <Grid.Row>
          <PropertyItem
            iconClass="kikor kiko-square-footage"
            title="Diện tích"
            description={`${post.area} m²`}
          />
          <Grid.Column>
            <Item>
              <Item.Content verticalAlign="middle" className="property-content">
                <Item.Header className="property-header">
                  <span className="kikor kiko-price-real-estate"></span>
                  Mức giá
                </Item.Header>
                <Item.Description className="property-description">
                  {post.unitPrice.id === 1 &&
                    (post.price >= 1000000000
                      ? post.price / 1000000000 + " tỷ"
                      : post.price / 1000000 + " triệu")}
                  {post.unitPrice.id === 2 &&
                    (post.price * post.area >= 1000000000
                      ? (post.price * post.area) / 1000000000 + " tỷ"
                      : (post.price * post.area) / 1000000 + " triệu")}
                  {post.unitPrice.id === 3 && "Thoả thuận"}
                </Item.Description>
              </Item.Content>
            </Item>
          </Grid.Column>
          {post.direction && (
            <PropertyItem
              iconClass="kikor kiko-resale-property"
              title="Hướng nhà"
              description={post.direction.name}
            />
          )}
          {post.numberOfBedroom && (
            <PropertyItem
              iconClass="kikor kiko-bedroom"
              title="Phòng ngủ"
              description={post.numberOfBedroom}
            />
          )}
          {post.numberOfBathroom && (
            <PropertyItem
              iconClass="kikor kiko-bathroom"
              title="Phòng tắm"
              description={post.numberOfBathroom}
            />
          )}
          {post.numberOfFloor && (
            <PropertyItem
              iconClass="kikor kiko-stairs"
              title="Số tầng"
              description={post.numberOfFloor}
            />
          )}
          {post.frontispiece && (
            <PropertyItem
              iconClass="kikor kiko-real-estate-auction"
              title="Mặt tiền"
              description={`${post.frontispiece} m²`}
            />
          )}
        </Grid.Row>
      </Grid>

      <Header as="h2">Xem trên bản đồ</Header>
      {post.coordinates && (
        <Map
          position={post.coordinates.map((coordinate) => {
            return {
              lat: coordinate.latitude,
              lng: coordinate.longitude,
            };
          })}
        />
      )}
    </>
  );
};

const PropertyItem = ({ iconClass, title, description }) => {
  return (
    <Grid.Column>
      <Item>
        <Item.Content verticalAlign="middle" className="property-content">
          <Item.Header className="property-header">
            <span className={iconClass}></span>
            {title}
          </Item.Header>
          <Item.Description className="property-description">
            {description}
          </Item.Description>
        </Item.Content>
      </Item>
    </Grid.Column>
  );
};

export default PostManagementPage;
