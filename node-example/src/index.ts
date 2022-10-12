import { Car, Brand, TankCapacity, FillTank } from '@byverdu/CarFactory';

export default class CarFactory implements Car {
  public brand: 'audi' | 'mercedes';
  public tank: TankCapacity;
  public carsBuild = 0;

  constructor(brand: Brand) {
    this.brand = brand;
    this.tank = 'empty';
    this.carsBuild = this.carsBuild + 1;
  }

  public fillTank(capacity: FillTank) {
    this.tank = capacity;
  }
}
