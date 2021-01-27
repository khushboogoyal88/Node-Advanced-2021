"use strict";

const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");

const covidData = require("./covid19DataFIN.json");

const { port, host } = require("./config.json");

const app = express();
const server = http.createServer(app);

const homePath = path.join(__dirname, "home.html");
const homePath1 = path.join(__dirname, "home1.html");

app.use(cors());

app.get("/", (req, res) => res.sendFile(homePath));
app.get("/bars", (req, res) => res.sendFile(homePath1));

app.get("/api/v1/data", async (req, res) => {
  const dateStrings = Object.keys(covidData.result);
  const data = dateStrings.map((date) => covidData.result[date].confirmed); // data of confirmed cases.

  //   const data = dateStrings.map((date) => ({    // to be able to get data with dates
  //     date,
  //     confirmed: covidData.result[date].confirmed,
  //   }));

  res.json(data);
});

server.listen(port, host, () => {
  console.log("Server running");
});
