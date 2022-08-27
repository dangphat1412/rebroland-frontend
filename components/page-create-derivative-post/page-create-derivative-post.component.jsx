import React, { createRef, useState } from "react";
import { CreateDerivativePostContainer } from "./page-create-derivative-post.styles";
import { useForm } from "react-hook-form";
import { Button, Dimmer, Form, Grid, Loader } from "semantic-ui-react";
import PostInformationForm from "../post-information-form/post-information-form.component";
import ContactInformationForm from "../contact-information-form/contact-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import GeographicInformationForm from "../geographic-information-form/geographic-information-form.component";
import { createDerivativePost } from "../../actions/post";
import { uploadMultipleMedia } from "../../utils/uploadToCloudinary";
import RealEstateItem from "../item-real-estate/item-real-estate.component";
import RealEstateInformationForm from "../real-estate-information-form/real-estate-information-form.component";

const CreateDerivativePost = ({
  user,
  post,
  followingPosts,
  setFollowingPosts,
}) => {
  const contextRef = createRef();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
      propertyTypeId: post.propertyType && post.propertyType.id,
      area: post.area,
      price: post.price,
      unitPriceId: post.unitPrice && post.unitPrice.id,
      longevityId: post.longevity && post.longevity.id,
      numberOfBedroom: post.numberOfBedroom,
      numberOfBathroom: post.numberOfBathroom,
      floorNumber: post.floorNumber,
      numberOfFloor: post.numberOfFloor,
      certification: post.certification,
      barcode: post.barcode,
      plotNumber: post.plotNumber,
      roomNumber: post.roomNumber,
      buildingName: post.buildingName,
      owner: post.owner,
      ownerPhone: post.ownerPhone,
      directionId: post.direction && post.direction.id,
      frontispiece: post.frontispiece,
      additionalDescription: post.additionalDescription,
      province: post.province,
      district: post.district,
      ward: post.ward,
      address: post.address,
      coordinates: post.coordinates
        .sort(function (a, b) {
          return a.id - b.id;
        })
        .map((coordinate) => {
          return {
            longitude: coordinate.longitude,
            latitude: coordinate.latitude,
          };
        }),
      images: post.images
        .sort(function (a, b) {
          return a.id - b.id;
        })
        .map((image) => {
          return image.image;
        }),
      contactName: user.fullName,
      contactPhone: user.phone,
      contactEmail: user.email,
      contactAddress: undefined,
    },
  });

  const [images, setImages] = useState(post.images || []);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, e) => {
    let mediaUrl;
    setLoading(true);
    if (images.length !== 0) {
      mediaUrl = await uploadMultipleMedia(images);
      if (!mediaUrl) {
        console.log("ERROR UPLOAD");
        return;
      }
    }
    await createDerivativePost(post.postId, data, mediaUrl);
    console.log(data);
    setLoading(false);
  };
  return (
    <CreateDerivativePostContainer>
      <Form size="large" onSubmit={handleSubmit(onSubmit)}>
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <PostInformationForm
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
              <RealEstateInformationForm
                register={register}
                clearErrors={clearErrors}
                errors={errors}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                post={post}
              />
              <GeographicInformationForm
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                control={control}
                post={post}
                watch={watch}
              />
              <ImageInformationForm
                images={images}
                setImages={setImages}
                post={post}
              />
              <ContactInformationForm
                register={register}
                setValue={setValue}
                getValues={getValues}
                watch={watch}
                errors={errors}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <RealEstateItem
                post={post}
                user={user}
                followingPosts={followingPosts}
                setFollowingPosts={setFollowingPosts}
                type="card"
              />
              <Button fluid color="red" size="large">
                Tạo bài phái sinh
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
      <Dimmer active={loading} inverted>
        <Loader inverted>Đang xử lý</Loader>
      </Dimmer>
    </CreateDerivativePostContainer>
  );
};

export default CreateDerivativePost;
