import { Post, User, Comment } from "@prisma/client";

export type UserThumbnail = Pick<
  User,
  "username" | "name" | "id" | "profileImg"
>;

export type PostItem = Post & {
  user: UserThumbnail;
  comments: Comment[];
};
