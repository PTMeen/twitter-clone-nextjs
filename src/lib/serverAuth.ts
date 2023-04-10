import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    return res.status(401).json({ msg: "Unauthorized access" });
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return res.status(401).json({ msg: "Unauthorized access" });
    }

    return currentUser;
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
export default serverAuth;
