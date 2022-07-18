import axios from "axios";
import React from "react";
import CreateDerivativePost from "../../../components/page-create-derivative-post/page-create-derivative-post.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import API_URL from "../../../utils/apiUrl";

const CreateDerivativePostProperty = ({ user, post }) => {
  return (
    <div>
      <SubHeader title="Tạo bài phái sinh" background="/bg-real-estate.jpg" />
      <CreateDerivativePost post={post} user={user} />
    </div>
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

export default CreateDerivativePostProperty;
