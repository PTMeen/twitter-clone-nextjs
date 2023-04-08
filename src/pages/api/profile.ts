import { NextApiHandler } from "next";

import { updateProfile } from "@/controllers/profile";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "PATCH") {
    return updateProfile(req, res);
  }

  res.status(405).json("Method not allowed");
};
export default handler;
