import React, { createRef, useState } from "react";
import { Dimmer, Form, Grid, Loader, Ref, Sticky } from "semantic-ui-react";
import { FormPostPropertyContainer } from "./form-post-property.styles";
import { useForm } from "react-hook-form";
import PostInformationForm from "../post-information-form/post-information-form.component";
import RealEstateInformationForm from "../real-estate-information-form/real-estate-information-form.component";
import GeographicInformationForm from "../geographic-information-form/geographic-information-form.component";
import ImageInformationForm from "../image-information-form/image-information-form.component";
import ContactInformationForm from "../contact-information-form/contact-information-form.component";
import PaymentInformationForm from "../payment-information-form/payment-information-form.component";
import { createPost } from "../../actions/post";
import { uploadMultipleMedia } from "../../utils/uploadToCloudinary";

const FormPostProperty = ({ user, priceData }) => {
  const contextRef = createRef();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    control,
    watch,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: undefined,
      description: undefined,
      propertyTypeId: undefined,
      area: undefined,
      price: undefined,
      unitPriceId: 1,
      longevityId: undefined,
      numberOfBedroom: undefined,
      numberOfBathroom: undefined,
      floorNumber: undefined,
      numberOfFloor: undefined,
      certification: false,
      barcode: undefined,
      plotNumber: undefined,
      roomNumber: undefined,
      buildingName: undefined,
      owner: undefined,
      ownerPhone: undefined,
      directionId: undefined,
      frontispiece: undefined,
      additionalDescription: undefined,
      province: undefined,
      district: undefined,
      ward: undefined,
      address: undefined,
      coordinates: [],
      contactName: user.fullName,
      contactPhone: user.phone,
      contactEmail: undefined,
      contactAddress: undefined,
      numberOfPostedDay: 7,
    },
  });

  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, e) => {
    setLoading(true);
    let mediaUrl;
    if (images.length !== 0) {
      mediaUrl = await uploadMultipleMedia(images);
      if (!mediaUrl) {
        console.log("ERROR UPLOAD");
        return;
      }
    }
    await createPost(data, mediaUrl, setErrorMessage);
    setLoading(false);
    console.log(data);
  };

  return (
    <div>
      <FormPostPropertyContainer>
        <Ref innerRef={contextRef}>
          <Form
            size="large"
            onSubmit={handleSubmit(onSubmit)}
            error={errorMessage !== null}
          >
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
                    unregister={unregister}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                    clearErrors={clearErrors}
                  />
                  <GeographicInformationForm
                    register={register}
                    watch={watch}
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
                    watch={watch}
                    errors={errors}
                  />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Sticky context={contextRef} offset={100}>
                    <PaymentInformationForm
                      user={user}
                      priceData={priceData}
                      setValue={setValue}
                      getValues={getValues}
                      errorMessage={errorMessage}
                      setErrorMessage={setErrorMessage}
                    />
                  </Sticky>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Ref>
        <Dimmer active={loading} inverted>
          <Loader inverted content="Đang xử lý" />
        </Dimmer>
      </FormPostPropertyContainer>
    </div>
  );
};

export default FormPostProperty;
