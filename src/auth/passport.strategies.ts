import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
// import passportApiKey from "passport-headerapikey";
import passportJwt from "passport-jwt";
import { User } from "../models/user";
import config from "../config";

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
interface Payload {
  email: string;
  iat: any;
  exp: any;
}
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      // tslint:disable-next-line:no-console
      console.log("Enter treatety");
      User.findOne({ email: email.toLowerCase() }, (err: any, user: any) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `username ${email} not found.`,
          });
        }
        if (isPasswordMatched(password, user.password)) {
          return done(undefined, user);
        }
        return done(undefined, false, {
          message: "Invalid username or password.",
        });
      });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtAccessSecretKey,
      passReqToCallback: true,
    },
    (request: any, payload: Payload, done: any) => {
      User.findOne({ email: payload.email }, (err: any, user: any) => {
        // tslint:disable-next-line:no-console
        console.log("payload", payload);
        // tslint:disable-next-line:no-console
        console.log("done", done);
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(undefined, user);
        } else {
          return done(undefined, false);
        }
      });
    }
  )
);
const isPasswordMatched = async (
  userPassword: string,
  currentPassword: string
) => {
  return await bcrypt.compare(currentPassword, userPassword);
};
