import React from "react";
import HandleContactBackRequestPage from "../../components/page-handle-contact-back-request/page-handle-contact-back-request.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const HandleContactBackRequest = ({ user, contactList, caringList }) => {
  return (
    <div>
      <SubHeader
        title="Xử lý yêu cầu liên hệ lại"
        subtitle={`Có tất cả ${contactList.totalResult} yêu cầu liên hệ lại`}
        background="/bg-real-estate.jpg"
      />
      <HandleContactBackRequestPage
        user={user}
        contactList={contactList}
        caringList={caringList}
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

    return {
      props: {
        contactList: res.data.contactList,
        caringList: res.data.caringList,
      },
    };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default HandleContactBackRequest;
