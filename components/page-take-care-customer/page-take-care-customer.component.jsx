import React, { useState } from "react";
import {
  Button,
  Confirm,
  Dimmer,
  Divider,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Item,
  Label,
  Loader,
  Segment,
  Tab,
  Table,
} from "semantic-ui-react";
import {
  ListPostContainer,
  TakeCareCustomerContainer,
} from "./page-take-care-customer.styles";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import ModalItem from "../modal-item/modal-item.component";
import AppointmentScheduleForm from "../form-appointment-schedule/form-appointment-schedule.component";
import NoteForm from "../form-note/form-note.component";
import FormCreateCustomer from "../form-create-customer/form-create-customer.component";
import {
  deleteCustomer,
  deleteTimeline,
  editSummarize,
  endCare,
  getCustomerDetail,
  searchCustomer,
} from "../../actions/user-care";
import { SemanticToastContainer, toast } from "react-semantic-toasts";
import InputField from "../input-field/input-field.component";
import { useForm } from "react-hook-form";
import RatingForm from "../form-rating/form-rating.component";
import options from "../../utils/takeCareOptions";

const TakeCareCustomerPage = ({ user, caringList, setTotalResult }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  const [careData, setCareData] = useState(caringList);
  const [cares, setCares] = useState(caringList.cares);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [openAppointmentSchedule, setOpenAppointmentSchedule] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openEndTakeCare, setOpenEndTakeCare] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openDeteleCustomer, setOpenDeleteCustomer] = useState(false);
  const [openDeleteTimeline, setOpenDeleteTimeline] = useState(false);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [openEditSummarize, setOpenEditSummarize] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [rating, setRating] = useState(
    selectedCustomer && selectedCustomer.user.avgRate
  );
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(false);

  const onSubmitEditSummarize = async (data, e) => {
    const status = await editSummarize(selectedCustomerIndex, data);
    if (status === 201) {
      const list = [...cares];
      const index = list.findIndex(
        (user) => user.careId === selectedCustomerIndex
      );
      list[index].summarize = data.summarize;
      setCustomerDetail((prev) => ({
        ...prev,
        user: list[index],
      }));
      setOpenEditSummarize(false);
    }
  };

  const handleGetCustomerDetail = async (careId) => {
    setLoading(true);
    const data = await getCustomerDetail(careId);
    setCustomerDetail(data);
    setTimeline(data.timeline);
    setLoading(false);
  };

  const handleDeleteCustomer = async (customerId) => {
    const status = await deleteCustomer(customerId);
    if (status === 204) {
      setCares(cares.filter((c) => c.careId !== customerId));
      setTimeout(() => {
        toast({
          type: "success",
          title: "Xoá khách hàng",
          description: <p>Xoá khách hàng thành công</p>,
        });
      }, 100);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Xoá khách hàng",
          description: <p>Xoá khách hàng thất bại</p>,
        });
      }, 100);
    }
    setOpenDeleteCustomer(false);
  };

  const handleDeleteTimeline = async (timelineId) => {
    const status = await deleteTimeline(timelineId);
    if (status === 204) {
      setTimeline(timeline.filter((t) => t.detailId !== timelineId));
      setTimeout(() => {
        toast({
          type: "success",
          title: "Xoá dòng thời gian",
          description: <p>Xoá dòng thời gian thành công</p>,
        });
      }, 100);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Xoá dòng thời gian",
          description: <p>Xoá dòng thời gian thất bại</p>,
        });
      }, 100);
    }
    setOpenDeleteTimeline(false);
  };

  const handleEndTakeCare = async (selectedCustomer) => {
    const status = await endCare(selectedCustomer.careId);
    if (status === 200) {
      const data = [...cares];
      const index = data.findIndex((d) => d.careId === selectedCustomer.careId);
      data[index].status = true;
      setCares(data);
      setOpenEndTakeCare(false);
      setOpenRating(true);
      toast({
        type: "success",
        title: "Chăm sóc khách hàng",
        description: <p>Hoàn thành kết thúc chăm sóc khách hàng</p>,
      });
    }
  };

  const onSearchSubmit = async (data, e) => {
    setStatus(0);
    setKeyword(data.keyword);
    fetchAPI(data.keyword, 0, 0);
  };

  const [status, setStatus] = useState(0);
  const [keyword, setKeyword] = useState(null);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(keyword, status, activePage - 1);

  const handleFilterStatusOption = (e, { value }) => {
    setStatus(value);
    fetchAPI(keyword, value, 0);
  };

  const fetchAPI = async (keyword, status, pageNo) => {
    setCustomerLoading(true);
    const data = await searchCustomer(keyword, status, pageNo);
    setCareData(data);
    setCares(data.cares);
    setTotalResult(data.totalResult);
    setCustomerLoading(false);
  };

  return (
    <TakeCareCustomerContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={5}>
                    <Form onSubmit={handleSubmit(onSearchSubmit)}>
                      <InputField
                        icon="search"
                        name="keyword"
                        placeholder="Tìm kiếm"
                        onChange={async (e, { name, value }) => {
                          setValue(name, value);
                        }}
                        error={errors.keyword}
                      />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <Dropdown
                      selection
                      options={options}
                      className="filter-status"
                      value={status}
                      onChange={handleFilterStatusOption}
                    />
                    <Button
                      floated="right"
                      onClick={() => {
                        setOpenCreateCustomer(true);
                      }}
                    >
                      Thêm mới
                    </Button>
                  </Grid.Column>
                </Grid.Row>

                <Dimmer active={customerLoading} inverted>
                  <Loader inverted></Loader>
                </Dimmer>
                {careData && (
                  <Table celled selectable sortable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell singleLine textAlign="center">
                          Họ và tên
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Số điện thoại
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Email
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Ngày bắt đầu
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Trạng thái
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Hành động
                        </Table.HeaderCell>
                        <Table.HeaderCell singleLine textAlign="center">
                          Xoá
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {cares.map((care, index) => (
                        <Table.Row
                          key={index}
                          style={{ cursor: "pointer" }}
                          active={care.careId === selectedCustomerIndex}
                          onClick={(e) => {
                            setSelectedCustomerIndex(care.careId);
                            handleGetCustomerDetail(care.careId);
                          }}
                        >
                          <Table.Cell>
                            <Header as="h4" image>
                              <Image
                                src={care.user.avatar || "/default-avatar.png"}
                                avatar
                                className="user-avatar-small"
                              />
                              <Header.Content>
                                {care.user.fullName}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {care.user.phone}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {care.user.email
                              ? care.user.email
                              : "Đang cập nhật"}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {care.startDate}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {care.status === true ? (
                              <Label circular color="green">
                                Kết thúc tư vấn
                              </Label>
                            ) : (
                              <Label circular color="blue">
                                Đang tư vấn
                              </Label>
                            )}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            {care.status === false && (
                              <Button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(care);
                                  setSelectedCustomer(care);
                                  setOpenEndTakeCare(true);
                                }}
                              >
                                {/* <Icon name="times" /> */}
                                Kết thúc
                              </Button>
                            )}
                          </Table.Cell>
                          <Table.Cell singleLine textAlign="center">
                            <Icon
                              circular
                              inverted
                              color="red"
                              name="trash alternate outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCustomer(care);
                                setOpenDeleteCustomer(true);
                              }}
                            />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                  {
                    menuItem: "Tổng quan",
                    render: () => (
                      <Tab.Pane as="div">
                        {customerDetail ? (
                          <>
                            <Item.Group>
                              <Item>
                                <Image
                                  size="tiny"
                                  alt="image"
                                  src={
                                    customerDetail.user.user.avatar ||
                                    "/default-avatar.png"
                                  }
                                  className="user-avatar"
                                />
                                <Item.Content verticalAlign="middle">
                                  <Item.Header>
                                    {customerDetail.user.user.fullName}
                                  </Item.Header>
                                  <Item.Description>
                                    <Icon name="phone" />{" "}
                                    {customerDetail.user.user.phone}
                                  </Item.Description>
                                  <Item.Description>
                                    <Icon name="mail" />
                                    {customerDetail.user.user.email
                                      ? customerDetail.user.user.email
                                      : "Đang cập nhật"}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Header as="h5" style={{ display: "flex" }}>
                                <div>
                                  <Icon name="content" />
                                </div>
                                <div style={{ width: "95%" }}>
                                  <pre>
                                    {customerDetail.user.summarize ? (
                                      <span>
                                        {customerDetail.user.summarize}
                                      </span>
                                    ) : (
                                      <b>Không có mô tả nào</b>
                                    )}
                                    <Icon
                                      name="pencil alternate"
                                      color="yellow"
                                      style={{
                                        paddingLeft: "10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        setOpenEditSummarize(true);
                                      }}
                                    />
                                  </pre>
                                </div>
                              </Header>
                            </Item.Group>
                            {customerDetail.posts.length > 0 && (
                              <ListPostContainer
                                style={{ overflow: "auto", maxHeight: 340 }}
                              >
                                <Item.Group divided>
                                  {customerDetail.posts.map((post, index) => {
                                    return (
                                      <Item key={index}>
                                        <Item.Image
                                          size="small"
                                          src={
                                            post.thumbnail ||
                                            "/default-thumbnail.png"
                                          }
                                        />

                                        <Item.Content>
                                          <Item.Header>
                                            {post.title}
                                          </Item.Header>
                                          <Item.Description>
                                            {post.description}
                                          </Item.Description>
                                          <Item.Extra>
                                            {post.startDate}
                                          </Item.Extra>
                                        </Item.Content>
                                      </Item>
                                    );
                                  })}
                                </Item.Group>
                              </ListPostContainer>
                            )}
                          </>
                        ) : (
                          <>Chọn một khách hàng để xem chi tiết</>
                        )}
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Dòng thời gian",
                    render: () => (
                      <Tab.Pane
                        as="div"
                        style={{ height: "700px", overflow: "auto" }}
                      >
                        {customerDetail ? (
                          <>
                            <div>
                              <Button
                                onClick={() => {
                                  setOpenAppointmentSchedule(true);
                                }}
                              >
                                <Icon name="calendar alternate outline" />
                                Thêm lịch
                              </Button>
                              <Button
                                onClick={() => {
                                  setOpenNote(true);
                                }}
                              >
                                <Icon name="pencil" />
                                Ghi chú
                              </Button>
                            </div>
                            <Divider />
                            <VerticalTimeline
                              layout="1-column-left"
                              lineColor="#ff9219"
                            >
                              {timeline &&
                                timeline.map((tl, index) => {
                                  return (
                                    <VerticalTimelineElement
                                      style={{ position: "relative" }}
                                      key={index}
                                      className="vertical-timeline-element--work"
                                      contentStyle={{
                                        background:
                                          tl.type === "NOTE"
                                            ? "rgb(33, 150, 243)"
                                            : "green",
                                        color: "#fff",
                                        fontFamily: "Tahoma",
                                      }}
                                      contentArrowStyle={{
                                        borderRight:
                                          tl.type === "NOTE"
                                            ? "7px solid rgb(33, 150, 243)"
                                            : "7px solid green",
                                        // "7px solid rgb(33, 150, 243)",
                                      }}
                                      date={tl.dateCreate}
                                      iconStyle={{
                                        background: "#ff9219",
                                        color: "#fff",
                                      }}
                                      icon={
                                        <Icon
                                          name={
                                            tl.type === "NOTE"
                                              ? "pencil"
                                              : "calendar alternate outline"
                                          }
                                          style={{ margin: "11px" }}
                                        />
                                      }
                                    >
                                      <h3
                                        className="vertical-timeline-element-title"
                                        style={{ fontFamily: "Tahoma" }}
                                      >
                                        {tl.type === "NOTE"
                                          ? "Ghi chú"
                                          : "Lịch hẹn"}
                                      </h3>
                                      <Icon
                                        circular
                                        inverted
                                        color="red"
                                        name="close"
                                        style={{
                                          position: "absolute",
                                          top: "-10px",
                                          right: "-15px",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setSelectedTimeline(tl);
                                          setOpenDeleteTimeline(true);
                                        }}
                                      />
                                      <pre>{tl.description}</pre>
                                    </VerticalTimelineElement>
                                  );
                                })}
                            </VerticalTimeline>
                          </>
                        ) : (
                          <>Chọn một khách hàng để xem chi tiết</>
                        )}
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Segment>
            <Dimmer active={loading} inverted>
              <Loader inverted>Đang tải</Loader>
            </Dimmer>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <ModalItem
        header="Chỉnh sửa mô tả khách hàng"
        onOpen={openEditSummarize}
        onClose={() => {
          setOpenEditSummarize(false);
        }}
      >
        <Form onSubmit={handleSubmit(onSubmitEditSummarize)}>
          <InputField
            fieldType="textarea"
            label="Mô tả"
            name="summarize"
            onChange={async (e, { name, value }) => {
              setValue(name, value);
            }}
            defaultValue={customerDetail && customerDetail.user.summarize}
            sublabel="Tối đa 200 ký tự"
            maxLength={200}
          />
          <Button type="submit" fluid>
            Tạo mới
          </Button>
        </Form>
      </ModalItem>

      <ModalItem
        header="Thêm khách hàng"
        onOpen={openCreateCustomer}
        onClose={() => {
          setOpenCreateCustomer(false);
        }}
      >
        <FormCreateCustomer
          user={user}
          cares={cares}
          setCares={setCares}
          toast={toast}
          setOpenCreateCustomer={setOpenCreateCustomer}
        />
      </ModalItem>

      <ModalItem
        header="Thêm lịch"
        center={true}
        size="tiny"
        onOpen={openAppointmentSchedule}
        onClose={() => {
          setOpenAppointmentSchedule(false);
        }}
      >
        <AppointmentScheduleForm
          setTimeline={setTimeline}
          timeline={timeline}
          userCareId={selectedCustomerIndex}
          setOpenAppointmentSchedule={setOpenAppointmentSchedule}
        />
      </ModalItem>

      <ModalItem
        header="Ghi chú"
        center={true}
        onOpen={openNote}
        size="tiny"
        onClose={() => {
          setOpenNote(false);
        }}
      >
        <NoteForm
          setTimeline={setTimeline}
          timeline={timeline}
          userCareId={selectedCustomerIndex}
          setOpenNote={setOpenNote}
        />
      </ModalItem>

      <Confirm
        open={openEndTakeCare}
        header="Xác nhận kết thúc"
        onCancel={() => {
          setOpenEndTakeCare(false);
        }}
        onConfirm={() => {
          handleEndTakeCare(selectedCustomer);
        }}
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Bạn có chắc chắn muốn kết thúc quá trình chăm sóc khách hàng với người này?"
      />

      <Confirm
        open={openDeteleCustomer}
        header="Xác nhận xoá khách hàng"
        onCancel={() => {
          setOpenDeleteCustomer(false);
        }}
        onConfirm={() => {
          handleDeleteCustomer(selectedCustomer.careId);
        }}
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Bạn có chắc chắn muốn xoá khách hàng khỏi danh sách chăm sóc khách hàng không?"
      />

      <Confirm
        open={openDeleteTimeline}
        header="Xác nhận xoá dòng thời gian"
        onCancel={() => {
          setOpenDeleteTimeline(false);
        }}
        onConfirm={() => {
          handleDeleteTimeline(selectedTimeline.detailId);
        }}
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Bạn có chắc chắn muốn xoá dòng thời gian này không?"
      />

      <ModalItem
        header="Đánh giá người dùng"
        onOpen={openRating}
        onClose={() => {
          setOpenRating(false);
        }}
      >
        <RatingForm
          type="user"
          toast={toast}
          setOpenRating={setOpenRating}
          rating={rating}
          ratedUser={selectedCustomer && selectedCustomer.user}
          setRating={setRating}
        />
      </ModalItem>
    </TakeCareCustomerContainer>
  );
};

export default TakeCareCustomerPage;
