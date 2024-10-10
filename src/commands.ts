import type { CommandGroup } from "@xmtp/message-kit";

export const commands: CommandGroup[] = [
  {
    name: "Group Id",
    triggers: ["/groupid"],
    description: "Get group id.",
    commands: [
      {
        command: "/groupid",
        params: {},
        description: "Get group id.",
      },
    ],
  },
];
