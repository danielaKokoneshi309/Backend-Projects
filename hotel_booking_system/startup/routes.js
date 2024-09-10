require("express-async-errors");
const rooms = require("../routes/room/room");
const express = require("express");
const signup = require("../routes/signup/signup");
const login = require("../routes/login");
const booking = require("../routes/booking");
const bookingHistory = require("../routes/manager/bookingHistory");
const bookingApprove = require("../routes/manager/bookingApprove");

module.exports = function (app) {
  app.use(express.json());
  app.use("/room", rooms);
  app.use("/signup", signup);
  app.use("/login", login);
  app.use("/booking", booking);
  app.use("/bookingHistory", bookingHistory);
  app.use("/bookingApprove", bookingApprove);
  app.use("/room", rooms);
};
