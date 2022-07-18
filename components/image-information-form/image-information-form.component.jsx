import React from "react";
import { Header, Segment } from "semantic-ui-react";
import PictureUploadPreview from "../picture-upload-preview/picture-upload-preview.component";

const ImageInformationForm = ({ images, setImages }) => {
  return (
    <Segment size="large">
      <Header as="h1">Hình ảnh và Video</Header>
      <PictureUploadPreview images={images} setImages={setImages} />
    </Segment>
  );
};

export default ImageInformationForm;
