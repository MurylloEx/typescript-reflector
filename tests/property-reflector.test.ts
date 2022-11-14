import { PropertyReflector } from 'src';

class TestingClass {}
class TestingClassWithProperties {
  public property1: string = 'foo';
  public property2: number = 100;
  public property3: boolean = true;
}
class TestingClassWithInjectedProperties {}

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

  test('Test if getOwnNames() method return properties of TestingClassWithProperties from class', () => {
    const reflector = PropertyReflector.fromClass(TestingClassWithProperties);
    const expectedNames = [
      'length',
      'prototype',
      'name'
    ];
    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

  test('Test if getOwnNames() method return properties of TestingClassWithProperties from instance', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClassWithProperties());
    const expectedNames = [
      'constructor',
      'property1',
      'property2',
      'property3'
    ];
    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

  test('Test if inject() method can inject `property1` into class prototype from class', () => {
    const reflector = PropertyReflector.fromClass(TestingClassWithInjectedProperties);
    const expectedNames = [
      'length',
      'prototype',
      'name',
      'property1'
    ];

    reflector.inject('property1', 'foo');

    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

  test('Test if inject() method can inject `property1` into class prototype from instance', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClassWithInjectedProperties());
    const expectedNames = [
      'constructor',
      'property1'
    ];

    reflector.inject('property1', 'foo');

    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

  test('Test if delete() method can delete `property1` into class prototype from class', () => {
    const reflector = PropertyReflector.fromClass(TestingClassWithInjectedProperties);
    const expectedNames = [
      'length',
      'prototype',
      'name'
    ];

    reflector.inject('property1', 'foo');
    reflector.delete('property1');

    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

  test('Test if delete() method can delete `property1` into class prototype from instance', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClassWithInjectedProperties());
    const expectedNames = [
      'constructor'
    ];

    reflector.inject('property1', 'foo');
    reflector.delete('property1');

    expect(reflector.getOwnNames()).toStrictEqual(expectedNames);
  });

});
