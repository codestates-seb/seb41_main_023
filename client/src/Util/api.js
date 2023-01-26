import axios from "axios";
import { getCookie, setCookie } from "./Cookies";

// api 요청 시 인증값이 필요없는 경우
export const baseAPI = (url, options) => {
  return axios.create({ baseURL: url, ...options });
};

// api 요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token = getCookie("accessToken");
  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

export const baseInstance = baseAPI(`${process.env.REACT_APP_API_URL}`);
export const authInstance = axiosAuthApi(`${process.env.REACT_APP_API_URL}`);

/* baseInstance */

const getBaseData = async (url, data) => {
  try {
    const { res } = await baseInstance.get(url, data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

// post 요청
const postBaseData = async (url, data) => {
  try {
    const { res } = await baseInstance.post(url, data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

//patch 요청
const patchBaseData = async (url, data) => {
  try {
    const res = await baseInstance.patch(url, data);
    return res;
  } catch (error) {
    return error;
  }
};

//delete 요청
const deleteBaseData = async (url) => {
  try {
    const res = await baseInstance.delete(url);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

/* authInstance */

// get 요청
const getData = async (url, data) => {
  try {
    const { res } = await authInstance.get(url, data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

// post 요청
const postData = async (url, data) => {
  try {
    const { res } = await authInstance.post(url, data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

//patch 요청
const patchData = async (url, data) => {
  try {
    const res = await authInstance.patch(url, data);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

//delete 요청
const deleteData = async (url) => {
  try {
    const res = await authInstance.delete(url);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

const getRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/token/reissue`,
      {},
      {
        headers: {
          Refresh: refreshToken,
        },
      }
    );
    if (response.status === 200)
      setCookie("accessToken", response.headers.authorization);
  } catch (err) {
    console.error(err);
  }
};

export {
  getBaseData,
  postBaseData,
  patchBaseData,
  deleteBaseData,
  getData,
  postData,
  patchData,
  deleteData,
  getRefresh,
};
