import React from "react";
import FormPropertyDetail from "../../../components/form-property-detail/form-property-detail.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import { parseCookies } from "nookies";
import axios from "axios";
import API_URL from "../../../utils/apiUrl";

const MyDetailProperty = ({ post, user }) => {
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
    const { token } = parseCookies(context);

    const res = await axios.get(
      `${API_URL}/api/posts/${postId.split("-").pop()}`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { post: res.data } };
  } catch (error) {
    // return { props: { post: [1, 2, 3] } };
  }
}

export default MyDetailProperty;
