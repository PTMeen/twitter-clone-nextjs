import { Post, Comment } from "@prisma/client";
import { UserThumbnail } from "./user";

export type PostItem = Post & {
  user: UserThumbnail;
  comments: Comment[];
};
