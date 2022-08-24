import React from "react";
import SubHeader from "../../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import axios from "axios";
import API_URL from "../../../utils/apiUrl";
import PagePropertyDetail from "../../../components/page-property-detail/page-property-detail.component";
import { redirectUser } from "../../../utils/authUser";

const MyDetailProperty = ({ postData, user }) => {
  return (
    <>
      <SubHeader title="Chi tiết bất động sản" background="/zyro-image.png" />
      <PagePropertyDetail
        post={postData.post}
        brokers={postData.brokers}
        user={user}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { postId } = context.query;
    const { token } = parseCookies(context);

    const res = await axios.get(
      `${API_URL}/api/posts/my-property/${postId.split("-").pop()}`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { postData: res.data } };
  } catch (error) {
    redirectUser(context, "/404");
  }
}

export default MyDetailProperty;
