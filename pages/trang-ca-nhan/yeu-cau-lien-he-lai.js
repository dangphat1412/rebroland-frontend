import React, { useState } from "react";
import ContactRequestPage from "../../components/page-contact-request/page-contact-request.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";

const ContactRequest = ({ user, contactList }) => {
  const [totalResult, setTotalResult] = useState(contactList.totalResult);
  return (
    <div>
      <SubHeader
        title="Yêu cầu liên hệ lại"
        subtitle={`Có tất cả ${totalResult} yêu cầu liên hệ lại`}
        background="/zyro-image.png"
      />
      <ContactRequestPage
        user={user}
        contactList={contactList}
        setTotalResult={setTotalResult}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/contact/user`, {
      headers: { Authorization: token },
    });

    return {
      props: {
        contactList: res.data,
      },
    };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default ContactRequest;
