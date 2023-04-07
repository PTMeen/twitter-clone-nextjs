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
  });

  if (!user) {
    return res.status(200).json(null);
  }

  user.password = "";
  return res.status(200).json(user);
};
export default handler;
