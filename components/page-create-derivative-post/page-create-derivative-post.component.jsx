import React, { createRef, useState } from "react";
import { CreateDerivativePostContainer } from "./page-create-derivative-post.styles";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Grid, Icon, Image } from "semantic-ui-react";
import PostInformationForm from "../post-information-form/post-information-form.component";
import RealEstateInformationForm from "../real-estate-information-form/real-estate-information-form.component";
import RealEstateCard from "../card-real-estate/card-real-estate.component";
import ContactInformationForm from "../contact-information-form/contact-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import GeographicInformationForm from "../geographic-information-form/geographic-information-form.component";

const CreateDerivativePost = ({ user, post }) => {
  const contextRef = createRef();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post.title,
      description: post.description,
      propertyTypeId: post.propertyType.id,
      area: post.area,
      price: post.price,
      unitPriceId: post.unitPrice.id,
      longevityId: post.longevity.id,
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
      // parentBarcode: undefined,
      // parentPlotNumber: undefined,
      directionId: post.direction.id,
      frontispiece: post.frontispiece,
      additionalDescription: post.additionalDescription,
      province: undefined,
      district: undefined,
      ward: undefined,
      address: undefined,
      coordinates: [],
      contactName: user.fullName,
      contactPhone: user.phone,
      contactEmail: user.email,
      contactAddress: undefined,
    },
  });

  const [images, setImages] = useState([]);

  const onSubmit = async (data, e) => {
    let mediaUrl;
    if (images.length !== 0) {
      mediaUrl = await uploadMultipleMedia(images);
      if (!mediaUrl) {
        console.log("ERROR UPLOAD");
        return;
      }
    }
    await createPost(data, mediaUrl);
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
              />
              <ImageInformationForm images={images} setImages={setImages} />
              <ContactInformationForm
                register={register}
                setValue={setValue}
                getValues={getValues}
                errors={errors}
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <RealEstateCard post={post} />
              <Button fluid color="red" size="large">
                Tạo bài phái sinh
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </CreateDerivativePostContainer>
  );
};

export default CreateDerivativePost;
