import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // console.log("config", config);
    // console.log("config.headers", config.headers);
    const accessToken = localStorage.getItem("token");
    // console.log("accessToken", accessToken);

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);
