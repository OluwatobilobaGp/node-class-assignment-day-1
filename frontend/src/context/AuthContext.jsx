
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authService } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore the session after a page refresh.
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const refreshResult = await authService.refresh();

        const token = refreshResult.data?.accessToken;

        if (!token) {
          throw new Error("No access token returned.");
        }

        const userResult = await authService.getMe(token);

        setAccessToken(token);
        setUser(userResult.data.user);
      } catch {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Register a new account.
  const signup = async (userData) => {
    const result = await authService.signup(userData);

    const token = result.data?.accessToken;
    const newUser = result.data?.user;

    if (!token || !newUser) {
      throw new Error("Signup response is incomplete.");
    }

    setAccessToken(token);
    setUser(newUser);

    return {
      user: newUser,
      accessToken: token,
    };
  };

  // Login an existing account.
  const login = async (credentials) => {
    const result = await authService.signin(credentials);

    const token = result.data?.accessToken;
    const loggedInUser = result.data?.user;

    if (!token || !loggedInUser) {
      throw new Error("Login response is incomplete.");
    }

    setAccessToken(token);
    setUser(loggedInUser);

    return loggedInUser;
  };

  // Logout the current session.
  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const value = {
    user,
    accessToken,
    loading,
    isAuthenticated: Boolean(user && accessToken),
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Access authentication anywhere in the application.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}
