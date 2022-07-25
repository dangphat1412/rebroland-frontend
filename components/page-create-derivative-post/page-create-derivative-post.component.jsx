import React, { createRef, useState } from "react";
import { CreateDerivativePostContainer } from "./page-create-derivative-post.styles";
import { useForm } from "react-hook-form";
import { Button, Card, Form, Grid, Icon, Image } from "semantic-ui-react";
import PostInformationForm from "../post-information-form/post-information-form.component";
import RealEstateCard from "../card-real-estate/card-real-estate.component";
import ContactInformationForm from "../contact-information-form/contact-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import GeographicInformationForm from "../geographic-information-form/geographic-information-form.component";
import { createDerivativePost } from "../../actions/post";
import { uploadMultipleMedia } from "../../utils/uploadToCloudinary";

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
      // parentBarcode: undefined,
      // parentPlotNumber: undefined,
      directionId: post.direction && post.direction.id,
      frontispiece: post.frontispiece,
      additionalDescription: post.additionalDescription,
      province: post.province,
      district: post.district,
      ward: post.ward,
      address: post.address,
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
    await createDerivativePost(post.postId, data, mediaUrl);
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
              <GeographicInformationForm
                register={register}
                errors={errors}
                getValues={getValues}
                setValue={setValue}
                control={control}
                post={post}
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