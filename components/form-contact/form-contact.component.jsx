import React, { useEffect, useState } from "react";
import { Button, Header, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { FormContactBrokerContainer } from "./form-contact.styles";
import { useForm } from "react-hook-form";
import { userContact } from "../../actions/contact";

const FormContact = ({ title, userId, postId }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    register("fullName", { required: "Số điện thoại không được để trống" });
    register("phone", { required: "Mật khẩu không được để trống" });
    register("otp");
    register("email");
    register("content");
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log("contact broker: ", data);
    await userContact(data, userId, postId);
  };

  return (
    <FormContactBrokerContainer
      onSubmit={handleSubmit(onSubmit)}
      error={errorMessage !== null}
    >
      <Header as="h2">{title}</Header>
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
        requiredField
      />
      <InputField
        label="Số điện thoại"
        name="phone"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
        error={errors.fullName}
        requiredField
      />
      <InputField
        label="Email"
        name="email"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
      />
      <InputField
        fieldType="textarea"
        label="Nội dung"
        name="content"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
      />
      <Button type="submit" fluid>
        Gửi tin nhắn
      </Button>
    </FormContactBrokerContainer>
  );
};

export default FormContact;
