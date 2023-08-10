import Link from "next/link";
import BlockPlaceholder from "@/components/dashboard/BlockPlaceholder";
import Navigation from "@/components/dashboard/Navigation";
import TeamSwitcher from "@/components/dashboard/TeamSwitcher";
import Collapsible, { CollapsibleContent, CollapsibleTrigger } from "@/components/dashboard/ui/Collapsible";
import { Bell, Cube, List, X } from "@/components/dashboard/ui/icons";
import { RainbowKitCustomConnectButton } from "@/components/scaffold-eth";
import prisma from "@/db/prisma";
import { error } from "@/utils/scaffold-eth/errors";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";

const navigation = [
  { name: "Overview", href: "/dashboard" },
  { name: "Team Settings", href: "/dashboard/team-settings" },
];

const DashboardPage = async () => {
  // const session = await Session.fromCookies(cookies());
  const { data: sessionData } = useSession();
  const user = await prisma.user.findUnique({
    where: { id: sessionData?.userId },
    select: { teams: { select: { team: true } } },
  });

  if (!user) throw new Error("User not found");

  const switchTeam = async (teamId: string) => {
    "use server";

    // const session = await Session.fromCookies(cookies());
    const session = await getServerSession();
    const team = await prisma.team.findUniqueOrThrow({
      where: { id: teamId },
      include: { members: { where: { userId: session?.userId } } },
    });

    if (!team.members.length) return error("You are not a member of this team");
    // session.teamId = team.id; // possibly will need to fix this - will brake

    // revalidatePath("/dashboard/team-settings"); // for app router
    // await session.persist(cookies());
  };

  const createTeam = async (name: string) => {
    "use server";

    // const session = await Session.fromCookies(cookies());
    const session = await getServerSession();
    await prisma.team.create({
      data: {
        name,
        members: { create: { user: { connect: { id: session?.userId } }, role: "OWNER" } },
      },
    });
    // session.teamId = team.id; // possibly will need to fix this - will brake

    // revalidatePath("/dashboard/team-settings"); // for app router
    // await session.persist(cookies());
  };

  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="bg-neutral-800 pb-32 dark">
        <Collapsible asChild>
          <nav className="bg-neutral-800 group">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="border-b border-neutral-700">
                <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                  <div className="flex items-center">
                    <Link href="/dashboard" className="flex-shrink-0">
                      <Cube className="h-8 w-8" color="white" weight="duotone" />
                    </Link>
                    <TeamSwitcher
                      className="ml-4"
                      onSwitch={switchTeam}
                      onCreate={createTeam}
                      currentTeamId={String(sessionData?.teamId)}
                      teams={user.teams.map(membership => membership.team)}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-neutral-800 p-1 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <Bell className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <div className="relative ml-3">
                        <RainbowKitCustomConnectButton />
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <CollapsibleTrigger asChild>
                      <button className="inline-flex items-center justify-center rounded-md bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-neutral-800">
                        <span className="sr-only">Open main menu</span>
                        <X
                          className="hidden h-6 w-6 radix-state-open:block group-radix-state-open:block"
                          aria-hidden="true"
                        />
                        <List className="hidden h-6 w-6 group-radix-state-closed:block" aria-hidden="true" />
                      </button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </div>
              <div className="mt-2 hidden md:flex items-baseline space-x-4">
                {navigation.map(item => (
                  <Navigation key={item.name} href={item.href}>
                    {item.name}
                  </Navigation>
                ))}
              </div>
            </div>
            <CollapsibleContent className="border-b border-neutral-700 md:hidden">
              {/* <MobileProfileNav navigation={navigation} /> */}
              <RainbowKitCustomConnectButton />
            </CollapsibleContent>
          </nav>
        </Collapsible>
      </div>

      <main className="-mt-24">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            <BlockPlaceholder />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
