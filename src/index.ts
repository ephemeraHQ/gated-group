import { run, HandlerContext, xmtpClient } from "@xmtp/message-kit";
import { startServer } from "./lib/gated.js";

const { client } = await xmtpClient();
startServer(client, verifiedRequest);

function verifiedRequest(walletAddress: string, groupId: string): boolean {
  console.log("new-request", {
    groupId,
    walletAddress,
  });
  if (1 == 1) {
    return true;
  }
  return false;
}

run(async (context: HandlerContext) => {
  const {
    message: {
      content: { command },
    },
    group,
  } = context;
  if (command === "groupid") {
    console.log("This group id is:", group.id);
  }
});
