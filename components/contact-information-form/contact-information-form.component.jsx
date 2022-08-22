import React from "react";
import { Form, Header, Segment } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const ContactInformationForm = ({ register, errors, setValue, getValues }) => {
  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <Segment size="large">
      <Header as="h1">Thông tin liên hệ</Header>
      <Form.Group widths={2}>
        <InputField
          {...register("contactName", {
            required: "Tên liên hệ không được để trống",
            validate: (value) =>
              !/[$&+,:;=\\\\?@#|/'<>.^*()%!-1234567890]/.test(value) ||
              "Tên liên lạc không hợp lệ",
          })}
          label="Tên liên hệ"
          name="contactName"
          placeholder="Nhập tên liên hệ"
          defaultValue={getValues("contactName")}
          onChange={handleChange}
          onFocus={(e) => {
            setValue("contactName", getValues("contactName"));
          }}
          error={errors.contactName}
          requiredField
        />
        <InputField
          {...register("contactPhone", {
            required: "Số điện thoại không được để trống",
            pattern: {
              value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
              message: "Số điện thoại là số Việt Nam và có 10 chữ số",
            },
          })}
          label="Số điện thoại"
          name="contactPhone"
          placeholder="Nhập số điện thoại"
          defaultValue={getValues("contactPhone")}
          onChange={handleChange}
          onFocus={(e) => {
            setValue("contactPhone", getValues("contactPhone"));
          }}
          error={errors.contactPhone}
          requiredField
        />
      </Form.Group>
      <Form.Group widths={2}>
        <InputField
          {...register("contactEmail", {
            pattern: {
              value:
                /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
              message: "Nhập đúng định dạng Email",
            },
          })}
          label="Email"
          name="contactEmail"
          placeholder="Nhập Email"
          onChange={handleChange}
          onFocus={(e) => {
            setValue("contactEmail", getValues("contactEmail"));
          }}
          error={errors.contactEmail}
          defaultValue={getValues("contactEmail")}
        />
        <InputField
          {...register("contactAddress")}
          label="Địa chỉ"
          name="contactAddress"
          placeholder="Nhập địa chỉ"
          onChange={handleChange}
          onFocus={(e) => {
            setValue("contactAddress", getValues("contactAddress"));
          }}
          defaultValue={getValues("contactAddress")}
        />
      </Form.Group>
    </Segment>
  );
};

export default ContactInformationForm;
