import type { CommandGroup } from "@xmtp/message-kit";

export const commands: CommandGroup[] = [
  {
    name: "Group Id",
    description: "Create and get group id.",
    commands: [
      {
        command: "/create group",
        triggers: ["/create"],
        adminOnly: true,
        params: {},
        description: "Create a new group.",
      },
      {
        command: "/id",
        triggers: ["/id"],
        adminOnly: true,
        params: {},
        description: "Get group id.",
      },
    ],
  },
];
