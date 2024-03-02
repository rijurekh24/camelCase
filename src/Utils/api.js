import axios from "axios";

const Api = axios.create({
  baseURL: "https://camelcase.onrender.com/api",
  withCredentials: true,
});

export default Api;
