import React, { useEffect, useRef } from "react";
import { Button, Card, Form, Grid, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  ChangePasswordContainer,
  ChangePasswordPageContainer,
} from "./page-change-password.styles";
import { useForm } from "react-hook-form";
import { changePasswordUser } from "../../actions/auth";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const ChangePasswordPage = ({ user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const newPassword = useRef({});
  newPassword.current = watch("newPassword", "");

  useEffect(() => {
    register("oldPassword", {
      required: "Mật khẩu cũ không được để trống",
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        message: "Mật khẩu chứa ít nhất 8 ký tự, gồm chữ hoa, thường và số",
      },
    });
    register("newPassword", {
      required: "Mật khẩu mới không được để trống",
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        message: "Mật khẩu chứa ít nhất 8 ký tự, gồm chữ hoa, thường và số",
      },
    });
    register("confirmNewPassword", {
      required: "Xác nhận mật khẩu không được để trống",
      validate: (value) =>
        value === newPassword.current || "Mật khẩu không khớp",
    });
  }, [register]);

  const onSubmit = async (data, e) => {
    const status = await changePasswordUser(data);
    if (status === 201) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Thay đổi mật khẩu",
          description: <p>Thay đổi mật khẩu thành công</p>,
        });
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Thay đổi mật khẩu",
          description: <p>Thay đổi mật khẩu thất bại</p>,
        });
      }, 1000);
    }
  };

  return (
    <ChangePasswordPageContainer>
      <SemanticToastContainer position="bottom-right" maxToasts={3} />
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <ChangePasswordContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">Thay đổi mật khẩu</Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={6} centered>
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                          type="password"
                          label="Mật khẩu cũ"
                          name="oldPassword"
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.oldPassword}
                          requiredField
                        />
                        <InputField
                          type="password"
                          label="Mật khẩu mới"
                          name="newPassword"
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.newPassword}
                          requiredField
                        />
                        <InputField
                          type="password"
                          label="Xác nhận mật khẩu"
                          name="confirmNewPassword"
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.confirmNewPassword}
                          requiredField
                        />
                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit" className="btnUpdate">
                              Đổi mật khẩu
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </ChangePasswordContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ChangePasswordPageContainer>
  );
};

export default ChangePasswordPage;
