import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // Replace with your API base URL
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


// Add request interceptor
axiosInstance.interceptors.request.use(
   (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add response interceptor for handling token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response; // Return response data as is
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request. Redirecting to login...");
      // Redirect to login page or handle token refresh logic here
      // Example: window.location.href = "/login";
    }
    return Promise.reject(error); // Reject other errors
  }
);

export default axiosInstance;
