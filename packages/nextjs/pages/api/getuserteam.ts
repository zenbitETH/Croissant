import prisma from "@/db/prisma";
// import { Team } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  teams?: any;
};
// | {
//     teams: {
//       team: Team;
//     }[];
//   }
// | {
//     msg: string;
//   };

type NextApiRequestWithUserId = NextApiRequest & {
  userId: string;
};

const handler = async (req: NextApiRequestWithUserId, res: NextApiResponse<Data>) => {
  // if (!req.userId) {
  //   return res.status(401).json({ msg: "Param missing" });
  // }

  const teams = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { teams: { select: { team: true } } },
  });
  console.log({ teams });
  if (!teams) {
    return res.status(200).json({ teams: "asd" });
  }

  return res.status(200).json({ teams });
};

export default handler;
