import React, { useState } from "react";
import Lightbox from "react-image-lightbox";

const images = [
  "//placekitten.com/1500/500",
  "//placekitten.com/4000/3000",
  "//placekitten.com/800/1200",
  "//placekitten.com/1500/1500",
];

const FinancialManagementPage = () => {
  const [pictureIndex, setPictureIndex] = useState(0);
  const [showGallaryView, setShowGallaryView] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setShowGallaryView(true)}>
        Open Lightbox
      </button>
      {showGallaryView && (
        <Lightbox
          mainSrc={images[pictureIndex]}
          nextSrc={images[(pictureIndex + 1) % images.length]}
          prevSrc={images[(pictureIndex + images.length - 1) % images.length]}
          onCloseRequest={() => {
            setShowGallaryView(false);
          }}
          onMoveNextRequest={() => {
            setPictureIndex((pictureIndex + 1) % images.length);
          }}
          onMovePrevRequest={() => {
            setPictureIndex((pictureIndex + images.length - 1) % images.length);
          }}
        />
      )}
    </div>
  );
};

export default FinancialManagementPage;
