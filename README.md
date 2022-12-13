# This is a demo for [Magic Eden](https://gitcoin.co/hackathon/magic) hackathon. 

It is an xNFT app, in which user can min their avatar from our infinite NFT collection, and get unlockable content for each of their NFTs.

To use this app, you have to install Backpack wallet.
You can find more information about the project [here](https://mirror-ai.com/nft/).

Conceptually our project is a intersection of ideas between patreon, in-app purchases for mobile apps, boots@raindrops and darkblock monetization. 

We decided to use QuickNode API's for mint because of their really nice feature send-NFT-2-email. It's super important for us, because our [original product](https://mirror-ai.com) has pretty big audience and we can onboard all of them to web3 transparently.

We are going to darkblock API's to use unlockable content. There is still few issues must be solved before our demo will be ready to production:
- we create unlockable content on the fly, and right now, as far I understand, it's impossible to create darkblock wrapper around it via API.
- we want to implement recurrent payments (when darkblock API's will be ready for that) and some kind of analytics for creators.




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
