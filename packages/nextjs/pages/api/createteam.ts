import prisma from "@/db/prisma";
import { Team } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      team: Team;
    }
  | {
      msg: string;
    };

type NextApiRequestWithUserIdAndNewTeamName = NextApiRequest & {
  name: string;
  userId: string;
};

const handler = async (req: NextApiRequestWithUserIdAndNewTeamName, res: NextApiResponse<Data>) => {
  const { userId, name } = req.body;
  console.log({ id: userId, n: name });

  // if (!userId || !name || !userAvatar) {
  //   return res.status(401).json({ msg: "Params missing" });
  // }

  const team = await prisma.team.create({
    data: {
      name: name,
      members: { create: { user: { connect: { id: userId } }, role: "OWNER" } },
    },
  });

  // if (!team) {
  //   return res.status(404).json({ msg: "Something failed" });
  // }

  return res.status(201).json({ team });
};

export default handler;
