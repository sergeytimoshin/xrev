# This is a demo for [Magic Eden](https://gitcoin.co/hackathon/magic) hackathon. 

It is an xNFT app, in which user can min their avatar from our infinite NFT collection, and get unlockable content for each of their NFTs.

We use QuickNode API's for mint and darkblock monetization API for unlocks.

To use this app, you have to install Backpack wallet.
You can find more information about the project [here](https://mirror-ai.com/nft/).

# xnft-quickstart

Quickstart repo for building your own xNFT.

## Developing

Once you've installed Backpack, get started building your xNFT with these steps. Note that the packages here will always use the latest, which correspond to the latest tagged build of Backpack. If you have unexepected issues, make sure your package versions match the app version.

### Install

First, install dependencies.

```
yarn
```

### Run the dev server

Then, run the dev server with hot reloading

```
yarn dev
```

### Open the Simulator in Backpack

Now that you have your xNFT dev server running, open it in the Backpack simulator to see it run.

That's it!


## Build & Publish

Once you're done and ready to publish, build your xNFT:

```
yarn build
```

Test the newly created build in `dist/index.html` in the simulator:

```
yarn start
```

Once everything looks good head over to [xnft.gg]() to publish your xNFT!
