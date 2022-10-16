import { Car, Brand, TankCapacity, FillTank } from '@byverdu/CarFactory';

export { Car, Brand, TankCapacity, FillTank };

export default class CarFactory implements Car {
  public brand: Brand;
  public tank: TankCapacity;
  static carsBuild = 0;

  constructor(brand: Brand) {
    this.brand = brand;
    this.tank = 'empty';
    CarFactory.carsBuild = CarFactory.carsBuild + 1;
  }

  public fillTank(capacity: FillTank) {
    this.tank = capacity;
  }
}
