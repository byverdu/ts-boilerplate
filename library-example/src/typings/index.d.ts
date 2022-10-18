declare module '@byverdu/CarFactory' {
  export type Brand = 'audi' | 'mercedes';
  export type TankCapacity = 'empty' | 'half' | 'full';
  export type FillTank = Exclude<TankCapacity, 'empty'>;

  export interface Car {
    brand: Brand;
    tank: TankCapacity;
    fillTank: (capacity: FillTank) => void;
  }
}
