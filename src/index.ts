import { run, HandlerContext, xmtpClient } from "@xmtp/message-kit";
import { startServer } from "./lib/gated.js";

const { client } = await xmtpClient();
startServer(client);
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
