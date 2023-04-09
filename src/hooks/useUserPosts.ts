import fetcher from "@/lib/fetcher";
import { PostItem } from "@/types/post";
import useSWR from "swr";

const useUserPosts = (userId: string) => {
  const swr = useSWR(`/api/posts/users/${userId}`, fetcher);
  const data = swr.data as PostItem[];

  return { ...swr, data };
};
export default useUserPosts;
