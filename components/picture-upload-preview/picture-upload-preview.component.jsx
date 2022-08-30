import React, { useRef, useState } from "react";
import {
  Form,
  Header,
  Icon,
  Ref,
  Segment,
  Image,
  Confirm,
} from "semantic-ui-react";
import {
  ImageContainer,
  PictureUploadPreviewContainer,
  PreviewContainer,
  RemoveIcon,
} from "./picture-upload-preview.styles";

const PictureUploadPreview = ({ images, setImages, post }) => {
  const [pictureError, setPictureError] = useState(false);
  const [imagesPreview, setImagesPreview] = useState(
    (post &&
      post.images.map((image) => {
        return image.image;
      })) ||
      []
  );
  const mediaRef = useRef(null);

  const imageFileExtensions = [
    "image/tif",
    "image/pjp",
    "image/xbm",
    "image/jxl",
    "image/svgz",
    "image/jpg",
    "image/jpeg",
    "image/ico",
    "image/tiff",
    "image/gif",
    "image/svg",
    "image/jfif",
    "image/webp",
    "image/png",
    "image/bmp",
    "image/pjpeg",
    "image/avif",
  ];

  const handleChange = (e) => {
    const { files } = e.target;
    let isImage = true;
    Object.values(files).forEach((file) => {
      if (!imageFileExtensions.includes(file.type)) {
        isImage = false;
      }
    });
    console.log(isImage);
    if (isImage === false) {
      setPictureError(true);
      return;
    }
    setImages([...images, ...files]);
    setImagesPreview([
      ...imagesPreview,
      ...Object.values(files).map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleClickPlaceholder = () => {
    mediaRef.current.querySelector("input").click();
  };

  const removeImage = (pictureIndex) => {
    setImagesPreview(
      imagesPreview.filter((image, index) => pictureIndex !== index)
    );
    setImages(images.filter((image, index) => pictureIndex !== index));
  };

  return (
    <PictureUploadPreviewContainer>
      <Ref innerRef={mediaRef}>
        <Form.Input
          name="image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleChange}
          multiple
        />
      </Ref>
      <Segment
        placeholder
        className="upload-placeholder"
        onClick={handleClickPlaceholder}
      >
        <Header icon>
          <Icon name="upload" />
          Chọn ảnh và xem chế độ xem trước
        </Header>
      </Segment>
      {imagesPreview.length > 0 && (
        <PreviewContainer>
          {imagesPreview.map((image, index) => (
            <ImageContainer key={index}>
              <Image src={image} alt="image" size="medium" />
              <RemoveIcon
                name="times circle"
                size="large"
                color="grey"
                onClick={() => {
                  removeImage(index);
                }}
                inverted
              />
            </ImageContainer>
          ))}
        </PreviewContainer>
      )}
      <Confirm
        open={pictureError}
        header="Không thể đọc file"
        content="Định dạng ảnh không đúng"
        cancelButton={null}
        confirmButton="Đóng"
        onCancel={() => {
          setPictureError(false);
        }}
        onConfirm={() => {
          setPictureError(false);
        }}
      />
    </PictureUploadPreviewContainer>
  );
};

export default PictureUploadPreview;
