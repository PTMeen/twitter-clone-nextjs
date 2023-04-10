import { useMemo, useState } from "react";
import axios from "axios";

import useCurrentUser from "./useCurrentUser";
import useUsers from "./useUsers";
import useMyToast from "./useMyToast";

const useFollow = (userId: string) => {
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateUsers } = useUsers(userId);
  const { mutate: mutateUser } = useUsers(userId);
  const myToast = useMyToast();

  const [isLoading, setIsLoading] = useState(false);

  const isFollowing = currentUser?.followingIds.includes(userId);

  const followUnfollow = async () => {
    const url = currentUser?.followingIds.includes(userId)
      ? "/api/unfollow"
      : "/api/follow";

    try {
      setIsLoading(true);
      await axios.patch(url, { userId });
      mutateUser();
      mutateUsers();
    } catch (error) {
      myToast("Errror", "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { followUnfollow, isLoading, isFollowing };
};
export default useFollow;
