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

export const searchUsers = async (keyword, roleValue, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-users`, {
      params: {
        keyword: keyword,
        roleValue: roleValue,
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
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const changePostStatus = async (postId, setErrorMessage) => {
  try {
    const res = await Axios.put(`/post/status/${postId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
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

export const searchPayments = async (params, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-payments`, {
      params: {
        keyword: params.key,
        sortValue: sortValue,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
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
    const res = await Axios.put(`/list-reports/posts/reject/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const acceptReportPost = async (reportId, component) => {
  try {
    const res = await Axios.put(
      `/list-reports/posts/accept/${reportId}`,
      component
    );
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const cancelReportUser = async (reportId) => {
  try {
    const res = await Axios.put(`/list-reports/users/reject/${reportId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const acceptReportUser = async (reportId, data) => {
  try {
    const res = await Axios.put(`/list-reports/users/accept/${reportId}`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getTotalAmount = async () => {
  try {
    const res = await Axios.get(`/list-payments/total`);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const getPricePerDayData = async () => {
  try {
    const res = await Axios.get(`/list-price/price-post`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDiscountEndTransaction = async () => {
  try {
    const res = await Axios.get(`/list-refund-percent`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBrokerPrice = async () => {
  try {
    const res = await Axios.get(`/list-price-broker`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePricePerDay = async (data) => {
  try {
    const res = await Axios.put(`/list-price/price-post`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRefund = async (data) => {
  try {
    const res = await Axios.put(`/list-refund-percent`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePriceBroker = async (data) => {
  try {
    const res = await Axios.put(`/update-price-broker`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDirectWithdraw = async (keyword, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-cashout/direct-withdraw`, {
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

export const getTransferWithdraw = async (keyword, sortValue, pageNo) => {
  try {
    const res = await Axios.get(`/list-cashout/transfer-withdraw`, {
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

export const acceptedWithdraw = async (withdrawId) => {
  try {
    const res = await Axios.post(`/list-cashout/accept/${withdrawId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const deniedWithdraw = async (withdrawId, data) => {
  try {
    const res = await Axios.post(`/list-cashout/reject/${withdrawId}`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};
