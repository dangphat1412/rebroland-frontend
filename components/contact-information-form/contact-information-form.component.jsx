import React from "react";
import { Form, Segment } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const ContactInformationForm = ({ register, errors, setValue, getValues }) => {
  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <Segment size="large">
      <h1>Thông tin liên hệ</h1>
      <Form.Group widths={2}>
        <InputField
          {...register("contactName", {
            required: "Tên liên hệ không được để trống",
          })}
          label="Tên liên hệ"
          name="contactName"
          placeholder="Nhập tên liên hệ"
          defaultValue={getValues("contactName")}
          onChange={handleChange}
          error={errors.contactName}
          requiredField
        />
        <InputField
          {...register("contactPhone")}
          label="Số điện thoại"
          name="contactPhone"
          placeholder="Nhập số điện thoại"
          defaultValue={getValues("contactPhone", {
            required: "Số điện thoại liên hệ không được để trống",
          })}
          onChange={handleChange}
          error={errors.contactPhone}
          requiredField
        />
      </Form.Group>
      <Form.Group widths={2}>
        <InputField
          {...register("contactEmail")}
          label="Email"
          name="contactEmail"
          placeholder="Nhập Email"
          onChange={handleChange}
          defaultValue={getValues("contactEmail")}
        />
        <InputField
          {...register("contactAddress")}
          label="Địa chỉ"
          name="contactAddress"
          placeholder="Nhập địa chỉ"
          onChange={handleChange}
          defaultValue={getValues("contactAddress")}
        />
      </Form.Group>
    </Segment>
  );
};

export default ContactInformationForm;
