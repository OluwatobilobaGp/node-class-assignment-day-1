
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        const emailVerified =
          profile._json.email_verified === true ||
          profile._json.email_verified === "true";

        const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

        if (!email || !emailVerified) {
          return done(null, false);
        }

        if (email !== adminEmail) {
          return done(null, false);
        }

        return done(null, {
          googleId: profile.id,
          email,
          name: profile.displayName,
          role: "admin",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
