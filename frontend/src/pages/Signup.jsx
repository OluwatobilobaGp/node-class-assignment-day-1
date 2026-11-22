import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [step, setStep] = useState(1);

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
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    console.log("User Data:", userData);
    console.log("Profile Data:", profileData);

    alert("Signup UI completed. Backend connection comes next.");
  };

  return (
    <main className="signup-page">
      <div className="signup-card">
        <div className="signup-heading">
          <h1>{step === 1 ? "Create an account" : "Your profile"}</h1>

          <p>
            {step === 1
              ? "Enter your details to get started."
              : "Complete your profile details."}
          </p>
        </div>

        <div className="signup-progress">
          <div className={step >= 1 ? "progress-active" : ""}></div>
          <div className={step >= 2 ? "progress-active" : ""}></div>
        </div>

        {step === 1 && (
          <form onSubmit={handleContinue} className="signup-form">
            <div className="signup-row">
              <div className="signup-field">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={userData.firstName}
                  onChange={handleUserChange}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div className="signup-field">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={userData.lastName}
                  onChange={handleUserChange}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>
            </div>

            <div className="signup-field">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={handleUserChange}
                required
              />
            </div>

            <div className="signup-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={userData.password}
                onChange={handleUserChange}
                required
                minLength={8}
                maxLength={72}
              />
            </div>

            <button type="submit" className="signup-button">
              Continue
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSignup} className="signup-form">
            <div className="signup-field">
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
            </div>

            <div className="signup-field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={profileData.address}
                onChange={handleProfileChange}
              />
            </div>

            <div className="signup-field">
              <label>Gender</label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleProfileChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="signup-field">
              <label>Bio</label>
              <textarea
                name="bio"
                placeholder="Write a short bio"
                value={profileData.bio}
                onChange={handleProfileChange}
                maxLength={500}
              />
            </div>

            <div className="signup-buttons">
              <button
                type="button"
                className="signup-button signup-back"
                onClick={() => setStep(1)}
              >
                Back
              </button>

              <button type="submit" className="signup-button">
                Create account
              </button>
            </div>
          </form>
        )}

        <div className="signup-login">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </main>
  );
}

export default Signup;