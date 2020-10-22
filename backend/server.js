"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { top50 } = require('./data/top50');

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get('/top50', (req, res) => {
    const data = top50;
    res.status(200).json({ 
      status: 200, data
    });
  })

  .get('/top50/song/:rank', (req, res) => {
    const songRank = req.params.rank;
    const rankNum = Number(songRank);
    const data = top50.find(song => song.rank === rankNum);
    if (!data) {
      res.status(400).json({
        status: 400, 
        message: "Song not found."
      })
      
    } else {
      res.status(200).json({
        status: 200, data
      })
    }
  })

  .get('/top50/artist/:artist', (req, res) => {
    const searchedArtist = req.params.artist;
    const data = top50.filter((song) => 
      song.artist.toLowerCase() === searchedArtist.toLowerCase()
    );
    if (data.length == 0) {
      res.status(400).json({
        status: 400,
        message: "Artist not found."
      })
    } else {
      res.status(200).json({
        status: 200, data
      })
    }
  })

  .get('/top50/popular-artist', (req, res) => {
    const artistArray = top50.map((song) => song.artist);
    let topArtist = "";
    const countArtist = artistArray.reduce(function (acc, curr) {
      let topArtistCount = 1;
      if (typeof acc[curr] == 'undefined') {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
        topArtistCount += 1;
        if (acc[curr] > topArtistCount) {
          topArtist = curr;
        }
      }
      return acc;
      }, {});
      const top50copy = [...top50];
      const data = top50copy.filter((song) => song.artist == topArtist);
    res.status(200).json({
      status: 200, data
    })
  })

  .get('/top50/artist', (req, res) => {
    const data = [];
    const artistArray = top50.map((song) => song.artist);
    function artistSet (value, set) {
      data.push(value);
    }
    new Set(artistArray).forEach(artistSet);
    res.status(200).json({
      status: 200, data
    })
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
