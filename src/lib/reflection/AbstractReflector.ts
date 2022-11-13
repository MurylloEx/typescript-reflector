import { Instantiable, Instance } from 'src/lib/types';

export abstract class AbstractReflector<T> {

  protected classValue!: Instantiable<T>;
  protected instanceValue!: Instance<T>;

  protected isClass(): boolean {
    return !!this.classValue;
  }

  protected isInstance(): boolean {
    return !!this.instanceValue;
  }

  protected getClass(): Instantiable<T> {
    return this.classValue;
  }

  protected getInstance(): Instance<T> {
    return this.instanceValue;
  }

  protected withClass(value: Instantiable<T>): this {
    this.classValue = value;
    return this;
  }

  protected withInstance(value: Instance<T>): this {
    this.instanceValue = value;
    return this;
  }

  protected getTarget(): any {
    if (!this.isClass() && !this.isInstance())
      throw new ReferenceError('At least a Class reference or Instance value must be provided');

    return this.getClass()
      ?? Object.getPrototypeOf(this.getInstance());
  }

}
