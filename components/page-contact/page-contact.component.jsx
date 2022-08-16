import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import InputField from "../input-field/input-field.component";
import { ContactPageContainer } from "./page-contact.tyles";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <ContactPageContainer>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <Grid>
              <Grid.Row centered columns={3}>
                <Grid.Column textAlign="center">
                  <Icon name="map marker alternate" size="huge" />
                  <Header as="h1">Vị trí</Header>
                  <Header as="h4">
                    Đại học FPT, Km29 Đại lộ Thăng Long, Thạch Thất, Hà Nội
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Icon name="phone" size="huge" />
                  <Header as="h1">Liên hệ</Header>
                  <Header as="h4">
                    Số điện thoại: 0869009629
                    <br />
                    Email: rebroland@gmail.com
                  </Header>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Icon.Group size="huge">
                    <Icon name="briefcase" />
                    <Icon corner name="time" />
                  </Icon.Group>
                  <Header as="h1">Dịch vụ</Header>
                  <Header as="h4">Hỗ trợ 24/7</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ContactPageContainer>
  );
};

export default ContactPage;
