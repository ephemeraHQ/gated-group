import { run, XMTPContext, Agent, xmtpClient } from "@xmtp/message-kit";
import { gated } from "./skills/gated.js";
import { startGatedGroupServer } from "./skills/gated.js";

const { client } = await xmtpClient({
  hideInitLogMessage: true,
});

startGatedGroupServer(client);

export const agent: Agent = {
  name: "Ens Agent",
  tag: "@bot",
  description: "A ens agent with a lot of skills.",
  skills: [...gated],
};
run(async (context: XMTPContext) => {}, { agent });
