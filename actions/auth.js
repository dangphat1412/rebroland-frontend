import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import API_URL from "../utils/apiUrl";
import { setToken } from "../utils/authUser";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/users`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const updateUser = async (data, mediaUrl, setErrorMessage) => {
  try {
    const dataUser = mediaUrl ? { ...data, avatar: mediaUrl } : data;
    console.log("dataUser: ", dataUser);
    const res = await Axios.put("/", dataUser);
    res.status === 200 && Router.push(Router.asPath);
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const loginUser = async (
  user,
  setErrorMessage,
  setLoginOpen,
  setLoading,
  setFollowingPosts
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${API_URL}/api/users/signin`, user);
    setToken(res.data.accessToken);
    setLoginOpen(false);
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(messages);
  }
  setLoading(false);
  Router.push(Router.asPath);
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
    const res = await Axios.post("/broker/signup");

    if (res.status === 200) {
      Router.push("/nha-moi-gioi");
    }
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const switchRole = async (setLoading) => {
  setLoading(true);
  try {
    const res = await Axios.post("/switch");

    if (res.status === 200) {
      res.data.user.currentRole === 3 && Router.push("/nha-moi-gioi");
      res.data.user.currentRole === 2 && Router.push("/");
    }
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
  setLoading(false);
};
