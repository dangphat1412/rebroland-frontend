import axios from "axios";

export const getAllBanks = async () => {
  try {
    const res = await axios.get("https://api.vietqr.io/v2/banks");
    return res.data;
  } catch (error) {
    console.error(error);
    return;
  }
};
