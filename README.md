# NextUp

This is a song recommendation app for DJs.

When you play a song on Spotify, this app will recommend songs with a similar BPM and also written in the same, or harmonic, keys.

It is currently a work in progress.

# Run the Project


Clone the repository
```
git clone git@github.com:jackbittiner/get-next-track.git
```

Install all dependencies
```
yarn install
```

Start all packages
```
yarn start
```

Then login, play a song on your spotify and click get recommendations.


## What's left to come

A big refactor. This was quickly made just to get to proof of concept.

We're currently working on implementing a GraphQl layer for the spotify web api so we can avoid having horrible chained REST calls.

Then we want to add more features and finetune the ones we currently have.

Then I think a lick of paint wouldn't go amiss.
