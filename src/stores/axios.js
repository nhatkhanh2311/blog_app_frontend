import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:4000/api"
});

export default axios;

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  }
);
