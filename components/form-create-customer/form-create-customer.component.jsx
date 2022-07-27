import React, { useEffect, useState } from "react";
import {
  Button,
  CardDescription,
  Form,
  Header,
  Message,
} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";
import { addNewCustomer, upadteCustomer } from "../../actions/user-care";

const FormCreateCustomer = ({
  customerInfo,
  toast,
  setOpenCreateCustomer,
  cares,
  setCares,
  userCareId,
  setOpenUpdateCustomer,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: customerInfo && customerInfo.fullName,
      phone: customerInfo && customerInfo.phone,
      email: customerInfo && customerInfo.email,
      postId:
        customerInfo && customerInfo.shortPost && customerInfo.shortPost.postId,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Họ và tên không được để trống" });
    register("phone", {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Số điện thoại là số Việt Nam và có 10 chữ số",
      },
    });
    register("email");
    register("summarize");
    register("postId");
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    if (!userCareId) {
      const res = await addNewCustomer(data);
      if (res.status === 201) {
        setCares([...cares, res.data]);
        setTimeout(() => {
          toast({
            type: "success",
            title: "Thêm khách hàng",
            description: <p>Thêm khách hàng thành công</p>,
          });
        }, 1000);
      } else {
        setTimeout(() => {
          toast({
            type: "error",
            title: "Thêm khách hàng",
            description: <p>Thêm khách hàng thất bại</p>,
          });
        }, 1000);
      }
      setOpenCreateCustomer(false);
    } else {
      const res = await upadteCustomer(userCareId, data);
      if (res.status === 200) {
        const list = [...cares];
        const index = list.findIndex((el) => el.careId === userCareId);
        list[index] = res.data;
        setCares(list);
        setTimeout(() => {
          toast({
            type: "success",
            title: "Cập nhật thông tin khách hàng",
            description: <p>Cập nhật thông tin khách hàng thành công</p>,
          });
        }, 300);
      } else {
        setTimeout(() => {
          toast({
            type: "error",
            title: "Cập nhật thông tin khách hàng",
            description: <p>Cập nhật thông tin khách hàng thất bại</p>,
          });
        }, 300);
      }
      setOpenUpdateCustomer(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
      <Header as="h2">Thông tin khách hàng</Header>
      <Message
        error
        list={errorMessage}
        onDismiss={() => setErrorMessage(null)}
      />
      <InputField
        label="Họ và tên"
        name="fullName"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
        error={errors.fullName}
        defaultValue={getValues("fullName")}
        requiredField
      />
      <InputField
        label="Số điện thoại"
        name="phone"
        error={errors.phone}
        defaultValue={getValues("phone")}
        requiredField
        onChange={
          !customerInfo
            ? async (e, { name, value }) => {
                setValue(name, value);
              }
            : null
        }
        disable={!customerInfo ? true : false}
      />
      <InputField
        label="Email"
        name="email"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
        defaultValue={getValues("email")}
      />
      <InputField
        fieldType="textarea"
        label="Nội dung"
        name="summarize"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
      />
      <Button type="submit" fluid>
        Tạo mới
      </Button>
    </Form>
  );
};

export default FormCreateCustomer;
