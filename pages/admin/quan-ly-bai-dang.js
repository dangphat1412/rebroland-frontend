import React, { useState } from "react";
import AdminPanel from "../../components/admin-panel/admin-panel.component";
import PostManagementPage from "../../components/page-post-management/page-post-management.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";
import axios from "axios";
import SubHeader from "../../components/sub-header/sub-header.component";
import SubHeaderAdmin from "../../components/sub-header-admin/sub-header-admin.component";

const PostManagement = ({ postsData }) => {
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div style={{ display: "flex" }}>
      <AdminPanel />
      <div style={{ width: "83%" }}>
        <SubHeaderAdmin
          title="Quản lý bài đăng"
          subtitle={`Có tất cả ${totalResult} bài đăng`}
        />
        <div className="main" style={{ padding: "30px" }}>
          <PostManagementPage
            postsData={postsData}
            setTotalResult={setTotalResult}
          />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { token } = parseCookies(context);

    const res = await axios.get(`${API_URL}/api/admin/list-posts`, {
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default PostManagement;
