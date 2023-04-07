import { NextApiHandler } from "next";

import prisma from "@/lib/prismadb";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const fetchedUsers = await prisma.user.findMany();
      const users = fetchedUsers.map((user) => {
        user.password = "";
        return user;
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json("Something went wrong");
    }
  }

  res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
