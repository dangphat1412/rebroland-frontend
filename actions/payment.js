import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import API_URL from "../utils/apiUrl";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/payment`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const payment = async (amount) => {
  try {
    const res = await Axios.post("/create-payment", amount);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const otpTransfer = async (
  data,
  setTransferData,
  setOpenOtpTransfer,
  setErrorMessage
) => {
  try {
    const res = await Axios.post(`/transfer/send-otp`, data);

    if (res.status === 200) {
      console.log(res.data);
      setTransferData(res.data);
      setOpenOtpTransfer(true);
    }
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const handleTransfer = async (data, setErrorMessage) => {
  try {
    console.log(data);
    const res = await Axios.post(`/transfer`, data);
    if (res.status === 200) {
      Router.push({
        pathname: "/thanh-toan-thanh-cong",
        query: {
          phone: res.data.phone,
          amount: res.data.amount,
          content: res.data.content,
          payDate: new Date().toISOString(),
        },
      });
    }
    console.log(res.data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};
