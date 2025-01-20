import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import App from './App.jsx';
import Profile from './Pages/Profile.jsx';
import Login from './Pages/Auth/Login.jsx';
import SignUp from './Pages/Auth/Signup.jsx';
import Logout from './Pages/Auth/Logout.jsx';
import NotFound from './Pages/NotFound.jsx';
import BlogsPage from './Pages/Blogs/BlogsPage.jsx';
import PrivateRoute from './Components/PrivateRoute.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          
          <Route path="/blogs" element= {<BlogsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

