"use strict";

const express = require("express");
const ptv = require("ptv-api");
const async = require('async');

const app = express();

const devId = "1000649";
const apiKey = "47235180-b369-11e5-a65e-029db85e733b";
const ptvClient = ptv(devId, apiKey);

app.get("/routesForStop", (req, res, next) => {
  if (!req.query.hasOwnProperty("stop_id")) {
    return res.sendStatus(404);
  }

  // Hit PTV for departures, collect ids
  ptvClient
    .then(apis => {
      return apis.Departures.Departures_GetForStop({
        route_type: 0,
        stop_id: req.query.stop_id
      });
    })
    .then(ptvRes => {
      let stopRoutes = [];
      try {
        ptvRes.body.departures.forEach(departure => {
          stopRoutes.push(departure.route_id);
        });
      } catch(err) {
        return next(err)
      }

      const uniqueStopRoutesSet = new Set(stopRoutes);
      const uniqueStopRoutes = Array.from(uniqueStopRoutesSet);

      // Hit PTV for route names, match against route ids
      async.map(uniqueStopRoutes, getDirections, (err, directionsRes) => {
        if (err) {
          return next(err);
        }

        // Flatten array of arrays into a 2d array
        const directionsData = [].concat.apply([], directionsRes);
        const uniqueDirections = new Set(directionsData);
        const directions = Array.from(uniqueDirections);

        res.send(directions);
      });
    })
    .catch(err => {
      return next(err);
    });
});

function getDirections(routeId, callback) {
  ptvClient
    .then(apis => {
      return apis.Directions.Directions_ForRoute({ route_id: routeId });
    })
    .then(res => {
      return callback(undefined, res.body.directions);
    })
    .catch(err => {
      return callback(err);
    });
}

app.listen(3000, () => console.log("Listening on port 3000!"));
