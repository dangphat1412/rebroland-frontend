import React, { useState } from "react";
import SubHeader from "../../components/sub-header/sub-header.component";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import axios from "axios";
import API_URL from "../../utils/apiUrl";

const RealEstate = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  params,
}) => {
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div>
      <SubHeader
        title="Bất động sản"
        subtitle={`Kết quả tìm kiếm có ${totalResult} bất động sản`}
        background="/zyro-image.png"
      />
      <RealEstatePage
        postsData={postsData}
        followingPosts={followingPosts}
        setFollowingPosts={setFollowingPosts}
        user={user}
        setTotalResult={setTotalResult}
        searchParams={params}
      />
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const { data } = context.query;
    let params = {};
    if (data) params = JSON.parse(data) || {};
    const res = await axios.get(`${API_URL}/api/posts`, {
      params: {
        keyword: params.key,
        propertyType: params.propertyTypes
          ? params.propertyTypes.toString()
          : undefined,
        province: params.province,
        district: params.district,
        ward: params.ward,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        minArea: params.minArea,
        maxArea: params.maxArea,
        direction: params.directions ? params.directions.toString() : undefined,
        numberOfBedroom: params.numberOfBedrooms,
        sortValue: params.sortValue,
        pageNo: params.pageNo,
      },
    });

    return { props: { postsData: res.data, params: params } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default RealEstate;
