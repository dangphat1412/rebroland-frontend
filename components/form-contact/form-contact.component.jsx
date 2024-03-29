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
  roleId,
  setContactOpen,
  currentUser,
  setLoginOpen,
  setRegisterOpen,
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
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    if (!currentUser) return;

    setLoading(true);
    const status = await userContact(
      { ...data, roleId },
      userId,
      postId,
      setErrorMessage
    );
    setLoading(false);

    if (status === 201) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Yêu cầu liên hệ lại",
          description: <p>Yêu cầu liên hệ lại thành công</p>,
        });
      }, 100);
      setContactOpen && setContactOpen(false);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Yêu cầu liên hệ lại",
          description: <p>Yêu cầu liên hệ lại thất bại</p>,
        });
      }, 100);
    }
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
        hidden={errorMessage === null}
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
        maxLength={200}
        sublabel="Không quá 200 ký tự"
        disabled={!currentUser}
      />
      <Button
        type="submit"
        fluid
        disabled={!currentUser || loading}
        loading={loading}
      >
        Gửi tin nhắn
      </Button>
      {!currentUser && (
        <div className="alert-login-require">
          Yêu cầu đăng nhập để liên lạc
          <br />
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              setLoginOpen(true);
            }}
          >
            Đăng nhập
          </span>{" "}
          hoặc{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              setRegisterOpen(true);
            }}
          >
            Đăng ký
          </span>
        </div>
      )}
    </FormContactBrokerContainer>
  );
};

export default FormContact;
