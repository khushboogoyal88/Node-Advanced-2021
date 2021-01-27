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
const daily1 = path.join(__dirname, "daily1.html");
const daily2 = path.join(__dirname, "daily2.html");

app.use(cors());

app.get("/", (req, res) => res.sendFile(homePath));
app.get("/bars", (req, res) => res.sendFile(homePath1));
app.get("/daily1", (req, res) => res.sendFile(daily1));
app.get("/daily2", (req, res) => res.sendFile(daily2));

app.get("/api/v1/data", async (req, res) => {
  const dateStrings = Object.keys(covidData.result);
  const data = dateStrings.map((date) => covidData.result[date].confirmed); // data of confirmed cases.

  //   const data = dateStrings.map((date) => ({    // to be able to get data with dates
  //     date,
  //     confirmed: covidData.result[date].confirmed,
  //   }));

  res.json(data);
});

app.get("/api/v1/data/daily", (req, res) => {
  const dateStrings = Object.keys(covidData.result);
  const data = dateStrings.map((date) => covidData.result[date].confirmed);
  const dailyCases = [];
  for (let i = 0; i < data.length - 1; i++) {
    dailyCases.push(data[i + 1] - data[i]);
  }
  res.json(dailyCases);
});

server.listen(port, host, () => {
  console.log("Server running");
});
