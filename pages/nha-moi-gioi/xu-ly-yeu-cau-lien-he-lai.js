import React from "react";
import HandleContactBackRequestPage from "../../components/page-handle-contact-back-request/page-handle-contact-back-request.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const HandleContactBackRequest = ({ user }) => {
  return (
    <div>
      <SubHeader
        title="Xử lý yêu cầu liên hệ lại"
        background="/bg-real-estate.jpg"
      />
      <HandleContactBackRequestPage user={user} />
    </div>
  );
};

export default HandleContactBackRequest;
