import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Dimmer, Form, Grid, Loader, Message } from "semantic-ui-react";
import { editPost } from "../../actions/post";
import { uploadMultipleMedia } from "../../utils/uploadToCloudinary";
import ContactInformationForm from "../contact-information-form/contact-information-form.component";
import GeographicInformationForm from "../geographic-information-form/geographic-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import PostInformationForm from "../post-information-form/post-information-form.component";
import RealEstateInformationForm from "../real-estate-information-form/real-estate-information-form.component";
import { EditPostFormContainer } from "./form-edit-post.styles";

const EditPostForm = ({
  user,
  editedPost,
  editedLoading,
  setEditedLoading,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      postId: editedPost.postId,
      originalPost: editedPost.originalPost,
      title: editedPost.title,
      description: editedPost.description,
      propertyTypeId: editedPost.propertyType && editedPost.propertyType.id,
      area: editedPost.area,
      price: editedPost.price,
      unitPriceId: editedPost.unitPrice && editedPost.unitPrice.id,
      longevityId: editedPost.longevity && editedPost.longevity.id,
      numberOfBedroom: editedPost.numberOfBedroom,
      numberOfBathroom: editedPost.numberOfBathroom,
      floorNumber: editedPost.numberOfFloor,
      numberOfFloor: editedPost.numberOfFloor,
      certification: editedPost.certification,
      barcode: editedPost.barcode,
      plotNumber: editedPost.plotNumber,
      roomNumber: editedPost.roomNumber,
      buildingName: editedPost.buildingName,
      owner: editedPost.owner,
      ownerPhone: editedPost.ownerPhone,
      directionId: editedPost.direction && editedPost.direction.id,
      frontispiece: editedPost.frontispiece,
      additionalDescription: editedPost.additionalDescription,
      province: editedPost.province,
      district: editedPost.district,
      ward: editedPost.ward,
      address: editedPost.address,
      coordinates: editedPost.coordinates
        .sort(function (a, b) {
          return a.id - b.id;
        })
        .map((coordinate) => {
          return {
            longitude: coordinate.longitude,
            latitude: coordinate.latitude,
          };
        }),
      images: editedPost.images.map((image) => {
        return image.image;
      }),
      contactName: editedPost.contactName,
      contactPhone: editedPost.contactPhone,
      contactEmail: editedPost.contactEmail,
      contactAddress: editedPost.contactAddress,
    },
  });

  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async (data, e) => {
    setEditedLoading && setEditedLoading(true);
    let mediaUrl;
    if (images.length !== 0) {
      mediaUrl = await uploadMultipleMedia(images);
      if (!mediaUrl) {
        console.log("ERROR UPLOAD");
        return;
      }
    }
    await editPost(data, mediaUrl, setErrorMessage);
    console.log(data);
  };

  return (
    <EditPostFormContainer>
      <Form
        size="large"
        onSubmit={handleSubmit(onSubmit)}
        error={errorMessage !== null}
      >
        <Grid columns="equal" padded>
          <Grid.Row>
            <Grid.Column>
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
                post={editedPost}
              />
              <GeographicInformationForm
                register={register}
                errors={errors}
                control={control}
                getValues={getValues}
                setValue={setValue}
                post={editedPost}
              />
              <ImageInformationForm
                images={images}
                setImages={setImages}
                post={editedPost}
              />
              <ContactInformationForm
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
              />
            </Grid.Column>
          </Grid.Row>
          <Message
            error
            list={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
          <Button type="submit" color="red" fluid size="large">
            Chỉnh sửa bài đăng
          </Button>
        </Grid>
      </Form>
      {editedLoading && (
        <Dimmer active={editedLoading} inverted>
          <Loader>Đang tải</Loader>
        </Dimmer>
      )}
    </EditPostFormContainer>
  );
};

export default EditPostForm;
