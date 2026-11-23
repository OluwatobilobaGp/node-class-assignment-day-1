export default function Signup () {
  return (
    <>
      <div className="auth-page">
        <main className="auth-layout">
          <section className="auth-intro">
            <a className="brand brand-light" href="/login" aria-label="MemberHub home">
              <span className="brand-mark">m</span>
              <span>member<span className="brand-accent">hub</span></span>
            </a>
            <div className="intro-copy">
              <span className="eyebrow eyebrow-light">Make yourself at home</span>
              <h1>Good things<br />start together.</h1>
              <p>Create your account and join a community that keeps everyone connected.</p>
            </div>
            <div className="intro-footer"><span className="status-dot"></span> Your community, closer</div>
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
              <span className="eyebrow">GET STARTED</span>
              <h2>Create your account</h2>
              <p className="form-subtitle">Just a few details and you’re in.</p>

              <div className="form-alert" role="alert" aria-live="polite" hidden></div>
              <form id="signup-form" className="auth-form">
                <div className="name-fields">
                  <div>
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" name="firstName" type="text" autoComplete="given-name" placeholder="Jude" minLength="2" maxLength="50" required />
                  </div>
                  <div>
                    <label htmlFor="lastName">Last name</label>
                    <input id="lastName" name="lastName" type="text" autoComplete="family-name" placeholder="Uloko" minLength="2" maxLength="50" required />
                  </div>
                </div>

                <label htmlFor="email">Email address</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="jude@email.com" required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" placeholder="At least 8 characters" required />
                <p className="field-hint">Use at least 8 characters.</p>

                <button className="button button-primary button-full" type="submit">
                  <span>Create account</span>
                  <span className="button-arrow" aria-hidden="true">→</span>
                </button>
              </form>

              <p className="auth-switch">Already have an account? <a href="/login">Sign in</a></p>
              <p className="auth-legal">Your password is securely hashed before it is stored.</p>
            </div>
            <footer className="page-footer">&copy; <span data-year></span> MemberHub <span className="footer-divider">·</span> Built for your community</footer>
          </section>
        </main>
      </div>

    </>
  );
}