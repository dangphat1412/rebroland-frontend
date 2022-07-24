import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../utils/apiUrl";

const Axios = axios.create({
  baseURL: `${API_URL}/api/report`,
  headers: {
    Authorization: Cookies.get("token"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const reportPost = async (data, postId) => {
  try {
    const content = { content: [...data.content, data.otherContent].join(";") };
    console.log(content);
    const res = await Axios.post(`/post/${postId}`, content);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};
