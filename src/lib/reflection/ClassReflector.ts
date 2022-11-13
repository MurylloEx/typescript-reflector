import { Instance, Instantiable } from 'src/lib/types';
import { AbstractReflector } from './AbstractReflector';

export class ClassReflector<T> extends AbstractReflector<T> {

  private constructor() {
    super();
  }

  static fromClass<T>(classValue: Instantiable<T>): ClassReflector<T> {
    return new ClassReflector<T>().withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): ClassReflector<T> {
    return new ClassReflector<T>().withInstance(instanceValue);
  }

  getParentClasses<Function>(): Function[] {
    const prototypes: Function[] = [];

    let prototype: any = this.isClass() 
      ? this.getClass()
      : Object.getPrototypeOf(this.getInstance());

    do {
      prototypes.push(prototype);
      prototype = Object.getPrototypeOf(prototype);
    } while (prototype);

    prototypes.splice(-2);

    return <Function[]>prototypes;
  }

  getParentClass<K>(): K {
    const prototype = this.isClass() 
      ? this.getClass() 
      : Object.getPrototypeOf(this.getInstance());
    
    return <K>Object.getPrototypeOf(prototype);
  }

  getParams(): any[] {
    const prototype = this.isClass() 
      ? this.getClass() 
      : Object.getPrototypeOf(this.getInstance());

    return Reflect.getMetadata('design:paramtypes', prototype) ?? [];
  }

  setPrototype(prototype: object): ClassReflector<T> {
    if (this.isClass()) 
      Reflect.setPrototypeOf(this.getClass(), prototype);
    if (this.isInstance()) 
      Reflect.setPrototypeOf(this.getInstance(), prototype);
    return this;
  }

}
