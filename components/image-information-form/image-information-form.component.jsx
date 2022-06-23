import React from "react";
import { Segment } from "semantic-ui-react";
import PictureUploadPreview from "../picture-upload-preview/picture-upload-preview.component";

const ImageInformationForm = ({ images, setImages }) => {
  return (
    <Segment size="large">
      <h1>Hình ảnh và Video</h1>
      <PictureUploadPreview images={images} setImages={setImages} />
    </Segment>
  );
};

export default ImageInformationForm;
