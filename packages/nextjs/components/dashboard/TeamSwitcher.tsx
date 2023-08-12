import { FC, useMemo, useState } from "react";
import Avatar, { AvatarFallback, AvatarImage } from "@/components/dashboard/ui/Avatar";
import Button from "@/components/dashboard/ui/Button";
import Command, {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/dashboard/ui/Command";
import Dialog, {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/Dialog";
import Input from "@/components/dashboard/ui/Input";
import Label from "@/components/dashboard/ui/Label";
import Popover, { PopoverContent, PopoverTrigger } from "@/components/dashboard/ui/Popover";
import { cn } from "@/utils/scaffold-eth/dashboard";
import { actionToast } from "@/utils/scaffold-eth/errors";
import { CaretUpDown, Check, PlusCircle } from "@phosphor-icons/react";
import { Team, TeamType } from "@prisma/client";
import { useAccount, useEnsAvatar, useEnsName } from "wagmi";

// const groups = [
//   {
//     label: "Personal Account",
//     teams: [
//       {
//         label: "Miguel Piedrafita",
//         value: "personal",
//       },
//     ],
//   },
//   {
//     label: "Teams",
//     teams: [
//       {
//         label: "Acme Inc.",
//         value: "acme-inc",
//       },
//       {
//         label: "Monsters Inc.",
//         value: "monsters",
//       },
//     ],
//   },
// ];

const TeamSwitcher: FC<{
  className?: string;
  teams: Team[];
  currentTeamId: string;
  onCreate: (name: string) => Promise<unknown>;
  onSwitch: (teamId: string) => Promise<unknown>;
}> = ({ className, teams, currentTeamId, onSwitch, onCreate }) => {
  console.log("TeamSwitcher on");
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address }); // original line was uncommented to be used below
  const { data: userAvatar } = useEnsAvatar({ name: ensName }); // original line

  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);

  const selectedTeam = useMemo(() => {
    console.log("on selectedTeam Memo");
    // const team = teams.find(team => team.id == currentTeamId)!; // original line
    const team = teams.find(team => team.id == currentTeamId); // removed the null assertion !

    if (team && team.type == TeamType.PERSONAL && !team.avatarUrl && userAvatar) {
      team.avatarUrl = userAvatar;
    }

    return team;
  }, [teams, currentTeamId, userAvatar]);

  const [personalTeam, otherTeams] = useMemo(
    () => [teams.find(team => team.type === TeamType.PERSONAL), teams.filter(team => team.type !== TeamType.PERSONAL)],
    [teams],
  );

  const createTeam = async () => {
    console.log("on createTeam2");
    await onCreate(name);

    setName("");
    setShowNewTeamDialog(false);
  };

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between text-neutral-200", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage src={selectedTeam?.avatarUrl ?? undefined} alt={selectedTeam?.name} />
              <AvatarFallback>
                {selectedTeam?.name
                  .split(" ")
                  .map((word: any) => word[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {selectedTeam?.name}
            <CaretUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 dark">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search team..." />
              <CommandEmpty>No team found.</CommandEmpty>
              {personalTeam && (
                <CommandGroup heading="Personal Account">
                  <CommandItem
                    onSelect={() => {
                      actionToast(onSwitch(personalTeam.id), {
                        loading: "Switching team...",
                        error: "Could not switch team.",
                        success: "Switched to personal team.",
                      });
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage alt={personalTeam.name} src={personalTeam?.avatarUrl ?? userAvatar ?? undefined} />
                      <AvatarFallback>
                        {personalTeam.name
                          .split(" ")
                          .map((word: any) => word[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {personalTeam.name}
                    <Check
                      className={cn("ml-auto h-4 w-4", currentTeamId === personalTeam.id ? "opacity-100" : "opacity-0")}
                    />
                  </CommandItem>
                </CommandGroup>
              )}
              {otherTeams && (
                <CommandGroup heading="Teams">
                  {otherTeams.map(team => (
                    <CommandItem
                      key={team.id}
                      onSelect={() => {
                        actionToast(onSwitch(team.id), {
                          loading: "Switching team...",
                          success: "Switched to team.",
                          error: "Could not switch team.",
                        });
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage src={team?.avatarUrl ?? undefined} alt={team.name} />
                        <AvatarFallback>
                          {team.name
                            .split(" ")
                            .map((word: any) => word[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {team.name}
                      <Check
                        className={cn("ml-auto h-4 w-4", currentTeamId === team.id ? "opacity-100" : "opacity-0")}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create Team
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>Add a new team to manage products and customers.</DialogDescription>
        </DialogHeader>
        <form /* action={createTeam} */>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                value={name}
                onChange={e => setName(e.target.value)}
                // onKeyDown={e => {
                //   if (e.key !== "Enter") return;

                //   e.preventDefault();
                //   // createTeam();
                // }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => createTeam()}>
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamSwitcher;
