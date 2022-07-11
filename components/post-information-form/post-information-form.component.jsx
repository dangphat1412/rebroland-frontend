import React from "react";
import { Segment } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";

const PostInformationForm = ({ register, errors, setValue, getValues }) => {
  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  return (
    <Segment size="large">
      <h1>Thông tin bài đăng</h1>
      <InputField
        {...register("title", { required: "Tiêu đề không được để trống" })}
        label="Tiêu đề"
        name="title"
        placeholder="Nhập tiêu đề"
        onChange={handleChange}
        defaultValue={getValues("title")}
        error={errors.title}
        requiredField
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
      />
    </Segment>
  );
};

export default PostInformationForm;
