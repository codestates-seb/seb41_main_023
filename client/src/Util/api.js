import axios from "axios";
import { getCookie } from "./Cookies";

// api 요청 시 인증값이 필요없는 경우
export const baseAPI = (url, options) => {
  return axios.create({ baseURL: url, ...options });
};

// // api 요청 시 인증값이 필요한 경우
const axiosAuthApi = (url, options) => {
  const token = getCookie("accessToken");

  const instance = axios.create({
    baseURL: url,
    headers: { Authorization: token },
    ...options,
  });
  return instance;
};

export const baseInstance = baseAPI("https://www.sebmain41team23.shop");
export const authInstance = axiosAuthApi("https://www.sebmain41team23.shop");

/* baseInstance */

const getBaseData = async (url) => {
  try {
    const { data } = await baseInstance.get(url);
    return data;
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
    console.log(error.message);
  }
};

//delete 요청
const deleteBaseData = async (url) => {
  try {
    const res = await baseInstance.patch(url);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

/* authInstance */

// get 요청
const getData = async (url) => {
  try {
    const { data } = await authInstance.get(url);
    return data;
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
    const res = await authInstance.patch(url);
    return res;
  } catch (error) {
    console.log(error.message);
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
};
