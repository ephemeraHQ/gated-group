// Import necessary modules
import express from "express";
import { Client } from "@xmtp/mls-client";

export function startServer(
  client: Client,
  verifiedRequest: (walletAddress: string, groupId: string) => boolean
) {
  const app = express();
  app.use(express.json());

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
    await conversation?.addMembers([walletAddress]);
    return `Wallet address ${walletAddress} added to the group`;
  }

  // Endpoint to add wallet address to a group
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
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
