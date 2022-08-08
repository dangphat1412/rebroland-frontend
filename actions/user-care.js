import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import API_URL from "../utils/apiUrl";
import { setToken } from "../utils/authUser";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/user-care`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const addNewCustomer = async (contactId, data) => {
  try {
    const res = await Axios.post(`/${contactId}`, data);
    return res.status;
  } catch (error) {
    // const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};

export const upadteCustomer = async (userCareId, data) => {
  try {
    const res = await Axios.put(`/${userCareId}`, data);
    return res;
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
