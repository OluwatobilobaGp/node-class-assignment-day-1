
function AccountForm({ userData, onChange, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="signup-form">
      <div className="signup-row">
        <div className="signup-field">
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={userData.firstName}
            onChange={onChange}
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
            onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          required
          minLength={8}
          maxLength={72}
        />
      </div>

      <button
        type="submit"
        className="signup-button"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Continue"}
      </button>
    </form>
  );
}

export default AccountForm;
