import axios from "axios";

const Api = axios.create({
  baseURL: "https://camelcase.up.railway.app/api",
  withCredentials: true,
});

export default Api;
