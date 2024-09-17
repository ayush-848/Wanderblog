const isBrowser = typeof window !== 'undefined';

export const getApiUrl = () => {
  let apiUrl;

  if (isBrowser) {
    // Running in the browser
    const hostname = window.location.hostname;

    if (hostname === 'www.wanderblog.xyz') {
      apiUrl = 'https://www.wanderblog.xyz/api';
    } else if (hostname === 'wanderblog-ayush-debs-projects.vercel.app') {
      apiUrl = 'https://wanderblog-ayush-debs-projects.vercel.app/api';
    } else {
      // Use localhost for local development in the browser
      apiUrl = 'http://localhost:5173/api';
    }
  } else {
    // Running in a non-browser environment (like server-side rendering)
    // Use environment variables for production or development environments
    apiUrl = process.env.VITE_API_URL || 'http://localhost:5173/api';
  }

  console.log('API URL:', apiUrl); // Debugging: Remove this in production
  return apiUrl;
};

// Export a constant API URL for use in the application
export const API_URL = getApiUrl();
