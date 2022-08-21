import React, { useEffect, useState } from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { useForm } from "react-hook-form";
import options from "../../utils/forewarnedOptions";
import { addAppointment } from "../../actions/user-care";

const AppointmentScheduleForm = ({
  userCareId,
  setOpenAppointmentSchedule,
  timeline,
  setTimeline,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      type: "APPOINTMENT",
    },
  });

  useEffect(() => {
    register("dateAppointment", { required: "Chọn ngày hẹn" });
    register("timeAppointment", { required: "Chọn giờ hẹn" });
    register("alertTime");
    register("type");
    register("description", { required: "Mô tả không được để trống" });
  }, [register]);

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data, e) => {
    await addAppointment(
      userCareId,
      data,
      setOpenAppointmentSchedule,
      setTimeline,
      timeline,
      setErrorMessage
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} error={errorMessage !== null}>
      <Message
        error
        list={errorMessage}
        onDismiss={() => setErrorMessage(null)}
      />
      <Form.Group widths="equal">
        <InputField
          type="date"
          min={new Date().toISOString().slice(0, 10)}
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          fluid
          label="Ngày hẹn"
          name="dateAppointment"
          error={errors.dateAppointment}
          requiredField
        />
        <InputField
          type="time"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
          fluid
          label="Giờ hẹn"
          name="timeAppointment"
          error={errors.timeAppointment}
          requiredField
        />
        <Form.Select
          fluid
          label="Báo trước"
          options={options}
          defaultValue={0}
          name="alertTime"
          onChange={async (e, { name, value }) => {
            setValue(name, value);
          }}
        />
      </Form.Group>
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
        sublabel="Tối đa 200 ký tự"
        maxLength={200}
      />
      <Grid>
        <Grid.Column textAlign="right">
          <Button type="submit" positive style={{ fontFamily: "Tahoma" }}>
            Lưu lịch hẹn
          </Button>
          <Button
            color="red"
            style={{ fontFamily: "Tahoma" }}
            onClick={() => {
              setOpenAppointmentSchedule(false);
            }}
          >
            Huỷ
          </Button>
        </Grid.Column>
      </Grid>
    </Form>
  );
};

export default AppointmentScheduleForm;
