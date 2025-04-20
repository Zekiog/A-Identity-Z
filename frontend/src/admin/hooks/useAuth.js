import { createContext, useContext, useState, useEffect } from 'react';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, this would make an API call to validate credentials
    // For demo, we'll just accept any login
    const authenticatedUser = {
      id: 1,
      name: userData.email.split('@')[0],
      email: userData.email,
      role: 'Administrator',
      token: 'demo-token-12345'
    };
    
    setUser(authenticatedUser);
    localStorage.setItem('adminUser', JSON.stringify(authenticatedUser));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  // Auth context value
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};