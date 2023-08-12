// Code in this file is based on https://docs.login.xyz/integrations/nextauth.js
// with added process.env.VERCEL_URL detection to support preview deployments
// and with auth option logic extracted into a 'getAuthOptions' function so it
// can be used to get the session server-side with 'getServerSession'
import prisma from "@/db/prisma";
import scaffoldConfig from "@/scaffold.config";
import { TeamRole, TeamType } from "@prisma/client";
import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";

// Types
// ========================================================
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    /** The user's public Ethereum address. */
    address?: string;
    nonce?: string;
    teamId?: string;
    userId?: string;
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export function getAuthOptions(req: IncomingMessage): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse((credentials?.message as string) ?? "{}") as Partial<SiweMessage>);

          const nextAuthUrl =
            scaffoldConfig.nextAuthUrl || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;

          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          const nonce = await getCsrfToken({ req: { headers: req.headers } });

          // if (siwe.nonce !== (await getCsrfToken({ req: { headers: req.headers } }))) {
          //   return null;
          // }

          const verified = await siwe.verify({ signature: credentials?.signature || "", nonce });

          if (!verified.success) {
            throw new Error("Verification failed");
          }

          const { data: fields } = verified;

          console.log("prisma upserttt ", { fields });

          // Check if user exists
          let user = await prisma.user.findUnique({
            where: { id: fields.address },
            select: { teams: { select: { teamId: true } } },
          });

          if (!user) {
            console.log("!user");
            user = await prisma.user.create({
              include: {
                teams: true,
              },
              data: {
                id: fields.address,
                teams: {
                  create: {
                    team: { create: { name: "Personal Team", type: TeamType.PERSONAL } },
                    role: TeamRole.OWNER,
                  },
                },
              },
            });
            console.log("created ", { user });
            // user = await prisma.user.upsert({
            //   where: { id: fields.address },
            //   create: {
            //     id: fields.address,
            //     teams: {
            //       create: {
            //         team: { create: { name: "Personal Team", type: TeamType.PERSONAL } },
            //         role: TeamRole.OWNER,
            //       },
            //     },
            //   },
            //   update: {},
            //   select: { teams: { select: { teamId: true } } },
            // });
          }
          console.log({ user });
          return {
            id: fields.address,
            nonce: undefined,
            teamId: user.teams[0].teamId,
          };
        } catch (e) {
          console.log({ e });
          return null;
        }
      },
      credentials: {
        message: {
          label: "Message",
          placeholder: "0x0",
          type: "text",
        },
        signature: {
          label: "Signature",
          placeholder: "0x0",
          type: "text",
        },
      },
      name: "Ethereum",
      type: "credentials", // default for Credentials
    }),
  ];

  return {
    callbacks: {
      async session({ session, token }) {
        console.log("sesssion cb ", { token });
        if (token.sub) {
          console.log("inside");
          session.address = token.sub;
          session.user = {
            id: token.sub,
          };
        }
        return session;
      },
      // async session({ session, token }) {
      //   console.log("session cb ", { session });
      //   return {
      //     ...session,
      //     user: {
      //       ...session.user,
      //       id: token.sub,
      //     },
      //   } as Session & { user: { id: string } };
      // },
    },
    // https://next-auth.js.org/configuration/providers/oauth
    providers,
    secret: scaffoldConfig.nextAuthSecret,
    session: {
      strategy: "jwt",
    },
  };
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = getAuthOptions(req);

  if (!Array.isArray(req.query.nextauth)) {
    res.status(400).send("Bad request");
    return;
  }

  const isDefaultSigninPage = req.method === "GET" && req.query.nextauth.find(value => value === "signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    authOptions.providers.pop();
  }

  return await NextAuth(req, res, authOptions);
}
