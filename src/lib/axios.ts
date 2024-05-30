import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://judge0-extra-ce.p.rapidapi.com",
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    const token = process.env.JUDGE0_API_KEY;
    const host = "judge0-extra-ce.p.rapidapi.com";
    config.headers["X-RapidAPI-Key"] = token;
    config.headers["X-RapidAPI-Host"] = host;
  } catch (error) {
    console.log(error);
  }
  return config;
});
