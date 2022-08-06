import axios from "axios";
import API_URL from "../utils/apiUrl";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/admin`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const getAllUsers = async () => {
  try {
    const res = await Axios.get("/list-users");
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const searchUsers = async (keyword, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-users`, {
      params: {
        keyword: keyword,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const changeUserStatus = async (userId) => {
  try {
    const res = await Axios.put(`/user/status/${userId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const changePostStatus = async (postId) => {
  try {
    const res = await Axios.put(`/post/status/${postId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getPostsByUser = async (userId, pageNo) => {
  try {
    const res = await Axios.get(`/list-users/${userId}`, {
      params: {
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const searchPosts = async (params, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-posts`, {
      params: {
        keyword: params.key,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const searchPostReport = async (params, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-reports/posts`, {
      params: {
        keyword: params.key,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const searchUserReport = async (params, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-reports/users`, {
      params: {
        keyword: params.key,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getDetailPost = async (postId) => {
  try {
    const res = await Axios.get(`/list-posts/${postId}`);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getDetailReportPost = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/posts/${reportId}`);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getDetailReportUser = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/users/${reportId}`);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const cancelReportPost = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/posts/reject/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const acceptReportPost = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/posts/accept/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const cancelReportUser = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/users/reject/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const acceptReportUser = async (reportId) => {
  try {
    const res = await Axios.get(`/list-reports/users/accept/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};
