import { NextApiHandler } from "next";

import { createComment } from "@/controllers/comments";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    return createComment(req, res);
  }

  return res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
