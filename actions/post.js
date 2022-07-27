import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import API_URL from "../utils/apiUrl";

const Axios = axios.create({
  baseURL: `${API_URL}/api/posts`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const getPropertyTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/propertytypes`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLongevity = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/longevity`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUnitPrices = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/unitprices`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDirections = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/directions`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post, images) => {
  try {
    console.log("DATA: ", { ...post, images });
    const res = await Axios.post("/", { ...post, images });
    res.status === 201 && Router.push("/trang-ca-nhan/bat-dong-san-cua-toi");
  } catch (error) {
    console.log(error);
  }
};

export const createDerivativePost = async (postId, post, images) => {
  try {
    console.log("DATA: ", { ...post, images });
    const res = await Axios.post(`/${postId}`, { ...post, images });
    res.status === 201 &&
      Router.push("/nha-moi-gioi/bat-dong-san-phai-sinh-cua-toi");
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const res = await Axios.get(`/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (activePage) => {
  try {
    const res = await Axios.get(`/lists?pageNo=${activePage || 0}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFollowingPostsByUser = async (
  propertyType,
  sortValue,
  pageNo
) => {
  try {
    const res = await Axios.get(
      `/user/follow?propertyType=${propertyType}&sortValue=${sortValue}&pageNo=${pageNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchPosts = async (data) => {
  try {
    const res = await Axios.get("/", {
      params: {
        keyword: data.key,
        propertyTypes: data.propertyTypes
          ? data.propertyTypes.toString()
          : undefined,
        province: data.province,
        district: data.district,
        ward: data.ward,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        minArea: data.minArea,
        maxArea: data.maxArea,
        directions: data.directions ? data.directions.toString() : undefined,
        numberOfBedrooms: data.numberOfBedrooms,
      },
    });
    console.log("res.data: ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const followPost = async (post, followingPosts, setFollowingPosts) => {
  try {
    const res = await Axios.post(`/follow/${post.postId}`);
    res.status === 201 && setFollowingPosts([...followingPosts, post]);
    res.status === 204 &&
      setFollowingPosts(
        followingPosts.filter(
          (followingPost) =>
            !(
              followingPost.postId === post.postId &&
              followingPost.derivativeId === post.derivativeId
            )
        )
      );
  } catch (error) {
    console.log(error);
  }
};

export const historyPost = async (postId) => {
  try {
    const res = await axios.get(`${API_URL}/api/posts/history/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUser = async (propertyType, sortValue, pageNo) => {
  try {
    const res = await Axios.get(
      `/user?propertyType=${propertyType}&sortValue=${sortValue}&pageNo=${pageNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUserDetail = async (
  userId,
  propertyType,
  sortValue,
  pageNo
) => {
  try {
    const res = await axios.get(
      `${API_URL}/api/posts/user/${userId}?propertyType=${propertyType}&sortValue=${sortValue}&pageNo=${pageNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDerivativePostsByUser = async (
  propertyType,
  sortValue,
  pageNo
) => {
  try {
    const res = await Axios.get(
      `/derivative/list?propertyType=${propertyType}&sortValue=${sortValue}&pageNo=${pageNo}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
