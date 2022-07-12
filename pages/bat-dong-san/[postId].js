import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import FormPropertyDetail from "../../components/form-property-detail/form-property-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";

const DetailRealEstate = ({ post, user }) => {
  return (
    <>
      <SubHeader title="Chi tiết bất động sản" background="/zyro-image.png" />
      <FormPropertyDetail post={post} user={user} />
    </>
  );
};

export async function getServerSideProps(context) {
  try {
    const { postId } = context.query;

    const res = await axios.get(
      `${API_URL}/api/posts/${postId.split("-").pop()}`
    );

    return { props: { post: res.data } };
  } catch (error) {
    // return { props: { post: [1, 2, 3] } };
  }
}

export default DetailRealEstate;
