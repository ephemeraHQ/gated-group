# Gated group template

How to create a gated group chat through an admin bot using [MessageKit](https://messagekit.ephemerahq.com/)

## Create the group

Send this message to the bot to kickstart the creation of the group.

```bash
/create
```

The bot will create a private group where you and the bot are the admins.Then will provide some information like:

```bash
Group created!
- ID: {groupId}
- Group Frame URL: https://converse.xyz/group/{groupId}:
- This url will deelink to the group inside Converse
- Once in the other group you can share the invite with your friends.
```

## Endpoint

Once you start the server on your port `3000` by default you can ping this endpoint with the parameters

```bash
curl -X POST http://localhost:3000/add-wallet \
 -H "Content-Type: application/json" \
 -d '{"walletAddress": "0x7E0b0363404751346930AF92C80D1fef932Cc48a", "groupId": "2bc1d20d2e7ac190bcaff3bba0f012b3"}'
```

## Logic

Declare the logic that will process the request.

```tsx
/*more code */
export async function verifiedRequest() {
  /*more code */
  const nfts = await alchemy.nft.getNftsForOwner(walletAddress);
  const collectionSlug = "XMTPeople"; // The slug for the collection

  const ownsNft = nfts.ownedNfts.some(
    (nft: any) =>
      nft.contract.name.toLowerCase() === collectionSlug.toLowerCase()
  );
  console.log(`NFTs owned on ${Network.BASE_MAINNET}:`, nfts.ownedNfts.length);
  console.log("is the nft owned: ", ownsNft);
  return ownsNft as boolean;
}
```

## Running locally

```bash [cmd]
# Clone the repo
git clone https://github.com/ephemeraHQ/gated-group
# Go to the example folder
cd gated-group
# Install the dependencies
bun install
# Run the app
bun dev
```
