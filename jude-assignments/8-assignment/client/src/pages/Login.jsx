import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    console.log({ email: email.trim(), password, rememberMe });
  };

  return (
    <div className="bg-body-tertiary d-flex align-items-center min-vh-100">
      <main className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4 p-sm-5">
                <div className="text-center mb-4">
                  <h1 className="h4 fw-bold mb-1">Log In</h1>
                  <p className="text-secondary small mb-0">
                    Enter your email and password to access your account
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className={validated ? "was-validated" : ""}
                  noValidate
                >
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label fw-medium">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg fs-6"
                      id="loginEmail"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">
                      Please enter a valid email address.
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <label htmlFor="loginPassword" className="form-label fw-medium mb-0">
                        Password
                      </label>
                      <a href="#" className="text-decoration-none small">
                        Forgot password?
                      </a>
                    </div>
                    <div className="input-group has-validation">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control form-control-lg fs-6"
                        id="loginPassword"
                        name="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                      <div className="invalid-feedback">
                        Please enter your password (at least 6 characters).
                      </div>
                    </div>
                  </div>

                  <div className="form-check mb-4">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                      Keep me signed in
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 fs-6 fw-semibold">
                    Log In
                  </button>
                </form>

                <p className="text-center text-secondary small mt-4 mb-0">
                  New here?{" "}
                  <a href="#" className="text-decoration-none fw-semibold">
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
