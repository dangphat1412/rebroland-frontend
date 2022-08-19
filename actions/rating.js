import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../utils/apiUrl";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/rating`,
  headers: {
    Authorization: Cookies.get("token"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const ratingUser = async (userId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/profile/user/${userId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const ratingBroker = async (userId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/profile/broker/${userId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const allowRatingUser = async (userId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/user/${userId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const allowRatingBroker = async (userId, data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/broker/${userId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const ratingListBroker = async (data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/broker/list`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const getListRateByBrokerId = async (brokerId, pageNo) => {
  try {
    const res = await Axios.get(`/broker/${brokerId}`, {
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

export const getListRateByUserId = async (userId, pageNo) => {
  try {
    const res = await Axios.get(`/user/${userId}`, {
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

export const checkAllowRatingUser = async (userId) => {
  try {
    const res = await Axios.get(`/profile/check/${userId}/2`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const checkAllowRatingBroker = async (userId) => {
  try {
    const res = await Axios.get(`/profile/check/${userId}/3`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};
