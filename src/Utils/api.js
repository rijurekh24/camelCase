import axios from "axios";

const prod = true;
const Api = axios.create({
  baseURL: prod
    ? "https://camelcase.onrender.com/api"
    : "http://192.168.29.56:3000/api",
  withCredentials: true,
});

export default Api;
