import useSWR from "swr";
import { NotificationItem } from "@/types/notification";
import fetcher from "@/lib/fetcher";

const useNotifications = () => {
  const swr = useSWR("/api/notifications", fetcher);
  const data = swr.data as NotificationItem[];

  return { ...swr, data };
};
export default useNotifications;
