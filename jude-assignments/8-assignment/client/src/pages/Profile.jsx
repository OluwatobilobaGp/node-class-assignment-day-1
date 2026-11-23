export default function Profile () {
  return (
    
    <div className="directory-page">
      <header className="topbar">
        <a className="brand" href="/profile" aria-label="MemberHub profile">
          <span className="brand-mark">m</span>
          <span>member<span className="brand-accent">hub</span></span>
        </a>
        <nav className="topbar-actions" aria-label="Account">
          <a id="directory-link" className="button button-outline button-small" href="/users" hidden>Member directory</a>
          <span id="profile-current-user" className="current-user"></span>
          <button id="profile-logout-button" className="button button-outline button-small" type="button">Sign out</button>
        </nav>
      </header>

      <main className="directory-main profile-main">
        <div className="directory-heading">
          <div>
            <span className="eyebrow">YOUR ACCOUNT</span>
            <h1>My profile</h1>
            <p>Your account details and profile information.</p>
          </div>
        </div>

        <section className="profile-card" aria-label="My profile information">
          <div id="profile-alert" className="directory-alert" role="status" aria-live="polite">Loading your profile…</div>

          <div id="profile-content" className="profile-content" hidden>
            <div className="profile-identity">
              <span id="profile-avatar" className="profile-avatar" aria-hidden="true"></span>
              <div>
                <h2 id="profile-name"></h2>
                <p id="profile-email"></p>
              </div>
              <span id="profile-role" className="role-pill"></span>
            </div>

            <div id="profile-details" className="profile-details" hidden>
              <div className="profile-detail"><span>PHONE</span><strong id="profile-phone"></strong></div>
              <div className="profile-detail"><span>ADDRESS</span><strong id="profile-address"></strong></div>
              <div className="profile-detail"><span>GENDER</span><strong id="profile-gender"></strong></div>
              <div className="profile-detail profile-detail-wide"><span>ABOUT</span><strong id="profile-bio"></strong></div>
            </div>

            <section id="create-profile-section" className="create-profile-section" hidden>
              <div className="profile-section-heading">
                <h2>Complete your profile</h2>
                <p>You don't have a profile yet. Add a few details to create one.</p>
              </div>
              <form id="create-profile-form" className="profile-form">
                <div className="profile-form-grid">
                  <div>
                    <label for="profile-phone-input">Phone</label>
                    <input id="profile-phone-input" name="phone" type="tel" maxlength="30" autoComplete="tel" placeholder="Your phone number" />
                  </div>
                  <div>
                    <label for="profile-gender-input">Gender</label>
                    <input id="profile-gender-input" name="gender" type="text" maxlength="40" placeholder="Optional" />
                  </div>
                  <div className="profile-form-wide">
                    <label for="profile-address-input">Address</label>
                    <input id="profile-address-input" name="address" type="text" maxlength="300" autoComplete="street-address" placeholder="City, country" />
                  </div>
                  <div className="profile-form-wide">
                    <label for="profile-bio-input">About you</label>
                    <textarea id="profile-bio-input" name="bio" rows="4" maxlength="500" placeholder="A short introduction"></textarea>
                  </div>
                </div>
                <button id="create-profile-button" className="button button-primary" type="submit">Create profile</button>
              </form>
            </section>
          </div>
        </section>
      </main>
    </div>

  );
}