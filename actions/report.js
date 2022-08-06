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

export const reportPost = async (data, mediaUrl, postId) => {
  try {
    const content = {
      content: data.content
        ? [...data.content, data.otherContent].join(";")
        : data.otherContent,
      images: mediaUrl,
    };
    const res = await Axios.post(`/post/${postId}`, content);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};

export const reportUser = async (data, mediaUrl, userId) => {
  try {
    const content = {
      content: [...data.content, data.otherContent].join(";"),
      images: mediaUrl,
    };
    const res = await Axios.post(`/user/${userId}`, content);
    return res.status;
  } catch (error) {
    console.log(error);
  }
};
