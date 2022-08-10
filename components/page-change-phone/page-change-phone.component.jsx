import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Grid, Message } from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import UserPanel from "../user-panel/user-panel.component";
import {
  ChangePhoneContainer,
  ChangePhonePageContainer,
} from "./page-change-phone.styles";

const ChangePhonePage = ({ user }) => {
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

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    register("phone", {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^(84|0[3|5|7|8|9])+([0-9]{8})$/,
        message: "Số điện thoại là số Việt Nam và có 10 chữ số",
      },
    });
  }, [register]);

  const onSubmit = async (data, e) => {
    console.log(data);
  };

  return (
    <ChangePhonePageContainer>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}>
            <UserPanel user={user} />
          </Grid.Column>
          <Grid.Column width={13}>
            <ChangePhoneContainer fluid>
              <Card.Content>
                <Card.Header textAlign="center">
                  Thay đổi số điện thoại
                </Card.Header>
              </Card.Content>
              <Card.Content>
                <Grid centered>
                  <Grid.Row>
                    <Grid.Column width={6} centered>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        error={errorMessage !== null}
                      >
                        <Message
                          error
                          list={errorMessage}
                          hidden={errorMessage === null}
                          onDismiss={() => setErrorMessage(null)}
                        />
                        <InputField
                          label="Số điện thoại mới"
                          name="phone"
                          onChange={async (e, { name, value }) => {
                            setValue(name, value);
                          }}
                          error={errors.phone}
                          requiredField
                        />
                        <Grid>
                          <Grid.Column textAlign="center">
                            <Button type="submit" className="btnUpdate">
                              Tiếp tục
                            </Button>
                          </Grid.Column>
                        </Grid>
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card.Content>
            </ChangePhoneContainer>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ChangePhonePageContainer>
  );
};

export default ChangePhonePage;
