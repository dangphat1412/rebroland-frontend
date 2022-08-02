import axios from "axios";
import Cookies from "js-cookie";
import API_URL from "../utils/apiUrl";

const Axios = axios.create({
  baseURL: `${API_URL}/api/payment/create-payment`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const payment = async (description, amount) => {
  try {
    const res = await Axios.post("", { description, amount, type: "Đăng bài" });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
