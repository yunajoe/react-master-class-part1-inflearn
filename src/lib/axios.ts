import axios from "axios";

const instance = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
