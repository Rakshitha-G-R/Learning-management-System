const GoogleStrategy = require("passport-google-oauth20").Strategy
const passport = require("passport");
const User = require('./models/user.model');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (req, accessToken, refreshToken, profile, done) {
            const myEmail = profile._json.email;

            var user = await User.findOne({ email: myEmail });
            if(!user)
            {
                user = new User();
                user.email = profile._json.email;
                user.password = "GoogleLogin";
                user.fname = profile._json.given_name;
                user.lname = profile._json.family_name;
                user.type = "Unapproved";
                await user.save();
            }
            req._user = user;

            return done(null, user);
        }
    )
)

passport.serializeUser((user,done) => {
    done(null, user);
});

passport.deserializeUser((user,done) => {
    done(null, user);
})