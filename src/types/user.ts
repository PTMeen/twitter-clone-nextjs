import { User } from "@prisma/client";

export type UserThumbnail = Pick<
  User,
  "username" | "name" | "id" | "profileImg"
>;
