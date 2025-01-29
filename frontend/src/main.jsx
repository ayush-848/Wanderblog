import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ClerkProvider } from '@clerk/clerk-react'

import App from './App.jsx';
import Profile from './Pages/Profile.jsx';
import Logout from './Pages/Logout.jsx';
import NotFound from './Pages/NotFound.jsx';
import BlogsPage from './Pages/MyBlogsPage.jsx';
import BlogsFeed from './Pages/BlogsFeed.jsx';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />

            <Route path="/blogs" element={<BlogsFeed />} />
            <Route path='/my-blogs' element={<BlogsPage />}/>
          </Routes>
        </Router>
      </AuthProvider>
    </ClerkProvider>
);

