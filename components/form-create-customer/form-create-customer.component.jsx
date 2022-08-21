import React, { useEffect, useState } from "react";
import {
  Button,
  CardDescription,
  Form,
  Header,
  Image,
  Message,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";
import {
  addNewCustomer,
  getInfoNewCustomer,
  upadteCustomer,
} from "../../actions/user-care";
import ModalItem from "../modal-item/modal-item.component";
import { FormCreateCustomerContainer } from "./form-create-customer.styles";

const FormCreateCustomer = ({
  user,
  toast,
  cares,
  setCares,
  setOpenCreateCustomer,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
    register("phone", {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Số điện thoại là số Việt Nam và có 10 chữ số",
      },
      validate: (value) =>
        value !== user.phone || "Số điện thoại trùng với số điện thoại của bạn",
    });
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState(null);

  const onSubmit = async (phone) => {
    const data = await getInfoNewCustomer(phone, setErrorMessage);
    if (data) {
      setNewCustomerData(data);
      setOpenConfirm(true);
    }
  };

  return (
    <FormCreateCustomerContainer>
      <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
        <Header as="h2">Thông tin khách hàng</Header>
        <Message
          error
          list={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <InputField
          label="Số điện thoại"
          name="phone"
          error={errors.phone}
          defaultValue={getValues("phone")}
          requiredField
          onChange={async (e, { name, value }) => {
            setValue(name, value.replace(/[^0-9]/g, ""));
          }}
          value={watch("phone")}
        />
        <Button type="submit" fluid>
          Tiếp tục
        </Button>
      </Form>
      <ModalItem
        header="Xác nhận khách hàng"
        center={true}
        size="tiny"
        onOpen={openConfirm}
        onClose={() => {
          setOpenConfirm(false);
        }}
      >
        {newCustomerData && (
          <>
            <Header as="h1">
              <Image
                circular
                src={newCustomerData.avatar || "/default-avatar.png"}
                style={{ height: "60px", width: "60px", objectFit: "cover" }}
              />
              <Header.Content>
                <Header.Subheader style={{ fontFamily: "Tahoma" }}>
                  <b>Họ và tên: </b> {newCustomerData.fullName}
                </Header.Subheader>
                <Header.Subheader style={{ fontFamily: "Tahoma" }}>
                  <b>Số điện thoại: </b> {newCustomerData.phone}
                </Header.Subheader>
                <Header.Subheader style={{ fontFamily: "Tahoma" }}>
                  <b>Email: </b>{" "}
                  {newCustomerData.email
                    ? newCustomerData.email
                    : "Đang cập nhật"}
                </Header.Subheader>
              </Header.Content>
            </Header>
            <div className="ui two buttons">
              <Button
                basic
                color="green"
                onClick={async () => {
                  setOpenConfirm(false);
                  setOpenCreateCustomer(false);
                  const data = await addNewCustomer(newCustomerData.id);
                  if (data) {
                    console.log(data);
                    setCares([data, ...cares]);
                    setTimeout(() => {
                      toast({
                        type: "success",
                        title: "Thêm khách hàng",
                        description: <p>Thêm khách hàng thành công</p>,
                      });
                    }, 100);
                  }
                }}
              >
                Xác nhận
              </Button>
              <Button
                basic
                color="red"
                onClick={() => {
                  setOpenConfirm(false);
                }}
              >
                Huỷ bỏ
              </Button>
            </div>
          </>
        )}
      </ModalItem>
    </FormCreateCustomerContainer>
  );
};

export default FormCreateCustomer;
