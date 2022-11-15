import { Instance, Instantiable, Metadata, RootMetadata } from 'src/lib/types';
import { AbstractReflector } from './AbstractReflector';

export class MetadataReflector<T> extends AbstractReflector<T> {

  protected namespaceValue: string = 'reflector';

  private constructor() {
    super();
  }

  static fromClass<T>(classValue: Instantiable<T>): MetadataReflector<T> {
    return new MetadataReflector<T>().withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): MetadataReflector<T> {
    return new MetadataReflector<T>().withInstance(instanceValue);
  }

  protected getRootMetadata<K>(): RootMetadata<K> {
    if (!this.namespaceValue)
      throw new ReferenceError('Metadata namespace has not defined');

    return Reflect.getMetadata(this.namespaceValue, this.getTarget()) || {};
  }

  protected defineRootMetadata<K>(key: string, metadata: Metadata<K>[]): void {
    const previousMetadata = this.getRootMetadata<any>();

    if (!Array.isArray(previousMetadata[key]))
      previousMetadata[key] = new Array<Metadata<K>>();

    previousMetadata[key] = metadata;

    if (this.classValue)
      Reflect.defineMetadata(this.namespaceValue, previousMetadata, this.classValue);

    if (this.instanceValue)
      Reflect.defineMetadata(this.namespaceValue, previousMetadata, this.instanceValue.prototype);
  }

  protected get<K>(key: string): Metadata<K>[] {
    const metadata = this.getRootMetadata<any>();

    if (!Array.isArray(metadata[key]))
      metadata[key] = new Array<Metadata<K>>();

    return <Metadata<K>[]>metadata[key];
  }

  protected set<K>(key: string, metadata: Metadata<K>[]): MetadataReflector<T> {
    this.defineRootMetadata(key, metadata);
    return this;
  }

  namespace(namespace: string): MetadataReflector<T> {
    this.namespaceValue = namespace;
    return this;
  }

  append<K>(value: Metadata<K>, key: string = 'default'): MetadataReflector<T> {
    return this.set<K>(key, [...this.all<K>(), value]);
  }

  prepend<K>(value: Metadata<K>, key: string = 'default'): MetadataReflector<T> {
    return this.set<K>(key, [value, ...this.all<K>()]);
  }

  all<K>(key: string = 'default'): Metadata<K>[] {
    return this.get<K>(key);
  }

  first<K>(key: string = 'default'): Metadata<K> | null {
    return this.all<K>(key)[0] ?? null;
  }

  firstOrFail<K>(key: string = 'default'): Metadata<K> {
    const firstMetadata = this.first<K>(key);

    if (firstMetadata) return firstMetadata;

    throw new ReferenceError('Cannot find first metadata');
  }

  last<K>(key: string = 'default'): Metadata<K> | null {
    return this.all<K>(key).slice(-1)[0] ?? null;;
  }

  lastOrFail<K>(key: string = 'default'): Metadata<K> {
    const lastMetadata = this.last<K>(key);

    if (lastMetadata) return lastMetadata;

    throw new ReferenceError('Cannot find last metadata');
  }
  
  take<K>(amount: number, key: string = 'default'): Metadata<K>[] {
    return this.all<K>(key).slice(0, amount);
  }

  count<K>(key: string = 'default'): number {
    return this.all<K>(key).length;
  }

  isEmpty(key: string = 'default'): boolean {
    return this.count(key) == 0;
  }

  isNotEmpty(key: string = 'default'): boolean {
    return !this.isEmpty(key);
  }

  clear(key: string = 'default'): MetadataReflector<T> {
    return this.set(key, []);
  }

}

