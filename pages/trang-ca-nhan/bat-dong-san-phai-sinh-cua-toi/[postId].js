import axios from "axios";
import React from "react";
import PagePropertyDetail from "../../../components/page-property-detail/page-property-detail.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import API_URL from "../../../utils/apiUrl";
import { parseCookies } from "nookies";
import { redirectUser } from "../../../utils/authUser";

const DetailMyDerivativeProperty = ({ user, postData }) => {
  return (
    <div>
      <SubHeader
        title="Chi tiết Bất động sản phái sinh của tôi"
        background="/broker-background.jpg"
      />
      <PagePropertyDetail
        detailPost={postData.post}
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
      `${API_URL}/api/posts/my-derivative/${postId.split("-").pop()}`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { postData: res.data } };
  } catch (error) {
    redirectUser(context, "/404");
  }
}

export default DetailMyDerivativeProperty;
