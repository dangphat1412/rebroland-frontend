import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Rating,
} from "semantic-ui-react";
import {
  allowRatingBroker,
  allowRatingUser,
  ratingBroker,
  ratingUser,
} from "../../actions/rating";
import InputField from "../input-field/input-field.component";
import { FormRatingContainer } from "./form-rating.styles";

const RatingForm = ({
  type,
  toast,
  ratedUser,
  setOpenRating,
  setRating,
  rating,
  fetchRateListAPI,
  allowRate,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    register("starRate", { required: "Đánh giá người dùng" });
    register("description");
  }, [register]);

  const handleRate = (e, { rating, maxRating }) => {
    setValue("starRate", rating);
    console.log(rating);
  };

  const handleChange = (e, { name, value }) => {
    setValue(name, value);
  };

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data) => {
    let ratingData;
    if (allowRate && allowRate === true) {
      if (type === "broker") {
        ratingData = await allowRatingBroker(
          ratedUser.id,
          data,
          setErrorMessage
        );
      } else {
        ratingData = await allowRatingUser(ratedUser.id, data, setErrorMessage);
      }
    } else {
      if (type === "broker") {
        ratingData = await ratingBroker(ratedUser.id, data, setErrorMessage);
      } else {
        ratingData = await ratingUser(ratedUser.id, data, setErrorMessage);
      }
    }

    if (ratingData) {
      setTimeout(() => {
        toast({
          type: "success",
          title: "Đánh giá",
          description: <p>Đánh giá thành công</p>,
        });
      }, 100);
      setRating(ratingData.starRate);
      setOpenRating(false);
      fetchRateListAPI && fetchRateListAPI(0);
    } else {
      setTimeout(() => {
        toast({
          type: "error",
          title: "Đánh giá",
          description: <p>Đánh giá thất bại</p>,
        });
      }, 100);
    }
  };

  return (
    <FormRatingContainer>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Message
          error
          list={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
        <Header as="h4">
          <Image
            src={
              ratedUser.avatar ||
              "https://react.semantic-ui.com/images/avatar/large/matthew.png"
            }
            avatar
          />
          <Header.Content>
            {ratedUser.fullName}
            <Header.Subheader>
              <Rating
                icon="star"
                defaultRating={rating.toFixed()}
                maxRating={5}
                disabled
              />
              <b style={{ marginLeft: "10px" }}>{ratedUser.avgRate}</b>
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Grid>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Header as="h2">Đánh giá của bạn</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Rating
                maxRating={5}
                icon="star"
                size="massive"
                onRate={handleRate}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <InputField
                // {...register("description", {
                //   required: "Mô tả không được để trống",
                // })}
                fieldType="textarea"
                rows={5}
                name="description"
                placeholder="Nhập đánh giá của bạn"
                onChange={handleChange}
              />
              {errors.starRate && (
                <label style={{ color: "red", fontWeight: "bold" }}>
                  {errors.starRate.message}
                </label>
              )}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button type="submit" fluid>
                Đánh giá
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </FormRatingContainer>
  );
};

export default RatingForm;
