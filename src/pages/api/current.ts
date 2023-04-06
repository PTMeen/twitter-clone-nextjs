import { NextApiHandler } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

import prisma from "@/lib/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  if (req.method !== "GET") {
    return res.status(405).json("Invalid method");
  }

  if (!session?.user?.email) {
    return res.status(200).json(null);
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      email: true,
      username: true,
      name: true,
      bio: true,
      posts: true,
      comments: true,
      followerIds: true,
      followingIds: true,
      profileImg: true,
      coverImg: true,
      createdAt: true,
      hasNotification: true,
      id: true,
      notifications: true,
    },
  });

  if (!user) {
    return res.status(200).json(null);
  }

  return res.status(200).json(user);
};
export default handler;
