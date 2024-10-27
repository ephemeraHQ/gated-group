// Import necessary modules
import express from "express";
import { Client } from "@xmtp/node-sdk";

export function startServer(
  client: Client,
  verifiedRequest: (walletAddress: string, groupId: string) => Promise<boolean>
) {
  async function addWalletToGroup(
    walletAddress: string,
    groupId: string
  ): Promise<string> {
    if (!walletAddress) {
      throw new Error("Wallet address is required");
    } else if (!groupId) {
      throw new Error("Group id is required");
    }

    const conversation = await client.conversations.getConversationById(
      groupId
    );

    if (!verifiedRequest(walletAddress, groupId)) {
      throw new Error("Request not verified");
    }
    console.log(`Adding wallet address: ${walletAddress} to the group`);
    try {
      await conversation?.addMembers([walletAddress]);
      return `Wallet address ${walletAddress} added to the group`;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Endpoint to add wallet address to a group from an external source
  const app = express();
  app.use(express.json());
  app.post("/add-wallet", async (req, res) => {
    try {
      const { walletAddress, groupId } = req.body;
      const result = await addWalletToGroup(walletAddress, groupId);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  });
  // Start the server
  const PORT = process.env.PORT || 3000;
  const url = process.env.URL || `http://localhost:${PORT}`;
  app.listen(PORT, () => {
    console.warn(
      `Use this endpoint to add a wallet to a group indicated by the groupId\n${url}/add-wallet <body: {walletAddress, groupId}>`
    );
  });
}
