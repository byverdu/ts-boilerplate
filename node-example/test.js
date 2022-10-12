const CarFactory = require('./lib/index').default;
const chalk = require('chalk');

const audi = new CarFactory('audi');

chalk.rgb();

audi.fillTank('full');

console.log(audi);
