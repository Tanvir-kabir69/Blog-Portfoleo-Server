import { User } from "@prisma/client";

export interface IJwtPayload extends Pick<User, "email" | "role" | "isVerified" | "isSubscribed"> {
  userId: User["id"];
}