"use strict";

const express = require("express");
const ptv = require("ptv-api");
const app = express();

const devId = "1000649";
const apiKey = "47235180-b369-11e5-a65e-029db85e733b";
const ptvClient = ptv(devId, apiKey);

app.get("/routesForStop", (req, res, next) => {
  if (!req.query.hasOwnProperty("stop_id")) {
    res.sendStatus(404);
    return;
  }

  let stopRoutes = [];

  // Hit PTV for departures, collect ids
  ptvClient
    .then(apis => {
      return apis.Departures.Departures_GetForStop({
        route_type: 0,
        stop_id: req.query.stop_id
      });
    })
    .then(ptvRes => {
      try {
        ptvRes.body.departures.forEach(departure => {
          stopRoutes.push(departure.direction_id);
        });
      } catch (e) {
        res.send(403);
      }

      // Hit PTV for route names, match against route ids

      // Create JSON structure
    })
    .catch(_ => {
      res.sendStatus(403);
      return;
    });
});

app.listen(3000, () => console.log("Listening on port 3000!"));
