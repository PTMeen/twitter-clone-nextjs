import { NextApiHandler } from "next";

import prisma from "@/lib/prismadb";
import { register } from "@/controllers/auth";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return register(req, res);
  }
};
export default handler;
