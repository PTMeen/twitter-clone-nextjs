import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { PostItem } from "@/types/post";

const usePosts = () => {
  const swr = useSWR("/api/posts", fetcher);
  const data = swr.data as PostItem[];
  return { ...swr, data };
};
export default usePosts;
