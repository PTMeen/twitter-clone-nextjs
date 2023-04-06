import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import prisma from "@/lib/prismadb";

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, password, username } = req.body;

  if (!email || !name || !password || !username) {
    return res.status(400).json("Invalid form data");
  }

  try {
    const isEmaiInUsed = await prisma.user.findUnique({ where: { email } });
    if (isEmaiInUsed) {
      return res.status(400).json({ msg: "Email in used" });
    }

    const isUsernameTaken = await prisma.user.findUnique({
      where: { username },
    });
    if (isUsernameTaken) {
      return res.status(400).json({ msg: "This username is already taken" });
    }

    const hasedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, name, username, password: hasedPassword },
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};
