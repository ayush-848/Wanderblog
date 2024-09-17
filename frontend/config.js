const isBrowser = typeof window !== 'undefined';

export const getApiUrl = () => {
  let apiUrl;
  if (isBrowser) {
    // Check if the app is being served from the Vercel or custom domain
    if (window.location.hostname === 'www.wanderblog.xyz') {
      apiUrl = 'https://www.wanderblog.xyz/api';
    } else if (window.location.hostname === 'wanderblog-ayush-debs-projects.vercel.app') {
      apiUrl = 'https://wanderblog-ayush-debs-projects.vercel.app/api';
    } else {
      // Default fallback if none match
      apiUrl = 'http://localhost:3000/api';
    }
  } else {
    // Fallback for non-browser environments (e.g., SSR)
    apiUrl = process.env.VITE_API_URL || 'http://localhost:3000/api';
  }
  
  console.log('API URL:', apiUrl);
  return apiUrl;
};

export const API_URL = getApiUrl();
