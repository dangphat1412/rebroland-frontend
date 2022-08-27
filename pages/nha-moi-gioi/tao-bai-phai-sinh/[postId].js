import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import CreateDerivativePost from "../../../components/page-create-derivative-post/page-create-derivative-post.component";
import SubHeader from "../../../components/sub-header/sub-header.component";
import API_URL from "../../../utils/apiUrl";
import { redirectUser } from "../../../utils/authUser";

const CreateDerivativePostProperty = ({
  user,
  postData,
  followingPosts,
  setFollowingPosts,
}) => {
  return (
    <div>
      <SubHeader title="Tạo bài phái sinh" background="/bg-real-estate.jpg" />
      <CreateDerivativePost
        post={postData.post}
        user={user}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { postId } = context.query;
    const { token } = parseCookies(context);

    const res = await axios.get(
      `${API_URL}/api/posts/original-detail/${postId.split("-").pop()}`,
      {
        headers: { Authorization: token },
      }
    );

    return { props: { postData: res.data } };
  } catch (error) {
    redirectUser(context, "/404");
  }
}

export default CreateDerivativePostProperty;
