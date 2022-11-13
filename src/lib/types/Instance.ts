export type Instance<T> = T & {
  [key: PropertyKey]: any;
};
