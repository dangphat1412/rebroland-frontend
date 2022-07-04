import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import API_URL from "../utils/apiUrl";
import { setToken } from "../utils/authUser";
import Cookies from "js-cookie";

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
    Router.push(Router.pathname);
  } catch (error) {
    setErrorMessage(error.response.data);
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
    Router.push(Router.pathname);
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
