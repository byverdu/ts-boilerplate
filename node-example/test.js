// const CarFactory = require('./lib-cjs/index').default;
import CarFactory from './lib-esm/index.mjs';

const audi = new CarFactory('audi');

audi.fillTank('full');

console.table(audi);
