import axios from "axios";
import Cookies from "js-cookie";
import { Router } from "next/router";
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
    const res = await Axios.post(`/user/${userId}`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const ratingBroker = async (userId, data, setErrorMessage) => {
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
