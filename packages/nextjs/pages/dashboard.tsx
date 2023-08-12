// import { useEffect, useState } from "react";
//import Link from "next/link";
//import { getAuthOptions } from "./api/auth/[...nextauth]";
//import BlockPlaceholder from "@/components/dashboard/BlockPlaceholder";
//import Navigation from "@/components/dashboard/Navigation";
//import TeamSwitcher from "@/components/dashboard/TeamSwitcher";
//import Collapsible, { CollapsibleContent, CollapsibleTrigger } from "@/components/dashboard/ui/Collapsible";
//import { Bell, Cube, List, X } from "@/components/dashboard/ui/icons";
//import { RainbowKitCustomConnectButton } from "@/components/scaffold-eth";
//import { useAppContext } from "@/contexts/AppContext";
//import prisma from "@/db/prisma";
//import { Team } from "@prisma/client";
//import { GetServerSideProps, InferGetServerSidePropsType } from "next";
//import { getServerSession } from "next-auth";

//import { useSession } from "next-auth/react";

//const navigation = [
//  { name: "Overview", href: "/dashboard" },
//  { name: "Team Settings", href: "/dashboard/team-settings" },
//];

// @ts-ignore
//export const getServerSideProps: GetServerSideProps<{
//  teams: {
//    team: Team[];
//  }[];
//}> = async context => {
//  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req));
//
//  const teams = await prisma.user.findUnique({
//    where: { id: session?.user.id },
//    select: { teams: { select: { team: true } } },
//  });
//
//  if (!teams) {
//    return {
//      props: {
//        teams: [],
//      },
//    };
//  }
//
//  return {
//    props: {
//      teams: teams.teams,
//    },
//  };
//};

const DashboardPage = () => {
  return (
    <div className="min-h-screen pt-10 max-w-5xl mx-auto font-kan">
      <div className="mx-auto grid gap-3 px-4 pb-12 sm:px-6 lg:px-8  ">
        <div className="border border-2 rounded-dd p-5">
          <div className="text-2xl pb-5"> Manage Team</div>
          <div>Import TeamMembers from Armchair</div>
        </div>
        <div className="border border-2 rounded-dd p-5 grid gap-3">
          <div className="text-2xl pb-5"> Manage Quiz</div>
          <div className="p-3 rounded-ii">
            <div className="font-kum text-white text-lg">Tutorial Video URL</div>
            <input
              type="text"
              placeholder="https://www.youtube.com/embed/yourvideo"
              className="input input-bordered w-full text-lg"
            />
            <div className="text-center pt-5">
              <button className="homeBT"> Set URL</button>
            </div>
          </div>
          <div className="bg-bt/50 p-3 rounded-ii">
            <div className="font-kum text-l1 text-lg">Set Question 1</div>
            <input type="text" placeholder="Type your question 1" className="input input-bordered w-full text-lg" />
            <div className="font-kum  text-l1 text-lg pt-5">Set Answers</div>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Answer 1" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 2" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 3" className="input input-bordered w-full text-lg" />
            </div>
            <div className="font-kum  text-l1 text-lg pt-5">Correct Answer</div>
            <div className="grid grid-cols-3 text-center">
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 1</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 2</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 3</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
            </div>
          </div>
          <div className="bg-bt/50 p-3 rounded-ii">
            <div className="font-kum text-l1 text-lg">Set Question 2</div>
            <input type="text" placeholder="Type your question 2" className="input input-bordered w-full text-lg" />
            <div className="font-kum  text-l1 text-lg pt-5">Set Answers</div>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Answer 1" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 2" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 3" className="input input-bordered w-full text-lg" />
            </div>
            <div className="font-kum  text-l1 text-lg pt-5">Correct Answer</div>
            <div className="grid grid-cols-3 text-center">
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 1</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 2</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 3</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
            </div>
          </div>
          <div className="bg-bt/50 p-3 rounded-ii">
            <div className="font-kum text-l1 text-lg">Set Question 3</div>
            <input type="text" placeholder="Type your question 3" className="input input-bordered w-full text-lg" />
            <div className="font-kum  text-l1 text-lg pt-5">Set Answers</div>
            <div className="grid grid-cols-3 gap-3">
              <input type="text" placeholder="Answer 1" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 2" className="input input-bordered w-full text-lg" />
              <input type="text" placeholder="Answer 3" className="input input-bordered w-full text-lg" />
            </div>
            <div className="font-kum  text-l1 text-lg pt-5">Correct Answer</div>
            <div className="grid grid-cols-3 text-center">
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 1</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 2</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
              <div className="mx-auto">
                <div className="text-l1 text-xl">Answer 3</div>
                <input type="radio" name="radio-1" className="radio" checked />
              </div>
            </div>
          </div>
          <div className="text-center pt-5">
            <button className="homeBT"> Set Q&A</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
