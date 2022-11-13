import { Instance, Instantiable } from 'src/lib/types';
import { ClassReflector } from './ClassReflector';
import { MethodReflector } from './MethodReflector';
import { PropertyReflector } from './PropertyReflector';
import { MetadataReflector } from './MetadataReflector';
import { AbstractReflector } from './AbstractReflector';

export class Reflector<T> extends AbstractReflector<T> {

  static fromClass<T>(classValue: Instantiable<T>): Reflector<T> {
    return new Reflector<T>().withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): Reflector<T> {
    return new Reflector<T>().withInstance(instanceValue);
  }

  metadata(): MetadataReflector<T> {
    return this.isClass() 
      ? MetadataReflector.fromClass<T>(this.classValue)
      : MetadataReflector.fromInstance<T>(this.instanceValue);
  }

  property(): PropertyReflector<T> {
    return this.isClass() 
      ? PropertyReflector.fromClass<T>(this.classValue)
      : PropertyReflector.fromInstance<T>(this.instanceValue);
  }

  method(): MethodReflector<T> {
    return this.isClass() 
      ? MethodReflector.fromClass<T>(this.classValue)
      : MethodReflector.fromInstance<T>(this.instanceValue);
  }

  class(): ClassReflector<T> {
    return this.isClass() 
      ? ClassReflector.fromClass<T>(this.classValue)
      : ClassReflector.fromInstance<T>(this.instanceValue);
  }

}
