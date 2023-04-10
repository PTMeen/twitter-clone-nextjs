import { NextApiHandler } from "next";

import { follow } from "@/controllers/follow";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PATCH") {
    return follow(req, res);
  }

  return res.status(405).json({ msg: "Method not allowed" });
};
export default handler;
