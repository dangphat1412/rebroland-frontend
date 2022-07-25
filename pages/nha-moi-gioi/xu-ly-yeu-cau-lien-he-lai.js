import React from "react";
import HandleContactBackRequestPage from "../../components/page-handle-contact-back-request/page-handle-contact-back-request.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const HandleContactBackRequest = ({ user, contactBackRequestData }) => {
  return (
    <div>
      <SubHeader
        title="Xử lý yêu cầu liên hệ lại"
        subtitle={`Có tất cả ${contactBackRequestData.totalResult} yêu cầu liên hệ lại`}
        background="/bg-real-estate.jpg"
      />
      <HandleContactBackRequestPage
        user={user}
        contactBackRequestData={contactBackRequestData}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/contact`, {
      headers: { Authorization: token },
    });

    return { props: { contactBackRequestData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default HandleContactBackRequest;
