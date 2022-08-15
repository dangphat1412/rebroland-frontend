import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Card,
  Confirm,
  Dimmer,
  Form,
  Grid,
  Icon,
  Image,
  Item,
  List,
  Loader,
} from "semantic-ui-react";
import {
  confirmRequestContact,
  searchUserContacts,
} from "../../actions/contact";
import calculatePrice from "../../utils/calculatePrice";
import convertToSlug from "../../utils/convertToSlug";
import InputField from "../input-field/input-field.component";
import Pagination from "../pagination/pagination.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  ContactRequestPageContainer,
  PaginationContainer,
} from "./page-contact-request.styles";

const ContactRequestPage = ({ user, contactList, setTotalResult }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const [contacts, setContacts] = useState(contactList.contacts);
  const [data, setData] = useState(contactList);

  const [params, setParams] = useState(null);

  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, activePage - 1);

  const fetchAPI = async (params, pageNo) => {
    setLoading(true);
    const data = await searchUserContacts(params, pageNo);
    setData(data);
    setContacts(data.contacts);
    setTotalResult(data.totalResult);
    setLoading(false);
  };

  const handleConfirm = async (selectedContactId) => {
    const status = await confirmRequestContact(selectedContactId);
    if (status === 200) {
      setContacts(
        contacts.filter((contact) => {
          return contact.contactId !== selectedContactId;
        })
      );
      setOpenConfirm(false);
    }
  };

  const onSubmit = async (data, e) => {
    setParams(data);
    fetchAPI(data, 0);
  };

  return (
    <ContactRequestPageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Card fluid>
              <Card.Content textAlign="center" className="header-title">
                <Card.Header>Xử lý yêu cầu liên hệ lại</Card.Header>
              </Card.Content>
              <Card.Content>
                <Dimmer active={loading} inverted>
                  <Loader>Đang tải dữ liệu</Loader>
                </Dimmer>
                <Card.Header textAlign="center">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputField
                      name="key"
                      placeholder="Tìm kiếm người dùng"
                      onChange={(e, { name, value }) => {
                        setValue(name, value);
                      }}
                    />
                  </Form>
                </Card.Header>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => {
                    return (
                      <ContactBackRequestItem
                        key={index}
                        contact={contact}
                        setOpenConfirm={setOpenConfirm}
                        setSelectedContactId={setSelectedContactId}
                      />
                    );
                  })
                ) : (
                  <>
                    <br />
                    <b>Không có yêu cầu liên hệ lại</b>
                  </>
                )}
              </Card.Content>
            </Card>
            {data.totalPages > 0 && (
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        open={openConfirm}
        onCancel={() => {
          setOpenConfirm(false);
        }}
        onConfirm={() => {
          handleConfirm(selectedContactId);
        }}
        header="Xác nhận"
        content="Xác nhận đã nhận được yêu cầu liên hệ lại"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
      />
    </ContactRequestPageContainer>
  );
};

const ContactBackRequestItem = ({
  contact,
  setOpenConfirm,
  setSelectedContactId,
  setSelectedCustomer,
}) => {
  return (
    <Card fluid>
      <Grid columns={2} divided className="customer-item">
        <Grid.Row>
          <Grid.Column>
            <Card.Content>
              <Image
                floated="left"
                size="tiny"
                alt="image"
                src={
                  contact.userRequest.avatar ||
                  "https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                }
                style={{ height: "85px", width: "85px", objectFit: "cover" }}
              />
              <Card.Header>{contact.userRequest.fullName}</Card.Header>
              <Card.Meta textAlign="left">
                <Icon name="mobile alternate" />
                {contact.userRequest.phone}
              </Card.Meta>
              <Card.Meta textAlign="left">
                <Icon name="mail outline" />
                {contact.userRequest.email
                  ? contact.userRequest.email
                  : "Đang cập nhật"}
              </Card.Meta>
              <Card.Meta textAlign="left">
                <Icon name="map marker alternate" />
                {contact.userRequest.province &&
                contact.userRequest.district &&
                contact.userRequest.ward
                  ? contact.userRequest.ward +
                    ", " +
                    contact.userRequest.district +
                    ", " +
                    contact.userRequest.province
                  : "Đang cập nhật"}
              </Card.Meta>
              <br />
              <Card.Description textAlign="left">
                <Icon name="content" />
                {contact.content}
              </Card.Description>
            </Card.Content>
            <Card.Meta textAlign="left">
              <Icon name="clock" />
              {contact.startDate}
            </Card.Meta>
            <Card.Content extra>
              <Button
                basic
                color="green"
                onClick={() => {
                  setOpenConfirm(true);
                  setSelectedContactId(contact.contactId);
                  // setSelectedContactId(contact.contactId);
                  // setSelectedCustomer(contact);
                  // setOpenAcceptConfirm(true);
                }}
              >
                Xác nhận
              </Button>
            </Card.Content>
          </Grid.Column>
          <Grid.Column>
            {contact.shortPost && (
              <Link
                target="_blank"
                href={`/bat-dong-san/${convertToSlug(
                  contact.shortPost.title
                )}-${contact.shortPost.postId}`}
                passHref
              >
                <a target="_blank">
                  <Item.Group>
                    <Item>
                      <Item.Image
                        size="medium"
                        src={
                          contact.shortPost.thumbnail ||
                          "https://thodiahanoi.com/wp-content/uploads/2021/01/ban-nha-tho-cu-nha-mat-dat-ha-noi-52.jpg"
                        }
                        label={
                          contact.shortPost.originalPost &&
                          contact.shortPost.originalPost !== 0
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
                        <Item.Header>{contact.shortPost.title}</Item.Header>
                        <List horizontal>
                          <List.Item>
                            <List.Content>
                              <List.Header>
                                {calculatePrice(contact.shortPost).price}
                              </List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>
                                {contact.shortPost.unitPrice.id === 3
                                  ? ""
                                  : calculatePrice(contact.shortPost)
                                      .pricePerSquare}
                              </List.Header>
                            </List.Content>
                          </List.Item>
                          <List.Item>
                            <List.Content>
                              <List.Header>
                                {contact.shortPost.area}m²
                              </List.Header>
                            </List.Content>
                          </List.Item>
                        </List>
                        <Item.Description>
                          {contact.shortPost.description}
                        </Item.Description>
                        <Item.Extra>
                          {contact.shortPost.ward}, {contact.shortPost.district}
                          , {contact.shortPost.province}
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </a>
              </Link>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  );
};

export default ContactRequestPage;
