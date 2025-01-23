import React, { createContext, useState, useEffect } from 'react';
import { useClerk } from '@clerk/clerk-react'; // Import Clerk hooks

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, signOut, signUp, signIn } = useClerk(); // Clerk hooks
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if Clerk is loaded and if a user is authenticated
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      await signIn.create({ emailAddress: email, password });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      await signUp.create({ emailAddress: email, password });
      // Clerk automatically handles verification link sending, so no need to handle manually
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    signOut();
    setIsAuthenticated(false);
  };

  const updateProfile = async (updates) => {
    try {
      await user.updateProfile(updates);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value = { user, isAuthenticated, login, register, logout, updateProfile };

  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
