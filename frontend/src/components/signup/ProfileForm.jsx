
function ProfileForm({
  profileData,
  onChange,
  onSubmit,
  onBack,
  loading,
}) {
  return (
    <form onSubmit={onSubmit} className="signup-form">
      <div className="signup-field">
        <label>Phone number</label>
        <input
          type="tel"
          name="phone"
          placeholder="Enter your phone number"
          value={profileData.phone}
          onChange={onChange}
        />
      </div>

      <div className="signup-field">
        <label>Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter your address"
          value={profileData.address}
          onChange={onChange}
        />
      </div>

      <div className="signup-field">
        <label>Gender</label>
        <select
          name="gender"
          value={profileData.gender}
          onChange={onChange}
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
          onChange={onChange}
          maxLength={500}
        />
      </div>

      <div className="signup-buttons">
        <button
          type="button"
          className="signup-button signup-back"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </button>

        <button
          type="submit"
          className="signup-button"
          disabled={loading}
        >
          {loading ? "Saving profile..." : "Create account"}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
