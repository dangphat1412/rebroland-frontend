import React, { useState } from "react";
import {
  Button,
  Card,
  Confirm,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Search,
} from "semantic-ui-react";
import { deleteRequestContact } from "../../actions/contact";
import FormCreateCustomer from "../form-create-customer/form-create-customer.component";
import ModalItem from "../modal-item/modal-item.component";
import UserPanel from "../user-panel/user-panel.component";
import { HandleContactBackRequestContainer } from "./page-handle-contact-back-request.styles";

const HandleContactBackRequestPage = ({ user, contactList, caringList }) => {
  const [contacts, setContacts] = useState(contactList.contacts);
  const [caring, setCaring] = useState(caringList);
  const [openRefuseConfirm, setOpenRefuseConfirm] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [deletedContactId, setDeletedContactId] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isDuplicateCustomer, setDuplicateCustomer] = useState(false);

  const handleAccept = async () => {};

  const handleRefuse = async (contactId) => {
    const status = await deleteRequestContact(contactId);
    if (status === 200) {
      setContacts(
        contacts.filter((contact) => {
          return contact.contactId !== contactId;
        })
      );
      setOpenRefuseConfirm(false);
    }
  };

  return (
    <HandleContactBackRequestContainer>
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
                  <Search placeholder="Tìm kiếm" fluid />
                </Card.Header>
                {contacts.length > 0 &&
                  contacts.map((contact, index) => {
                    return (
                      <ContactBackRequestItem
                        key={index}
                        contact={contact}
                        caring={caring}
                        setOpenCreateCustomer={setOpenCreateCustomer}
                        setOpenRefuseConfirm={setOpenRefuseConfirm}
                        setDeletedContactId={setDeletedContactId}
                        setCustomerInfo={setCustomerInfo}
                        setDuplicateCustomer={setDuplicateCustomer}
                      />
                    );
                  })}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        open={openRefuseConfirm}
        onCancel={() => {
          setOpenRefuseConfirm(false);
        }}
        onConfirm={() => {
          handleRefuse(deletedContactId);
        }}
        header="Xác nhận xoá yêu cầu liên hệ"
        content="Bạn có chắc chắn muốn xoá yêu cầu liên hệ này không?"
        cancelButton="Huỷ bỏ"
        confirmButton="Xác nhận"
      />
      <ModalItem
        header="Tạo mới khách hàng"
        onOpen={openCreateCustomer}
        onClose={() => {
          setOpenCreateCustomer(false);
        }}
      >
        {isDuplicateCustomer ? (
          <>
            <Header as="h3">
              Số điện thoại này đã có trong danh sách khách hàng
            </Header>
            <div>
              Họ và tên: <b>{customerInfo.fullName}</b>
            </div>
            <div>
              Số điện thoại: <b>{customerInfo.phone}</b>
            </div>
            {customerInfo.email && (
              <div>
                Email: <b>{customerInfo.email}</b>
              </div>
            )}
            
          </>
        ) : (
          <FormCreateCustomer customerInfo={customerInfo} />
        )}

        {/* <FormReport
          toast={toast}
          setReportOpen={setReportOpen}
          postId={post.postId}
        /> */}
      </ModalItem>
    </HandleContactBackRequestContainer>
  );
};

const ContactBackRequestItem = ({
  contact,
  caring,
  setOpenRefuseConfirm,
  setDeletedContactId,
  setOpenCreateCustomer,
  setCustomerInfo,
  setDuplicateCustomer,
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
                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              />
              <Card.Header>{contact.fullName}</Card.Header>
              <Card.Meta textAlign="left">
                <Icon name="mobile alternate" />
                {contact.phone}
              </Card.Meta>
              <Card.Meta textAlign="left">
                <Icon name="mail outline" />
                {contact.email}
              </Card.Meta>
              <Card.Meta textAlign="left">
                <Icon name="map marker alternate" />
                Ngọc Nội, Trạm Lộ, Thuận Thành, Bắc Ninh
              </Card.Meta>
              <br />
              <Card.Description textAlign="left">
                <Icon name="content" />
                {contact.content}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                basic
                color="green"
                onClick={() => {
                  const customer = caring.find(
                    (c) => c.phone === contact.phone
                  );
                  setCustomerInfo(customer ? customer : contact);
                  setDuplicateCustomer(customer ? true : false);
                  setOpenCreateCustomer(true);
                }}
              >
                Chấp nhận
              </Button>
              <Button
                basic
                color="red"
                onClick={() => {
                  setDeletedContactId(contact.contactId);
                  setOpenRefuseConfirm(true);
                }}
              >
                Từ chối
              </Button>
            </Card.Content>
          </Grid.Column>
          <Grid.Column>
            {contact.shortPost && (
              <Card.Content>
                <Image
                  floated="left"
                  size="tiny"
                  alt="image"
                  src={
                    contact.shortPost.thumbnail ||
                    "https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                  }
                />
                <Card.Header textAlign="left">
                  {contact.shortPost.title}
                </Card.Header>
              </Card.Content>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card>
  );
};

export default HandleContactBackRequestPage;
