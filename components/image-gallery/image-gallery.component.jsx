import React, { useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import { ImageGalleryContainer } from "./image-gallery.styes";

const ImageGallery = ({ images }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(
      images.map((item) => {
        return {
          original: item.image,
          thumbnail: item.image,
        };
      })
    );
  }, [images]);

  return (
    <ImageGalleryContainer>
      <ReactImageGallery
        items={items}
        showIndex={true}
        disableKeyDown={false}
        originalHeight={200}
      />
    </ImageGalleryContainer>
  );
};

export default ImageGallery;
