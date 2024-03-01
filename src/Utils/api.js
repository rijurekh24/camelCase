import axios from "axios";

const Api = axios.create({
  baseURL: "https://idemedia-production.up.railway.app",
  withCredentials: true,
});

export default Api;
