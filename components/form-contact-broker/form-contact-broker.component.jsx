import React, { useEffect, useState } from "react";
import { Button, Header, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { FormContactBrokerContainer } from "./form-contact-broker.styles";
import { useForm } from "react-hook-form";

const FormContactBroker = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      key: undefined,
      propertyTypes: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      minArea: undefined,
      maxArea: undefined,
      directions: undefined,
      numberOfBedrooms: undefined,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Số điện thoại không được để trống" });
    register("phone", { required: "Mật khẩu không được để trống" });
    register("otp");
    register("email");
    register("content");
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (user) => {
    // await loginUser(user, setErrorMessage, setLoginOpen, setLoading);
  };

  return (
    <FormContactBrokerContainer
      onSubmit={handleSubmit(onSubmit)}
      error={errorMessage !== null}
    >
      <Header as="h2">Liên lạc với nhà môi giới</Header>
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

export default FormContactBroker;
