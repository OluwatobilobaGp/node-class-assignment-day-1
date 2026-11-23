export default function LoginPage() {

  return (

    <div className="auth-page">
      <main className="auth-layout">
        <section className="auth-intro">
          <a className="brand brand-light" href="/login" aria-label="MemberHub home">
            <span className="brand-mark">m</span>
            <span>member<span className="brand-accent">hub</span></span>
          </a>
          <div className="intro-copy">
            <span className="eyebrow eyebrow-light">A better way to belong</span>
            <h1>Your people,<br />all in one place.</h1>
            <p>Sign in to your account to continue to your member workspace.</p>
          </div>
          <div className="intro-footer"><span className="status-dot"></span> A calm space for your community</div>
          <div className="intro-orb intro-orb-one"></div>
          <div className="intro-orb intro-orb-two"></div>
        </section>

        <section className="auth-main">
          <div className="auth-card">
            <div className="mobile-brand">
              <a className="brand" href="/login" aria-label="MemberHub home">
                <span className="brand-mark">m</span>
                <span>member<span className="brand-accent">hub</span></span>
              </a>
            </div>
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Sign in to MemberHub</h2>
            <p className="form-subtitle">Enter your details below to access your account.</p>

            <div className="form-alert" role="alert" aria-live="polite" hidden></div>
            <form id="login-form" className="auth-form">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" placeholder="jude@email.com" required />

              <div className="label-row">
                <label htmlFor="password">Password</label>
              </div>
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />

              <button className="button button-primary button-full" type="submit">
                <span>Sign in</span><span className="button-arrow" aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">New to MemberHub? <a href="/signup">Create an account</a></p>
            <p className="auth-legal">By continuing, you agree to use MemberHub responsibly.</p>
          </div>
          <footer className="page-footer">
            &copt; <span data-year></span> 
            MemberHub <span className="footer-divider">·</span> 
            Built for your community
          </footer>
        </section>
      </main>
    </div>

  );
}
