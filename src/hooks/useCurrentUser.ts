import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  return useSWR("/api/current", fetcher);
};
export default useCurrentUser;
