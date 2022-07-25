import React from "react";
import FormCreateDerivativePost from "../../components/form-create-derivative-post/form-create-derivative-post.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const CreateDerivativePost = ({ user }) => {
  return (
    <div>
      <SubHeader title="Tạo bài phái sinh" />
      <FormCreateDerivativePost />
    </div>
  );
};

export default CreateDerivativePost;
