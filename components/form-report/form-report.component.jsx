import React from "react";
import { useForm } from "react-hook-form";
import { Button, Checkbox, Form } from "semantic-ui-react";
import CustomButton from "../custom-button/custom-button.component";
import InputField from "../input-field/input-field.component";

const FormReport = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  const onSubmit = async (data, e) => {
    console.log(data);
  };

  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field
          control={Checkbox}
          name="address"
          {...register("address")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Địa chỉ của bất động sản" }}
        />
        <Form.Field
          control={Checkbox}
          name="information"
          {...register("information")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Các thông tin về: giá, diện tích, mô tả ...." }}
        />
        <Form.Field
          control={Checkbox}
          name="image"
          {...register("image")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Ảnh" }}
        />
        <Form.Field
          control={Checkbox}
          name="duplicate"
          {...register("duplicate")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Trùng với tin rao khác" }}
        />
        <Form.Field
          control={Checkbox}
          name="noContact"
          {...register("noContact")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Không liên lạc được" }}
        />
        <Form.Field
          control={Checkbox}
          name="fakeNews"
          {...register("fakeNews")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Tin không có thật" }}
        />
        <Form.Field
          control={Checkbox}
          name="map"
          {...register("map")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Vị trí bản đồ không chính xác" }}
        />
        <Form.Field
          control={Checkbox}
          name="sold"
          {...register("sold")}
          onChange={async (e, { name, checked }) => {
            setValue(name, checked);
          }}
          label={{ children: "Bất động sản đã bán" }}
        />
        <InputField
          fieldType="textarea"
          rows={2}
          {...register("other")}
          label="Phản hồi khác"
          name="other"
          placeholder="Nhập phản hồi"
          onChange={handleChange}
        />
        <Button fluid color="red">
          Gửi báo cáo
        </Button>
      </Form>
    </div>
  );
};

export default FormReport;
