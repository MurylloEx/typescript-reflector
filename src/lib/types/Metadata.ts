export enum MetadataEnum {
  Class = 'class',
  Property = 'property',
  Method = 'method',
  Parameter = 'parameter'
}

export type Metadata<T> = ClassMetadata<T> 
  | PropertyMetadata<T> 
  | MethodMetadata<T> 
  | ParamMetadata<T>;

export interface ClassMetadata<T> {
  value: T;
  type: MetadataEnum.Class;
}

export interface PropertyMetadata<T> {
  key: PropertyKey;
  value: T;
  type: MetadataEnum.Property;
}

export interface MethodMetadata<T> {
  key: PropertyKey;
  value: T;
  type: MetadataEnum.Method;
}

export interface ParamMetadata<T> {
  key: PropertyKey;
  value: T;
  type: MetadataEnum.Parameter;
  index: number;
}

export interface RootMetadata<T> {
  [key: PropertyKey]: Metadata<T>[];
}
