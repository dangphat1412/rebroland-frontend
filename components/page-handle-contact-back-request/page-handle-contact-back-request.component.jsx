import React, { useState } from "react";
import {
  Button,
  Card,
  Confirm,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Loader,
} from "semantic-ui-react";
import { deleteRequestContact, searchContacts } from "../../actions/contact";
import FormCreateCustomer from "../form-create-customer/form-create-customer.component";
import InputField from "../input-field/input-field.component";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import ModalItem from "../modal-item/modal-item.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  HandleContactBackRequestContainer,
  PaginationContainer,
} from "./page-handle-contact-back-request.styles";
import { useForm } from "react-hook-form";
import Pagination from "../pagination/pagination.component";
import calculatePrice from "../../utils/calculatePrice";
import Link from "next/link";
import convertToSlug from "../../utils/convertToSlug";
import { addCustomer } from "../../actions/user-care";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const HandleContactBackRequestPage = ({
  user,
  contactList,
  totalResult,
  setTotalResult,
}) => {
  const [contacts, setContacts] = useState(contactList.contacts);
  const [data, setData] = useState(contactList);
  const [openRefuseConfirm, setOpenRefuseConfirm] = useState(false);
  const [openAcceptConfirm, setOpenAcceptConfirm] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [params, setParams] = useState({});
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      key: undefined,
    },
  });

  const handleAccept = async () => {
    const status = await addCustomer(selectedContactId);
    if (status === 201) {
      setContacts(
        contacts.filter((contact) => {
          return contact.contactId !== selectedContactId;
        })
      );
      setTotalResult(totalResult - 1);
      toast({
        type: "success",
        title: "Thêm khách hàng",
        description: <p>Thêm khách hàng thành công</p>,
      });
      setOpenAcceptConfirm(false);
    }
  };

  const handleRefuse = async (contactId) => {
    const status = await deleteRequestContact(contactId);
    if (status === 204) {
      setContacts(
        contacts.filter((contact) => {
          return contact.contactId !== contactId;
        })
      );
      setTotalResult(totalResult - 1);
      toast({
        type: "success",
        title: "Bỏ qua khách hàng",
        description: <p>Xác nhận bỏ qua khách hàng</p>,
      });
      setOpenRefuseConfirm(false);
    }
  };

  const handlePaginationChange = (e, { activePage }) =>
    fetchAPI(params, activePage - 1);

  const fetchAPI = async (params, pageNo) => {
    setLoading(true);
    const data = await searchContacts(params, pageNo);
    setData(data);
    setContacts(data.contacts);
    setTotalResult(data.totalResult);
    setLoading(false);
  };

  const onSubmit = async (data, e) => {
    setParams(data);
    fetchAPI(data, 0);
  };

  return (
    <HandleContactBackRequestContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={1} />
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
                <Card.Header textAlign="center">
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                          <InputField
                            icon="search"
                            name="key"
                            placeholder="Tìm kiếm"
                            onChange={(e, { name, value }) => {
                              setValue(name, value);
                            }}
                          />
                        </Form>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Header>
                {contacts.length > 0 ? (
                  contacts.map((contact, index) => {
                    return (
                      <ContactBackRequestItem
                        key={index}
                        contact={contact}
                        setOpenRefuseConfirm={setOpenRefuseConfirm}
                        setOpenAcceptConfirm={setOpenAcceptConfirm}
                        setSelectedContactId={setSelectedContactId}
                        setSelectedCustomer={setSelectedCustomer}
                      />
                    );
                  })
                ) : (
                  <>
                    <br />
                    <b>Không có yêu cầu liên hệ lại</b>
                  </>
                )}
                <Dimmer active={loading} inverted>
                  <Loader>Đang tải dữ liệu</Loader>
                </Dimmer>
              </Card.Content>
            </Card>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        open={openRefuseConfirm}
        onCancel={() => {
          setOpenRefuseConfirm(false);
        }}
        onConfirm={() => {
          handleRefuse(selectedContactId);
        }}
        header="Xác nhận xoá yêu cầu liên hệ"
        content="Bạn có chắc chắn muốn xoá yêu cầu liên hệ này không?"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
      />
      <Confirm
        open={openAcceptConfirm}
        onCancel={() => {
          setOpenAcceptConfirm(false);
        }}
        onConfirm={() => {
          handleAccept(selectedContactId);
        }}
        header="Xác nhận thêm vào danh sách chăm sóc khách hàng"
        content="Bạn có chắc chắn muốn thêm người này vào danh sách chăm sóc khách hàng không?"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
      />
    </HandleContactBackRequestContainer>
  );
};

const ContactBackRequestItem = ({
  contact,
  setOpenRefuseConfirm,
  setOpenAcceptConfirm,
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
                src={contact.userRequest.avatar || "/default-avatar.png"}
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
                  setSelectedContactId(contact.contactId);
                  setSelectedCustomer(contact);
                  setOpenAcceptConfirm(true);
                }}
              >
                Chấp nhận
              </Button>
              <Button
                basic
                color="red"
                onClick={() => {
                  setSelectedContactId(contact.contactId);
                  setOpenRefuseConfirm(true);
                }}
              >
                Từ chối
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

export default HandleContactBackRequestPage;
