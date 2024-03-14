// axiosInstance.js

import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const statusCode = error.response?.status;
    console.log(
      "statusCode in axiosInstance is ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ : ",
      statusCode
    );
    console.log(
      "error in axiosInstance is ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ : ",
      error
    );
    if ([401, 403].includes(statusCode)) {
      localStorage.clear(); // Clear local storage on authentication issues
      window.location.href = "/login"; // Redirect to login page
    }
    alert(error);

    return Promise.reject(error);
  }
);

export default axiosInstance;


