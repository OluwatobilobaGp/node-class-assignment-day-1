
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user, accessToken, loading, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!user || !accessToken) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        setError("");

        const result = await authService.getProfile(user.id);
        setProfile(result.data.profile || result.data);
      } catch (err) {
        setError(err.message || "Unable to load your profile.");
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [loading, user, accessToken, navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading || profileLoading) {
    return (
      <main className="profile-page">
        <p>Loading your profile...</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-heading">
          <h1>My Profile</h1>
          <p>Your account information</p>
        </div>

        {error && <div className="profile-error">{error}</div>}

        <div className="profile-details">
          <div className="profile-item">
            <span>First Name</span>
            <strong>{user.firstName}</strong>
          </div>

          <div className="profile-item">
            <span>Last Name</span>
            <strong>{user.lastName}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          <div className="profile-item">
            <span>Phone</span>
            <strong>{profile?.phone || "Not provided"}</strong>
          </div>

          <div className="profile-item">
            <span>Address</span>
            <strong>{profile?.address || "Not provided"}</strong>
          </div>

          <div className="profile-item">
            <span>Gender</span>
            <strong>{profile?.gender || "Not provided"}</strong>
          </div>

          <div className="profile-item">
            <span>Bio</span>
            <strong>{profile?.bio || "No bio added"}</strong>
          </div>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </section>
    </main>
  );
}

export default Profile;
