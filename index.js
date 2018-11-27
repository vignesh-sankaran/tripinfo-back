"use strict";

var app = require("express");

app.get("/routes/:stop_id", (req, res, next) => {
  next();
});

app.listen(process.ENV.port || 3000);
