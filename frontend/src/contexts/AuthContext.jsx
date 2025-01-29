import React, { createContext, useState, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, session, signOut, signUp, signIn } = useClerk();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (session) {
        try {
          const token = await session.getToken();
          console.log(token);
    
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching token:", error);
          
          setIsAuthenticated(false);
        }
      } else {
        
        setIsAuthenticated(false);
      }
    };

    fetchToken();
    // Cleanup function (optional, depends on your use case)
    return () => {}
  }, [session]); // Added `session` as a dependency

  const login = async (email, password) => {
    try {
      await signIn.create({ emailAddress: email, password });
      const token = await session.getToken();
      setAuthToken(token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      await signUp.create({ emailAddress: email, password });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    signOut();
    setAuthToken(null); // Clear token on logout
    setIsAuthenticated(false);
  };

  const updateProfile = async (updates) => {
    try {
      await user.updateProfile(updates);
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!session, // Derive `isAuthenticated` from the session directly
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
