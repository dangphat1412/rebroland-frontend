import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Grid } from "semantic-ui-react";
import { addNote } from "../../actions/user-care";
import InputField from "../input-field/input-field.component";

const NoteForm = ({ timeline, setTimeline, userCareId, setOpenNote }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "NOTE",
    },
  });

  useEffect(() => {
    register("description", { required: "Mô tả không được để trống" });
    register("type");
  }, [register]);

  const onSubmit = async (data, e) => {
    await addNote(userCareId, data, setOpenNote, timeline, setTimeline);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        fieldType="textarea"
        rows={3}
        label="Mô tả công việc"
        name="description"
        placeholder="Nhập mô tả công việc"
        onChange={async (e, { name, value }) => {
          setValue(name, value);
        }}
        error={errors.description}
        requiredField
      />
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" positive style={{ fontFamily: "Tahoma" }}>
            Lưu ghi chú
          </Button>
          <Button
            color="red"
            style={{ fontFamily: "Tahoma" }}
            onClick={() => {
              setOpenNote(false);
            }}
          >
            Huỷ
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default NoteForm;
