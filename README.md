# Gated group template

How to create a gated group chat through an admin bot using [MessageKit](https://messagekit.ephemerahq.com/)

## Create a group

Create a group caht and add the bot as one of the members. Be sure in the permissions you don't allow non-admin members to add members

## Set up a bot as an admin

Set up the `KEY` environment variable with the bot private key. Be sure this bot has `admin` privileges in the group.

## Get the `groupId`

After creating the group you can ping this bot with "/id" and it will log the id of the current group

```bash
/groupid
```

This will log in the console:

```bash
This group id is: 1242...2323
```

## Endpoint

Once you start the server on your port `3000` by default you can ping this endpoint with the parameters

```bash
curl -X POST http://localhost:3000/add-wallet \
 -H "Content-Type: application/json" \
 -d '{"walletAddress": "your_wallet", "groupId": "your_groupId"}'
```

## Logic

Declare the logic that will process the request.

```tsx
function verifiedRequest(walletAddress: string, groupId: string): boolean {
  console.log("new-request", {
    groupId,
    walletAddress,
  });
  if (1 == 1) {
    // Holding a certain NFT or Token
    // Defining a web3 social criteria like amount of followers
    // Onchain activity
    // Much more!
    return true;
  }
  return false;
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
