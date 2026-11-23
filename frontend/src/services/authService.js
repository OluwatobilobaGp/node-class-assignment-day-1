
const API_URL = "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Something went wrong. Please try again."
    );
  }

  return result;
}

export const authService = {
  signup: (userData) =>
    request("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  signin: (credentials) =>
    request("/api/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  refresh: () =>
    request("/api/v1/auth/refresh", {
      method: "POST",
    }),

  getMe: (accessToken) =>
    request("/api/v1/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  logout: () =>
    request("/api/v1/auth/logout", {
      method: "POST",
    }),

  createProfile: (profileData, accessToken) =>
    request("/api/profile/create-profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    }),

  getProfile: (userId) =>
    request(`/api/profile/${userId}`, {
      method: "GET",
    }),
};
