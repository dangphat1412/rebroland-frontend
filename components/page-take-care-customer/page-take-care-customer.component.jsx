import React, { useState } from "react";
import {
  Button,
  Confirm,
  Dimmer,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Item,
  Loader,
  Segment,
  Tab,
  Table,
} from "semantic-ui-react";
import { TakeCareCustomerContainer } from "./page-take-care-customer.styles";
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
  endCare,
  getCustomerDetail,
} from "../../actions/user-care";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const TakeCareCustomerPage = ({ user, caringList }) => {
  const [cares, setCares] = useState(caringList.cares);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [openAppointmentSchedule, setOpenAppointmentSchedule] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openEndTakeCare, setOpenEndTakeCare] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openDeteleCustomer, setOpenDeleteCustomer] = useState(false);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);
  const [openUpdateCustomer, setOpenUpdateCustomer] = useState(false);
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetCustomerDetail = async (careId) => {
    setLoading(true);
    const data = await getCustomerDetail(careId);
    setCustomerDetail(data);
    setTimeline(data.timeline);
    setLoading(false);
    console.log(data);
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
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Xoá khách hàng",
          description: <p>Xoá khách hàng thất bại</p>,
        });
      }, 1000);
    }
    setOpenDeleteCustomer(false);
  };

  const handleEndTakeCare = async (userCareId) => {
    const status = await endCare(userCareId);
  };

  return (
    <TakeCareCustomerContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <Input
                name="search"
                icon="search"
                placeholder="Tìm kiếm theo tên hoặc số điện thoại"
              />

              <Table celled selectable sortable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Họ và tên</Table.HeaderCell>
                    <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Ngày bắt đầu</Table.HeaderCell>
                    <Table.HeaderCell>Trạng thái</Table.HeaderCell>
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
                            src={
                              care.userCared.avatar ||
                              "https://react.semantic-ui.com/images/avatar/large/daniel.jpg"
                            }
                            avatar
                            className="user-avatar-small"
                          />
                          <Header.Content>
                            {care.userCared.fullName}
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                      <Table.Cell>{care.userCared.phone}</Table.Cell>
                      <Table.Cell>
                        {care.userCared.email
                          ? care.userCared.email
                          : "Đang cập nhật"}
                      </Table.Cell>
                      <Table.Cell>{care.startDate}</Table.Cell>
                      <Table.Cell>Đang tư vấn</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
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
                                  src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                                />

                                <Item.Content verticalAlign="middle">
                                  <Item.Header>
                                    {customerDetail.user.userCared.fullName}
                                  </Item.Header>
                                  <Item.Description>
                                    <Icon name="phone" />{" "}
                                    {customerDetail.user.userCared.phone}
                                  </Item.Description>
                                  <Item.Description>
                                    <Icon name="mail" />
                                    {customerDetail.user.userCared.email
                                      ? customerDetail.user.userCared.email
                                      : "Đang cập nhật"}
                                  </Item.Description>
                                </Item.Content>
                              </Item>
                              <Header as="h5" style={{ display: "flex" }}>
                                <div>
                                  <Icon name="content" />
                                </div>
                                <div>{customerDetail.user.summarize}</div>
                              </Header>
                            </Item.Group>
                            <Segment
                              style={{ overflow: "auto", maxHeight: 340 }}
                            >
                              <Item.Group divided>
                                {customerDetail.posts.length > 0 &&
                                  customerDetail.posts.map((post, index) => {
                                    return (
                                      <Item key={index}>
                                        <Item.Image
                                          size="small"
                                          src={
                                            post.thumbnail ||
                                            "https://react.semantic-ui.com/images/wireframe/image.png"
                                          }
                                        />

                                        <Item.Content>
                                          <Item.Header>
                                            {post.title}
                                          </Item.Header>
                                          <Item.Description></Item.Description>
                                        </Item.Content>
                                      </Item>
                                    );
                                  })}
                              </Item.Group>
                            </Segment>
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
                              <Button
                                onClick={() => {
                                  setOpenEndTakeCare(true);
                                }}
                              >
                                <Icon name="times" />
                                Kết thúc
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
                                      key={index}
                                      className="vertical-timeline-element--work"
                                      contentStyle={{
                                        background: "rgb(33, 150, 243)",
                                        color: "#fff",
                                      }}
                                      contentArrowStyle={{
                                        borderRight:
                                          "7px solid rgb(33, 150, 243)",
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
                                      <h3 className="vertical-timeline-element-title">
                                        Art Director
                                      </h3>
                                      <p>{tl.description}</p>
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
        header="Thêm khách hàng"
        onOpen={openCreateCustomer}
        onClose={() => {
          setOpenCreateCustomer(false);
        }}
      >
        <FormCreateCustomer
          cares={cares}
          setCares={setCares}
          toast={toast}
          setOpenCreateCustomer={setOpenCreateCustomer}
        />
      </ModalItem>

      <ModalItem
        header="Chỉnh sửa thông tin khách hàng"
        onOpen={openUpdateCustomer}
        onClose={() => {
          setOpenUpdateCustomer(false);
        }}
      >
        <FormCreateCustomer
          userCareId={selectedCustomerIndex}
          customerInfo={cares.find((c) => c.careId === selectedCustomerIndex)}
          cares={cares}
          setCares={setCares}
          toast={toast}
          setOpenUpdateCustomer={setOpenUpdateCustomer}
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
          handleEndTakeCare(selectedCustomerIndex);
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
          handleDeleteCustomer(selectedCustomerIndex);
        }}
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
        content="Bạn có chắc chắn muốn xoá khách hàng khỏi danh sách chăm sóc khách hàng không?"
      />
    </TakeCareCustomerContainer>
  );
};

export default TakeCareCustomerPage;
