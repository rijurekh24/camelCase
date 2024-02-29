import axios from "axios";

const Api = axios.create({
  baseURL: "http://192.168.29.56:3000",
  withCredentials: true,
});

export default Api;
