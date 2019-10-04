# PlayThru

[![Build Status](https://travis-ci.org/jackbittiner/play-thru.svg?branch=master)](https://travis-ci.org/jackbittiner/play-thru)

This is a song recommendation app for DJs.

When you play a song on Spotify, this app will recommend songs with a similar BPM and also written in the same, or harmonic, keys.

It is currently a work in progress.

Play with it here: [PlayThru](https://play-thru.herokuapp.com/)

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

Then login, play a song on your spotify account and refresh.

# Run the Tests

```
yarn test
```
# Travis Pipeline

https://travis-ci.org/jackbittiner/get-next-track

## What's left to come

Integrate spotify's SDK so that the browser can be a spotify client to play the choons.

Have a search functionalilty for when you first go on the app.

Play a new song at the beginning of a segment, at the end of the next segment of the current song. (This makes sense in my head)

Then I think a lick of paint wouldn't go amiss.

And some UI tests would be nice too.

Submit to spotify devloper showcase.
