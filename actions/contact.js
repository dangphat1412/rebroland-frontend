import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../utils/apiUrl";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/contact`,
  headers: {
    Authorization: Cookies.get("token"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const userContact = async (data, userId, postId, setErrorMessage) => {
  try {
    setErrorMessage(null);
    const res = await Axios.post(`/${userId || 0}/${postId || 0}`, data);
    if (res.status) return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const confirmRequestContact = async (contactId) => {
  try {
    const res = await Axios.post(`/user/confirm/${contactId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const deleteRequestContact = async (contactId) => {
  try {
    const res = await Axios.delete(`/${contactId}`);
    return res.status;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

// export const acceptRequestContact = async (contactId) => {
//   try {
//     const res = await Axios.post(`/${contactId}`);
//     return res.status;
//   } catch (error) {
//     const messages = convertToListMessages(error.response.data);
//     // setErrorMessage(messages);
//     console.log(error);
//   }
// };

export const searchContacts = async (params, pageNo) => {
  try {
    const res = await Axios.get("/broker", {
      params: {
        keyword: params.key,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};

export const searchUserContacts = async (params, pageNo) => {
  try {
    const res = await Axios.get("/user", {
      params: {
        keyword: params.key,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    // setErrorMessage(messages);
    console.log(error);
  }
};
