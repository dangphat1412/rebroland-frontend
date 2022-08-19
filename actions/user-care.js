import axios from "axios";
import API_URL from "../utils/apiUrl";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/user-care`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const searchCustomer = async (keyword, status, pageNo) => {
  try {
    const res = await Axios.get(`/`, {
      params: {
        keyword: keyword,
        status: status,
        pageNo: pageNo,
      },
    });
    return res.data;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const addNewCustomer = async (userId) => {
  try {
    const res = await Axios.post(`/add-usercare/${userId}`);
    return res.data;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const addCustomer = async (userId) => {
  try {
    const res = await Axios.post(`/add-customer/${userId}`);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const getInfoNewCustomer = async (data, setErrorMessage) => {
  try {
    const res = await Axios.get(`/add-customer/get-info/${data.phone}`);
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    setErrorMessage(messages);
    console.log(error);
  }
};

export const editSummarize = async (userCareId, data) => {
  try {
    console.log(data);
    const res = await Axios.put(`/${userCareId}`, data);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const deleteCustomer = async (userCareId) => {
  try {
    const res = await Axios.delete(`/${userCareId}`);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const deleteTimeline = async (timelineId) => {
  try {
    const res = await Axios.delete(`/detail/${timelineId}`);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const getCustomerDetail = async (userCareId) => {
  try {
    const res = await Axios.get(`/details/${userCareId}`);
    return res.data;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const addAppointment = async (
  userCareId,
  data,
  setOpenAppointmentSchedule,
  setTimeline,
  timeline
) => {
  try {
    const res = await Axios.post(`/${userCareId}`, data);
    if (res.status === 201) {
      setTimeline([res.data, ...timeline]);
    }
    setOpenAppointmentSchedule(false);
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const addNote = async (
  userCareId,
  data,
  setOpenNote,
  timeline,
  setTimeline
) => {
  try {
    const res = await Axios.post(`/${userCareId}`, data);
    if (res.status === 201) {
      setTimeline([res.data, ...timeline]);
    }
    setOpenNote(false);
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const endCare = async (userCareId) => {
  try {
    const res = await Axios.put(`finish/${userCareId}`);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};
