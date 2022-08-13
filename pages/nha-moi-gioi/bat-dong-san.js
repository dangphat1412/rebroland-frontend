import axios from "axios";
import React, { useState } from "react";
import RealEstatePage from "../../components/page-real-estate/page-real-estate.component";
import SubHeader from "../../components/sub-header/sub-header.component";
import API_URL from "../../utils/apiUrl";
import { parseCookies } from "nookies";

const RealEstateForBroker = ({
  user,
  postsData,
  followingPosts,
  setFollowingPosts,
  params,
}) => {
  console.log("PARAMS: ", params);
  const [totalResult, setTotalResult] = useState(postsData.totalResult);
  return (
    <div>
      <SubHeader
        title="Bất động sản cho Nhà môi giới"
        subtitle={`Có tất cả ${totalResult} bất động sản`}
        background="/bg-real-estate.jpg"
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
    const { token } = parseCookies(context);
    const { data } = context.query;
    let params = {};
    if (data) params = JSON.parse(data) || {};

    const res = await axios.get(`${API_URL}/api/posts/broker/original`, {
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
        direction:
          params.directions && params.directions.length > 0
            ? params.directions.toString()
            : undefined,
        numberOfBedroom: params.numberOfBedrooms,
        sortValue: params.sortValue,
        pageNo: params.pageNo,
      },
      headers: { Authorization: token },
    });

    return { props: { postsData: res.data, params: params } };
  } catch (error) {
    // return { props: { posts: [1, 2, 3] } };
  }
}

export default RealEstateForBroker;
