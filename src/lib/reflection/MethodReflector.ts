import { Instance, Instantiable } from 'src/lib/types';
import { AbstractReflector } from './AbstractReflector';

export class MethodReflector<T> extends AbstractReflector<T> {

  private constructor() {
    super();
  }

  static fromClass<T>(classValue: Instantiable<T>): MethodReflector<T> {
    return new MethodReflector<T>().withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): MethodReflector<T> {
    return new MethodReflector<T>().withInstance(instanceValue);
  }

  getNames(): string[] {
    const prototype = this.isClass() 
      ? this.getClass().prototype 
      : Object.getPrototypeOf(this.getInstance());

    const propertyNames = Object.getOwnPropertyNames(prototype);

    const methodNames = propertyNames.filter(propertyName => {
      return typeof prototype[propertyName] == 'function';
    });

    return methodNames;
  }

  getAll(): Function[] {
    const prototype = this.isClass() 
      ? this.getClass().prototype 
      : Object.getPrototypeOf(this.getInstance());

    return this.getNames().map(methodName => prototype[methodName]);
  }

  create(name: string, stubMethod: Function): MethodReflector<T> {
    const prototype = this.isClass() 
      ? this.getClass().prototype 
      : Object.getPrototypeOf(this.getInstance());

    prototype[name] = function (this: unknown, ...args: unknown[]) {
      return stubMethod.apply(this, args);
    };

    return this;
  }

}

