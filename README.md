# Gated Group Example

This is tutorial on how to created a gated group chat using MessageKit

## Set up a bot as admin

Set up the `KEY` environment variable with the bot key. Be sure this bot has admin privileges in the group.

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

One you start the server on your port `3000` by default you can ping this endpoing with the parameters

```bash
curl -X POST http://localhost:3000/add-wallet \
 -H "Content-Type: application/json" \
 -d '{"walletAddress": "your_wallet", "groupId": "your_groupId"}'
```

## Logic

## Running locally

Follow the steps below to run the app

### Set up

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
