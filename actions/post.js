import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import API_URL from "../utils/apiUrl";
import convertToListMessages from "../utils/convertToListMessages";

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

export const createPost = async (post, images, setErrorMessage) => {
  try {
    const res = await Axios.post("/", { ...post, images });
    res.status === 201 && Router.push("/trang-ca-nhan/bat-dong-san-cua-toi");
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const editPost = async (post, mediaUrl, setErrorMessage) => {
  try {
    const data = { ...post, images: mediaUrl };
    const res = await Axios.put(`/${post.postId}`, data);
    res.status === 201 && Router.reload();
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const createDerivativePost = async (postId, post, images) => {
  try {
    const res = await Axios.post(`/derivative/${postId}`, { ...post, images });
    res.status === 201 &&
      Router.push("/trang-ca-nhan/bat-dong-san-phai-sinh-cua-toi");
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

export const getPosts = async (sortValue, page) => {
  try {
    const res = await Axios.get(`/lists?pageNo=${page}&sortValue=${sortValue}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOriginalPosts = async (sortValue, page) => {
  try {
    const res = await Axios.get(
      `/broker/original?pageNo=${page}&sortValue=${sortValue}`
    );
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

export const searchPosts = async (data, sortValue, page) => {
  try {
    const res = await Axios.get("/", {
      params: {
        keyword: data.key,
        propertyType: data.propertyTypes
          ? data.propertyTypes.toString()
          : undefined,
        province: data.province,
        district: data.district,
        ward: data.ward,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        minArea: data.minArea,
        maxArea: data.maxArea,
        direction: data.directions ? data.directions.toString() : undefined,
        numberOfBedroom: data.numberOfBedrooms,
        sortValue: sortValue,
        pageNo: page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchOriginalPosts = async (data, sortValue, page) => {
  try {
    const res = await Axios.get("/broker/original/search", {
      params: {
        keyword: data.key,
        propertyType: data.propertyTypes
          ? data.propertyTypes.toString()
          : undefined,
        province: data.province,
        district: data.district,
        ward: data.ward,
        minPrice: data.minPrice,
        maxPrice: data.maxPrice,
        minArea: data.minArea,
        maxArea: data.maxArea,
        direction: data.directions ? data.directions.toString() : undefined,
        numberOfBedroom: data.numberOfBedrooms,
        sortValue: sortValue,
        pageNo: page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const followPost = async (post, followingPosts, setFollowingPosts) => {
  try {
    const res = await Axios.post(`/follow/${post.postId}`);
    res.status === 201 && setFollowingPosts([post, ...followingPosts]);
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

export const getPostsByUser = async (
  propertyType,
  status,
  sortValue,
  pageNo
) => {
  try {
    const res = await Axios.get(`/user`, {
      params: {
        propertyType: propertyType,
        status: status,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
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

export const getOriginalPostsByUserDetail = async (
  userId,
  propertyType,
  sortValue,
  pageNo
) => {
  try {
    const res = await Axios.get(`${API_URL}/api/posts/original/${userId}`, {
      params: {
        propertyType: propertyType,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDerivativePostsByUser = async (
  propertyType,
  status,
  sortValue,
  pageNo
) => {
  try {
    const res = await Axios.get(`/derivative/list`, {
      params: {
        propertyType: propertyType,
        status: status,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPricePerDay = async () => {
  try {
    const res = await Axios.get(`price-per-day`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const switchAllowCreateDerivative = async (postId) => {
  try {
    const res = await Axios.put(`/allow-derivative/switch/${postId}`);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    const res = await Axios.get(`/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllOriginalCategories = async () => {
  try {
    const res = await Axios.get(`/broker/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const finishTransaction = async (postId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/history/${postId}`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const extendPost = async (postId, data) => {
  try {
    const res = await Axios.put(`/extend/${postId}`, data);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const reupPost = async (postId) => {
  try {
    const res = await Axios.put(`/repost/${postId}`);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const dropPost = async (postId) => {
  try {
    const res = await Axios.put(`/drop-post/${postId}`);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const deletepPost = async (postId) => {
  try {
    const res = await Axios.put(`/delete-post/${postId}`);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const getOtpEndTransaction = async (postId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/history/send-otp/${postId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const endTransactionWithInfo = async (
  postId,
  data,
  setTransaction,
  setErrorMessage,
  remainTime,
  setRemainTime
) => {
  try {
    const res = await Axios.post(`/history/${postId}`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    setTransaction((prev) => ({ ...prev, token: undefined }));
    setRemainTime(remainTime - 1);

    console.log(error);
  }
};

export const getOutStandingPost = async () => {
  try {
    const res = await Axios.get(`/outstanding`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
