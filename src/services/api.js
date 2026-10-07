import axios from "axios";

const API = axios.create({
  baseURL: "https://bus-backend-3pi1.onrender.com/api/auth", // ✅ only auth routes
});

export default API;