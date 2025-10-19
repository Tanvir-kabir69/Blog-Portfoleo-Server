/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import { envVars } from "./env";
import { prisma } from "./db";
import { AuthProvider } from "@prisma/client";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        // let isUserExist = await prisma.user.findUnique({
        const isUserExist = await prisma.user.findUnique({
          where: { email: email, provider: AuthProvider.CREDENTIAL },
        });

        if (!isUserExist) {
          return done("User does not exist"); // system error ( server/database )
        }

        if (isUserExist.provider !== "CREDENTIAL") {
          return done(null, false, {
            message: "Please log in with your social account",
          });
        }

        if (!isUserExist.password) {
          return done(null, false, {
            message: "Password not set for this account",
          });
        }

        if (isUserExist.isDeleted) {
          return done(null, false, { message: "User is deleted" });
        }

        if (isUserExist.isBlocked) {
          return done(null, false, { message: "User is blocked" });
        }

        if (!isUserExist.isActive) {
          return done(null, false, { message: "User is deactive" });
        }

        // if (!isUserExist.isVerified) {
        //   return done(null, false, { message: "User is not verified" });
        // }

        // const isGoogleAuthenticated = isUserExist.auths.some(
        //   (providerObjects) => providerObjects.provider == "google"
        // );

        // if (isGoogleAuthenticated && !isUserExist.password) {
        //   return done(null, false, {
        //     message:
        //       "You have authenticated through Google. So if you want to login with credentials, then at first login with google and set a password for your Gmail and then you can login with email and password.",
        //   });
        // }

        const isPasswordMatched = await bcrypt.compare(
          password as string,
          isUserExist.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password does not match" });
        }

        return done(null, isUserExist);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: envVars.GOOGLE_CLIENT_ID,
//       clientSecret: envVars.GOOGLE_CLIENT_SECRET,
//       callbackURL: envVars.GOOGLE_CALLBACK_URL,
//     },
//     async (
//       accessToken: string,
//       refreshToken: string,
//       profile: Profile,
//       done: VerifyCallback
//     ) => {
//       try {
//         const email = profile.emails?.[0].value;

//         if (!email) {
//           return done(null, false, { mesaage: "No email found" });
//         }

//         let isUserExist = await User.findOne({ email });
//         if (isUserExist && !isUserExist.isVerified) {
//           // throw new AppError(httpStatus.BAD_REQUEST, "User is not verified")
//           // done("User is not verified")
//           return done(null, false, { message: "User is not verified" });
//         }

//         if (
//           isUserExist &&
//           (isUserExist.isActive === IsActive.BLOCKED ||
//             isUserExist.isActive === IsActive.INACTIVE)
//         ) {
//           // throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
//           done(`User is ${isUserExist.isActive}`);
//         }

//         if (isUserExist && isUserExist.isDeleted) {
//           return done(null, false, { message: "User is deleted" });
//           // done("User is deleted")
//         }

//         if (!isUserExist) {
//           isUserExist = await User.create({
//             email,
//             name: profile.displayName,
//             picture: profile.photos?.[0].value,
//             role: Role.USER,
//             isVerified: true,
//             auths: [
//               {
//                 provider: "google",
//                 providerId: profile.id,
//               },
//             ],
//           });
//         }

//         return done(null, isUserExist);
//       } catch (error) {
//         console.log("Google Strategy Error", error);
//         return done(error);
//       }
//     }
//   )
// );

// frontend localhost:5173/login?redirect=/booking -> localhost:5000/api/v1/auth/google?redirect=/booking -> passport -> Google OAuth Consent -> gmail login -> successful -> callback url localhost:5000/api/v1/auth/google/callback -> db store -> token

// Bridge == Google -> user db store -> token
//Custom -> email , password, role : USER, name... -> registration -> DB -> 1 User create
//Google -> req -> google -> successful : Jwt Token : Role , email -> DB - Store -> token - api access

export default passport;
