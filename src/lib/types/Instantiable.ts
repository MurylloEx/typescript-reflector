export interface Instantiable<T> {
  [key: PropertyKey]: any;
  new (...args: any[]): T;
}
