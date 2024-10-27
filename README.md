# Gated group template

How to create a gated group chat through an admin bot using [MessageKit](https://messagekit.ephemerahq.com/)

## Create a group

Create a group caht and add the bot as one of the members. Be sure in the permissions you don't allow non-admin members to add members

## Set up a bot as an admin

Set up the `KEY` environment variable with the bot private key. Be sure this bot has `admin` privileges in the group.

## Get the `groupId`

After creating the group you can send a command to the bot and it will log the id of the current group

Command:

```bash
/groupid
```

This will log in the console:

```bash
This group id will look like: sd12d42...23s23
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
