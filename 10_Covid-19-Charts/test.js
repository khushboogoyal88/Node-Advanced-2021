"use strict";
const covidData = require("./covid19DataFIN.json");

const dateStrings = Object.keys(covidData.result);
const data = dateStrings.map((date) => covidData.result[date].confirmed);
// console.log(dateStrings);
// console.log(data);

// const data2 = Object.values(covidData.result)
// console.log(data2)
// const tmp = data2.map(value => value.confirmed);
// console.log(tmp)

const dailyCases = [];
for (let i = 0; i < data.length - 1; i++) {
  dailyCases.push(data[i + 1] - data[i]);
}
console.log(dailyCases);

console.log(Math.max(...dailyCases));
