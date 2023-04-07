import useSWR from "swr";
import { User } from "@prisma/client";

import fetcher from "@/lib/fetcher";

const useCurrentUser = () => {
  const swr = useSWR("/api/current", fetcher);
  const data = swr.data as User | null;

  return { ...swr, data };
};
export default useCurrentUser;
