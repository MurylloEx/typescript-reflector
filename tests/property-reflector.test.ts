import { PropertyReflector } from 'src/lib';

class TestingClass {}
class TestingClassWithProperties {
  public property1: string = 'foo';
  public property2: number = 100;
  public property3: boolean = true;
}

describe('Test result of PropertyReflector methods', () => {
  
  test('Test if getNames() method return the properties of TestingClass and his parent classes from class', () => {
    const reflector = PropertyReflector.fromClass(TestingClass);
    const expectedNames = [
      'length',
      'prototype',
      'name',
      'arguments',
      'caller',
      'constructor',
      'apply',
      'bind',
      'call',
      'toString',
      '__defineGetter__',
      '__defineSetter__',
      'hasOwnProperty',
      '__lookupGetter__',
      '__lookupSetter__',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'valueOf',
      '__proto__',
      'toLocaleString'
    ];
    expect(reflector.getNames()).toStrictEqual(expectedNames);
  });

  test('Test if getNames() method return the properties of TestingClass and his parent classes from instance', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClass());
    const expectedNames = [
      'constructor',
      '__defineGetter__',
      '__defineSetter__',
      'hasOwnProperty',
      '__lookupGetter__',
      '__lookupSetter__',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toString',
      'valueOf',
      '__proto__',
      'toLocaleString',
    ];
    expect(reflector.getNames()).toStrictEqual(expectedNames);
  });

  test('Test if getOwnNames() method return properties of TestingClassWithProperties from instance', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClassWithProperties());
    const expectedNames = [
      'property1',
      'property2',
      'property3'
    ];
    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

});
