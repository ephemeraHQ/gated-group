import { run, HandlerContext, xmtpClient } from "@xmtp/message-kit";
import { Client } from "@xmtp/node-sdk";
import { startServer } from "./lib/gated.js";
import { Alchemy, Network } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API key
  network: Network.ETH_MAINNET, // Use the appropriate network
};

const { client } = await xmtpClient({ hideLog: true });
startServer(client, verifiedRequest);

const alchemy = new Alchemy(settings);

async function verifiedRequest(
  walletAddress: string,
  groupId: string
): Promise<boolean> {
  console.log("new-request", {
    groupId,
    walletAddress,
  });

  try {
    const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
    const collectionSlug = "xmtpeople"; // The slug for the collection

    const ownsNft = nfts.ownedNfts.some(
      (nft: any) =>
        nft.contract.address.toLowerCase() === collectionSlug.toLowerCase()
    );

    return ownsNft as boolean;
  } catch (error) {
    console.error("Error fetching NFTs from Alchemy:", error);
  }

  return false;
}
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

      /* await context.reply(
        `Group created!. Go to the new group:\nURL: https://converse.xyz/group/${group.id}`
      );*/
      await context.send(`You just been added to a new group!`);
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
  await group.updateName(`New group`);
  const members = await group.members();
  for (const member of members) {
    console.log("member", member.accountAddresses);
  }
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
  await group.send(`The group id is:`);
  await group.send(`${group.id}`);
  return group;
}
