# Gated Group Example

This is tutorial on how to created a gated group chat using MessageKit

## Get the groupId

After creating the group you can ping this bot with "/id" and it will log the id of the current group

```
/groupid
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
git clone https://github.com/ephemeraHQ/message-kit
# Go to the example folder
cd examples/gated
# Install the dependencies
yarn install
# Run the app
yarn dev
```

### Variables

Set up these variables in your app

```bash [cmd]
KEY= # 0x... the private key of the bot wallet (with the 0x prefix)
```
