import React, { useState } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Menu,
  Modal,
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
import InputField from "../input-field/input-field.component";

const TakeCareCustomerPage = ({ user }) => {
  const [openAppointmentSchedule, setOpenAppointmentSchedule] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [openEndTakeCare, setOpenEndTakeCare] = useState(false);
  return (
    <TakeCareCustomerContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Segment>
              <Table celled selectable sortable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Họ và tên</Table.HeaderCell>
                    <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                    <Table.HeaderCell>Email</Table.HeaderCell>
                    <Table.HeaderCell>Ngày bắt đầu</Table.HeaderCell>
                    <Table.HeaderCell>Trạng thái</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row
                    onClick={(e) => {
                      console.log(e);
                    }}
                  >
                    <Table.Cell>Nguyễn Văn A</Table.Cell>
                    <Table.Cell>0918767654</Table.Cell>
                    <Table.Cell>nguyenvana@gmail.com</Table.Cell>
                    <Table.Cell>01/01/2022</Table.Cell>
                    <Table.Cell>Đang tư vấn</Table.Cell>
                    <Table.Cell>
                      <Button fluid>Chi tiết</Button>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Nguyễn Văn A</Table.Cell>
                    <Table.Cell>0918767654</Table.Cell>
                    <Table.Cell>nguyenvana@gmail.com</Table.Cell>
                    <Table.Cell>01/01/2022</Table.Cell>
                    <Table.Cell>Đang tư vấn</Table.Cell>
                    <Table.Cell>
                      <Button fluid>Chi tiết</Button>
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Nguyễn Văn A</Table.Cell>
                    <Table.Cell>0918767654</Table.Cell>
                    <Table.Cell>nguyenvana@gmail.com</Table.Cell>
                    <Table.Cell>01/01/2022</Table.Cell>
                    <Table.Cell>Đang tư vấn</Table.Cell>
                    <Table.Cell>
                      <Button fluid>Chi tiết</Button>
                    </Table.Cell>
                  </Table.Row>
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
                        <Item.Group>
                          <Item>
                            <Image
                              size="tiny"
                              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                            />

                            <Item.Content verticalAlign="middle">
                              <Item.Header>Nguyễn Văn A</Item.Header>
                              <Item.Description>
                                <Icon name="phone" /> 0917768923
                              </Item.Description>
                              <Item.Description>
                                <Icon name="mail" /> phatnguyen1412@gmail.com
                              </Item.Description>
                            </Item.Content>
                          </Item>
                          <Header as="h5" style={{ display: "flex" }}>
                            <div>
                              <Icon name="content" />
                            </div>
                            <div>
                              Có nhu cầu mua căn hộ chung cư 3 phòng ngủ, 2
                              phòng tắm khu vực Nam Từ Liêm hoặc Bắc Từ Liêm.
                              Ngoài ra muốn tìm một nhà đất khu Phạm Hùng
                            </div>
                          </Header>
                        </Item.Group>
                        <Segment style={{ overflow: "auto", maxHeight: 340 }}>
                          <Item.Group divided>
                            <Item>
                              <Item.Image
                                size="small"
                                src="https://react.semantic-ui.com/images/wireframe/image.png"
                              />

                              <Item.Content>
                                <Item.Header as="a">Cute Dog</Item.Header>
                                <Item.Description>
                                  Cute dogs come in a variety of shapes and
                                  sizes. Some cute dogs are cute for their
                                  adorable faces, others for their tiny stature,
                                  and even others for their massive size. Many
                                  people also have their own barometers for what
                                  makes a cute dog.
                                </Item.Description>
                                <Item.Extra>
                                  <Icon color="green" name="check" /> 121 Votes
                                </Item.Extra>
                              </Item.Content>
                            </Item>

                            <Item>
                              <Item.Image
                                size="small"
                                src="https://react.semantic-ui.com/images/wireframe/image.png"
                              />

                              <Item.Content>
                                <Item.Header as="a">Cute Dog</Item.Header>
                                <Item.Description>
                                  Cute dogs come in a variety of shapes and
                                  sizes. Some cute dogs are cute for their
                                  adorable faces, others for their tiny stature,
                                  and even others for their massive size. Many
                                  people also have their own barometers for what
                                  makes a cute dog.
                                </Item.Description>
                                <Item.Extra content="121 Votes" />
                              </Item.Content>
                            </Item>

                            <Item>
                              <Item.Image
                                size="small"
                                src="https://react.semantic-ui.com/images/wireframe/image.png"
                              />
                              <Item.Content
                                header="Cute Dog"
                                extra="121 Votes"
                              />
                            </Item>
                          </Item.Group>
                        </Segment>
                      </Tab.Pane>
                    ),
                  },
                  {
                    menuItem: "Dòng thời gian",
                    render: () => (
                      <Tab.Pane as="div">
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
                          <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            contentArrowStyle={{
                              borderRight: "7px solid  rgb(33, 150, 243)",
                            }}
                            date="2011 - present"
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            // icon={<Icon name="heart" />}
                          >
                            <h3 className="vertical-timeline-element-title">
                              Creative Director
                            </h3>
                            <h4 className="vertical-timeline-element-subtitle">
                              Miami, FL
                            </h4>
                            <p>
                              Creative Direction, User Experience, Visual
                              Design, Project Management, Team Leading
                            </p>
                          </VerticalTimelineElement>
                          <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            date="2010 - 2011"
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                          >
                            <h3 className="vertical-timeline-element-title">
                              Art Director
                            </h3>
                            <h4 className="vertical-timeline-element-subtitle">
                              San Francisco, CA
                            </h4>
                            <p>
                              Creative Direction, User Experience, Visual
                              Design, SEO, Online Marketing
                            </p>
                          </VerticalTimelineElement>
                          <VerticalTimelineElement
                            className="vertical-timeline-element--work"
                            contentStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            contentArrowStyle={{
                              borderRight: "7px solid  rgb(33, 150, 243)",
                            }}
                            date="2011 - present"
                            iconStyle={{
                              background: "rgb(33, 150, 243)",
                              color: "#fff",
                            }}
                            // icon={<Icon name="heart" />}
                          >
                            <h3 className="vertical-timeline-element-title">
                              Creative Director
                            </h3>
                            <h4 className="vertical-timeline-element-subtitle">
                              Miami, FL
                            </h4>
                            <p>
                              Creative Direction, User Experience, Visual
                              Design, Project Management, Team Leading
                            </p>
                          </VerticalTimelineElement>
                        </VerticalTimeline>
                      </Tab.Pane>
                    ),
                  },
                ]}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ModalItem
        header="Thêm lịch"
        center={true}
        size="tiny"
        onOpen={openAppointmentSchedule}
        onClose={() => {
          setOpenAppointmentSchedule(false);
        }}
      >
        <AppointmentSchedule
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
        <Note setOpenNote={setOpenNote} />
      </ModalItem>

      <ModalItem
        header="Kết thúc"
        center={true}
        onOpen={openEndTakeCare}
        onClose={() => {
          setOpenEndTakeCare(false);
        }}
      >
        <EndTakeCare setOpenEndTakeCare={setOpenEndTakeCare} />
      </ModalItem>
    </TakeCareCustomerContainer>
  );
};

const AppointmentSchedule = ({ setOpenAppointmentSchedule }) => {
  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input type="date" fluid label="Ngày hẹn" />
        <Form.Input type="time" fluid label="Giờ hẹn" />
        <Form.Select
          fluid
          label="Báo trước"
          options={[
            { key: 0, text: "Không", value: 0 },
            { key: 1, text: "30 phút", value: 1 },
            { key: 2, text: "1 tiếng", value: 2 },
            { key: 3, text: "2 tiếng", value: 3 },
            { key: 4, text: "3 tiếng", value: 4 },
            { key: 5, text: "1 ngày", value: 5 },
          ]}
          value={0}
        />
      </Form.Group>
      <InputField
        fieldType="textarea"
        rows={3}
        label="Mô tả công việc"
        name="description"
        requiredField
      />
      <Grid>
        <Grid.Column textAlign="right">
          <Button positive style={{ fontFamily: "Tahoma" }}>
            Lưu lịch hẹn
          </Button>
          <Button
            color="red"
            style={{ fontFamily: "Tahoma" }}
            onClick={() => {
              setOpenAppointmentSchedule(false);
            }}
          >
            Huỷ
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

const Note = ({ setOpenNote }) => {
  return (
    <Form>
      <InputField
        fieldType="textarea"
        rows={3}
        label="Mô tả công việc"
        name="description"
        requiredField
      />
      <Grid>
        <Grid.Column textAlign="right">
          <Button positive style={{ fontFamily: "Tahoma" }}>
            Lưu ghi chú
          </Button>
          <Button
            color="red"
            style={{ fontFamily: "Tahoma" }}
            onClick={() => {
              setOpenNote(false);
            }}
          >
            Huỷ
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

const EndTakeCare = ({ setOpenEndTakeCare }) => {
  return (
    <>
      <Header style={{ fontFamily: "Tahoma" }}>
        Bạn có muốn kết thúc quá trình tư vấn cho người này?
      </Header>
      <Grid>
        <Grid.Column textAlign="right">
          <Button positive style={{ fontFamily: "Tahoma" }}>
            Xác nhận
          </Button>
          <Button
            color="red"
            style={{ fontFamily: "Tahoma" }}
            onClick={() => {
              setOpenNote(false);
            }}
          >
            Huỷ
          </Button>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default TakeCareCustomerPage;
