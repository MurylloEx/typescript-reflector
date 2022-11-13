import { Instance, Instantiable } from 'src/lib/types';
import { AbstractReflector } from './AbstractReflector';

export class PropertyReflector<T> extends AbstractReflector<T> {

  private constructor() {
    super();
  }

  static fromClass<T>(classValue: Instantiable<T>): PropertyReflector<T> {
    return new PropertyReflector<T>().withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): PropertyReflector<T> {
    return new PropertyReflector<T>().withInstance(instanceValue);
  }

  getOwnNames(): string[] {
    return Object.getOwnPropertyNames(this.getTarget());
  }

  getNames(): string[] {
    const prototypes = [];

    let prototype = this.isClass() 
      ? this.getClass() 
      : Object.getPrototypeOf(this.getInstance());

    do {
      prototypes.push(prototype);
      prototype = Object.getPrototypeOf(prototype);
    } while (prototype);

    const allPropertyNames = prototypes.reduce<string[]>((propertyNames, currentPrototype) => {
      return propertyNames.concat(Object.getOwnPropertyNames(currentPrototype));
    }, []);
    
    return [...new Set(allPropertyNames)];
  }

  delete(name: string): PropertyReflector<T> {
    const target = this.getTarget();
    delete target[name];

    return this;
  }

  inject<K>(propertyName: string, value: K | K[]) {
    const target = this.getTarget();
    target[propertyName] = value;
  }

}

