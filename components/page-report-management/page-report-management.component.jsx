import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { Dimmer, Loader, Tab } from "semantic-ui-react";
import { searchPostReport, searchUserReport } from "../../actions/admin";
import ReportPostPage from "../page-report-post/page-report-post.component";
import ReportUserPage from "../page-report-user/page-report-user.component";
import { ReportManagementPageContainer } from "./page-report-management.styles";

const ReportManagementPage = ({ postReport, setTotalResult }) => {
  const [reportPostData, setReportPostData] = useState(postReport || {});
  const [reportUserData, setReportUserData] = useState(null);

  const [images, setImages] = useState([]);
  const [showGallaryView, setShowGallaryView] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleOnTabChange = (e, { activeIndex }) => {
    fetchAPI(activeIndex, 0, 0);
  };

  const fetchAPI = async (activeIndex, sortValue, pageNo) => {
    setLoading(true);
    if (activeIndex === 0) {
      const data = await searchPostReport({}, 0, 0);
      setReportPostData(data);
    }
    if (activeIndex === 1) {
      const data = await searchUserReport({}, 0, 0);
      setReportUserData(data);
    }
    setLoading(false);
  };

  return (
    <ReportManagementPageContainer>
      {showGallaryView === true && (
        <DisplayGallaryPictures
          images={images}
          setShowGallaryView={setShowGallaryView}
        />
      )}
      <Dimmer active={loading} inverted>
        <Loader>Đang tải dữ liệu</Loader>
      </Dimmer>
      <Tab
        onTabChange={handleOnTabChange}
        menu={{ secondary: true, pointing: true }}
        panes={[
          {
            menuItem: "Báo cáo bài đăng",
            render: () => (
              <Tab.Pane attached={false} as="div">
                <ReportPostPage
                  reportData={reportPostData}
                  setTotalResult={setTotalResult}
                  setImages={setImages}
                  setShowGallaryView={setShowGallaryView}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: "Báo cáo người dùng",
            render: () => (
              <Tab.Pane attached={false} as="div">
                <ReportUserPage
                  reportData={reportUserData}
                  setTotalResult={setTotalResult}
                  setImages={setImages}
                  setShowGallaryView={setShowGallaryView}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    </ReportManagementPageContainer>
  );
};

const DisplayGallaryPictures = ({ images, setShowGallaryView }) => {
  const [pictureIndex, setPictureIndex] = useState(0);
  console.log(images);
  return (
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
  );
};

export default ReportManagementPage;
