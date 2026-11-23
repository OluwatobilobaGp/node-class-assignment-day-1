const API_BASE = "/api/v1";

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const showAlert = (element, message) => {
  element.textContent = message;
  element.hidden = false;
};

const logoutWarning = sessionStorage.getItem("logoutWarning");
const loginAlert = document.querySelector(".form-alert");
if (logoutWarning && document.getElementById("login-form") && loginAlert) {
  showAlert(loginAlert, logoutWarning);
  sessionStorage.removeItem("logoutWarning");
}

const getErrorMessage = (payload, fallback) => {
  if (Array.isArray(payload?.errors) && payload.errors.length) {
    return payload.errors.map((error) => error.message).join(", ");
  }
  if (payload?.message) return payload.message;
  return fallback;
};

const endSession = (message) => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("currentUser");
  if (message) sessionStorage.setItem("logoutWarning", message);
  window.location.replace("/login");
};

const fetchWithAccessToken = async (url, options = {}) => {
  const sendRequest = (token) => fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  });

  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    endSession("Please sign in to continue.");
    return null;
  }

  let response = await sendRequest(token);
  if (response.status !== 401) return response;

  const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
    method: "POST",
    credentials: "include"
  });
  const refreshPayload = await refreshResponse.json();

  if (refreshResponse.status === 401) {
    endSession("Your session has expired. Please sign in again.");
    return null;
  }

  if (!refreshResponse.ok) {
    throw new Error(getErrorMessage(refreshPayload, "Unable to refresh your session."));
  }

  const refreshedToken = refreshPayload?.data?.accessToken;
  if (!refreshedToken) {
    throw new Error("The session refresh did not return an access token.");
  }

  sessionStorage.setItem("accessToken", refreshedToken);
  response = await sendRequest(refreshedToken);

  if (response.status === 401) {
    endSession("Your session has expired. Please sign in again.");
    return null;
  }

  return response;
};

const saveSession = (result) => {
  sessionStorage.setItem("accessToken", result.accessToken);
  sessionStorage.setItem("currentUser", JSON.stringify(result.user));
};

const setupAuthForm = (formId, endpoint, isSignup) => {
  const form = document.getElementById(formId);
  if (!form) return;

  const alert = document.querySelector(".form-alert");
  const submitButton = form.querySelector('button[type="submit"]');
  const buttonLabel = submitButton.querySelector("span");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    alert.hidden = true;
    submitButton.disabled = true;
    buttonLabel.textContent = isSignup ? "Creating account…" : "Signing in…";

    const formData = new FormData(form);
    const body = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_BASE}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body)
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Unable to complete your request."));
      }

      saveSession(payload.data);
      window.location.assign("/profile");
    } catch (error) {
      showAlert(alert, error.message || "Unable to reach the server. Please try again.");
      submitButton.disabled = false;
      buttonLabel.textContent = isSignup ? "Create account" : "Sign in";
    }
  });
};

setupAuthForm("login-form", "signin", false);
setupAuthForm("signup-form", "signup", true);

const setupLogout = (buttonId) => {
  const logoutButton = document.getElementById(buttonId);
  if (!logoutButton) return;

  logoutButton.addEventListener("click", async () => {
    logoutButton.disabled = true;
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("currentUser");

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${API_BASE}/auth/logout`, {
        method: "POST",
        credentials: "include",
        signal: controller.signal
      });
      if (!response.ok) {
        throw new Error(`Logout request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Server-side logout failed:", error);
      sessionStorage.setItem(
        "logoutWarning",
        "You have been signed out on this device, but the server could not confirm the session was revoked."
      );
    } finally {
      window.clearTimeout(timeoutId);
      window.location.replace("/login");
    }
  });
};

setupLogout("logout-button");
setupLogout("profile-logout-button");

const directory = document.getElementById("member-rows");

if (directory) {
  const alert = document.getElementById("directory-alert");
  const count = document.getElementById("member-count");
  const search = document.getElementById("member-search");
  const emptyResults = document.getElementById("empty-results");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");
  let members = [];

  if (currentUser) {
    document.getElementById("current-user").textContent =
      `${currentUser.firstName} ${currentUser.lastName}`;
  }

  const renderMembers = () => {
    const query = search.value.trim().toLowerCase();
    const filteredMembers = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
      return fullName.includes(query) || member.email.toLowerCase().includes(query);
    });

    directory.replaceChildren();

    filteredMembers.forEach((member) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const nameContent = document.createElement("div");
      const avatar = document.createElement("span");
      const name = document.createElement("span");
      const emailCell = document.createElement("td");
      const roleCell = document.createElement("td");
      const role = document.createElement("span");
      const joinedCell = document.createElement("td");
      const displayName = `${member.firstName} ${member.lastName}`;

      nameContent.className = "member-cell";
      avatar.className = "avatar";
      avatar.textContent = `${member.firstName[0] || ""}${member.lastName[0] || ""}`;
      name.textContent = displayName;
      nameContent.append(avatar, name);
      nameCell.append(nameContent);
      emailCell.textContent = member.email;
      role.className = `role-pill${member.role === "admin" ? " admin" : ""}`;
      role.textContent = member.role;
      roleCell.append(role);
      joinedCell.textContent = member.createdAt
        ? new Date(member.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
          })
        : "—";
      row.append(nameCell, emailCell, roleCell, joinedCell);
      directory.append(row);
    });

    emptyResults.hidden = filteredMembers.length > 0;
    count.textContent = String(members.length);
  };

  search.addEventListener("input", renderMembers);

  const loadMembers = async () => {
    const response = await fetchWithAccessToken(`${API_BASE}/users`);
    if (!response) return;
    const payload = await response.json();

    if (response.status === 403) {
      throw new Error("Only admin accounts can view registered users. Sign in with an admin account.");
    }

    if (!response.ok) {
      throw new Error(getErrorMessage(payload, "Unable to load members."));
    }

    members = payload.data;
    alert.textContent = "";
    renderMembers();
  };

  loadMembers().catch((error) => {
    alert.textContent = error.message || "Unable to load members.";
    alert.classList.add("error");
  });
}

const profilePage = document.getElementById("profile-content");

if (profilePage) {
  const alert = document.getElementById("profile-alert");
  const details = document.getElementById("profile-details");
  const createSection = document.getElementById("create-profile-section");
  const form = document.getElementById("create-profile-form");
  const submitButton = document.getElementById("create-profile-button");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");

  if (!currentUser?.id) {
    endSession("Please sign in to view your profile.");
  } else {
    const fullName = `${currentUser.firstName} ${currentUser.lastName}`.trim();
    document.getElementById("profile-current-user").textContent = fullName;
    document.getElementById("profile-name").textContent = fullName;
    document.getElementById("profile-email").textContent = currentUser.email;
    document.getElementById("profile-role").textContent = currentUser.role;
    document.getElementById("profile-role").classList.toggle(
      "admin",
      currentUser.role === "admin"
    );
    document.getElementById("profile-avatar").textContent =
      `${currentUser.firstName[0] || ""}${currentUser.lastName[0] || ""}`;
    if (currentUser.role === "admin") {
      document.getElementById("directory-link").hidden = false;
    }

    const showProfile = (profile) => {
      profilePage.hidden = false;
      alert.textContent = "";
      details.hidden = false;
      createSection.hidden = true;
      document.getElementById("profile-phone").textContent = profile.phone || "Not provided";
      document.getElementById("profile-address").textContent = profile.address || "Not provided";
      document.getElementById("profile-gender").textContent = profile.gender || "Not provided";
      document.getElementById("profile-bio").textContent = profile.bio || "Not provided";
    };

    const loadProfile = async () => {
      const response = await fetchWithAccessToken(
        `/api/profile/${encodeURIComponent(currentUser.id)}`
      );
      if (!response) return;

      const payload = await response.json();
      if (response.status === 404) {
        alert.textContent = "";
        profilePage.hidden = false;
        createSection.hidden = false;
        return;
      }

      if (!response.ok) {
        throw new Error(getErrorMessage(payload, "Unable to load your profile."));
      }

      showProfile(payload.data);
    };

    loadProfile().catch((error) => {
      alert.textContent = error.message || "Unable to load your profile.";
      alert.classList.add("error");
    });

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      alert.classList.remove("error");
      alert.textContent = "";
      submitButton.disabled = true;
      submitButton.textContent = "Creating profile…";

      try {
        const body = Object.fromEntries(new FormData(form).entries());
        const response = await fetchWithAccessToken("/api/profile/create-profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        if (!response) return;

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(getErrorMessage(payload, "Unable to create your profile."));
        }

        showProfile(payload.data);
      } catch (error) {
        alert.textContent = error.message || "Unable to create your profile.";
        alert.classList.add("error");
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Create profile";
      }
    });
  }
}
