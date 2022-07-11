import axios from "axios";
import React from "react";
import FormPropertyDetail from "../../components/form-property-detail/form-property-detail.component";
import DetailBrokerPage from "../../components/page-detail-broker/page-detail-broker.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const DetailBroker = ({ post, user }) => {
  return (
    <>
      <SubHeader title="Chi tiết nhà môi giới" />
      <DetailBrokerPage />
    </>
  );
};

// export async function getServerSideProps(context) {
//   try {
//     const { postId } = context.query;

//     const res = await axios.get(
//       `${API_URL}/api/posts/${postId.split("-").pop()}`
//     );

//     return { props: { post: res.data } };
//   } catch (error) {
//     // return { props: { post: [1, 2, 3] } };
//   }
// }

export default DetailBroker;
