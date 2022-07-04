import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import API_URL from "../utils/apiUrl";

const Axios = axios.create({
  baseURL: `${API_URL}/api/posts`,
  headers: {
    Authorization: Cookies.get("token"),
    // "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

export const getPropertyTypes = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/propertytypes`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLongevity = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/longevity`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUnitPrices = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/unitprices`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDirections = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/directions`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (post, images) => {
  try {
    console.log("DATA: ", { ...post, images });
    const res = await Axios.post("/", { ...post, images });
    res.status === 201 && Router.push("/trang-ca-nhan/bat-dong-san-cua-toi");
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByUser = async () => {
  try {
    const res = await Axios.get("/user");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = async (postId) => {
  try {
    const res = await Axios.get(`/${postId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (activePage) => {
  try {
    const page = activePage - 1;
    const res = await Axios.get(`?pageNo=${page || 0}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchPosts = async (data) => {
  try {
    const res = await Axios.get("?pageNo=3");
    console.log("res.data: ", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
