'use strict';
const covidData = require('./covid19DataFIN.json');

const dateStrings = Object.keys(covidData.result);
const data = dateStrings.map(date => covidData.result[date].confirmed);
console.log(dateStrings);
console.log(data);

const data2 = Object.values(covidData.result)
console.log(data2)
const tmp = data2.map(value => value.confirmed);
console.log(tmp)