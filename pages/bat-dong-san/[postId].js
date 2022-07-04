import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getPostById } from "../../actions/post";
import FormPropertyDetail from "../../components/form-property-detail/form-property-detail.component";
import SubHeader from "../../components/sub-header/sub-header.component";

const DetailRealEstate = ({ user }) => {
  const router = useRouter();

  const [post, setPost] = useState({});
  const { postId } = router.query;

  useEffect(() => {
    (async () => {
      const data = await getPostById(postId);
      console.log("POST: ", data);
      setPost(data);
    })();
  });

  return (
    <>
      <SubHeader title="Chi tiết bất động sản" />
      <FormPropertyDetail post={post} user={user} />
    </>
  );
};

export default DetailRealEstate;
