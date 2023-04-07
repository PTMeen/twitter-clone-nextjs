import useSWR from "swr";
import { User } from "@prisma/client";

import fetcher from "@/lib/fetcher";

const useUsers = (userId?: string) => {
  const url = userId ? `/api/users/${userId}` : "/api/users";
  const swr = useSWR(url, fetcher);
  const data = swr.data as User[];

  return { ...swr, data };
};
export default useUsers;
