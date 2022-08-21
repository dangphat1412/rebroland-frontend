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

export const updateUser = async (data, setErrorMessage) => {
  try {
    const res = await Axios.put("/", data);
    return res.status;
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
    Router.reload();
    setLoginOpen(false);
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(messages);
  }
  setLoading(false);
  // Router.push(Router.asPath);
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
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const changePasswordUser = async (data, setErrorMessage) => {
  try {
    const res = await Axios.put(`/change-password`, data);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const otpChangePhone = async (data, setErrorMessage) => {
  try {
    const res = await Axios.post(`/change-phone/send-otp`, data);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const changePhone = async (
  data,
  setPhone,
  setErrorMessage,
  remainTime,
  setRemainTime
) => {
  try {
    console.log(data);
    const res = await Axios.post(`/change-phone`, data);
    if (res.status === 200) setToken(res.data.accessToken);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    setRemainTime(remainTime - 1);
    setPhone((prev) => ({ ...prev, token: undefined }));
    console.log(error);
  }
};

export const otpRegisterUser = async (
  user,
  setUser,
  setErrorMessage,
  setOtpRegisterOpen,
  remainTime,
  setRemainTime
) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/signup/otp`, user);

    if (res.status === 200) {
      setToken(res.data.accessToken);
      setOtpRegisterOpen(false);
      Router.push(Router.pathname);
    }
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setRemainTime(remainTime - 1);
    setUser((prev) => ({ ...prev, token: undefined }));
    setErrorMessage(messages);
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
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const otpForgotPasswordUser = async (
  user,
  setUser,
  setErrorMessage,
  handleOpenLogin,
  setRemainTime,
  remainTime
) => {
  try {
    const res = await axios.put(`${API_URL}/api/users/forgot-password`, user);

    if (res.status === 200) {
      handleOpenLogin();
    }
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setRemainTime(remainTime - 1);
    setUser((prev) => ({ ...prev, token: undefined }));
    setErrorMessage(messages);
    console.log(error);
  }
};

export const brokerRegister = async (id, setErrorMessage) => {
  try {
    const res = await Axios.post(`/broker/signup/${id}`);

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
