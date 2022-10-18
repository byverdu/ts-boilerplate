import type { Car, Brand, TankCapacity, FillTank } from '@byverdu/CarFactory';
import { logger } from '@utils/logger.js';

export default class CarFactory implements Car {
  public brand: Brand;
  public tank: TankCapacity;
  static carsBuild = 0;

  constructor(brand: Brand) {
    this.brand = brand;
    this.tank = 'empty';
    CarFactory.carsBuild = CarFactory.carsBuild + 1;

    logger('log', `new ${brand} car built`);
  }

  public fillTank(capacity: FillTank) {
    this.tank = capacity;
  }
}

export { Car, Brand, TankCapacity, FillTank };
