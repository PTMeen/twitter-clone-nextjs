import { NextApiHandler } from "next";

import prisma from "@/lib/prismadb";

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query;

  if (req.method === "GET") {
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ msg: "Invlid user ID" });
    }

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      user.password = "";
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  }

  res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
