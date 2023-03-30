export class Attributes<T extends {}> {
  constructor(private data: T) {}
  //  K can only ever be a type from T which is current UserProps
  // Return type is interface lookup
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };
  set = (update: T): void => {
    Object.assign(this.data, update);
  };
  getAllAttributes(): T {
    return this.data;
  }
}
