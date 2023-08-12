import prisma from "@/db/prisma";
import { Team, TeamMember } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      team: {
        members: TeamMember[];
      } & Team;
    }
  | {
      msg: string;
    };

type NextApiRequestWithUserId = NextApiRequest & {
  teamId: string;
  userId: string;
};

const handler = async (req: NextApiRequestWithUserId, res: NextApiResponse<Data>) => {
  if (!req.userId || !req.teamId) {
    return res.status(401).json({ msg: "Params missing" });
  }
  const team = await prisma.team.findUniqueOrThrow({
    where: { id: req.teamId },
    include: { members: { where: { userId: req.userId } } },
  });

  if (!team) {
    return res.status(404).json({ msg: "No found" });
  }

  res.status(200).json({ team });
};

export default handler;
