// import { JwtPayload } from "jsonwebtoken";
// import { IJwtPayload } from "./jwtPayload";
// interface IJwtPayload {
//   userId: number;
//   email: string;
//   role: string; // or Role if you're importing from @prisma/client
//   isVerified: boolean;
//   isSubscribed: boolean;
// }

// declare global {
//   namespace Express {
//     interface Request {
//       // user: JwtPayload;
//       user: IJwtPayload;
//     }
//   }
// }

// export {}; // ✅ <— This ensures it’s treated as a module, so TS merges it globally
