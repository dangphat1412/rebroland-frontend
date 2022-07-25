import React, { useEffect, useState } from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import InputField from "../input-field/input-field.component";

const FormCreateCustomer = ({ customerInfo }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: customerInfo.fullName,
      phone: customerInfo.phone,
      email: customerInfo.email,
      postId: customerInfo.shortPost && customerInfo.shortPost.postId,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Họ và tên không được để trống" });
    register("phone", { required: "Số điện thoại không được để trống" });
    register("email");
    register("summarize");
    register("postId");
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
    // setContactOpen && setContactOpen(false);
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
        disabled
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
