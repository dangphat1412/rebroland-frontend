import axios from "axios";
import API_URL from "../utils/apiUrl";
import Cookies from "js-cookie";
import convertToListMessages from "../utils/convertToListMessages";

const Axios = axios.create({
  baseURL: `${API_URL}/api/users`,
  headers: {
    Authorization: Cookies.get("token"),
  },
});

export const searchBrokers = async (data, sortValue, page) => {
  try {
    const res = await Axios.get("/broker", {
      params: {
        keyword: data.key,
        propertyType:
          data.propertyTypes && data.propertyTypes.length > 0
            ? data.propertyTypes.toString()
            : undefined,
        province: data.province,
        district: data.district,
        ward: data.ward,
        sortValue: sortValue,
        pageNo: page,
      },
    });
    return res.data;
  } catch (error) {
    const messages = convertToListMessages(error.response.data);
    console.log(error);
  }
};
