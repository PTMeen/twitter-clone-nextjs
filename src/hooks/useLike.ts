import { MouseEvent, useState } from "react";
import axios from "axios";

import usePosts from "./usePosts";
import usePost from "./usePost";
import useMyToast from "./useMyToast";
import { PostItem } from "@/types/post";
import useCurrentUser from "./useCurrentUser";

const useLike = (post: PostItem) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(post.id);
  const myToast = useMyToast();

  const [isLoading, setIsLoading] = useState(false);

  const isLiked = post.likeIds.includes(currentUser?.id as string);

  const likeDislike = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    try {
      setIsLoading(true);
      await axios.patch("/api/posts/like", { postId: post.id });

      mutatePost();
      mutatePosts();
    } catch (error) {
      myToast("Error", "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { likeDislike, isLiked, isLoading };
};
export default useLike;
