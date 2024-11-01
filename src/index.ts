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
        `Group created!\n- ID: ${group.id}\n- Group Frame URL: https://converse.xyz/group/${group.id}: \n- This url will deelink to the group inside Converse\n- Once in the other group you can share the invite with your friends.`
      );
      return;
    }
    context.send("👋 Welcome to the Gated Bot Group!");
    context.send("To get started, type /create to set up a new group. 🚀");
    context.send(
      "This example will check if the user has a particular nft and add them to the group if they do."
    );

    context.send(
      "Once your group is created, you'll receive a unique Group ID and URL."
    );
    context.send(
      "Share the URL with friends to invite them to join your group!"
    );
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
  await group.addSuperAdmin(senderInboxId);
  console.log("Sender is superAdmin", await group.isSuperAdmin(senderInboxId));
  await group.send(`Welcome to the new group!`);
  await group.send(`You are now the admin of this group as well as the bot`);
  return group;
}
