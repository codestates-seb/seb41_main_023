import axios from "axios";
import { getCookie } from "./Cookies";

// // api 요청 시 인증값이 필요없는 경우
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

// // export const baseInstance = baseAPI(`${process.env.REACT_APP_API_URL}`);
// export const authInstance = axiosAuthApi(`${process.env.REACT_APP_API_URL}`);

// // export const baseInstance = baseAPI("https://jsonplaceholder.typicode.com");
export const authInstance = axiosAuthApi("https://www.sebmain41team23.shop/");

//get 요청
const getData = async (url) => {
  try {
    const { data } = await authInstance.get(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

// post 요청
const postData = async (url, data) => {
  try {
    const { res } = await authInstance.post(url, data);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.message);
  }
};

export default getData;

// //patch 요청

// //delete 요청
