import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Confirm,
  Dimmer,
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
  Table,
} from "semantic-ui-react";
import {
  acceptReportPost,
  cancelReportPost,
  getDetailPost,
  getDetailReportPost,
  searchPostReport,
} from "../../actions/admin";
import calculatePrice from "../../utils/calculatePrice";
import InputField from "../input-field/input-field.component";
import ModalItem from "../modal-item/modal-item.component";
import ViewPostModal from "../modal-view-post/modal-view-post.component";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  ReportPostPageContainer,
} from "./page-report-post.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const ReportPostPage = ({
  reportData,
  setTotalResult,
  setImages,
  setShowGallaryView,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [data, setData] = useState(reportData || {});
  const [reportPosts, setReportPosts] = useState(reportData.posts);
  const [openViewPost, setOpenViewPost] = useState(false);

  const [openViewDetailReport, setOpenViewDetailReport] = useState(false);
  const [reportPostDetail, setReportPostDetail] = useState(null);
  const [reportPostLoading, setReportPostLoading] = useState(false);

  const [detailPost, setDetailPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState(0);
  const [params, setParams] = useState({});

  const [openConfirmAccept, setOpenConfirmAccept] = useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);

  const [selectedReportIndex, setSelectedReportIndex] = useState(null);
  const [openAccept, setOpenAccept] = useState(false);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(params, value, 0);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    setLoading(true);
    const posts = await searchPostReport(params, sortValue, pageNo);
    setData(posts);
    setReportPosts(posts.posts);
    setTotalResult(posts.totalResult);
    console.log(posts);
    setLoading(false);
  };

  const onSubmit = async (data, e) => {
    setSortValue(0);
    setParams(data);
    fetchAPI(data, 0, 0);
  };

  const handleAcceptReportPost = async () => {
    // const status = await acceptReportPost(selectedReportIndex);
    // if (status === 200) {
    //   const list = [...reportPosts];
    //   const index = list.findIndex(
    //     (report) => report.reportId === selectedReportIndex
    //   );
    //   list[index].reportStatus = 2;
    //   setReportPosts(list);
    // }
    // setOpenConfirmAccept(false);
  };

  const handleRejectReportPost = async () => {
    const status = await cancelReportPost(selectedReportIndex);
    if (status === 200) {
      const list = [...reportPosts];
      const index = list.findIndex(
        (report) => report.reportId === selectedReportIndex
      );
      list[index].reportStatus = 3;
      setReportPosts(list);
    }
    setOpenConfirmCancel(false);
  };

  return (
    <ReportPostPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
      <Grid>
        <Grid.Row>
          <Dimmer active={loading} inverted>
            <Loader>Đang tải dữ liệu</Loader>
          </Dimmer>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                name="key"
                placeholder="Tìm kiếm bài đăng"
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
                  text: "Đang xử lý",
                  value: 0,
                },
                {
                  key: 1,
                  text: "Đã xử lý",
                  value: 1,
                },
                {
                  key: 2,
                  text: "Tất cả",
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
      {reportPosts && reportPosts.length > 0 ? (
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
                  Xem
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Số báo cáo
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Trạng thái
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Hành động
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Ghi chú
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {reportPosts &&
                reportPosts.length > 0 &&
                reportPosts.map((post, index) => {
                  return (
                    <Table.Row
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        setOpenViewDetailReport(true);
                        setReportPostLoading(true);
                        const reportPostData = await getDetailReportPost(
                          post.reportId
                        );
                        setReportPostDetail(reportPostData);
                        setReportPostLoading(false);
                      }}
                    >
                      <Table.Cell textAlign="center">{post.postId}</Table.Cell>
                      <Table.Cell>
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
                        <b>{post.user.fullName}</b> <br />{" "}
                        <span>{post.user.phone}</span>
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        <Icon
                          circular
                          inverted
                          color="teal"
                          name="eye"
                          style={{ cursor: "pointer" }}
                          onClick={async (e) => {
                            e.stopPropagation();
                            setOpenViewPost(true);
                            setLoading(true);
                            const detailPost = await getDetailPost(post.postId);
                            setDetailPost(detailPost);
                            setLoading(false);
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.numberOfUserReport}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.reportStatus === 1 ? (
                          <Label circular color="red">
                            ĐANG XỬ LÝ
                          </Label>
                        ) : (
                          <Label circular color="green">
                            ĐÃ XỬ LÝ
                          </Label>
                        )}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.reportStatus === 1 && (
                          <div className="ui two buttons">
                            <Button
                              basic
                              color="green"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReportIndex(post.reportId);
                                setOpenAccept(true);
                              }}
                            >
                              Chấp nhận
                            </Button>
                            <Button
                              basic
                              color="red"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReportIndex(post.reportId);
                                setOpenConfirmCancel(true);
                              }}
                            >
                              Bỏ qua
                            </Button>
                          </div>
                        )}
                        {post.reportStatus === 2 && (
                          <Label circular color="green">
                            CHẤP NHẬN
                          </Label>
                        )}
                        {post.reportStatus === 3 && (
                          <Label circular color="red">
                            BỎ QUA
                          </Label>
                        )}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {post.comment}
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
        <>
          <br />
          <Header as="h4">Không có báo cáo nào</Header>
        </>
      )}

      <ViewPostModal
        loading={loading}
        openViewPost={openViewPost}
        setOpenViewPost={setOpenViewPost}
        post={detailPost}
      />

      <DetailPostReportModal
        openViewDetailReport={openViewDetailReport}
        setOpenViewDetailReport={setOpenViewDetailReport}
        reportPostDetail={reportPostDetail}
        reportPostLoading={reportPostLoading}
        setShowGallaryView={setShowGallaryView}
        setImages={setImages}
      />

      <Confirm
        open={openConfirmAccept}
        content={`Xác nhận báo cáo ${selectedReportIndex}`}
        onCancel={() => {
          setOpenConfirmAccept(false);
        }}
        onConfirm={() => {
          handleAcceptReportPost();
        }}
      />

      <Confirm
        open={openConfirmCancel}
        content={`Xác nhận BỎ QUA báo cáo ${selectedReportIndex}`}
        onCancel={() => {
          setOpenConfirmCancel(false);
        }}
        onConfirm={() => {
          handleRejectReportPost();
        }}
      />

      <ModalItem
        header="Xác nhận báo cáo"
        onOpen={openAccept}
        onClose={() => {
          setOpenAccept(false);
        }}
      >
        <AcceptForm
          toast={toast}
          setOpenAccept={setOpenAccept}
          reportPosts={reportPosts}
          setReportPosts={setReportPosts}
          selectedReportIndex={selectedReportIndex}
          data={data}
          setData={setData}
        />
      </ModalItem>
    </ReportPostPageContainer>
  );
};

const AcceptForm = ({
  toast,
  reportPosts,
  setReportPosts,
  setOpenAccept,
  selectedReportIndex,
  data,
  setData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (commentData, e) => {
    const status = await acceptReportPost(selectedReportIndex, commentData);
    if (status === 200) {
      const list = [...reportPosts];
      const index = list.findIndex(
        (report) => report.reportId === selectedReportIndex
      );
      list[index].reportStatus = 2;
      list[index].comment = commentData.content;
      setReportPosts(list);
      setTimeout(() => {
        toast({
          type: "success",
          title: "Xử lý báo cáo",
          description: <p>Xử lý báo cáo thành công</p>,
        });
      }, 100);
    }
    setOpenAccept(false);
  };

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          {...register("comment", {
            required: "Nhập lý do",
          })}
          fieldType="textarea"
          rows={5}
          label="Lý do"
          name="comment"
          placeholder="Nhập lý do huỷ bỏ thanh toán"
          onChange={handleChange}
          error={errors.comment}
          requiredField
        />
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="right">
              <Button
                type="button"
                onClick={() => {
                  setOpenAccept(false);
                }}
              >
                Huỷ bỏ
              </Button>
              <Button type="submit">Xác nhận</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
};

const DetailPostReportModal = ({
  openViewDetailReport,
  setOpenViewDetailReport,
  reportPostDetail,
  reportPostLoading,
  setShowGallaryView,
  setImages,
}) => {
  return (
    <Modal
      closeIcon
      size="large"
      open={openViewDetailReport}
      onClose={() => setOpenViewDetailReport(false)}
    >
      <Modal.Header>
        {reportPostDetail && (
          <>Có tất cả {reportPostDetail.list.length} báo cáo</>
        )}
      </Modal.Header>
      <Modal.Content>
        {reportPostDetail && !reportPostLoading ? (
          <>
            <Table padded color="yellow" selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine textAlign="center">
                    Người báo cáo
                  </Table.HeaderCell>
                  <Table.HeaderCell singleLine textAlign="center">
                    Họ và tên
                  </Table.HeaderCell>
                  <Table.HeaderCell singleLine textAlign="center">
                    Nội dung
                  </Table.HeaderCell>
                  <Table.HeaderCell singleLine textAlign="center">
                    Ngày báo cáo
                  </Table.HeaderCell>
                  <Table.HeaderCell singleLine textAlign="center">
                    Ảnh bằng chứng
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {reportPostDetail.list.length > 0 &&
                  reportPostDetail.list.map((detail, index) => {
                    return (
                      <Table.Row key={index} style={{ cursor: "pointer" }}>
                        <Table.Cell singleLine textAlign="center">
                          <Header as="h4" image>
                            <Image
                              src={
                                detail.user.avatar ||
                                "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                              }
                              avatar
                              className="user-avatar-small"
                            />
                            <Header.Content>{detail.user.phone}</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                          {detail.user.fullName}
                        </Table.Cell>
                        <Table.Cell>{detail.content}</Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                          {detail.startDate}
                        </Table.Cell>
                        <Table.Cell singleLine textAlign="center">
                          {detail.evidences.length > 0 && (
                            <a
                              onClick={() => {
                                setImages(detail.evidences.map((e) => e.image));
                                setShowGallaryView(true);
                              }}
                            >
                              {detail.evidences.length} ảnh
                            </a>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
            <PaginationContainer>
              <Pagination
                activePage={reportPostDetail.pageNo}
                boundaryRange={1}
                siblingRange={1}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true,
                }}
                totalPages={reportPostDetail.totalPages}
                // onPageChange={handlePaginationChange}
              />
            </PaginationContainer>
          </>
        ) : (
          <Dimmer active={reportPostLoading} inverted>
            <Loader>Đang tải dữ liệu</Loader>
          </Dimmer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ReportPostPage;
