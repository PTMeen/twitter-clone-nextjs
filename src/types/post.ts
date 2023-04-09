import { Post, User, Comment } from "@prisma/client";

export type PostItem = Post & {
  user: Pick<User, "username" | "name" | "id" | "profileImg">;
  comments: Comment[];
};
