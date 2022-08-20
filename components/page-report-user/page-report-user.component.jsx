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
  Label,
  Loader,
  Modal,
  Table,
} from "semantic-ui-react";
import {
  acceptReportUser,
  cancelReportUser,
  getDetailReportUser,
  searchUserReport,
} from "../../actions/admin";
import InputField from "../input-field/input-field.component";
import ModalItem from "../modal-item/modal-item.component";
import Pagination from "../pagination/pagination.component";
import {
  PaginationContainer,
  ReportUserPageContainer,
} from "./page-report-user.styles";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const ReportUserPage = ({
  reportData,
  setTotalResult,
  setImages,
  setShowGallaryView,
}) => {
  console.log(reportData);
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [data, setData] = useState(reportData || {});
  const [reportUsers, setReportUsers] = useState(
    reportData && reportData.users
  );
  const [openViewUser, setOpenViewUser] = useState(false);

  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState(0);
  const [params, setParams] = useState({});

  const [openConfirmAccept, setOpenConfirmAccept] = useState(false);
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);

  const [selectedReportIndex, setSelectedReportIndex] = useState(null);

  const [openViewDetailReport, setOpenViewDetailReport] = useState(false);
  const [reportUserLoading, setReportUserLoading] = useState(false);
  const [reportUserDetail, setReportUserDetail] = useState(null);

  const handleRejectReportPost = async () => {
    const status = await cancelReportUser(selectedReportIndex);
    if (status === 200) {
      const list = [...reportUsers];
      const index = list.findIndex(
        (report) => report.reportId === selectedReportIndex
      );
      list[index].status = 3;
      setReportUsers(list);
    }
    setOpenConfirmCancel(false);
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, sortValue, activePage - 1);

  const handleFilterOption = (e, { value }) => {
    setSortValue(value);
    fetchAPI(params, value, 0);
  };

  const onSubmit = (data, e) => {
    setSortValue(0);
    setParams(data);
    fetchAPI(data, 0, 0);
  };

  const fetchAPI = async (params, sortValue, pageNo) => {
    setLoading(true);
    const users = await searchUserReport(params, sortValue, pageNo);
    setData(users);
    setReportUsers(users.users);
    setTotalResult(users.totalResult);
    setLoading(false);
  };

  return (
    <ReportUserPageContainer>
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
      {reportUsers && reportUsers.length > 0 ? (
        <>
          <Table padded color="yellow" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine textAlign="center">
                  Mã người dùng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Người dùng
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Họ và tên
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Xem thông tin
                </Table.HeaderCell>
                <Table.HeaderCell singleLine textAlign="center">
                  Tổng số báo cáo
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
              {reportUsers &&
                reportUsers.length > 0 &&
                reportUsers.map((user, index) => {
                  return (
                    <Table.Row
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={async () => {
                        setOpenViewDetailReport(true);
                        setReportUserLoading(true);
                        const reportUserData = await getDetailReportUser(
                          user.reportId
                        );
                        setReportUserDetail(reportUserData);
                        setReportUserLoading(false);
                      }}
                    >
                      <Table.Cell singleLine textAlign="center">
                        {user.user.id}
                      </Table.Cell>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Image
                            src={
                              user.user.avatar ||
                              "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                            }
                            avatar
                            className="user-avatar-small"
                          />
                          <Header.Content>{user.user.phone}</Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        <span>{user.user.fullName}</span>
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
                            // setOpenViewPost(true);
                            // setLoading(true);
                            // const detailPost = await getDetailPost(post.postId);
                            // setDetailPost(detailPost);
                            // setLoading(false);
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {user.numberOfUserReport}
                      </Table.Cell>
                      <Table.Cell singleLine textAlign="center">
                        {user.status === 1 ? (
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
                        {user.status === 1 && (
                          <div className="ui three buttons">
                            <Button
                              basic
                              color="green"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedReportIndex(user.reportId);
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
                                setSelectedReportIndex(user.reportId);
                                setOpenConfirmCancel(true);
                              }}
                            >
                              Bỏ qua
                            </Button>
                          </div>
                        )}
                        {user.status === 2 && (
                          <Label circular color="green">
                            CHẤP NHẬN
                          </Label>
                        )}
                        {user.status === 3 && (
                          <Label circular color="red">
                            BỎ QUA
                          </Label>
                        )}
                      </Table.Cell>
                      <Table.Cell>{user.comment}</Table.Cell>
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

      {/* <ViewPostModal
        loading={loading}
        openViewPost={openViewPost}
        setOpenViewPost={setOpenViewPost}
        post={detailPost}
      /> */}

      <DetailPostReportModal
        openViewDetailReport={openViewDetailReport}
        setOpenViewDetailReport={setOpenViewDetailReport}
        reportUserDetail={reportUserDetail}
        reportUserLoading={reportUserLoading}
        setShowGallaryView={setShowGallaryView}
        setImages={setImages}
      />
      {/* 
      <Confirm
        open={openConfirmAccept}
        content={`Xác nhận báo cáo ${selectedReportIndex}`}
        onCancel={() => {
          setOpenConfirmAccept(false);
        }}
        onConfirm={() => {
          handleAcceptReportPost();
        }}
      /> */}

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
          reportUsers={reportUsers}
          setReportUsers={setReportUsers}
          selectedReportIndex={selectedReportIndex}
          detail={reportUserDetail}
          data={data}
          setData={setData}
        />
      </ModalItem>
    </ReportUserPageContainer>
  );
};

const AcceptForm = ({
  toast,
  setOpenAccept,
  reportUsers,
  setReportUsers,
  selectedReportIndex,
  detail,
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
    console.log(commentData);
    const status = await acceptReportUser(selectedReportIndex, commentData);
    if (status === 200) {
      const list = [...reportUsers];
      const index = list.findIndex(
        (report) => report.reportId === selectedReportIndex
      );
      list[index].status = 2;
      list[index].comment = commentData.comment;
      setReportUsers(list);
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
  reportUserDetail,
  reportUserLoading,
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
        {reportUserDetail && (
          <>Có tất cả {reportUserDetail.list.length} báo cáo</>
        )}
      </Modal.Header>
      <Modal.Content>
        {reportUserDetail && !reportUserLoading ? (
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
                {reportUserDetail.list.length > 0 &&
                  reportUserDetail.list.map((detail, index) => {
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
                activePage={reportUserDetail.pageNo}
                boundaryRange={1}
                siblingRange={1}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true,
                }}
                totalPages={reportUserDetail.totalPages}
                // onPageChange={handlePaginationChange}
              />
            </PaginationContainer>
          </>
        ) : (
          <Dimmer active={reportUserLoading} inverted>
            <Loader>Đang tải dữ liệu</Loader>
          </Dimmer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default ReportUserPage;
