import React from "react";
import ReactImageGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

const ImageGallery = () => {
  return (
    <div>
      <ReactImageGallery
        items={images}
        showIndex={true}
        disableKeyDown={false}
        originalHeight="500px"
      />
    </div>
  );
};

export default ImageGallery;
