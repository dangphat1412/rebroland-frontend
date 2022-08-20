import React from "react";
import { Header, Segment } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const PostInformationForm = ({ register, errors, setValue, getValues }) => {
  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <Segment size="large">
      <Header as="h1">Thông tin bài đăng</Header>
      <InputField
        {...register("title", { required: "Tiêu đề không được để trống" })}
        fieldType="textarea"
        rows={2}
        label="Tiêu đề"
        name="title"
        placeholder="Nhập tiêu đề"
        onChange={handleChange}
        defaultValue={getValues("title")}
        error={errors.title}
        requiredField
        maxLength={200}
        sublabel="Tối đa 200 kí tự"
      />
      <InputField
        {...register("description", { required: "Mô tả không được để trống" })}
        fieldType="textarea"
        rows={5}
        label="Mô tả"
        name="description"
        placeholder="Nhập mô tả chung về bất động sản của bạn"
        onChange={handleChange}
        defaultValue={getValues("description")}
        error={errors.description}
        requiredField
        maxLength={3000}
        sublabel="Tối đa 3000 kí tự"
      />
    </Segment>
  );
};

export default PostInformationForm;
