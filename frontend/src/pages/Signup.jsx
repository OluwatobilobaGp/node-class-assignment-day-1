
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

import SignupHeader from "../components/signup/SignupHeader";
import AccountForm from "../components/signup/AccountForm";
import ProfileForm from "../components/signup/ProfileForm";
import SignupMessage from "../components/signup/SignupMessage";
import SignupFooter from "../components/signup/SignupFooter";

import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const { signup, accessToken } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [profileData, setProfileData] = useState({
    phone: "",
    address: "",
    gender: "",
    bio: "",
  });

  const handleUserChange = (e) => {
    setUserData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileChange = (e) => {
    setProfileData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(userData);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.createProfile(profileData, accessToken);

      setSuccess("Profile created successfully.");

      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-card">
        <SignupHeader step={step} />

        <SignupMessage error={error} success={success} />

        {step === 1 && (
          <AccountForm
            userData={userData}
            onChange={handleUserChange}
            onSubmit={handleContinue}
            loading={loading}
          />
        )}

        {step === 2 && (
          <ProfileForm
            profileData={profileData}
            onChange={handleProfileChange}
            onSubmit={handleSignup}
            onBack={() => {
              setError("");
              setStep(1);
            }}
            loading={loading}
          />
        )}

        <SignupFooter />

       
      </div>
    </main>
  );
}

export default Signup;
