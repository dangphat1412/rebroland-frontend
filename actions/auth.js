import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import API_URL from "../utils/apiUrl";
import { setToken } from "../utils/authUser";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

export const loginUser = async (
  user,
  setErrorMessage,
  setLoginOpen,
  setLoading
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${API_URL}/api/users/signin`, user);
    setToken(res.data.accessToken);
    setLoginOpen(false);
    Router.push(Router.asPath);
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(messages);
  }
  setLoading(false);
};

export const logoutUser = async () => {
  try {
    // await axios.post(`${API_URL}/logout`, {
    //   headers: {
    //     Authorization: Cookies.get("token"),
    //   },
    // });
    cookie.remove("token");
    Router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (user, setErrorMessage) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/signup`, user);
    console.log(res.data);
    return res.data;
  } catch (error) {
    setErrorMessage(error.response.data);
    console.log(error);
  }
};

export const otpRegisterUser = async (
  user,
  setErrorMessage,
  setOtpRegisterOpen
) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/signup/otp`, user);

    if (res.status === 200) {
      setToken(res.data.accessToken);
      setOtpRegisterOpen(false);
      Router.push(Router.pathname);
    }
  } catch (error) {
    setErrorMessage(error.response.data);
    console.log(error);
  }
};

export const forgotPasswordUser = async (user, setErrorMessage) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/users/forgot-password/otp`,
      user
    );
    return res.data;
  } catch (error) {
    setErrorMessage(error.response.data);
    console.log(error);
  }
};

export const otpForgotPasswordUser = async (
  user,
  setErrorMessage,
  handleOpenLogin
) => {
  try {
    const res = await axios.put(`${API_URL}/api/users/forgot-password`, user);

    if (res.status === 200) {
      handleOpenLogin();
    }
  } catch (error) {
    setErrorMessage(error.response.data);
    console.log(error);
  }
};

export const brokerRegister = async (setErrorMessage) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/broker/signup`, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });

    if (res.status === 200) {
      Router.push("/");
    }
  } catch (error) {
    setErrorMessage(error.response.data);
    console.log(error);
  }
};
