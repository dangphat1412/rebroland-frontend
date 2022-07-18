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

export const getListBrokers = async (page, setLoading) => {
  setLoading(true);
  try {
    const res = await Axios.get("/broker?page");
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
  setLoading(false);
};
