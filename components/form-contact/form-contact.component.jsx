import React, { useEffect, useState } from "react";
import { Button, Header, Label, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { FormContactBrokerContainer } from "./form-contact.styles";
import { useForm } from "react-hook-form";
import { userContact } from "../../actions/contact";

const FormContact = ({
  title,
  userId,
  postId,
  toast,
  setContactOpen,
  currentUser,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: currentUser && currentUser.fullName,
      phone: currentUser && currentUser.phone,
      email: currentUser && currentUser.email,
    },
  });

  useEffect(() => {
    register("fullName", { required: "Họ và tên không được để trống" });
    register("phone", { required: "Số điện thoại không được để trống" });
    register("otp");
    register("email");
    register("content");
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    if (!currentUser) return;

    const status = await userContact(data, userId, postId);
    if (status === 201) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Yêu cầu liên hệ lại",
          description: <p>Yêu cầu liên hệ lại thành công</p>,
        });
      }, 100);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Yêu cầu liên hệ lại",
          description: <p>Yêu cầu liên hệ lại thất bại</p>,
        });
      }, 100);
    }
    setContactOpen && setContactOpen(false);
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
        onChange={
          !currentUser
            ? async (e, { name, value }) => {
                setValue(name, value);
              }
            : null
        }
        error={errors.fullName}
        defaultValue={getValues("fullName")}
        disabled
        requiredField
      />
      <InputField
        label="Số điện thoại"
        name="phone"
        onChange={
          !currentUser
            ? async (e, { name, value }) => {
                setValue(name, value);
              }
            : null
        }
        error={errors.phone}
        defaultValue={getValues("phone")}
        disabled
        requiredField
      />
      <InputField
        label="Email"
        name="email"
        onChange={
          !currentUser
            ? async (e, { name, value }) => {
                setValue(name, value);
              }
            : null
        }
        defaultValue={getValues("email")}
        disabled
      />
      <InputField
        fieldType="textarea"
        label="Nội dung"
        name="content"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
        disabled={!currentUser}
      />
      <Button type="submit" fluid disabled={!currentUser}>
        Gửi tin nhắn
      </Button>
      {!currentUser && (
        <div className="alert-login-require">Yêu cầu đăng nhập để liên lạc</div>
      )}
    </FormContactBrokerContainer>
  );
};

export default FormContact;
