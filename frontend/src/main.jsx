import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClerkProvider } from '@clerk/clerk-react'

import App from './App.jsx';
import Profile from './Pages/Profile.jsx';
import Logout from './Pages/Logout.jsx';
import NotFound from './Pages/NotFound.jsx';
import BlogsPage from './Pages/Blogs/BlogsPage.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/blogs" element={<BlogsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ClerkProvider>

  </React.StrictMode>
);

