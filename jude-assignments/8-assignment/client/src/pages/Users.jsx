export default function Users () {
  return (
    <div className="directory-page">
      <header className="topbar">
        <a className="brand" href="/users" aria-label="MemberHub members">
          <span className="brand-mark">m</span>
          <span>member<span className="brand-accent">hub</span></span>
        </a>
        <nav className="topbar-actions" aria-label="Account">
          <span id="current-user" className="current-user"></span>
          <a className="button button-outline button-small" href="/profile">My profile</a>
          <button id="logout-button" className="button button-outline button-small" type="button">Sign out</button>
        </nav>
      </header>

      <main className="directory-main">
        <div className="directory-heading">
          <div>
            <span className="eyebrow">YOUR COMMUNITY</span>
            <h1>Member directory</h1>
            <p>Find and get to know the people in your community.</p>
          </div>
          <div className="member-count"><span className="count-icon" aria-hidden="true">✳</span><span><strong id="member-count">—</strong><small>members</small></span></div>
        </div>

        <section className="directory-card" aria-label="All members">
          <div className="directory-tools">
            <div>
              <h2>All members</h2>
              <p>People who are part of MemberHub</p>
            </div>
            <label className="search-box">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input id="member-search" type="search" placeholder="Search members" aria-label="Search members" />
            </label>
          </div>
          <div id="directory-alert" className="directory-alert" role="status" aria-live="polite">Loading members…</div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>MEMBER</th><th>EMAIL ADDRESS</th><th>ROLE</th><th>JOINED</th></tr>
              </thead>
              <tbody id="member-rows"></tbody>
            </table>
          </div>
          <p id="empty-results" className="empty-results" hidden>No members match your search.</p>
        </section>

        <footer className="directory-footer"><span className="status-dot status-dot-green"></span> Member information is only visible to admins.</footer>
      </main>
    </div>
  );
}