import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import API_URL from "../utils/apiUrl";
import { setToken } from "../utils/authUser";

export const loginUser = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/signin`, user);
    setToken(res.data.accessToken);
    Router.reload();
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  try {
    // await axios.post(`${API_URL}/api/users/logout`);
    cookie.remove("token");
    Router.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const getOtpToken = async (user) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/otp`, user);
    console.log(res.data);
    return res.status;
  } catch (error) {
    // const errorMsg = catchErrors(error);
    // setError(errorMsg);
    console.log(error);
  }
  //   setLoading(false);
};

export const registerUser = async (user, setOtpRegisterOpen) => {
  try {
    const res = await axios.post(`${API_URL}/api/users/signup`, user);

    if (res.status === 200) {
      setToken(res.data.accessToken);
      Router.reload();
    }
    // setToken(res.data);
  } catch (error) {
    // const errorMsg = catchErrors(error);
    // setError(errorMsg);
    console.log(error);
  }
  //   setLoading(false);
};
