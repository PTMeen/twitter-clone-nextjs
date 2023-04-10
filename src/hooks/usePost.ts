import fetcher from "@/lib/fetcher";
import { PostItem } from "@/types/post";
import useSWR from "swr";

const usePost = (postId: string) => {
  const swr = useSWR(`/api/posts/${postId}`, fetcher);
  const data = swr.data as PostItem;

  return { ...swr, data };
};
export default usePost;
