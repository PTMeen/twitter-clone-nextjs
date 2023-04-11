import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

const follow = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ msg: "User ID required" });
  }

  const currentUser = await serverAuth(req, res);
  if (!currentUser) {
    return res.status(401).json({ msg: "Unauthorized Access" });
  }

  try {
    await prisma.notification.create({
      data: {
        type: "FOLLOWED",
        userId: currentUser.id,
        receiver: userId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        followerIds: {
          push: currentUser?.id,
        },
        hasNotification: true,
      },
    });
    await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        followingIds: {
          push: userId,
        },
      },
    });

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

const unFollow = async (req: NextApiRequest, res: NextApiResponse) => {
  const currentUser = await serverAuth(req, res);
  const { userId } = req.body;

  if (!currentUser) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  if (!userId) {
    return res.status(400).json({ msg: "User ID required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const followingIds = currentUser?.followingIds || [];
    const followerIds = user?.followerIds || [];

    const updatedFollowingIds = followingIds.filter((id) => id !== userId);
    const updatedFollowerIds = followerIds.filter(
      (id) => id !== currentUser?.id
    );

    await prisma.notification.create({
      data: {
        userId: currentUser.id,
        receiver: userId,
        type: "UNFOLLOWED",
      },
    });

    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        followingIds: updatedFollowingIds,
      },
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        followerIds: updatedFollowerIds,
      },
    });

    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

export { follow, unFollow };
