import { run, HandlerContext, xmtpClient } from "@xmtp/message-kit";
import { Client } from "@xmtp/node-sdk";
import { startServer } from "./lib/gated.js";
import { verifiedRequest } from "./lib/nft.js";
const { client } = await xmtpClient({ hideLog: true });
startServer(client, verifiedRequest);

run(async (context: HandlerContext) => {
  const {
    message: {
      sender,
      content: { command },
      typeId,
    },
    client,
  } = context;
  if (typeId === "text") {
    if (command === "create") {
      await context.send("Creating group...");
      const group = await createGroup(
        client,
        sender.address,
        client.accountAddress
      );

      await context.send(
        `Group created!\n- Group Frame URL: https://converse.xyz/group/${group.id}: \n- This url will deelink to the group inside Converse\n- Once in the other group you can share the invite with your friends.`
      );
      return;
    }

    context.send("Welcome to the gated bot group!");
    context.send("Send /create to create a new group");
  }
});

async function createGroup(
  client: Client,
  senderAddress: string,
  clientAddress: string
) {
  let senderInboxId = "";
  const group = await client?.conversations.newConversation([
    senderAddress,
    clientAddress,
  ]);
  const members = await group.members();
  const senderMember = members.find((member) =>
    member.accountAddresses.includes(senderAddress.toLowerCase())
  );
  if (senderMember) {
    const senderInboxId = senderMember.inboxId;
    console.log("Sender's inboxId:", senderInboxId);
  } else {
    console.log("Sender not found in members list");
  }
  const superAdmin1 = await group.addAdmin(senderInboxId);
  const superAdmin = await group.addSuperAdmin(senderInboxId);
  await group.send(`Welcome to the new group!`);
  await group.send(`You are now the admin of this group as well as the bot`);
  return group;
}
