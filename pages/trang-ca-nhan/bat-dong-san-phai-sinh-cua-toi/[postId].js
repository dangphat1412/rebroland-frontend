import axios from "axios";
import React from "react";
import PagePropertyDetail from "../../../components/page-property-detail/page-property-detail.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import API_URL from "../../../utils/apiUrl";
import { parseCookies } from "nookies";

const DetailMyDerivativeProperty = ({ user, postData }) => {
  return (
    <div>
      <SubHeader
        title="Chi tiết Bất động sản phái sinh của tôi"
        background="/bg-real-estate.jpg"
      />
      <PagePropertyDetail
        post={postData.post}
        brokers={postData.brokers}
        user={user}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { postId } = context.query;
    const { token } = parseCookies(context);

    const res = await axios.get(
      `${API_URL}/api/posts/${postId.split("-").pop()}`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { postData: res.data } };
  } catch (error) {
    // return { props: { post: [1, 2, 3] } };
  }
}

export default DetailMyDerivativeProperty;
