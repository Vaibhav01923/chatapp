import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5002/api"
      : "/api",
  withCredentials: true,
});

// Add response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log("Authentication failed - redirecting to login");
      // The auth store will handle the redirect
    }
    return Promise.reject(error);
  }
);
