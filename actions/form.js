import axios from "axios";

export const getProvinces = async () => {
    try {
        const res = await axios.get("https://provinces.open-api.vn/api/p");
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getDistricts = async (provinceCode) => {
    try {
        const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}`, { params: { depth: 2 } });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
}

export const getWards = async (districtCode) => {
    try {
        const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}`, { params: { depth: 2 } });
        return res.data;
    } catch (error) {
        console.error(error);
        return;
    }
}