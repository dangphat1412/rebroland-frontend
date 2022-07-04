import React, { useEffect } from "react";
import { getPosts, getPostsByUser } from "../../../actions/post";
import MyProperty from "../../../components/my-property/my-property.component";
import SubHeader from "../../../components/sub-header/sub-header.component";

const MyPropertyHome = () => {
  return (
    <div>
      <SubHeader title="Bất động sản của tôi" />
      <MyProperty />
    </div>
  );
};

// export const getServerSideProps = async () => {
//   const data = await getPosts();
//   console.log("data: ", data);
//   return {
//     props: { posts: data },
//   };
// };

export default MyPropertyHome;
