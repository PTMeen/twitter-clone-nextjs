import serverAuth from "@/lib/serverAuth";
import { NextApiHandler } from "next";

import prisma from "@/lib/prismadb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ msg: "Method not allowed" });
  }

  const currentUser = await serverAuth(req, res);
  if (!currentUser) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { receiver: currentUser.id },
      include: {
        user: {
          select: {
            name: true,
            username: true,
            profileImg: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
export default handler;
