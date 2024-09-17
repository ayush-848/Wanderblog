// Check if running in a browser environment
const isBrowser = typeof window !== 'undefined';

// Function to get API URL
export const getApiUrl = () => {
  let apiUrl;

  if (isBrowser) {
    // Running in the browser, use environment variable
    apiUrl = import.meta.env.VITE_API_URL;
  } else {
    // Running server-side (like server-side rendering), use environment variable
    apiUrl = process.env.VITE_API_URL;
  }

  console.log('API URL:', apiUrl); // Debugging: Remove this in production
  return apiUrl;
};

// Export a constant API URL for use in the application
export const API_URL = getApiUrl();
