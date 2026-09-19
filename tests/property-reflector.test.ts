import { PropertyReflector } from 'src/lib';

class TestingClass {}

class TestingClassWithProperties {
  public property1: string = 'foo';
  public property2: number = 100;
  public property3: boolean = true;
}

describe('PropertyReflector', () => {

  test('getNames() from class includes Function and Object prototype members', () => {
    const reflector = PropertyReflector.fromClass(TestingClass);
    const names = reflector.getNames();

    expect(names).toEqual(expect.arrayContaining([
      'length',
      'name',
      'prototype',
      'constructor',
      'toString',
      'valueOf',
    ]));
    expect(new Set(names).size).toBe(names.length);
  });

  test('getNames() from instance includes Object.prototype members', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClass());
    const names = reflector.getNames();

    expect(names).toEqual(expect.arrayContaining([
      'constructor',
      'toString',
      'valueOf',
      'hasOwnProperty',
    ]));
    expect(new Set(names).size).toBe(names.length);
  });

  test('getOwnNames() from instance returns own instance properties', () => {
    const reflector = PropertyReflector.fromInstance(new TestingClassWithProperties());
    expect(reflector.getOwnNames()).toEqual([
      'property1',
      'property2',
      'property3',
    ]);
  });

  test('inject() and delete() mutate the target', () => {
    class Target {
      existing = 1;
    }

    const instance = new Target();
    const reflector = PropertyReflector.fromInstance(instance);

    reflector.inject('injected', 'value');
    expect((instance as Target & { injected?: string }).injected).toBe('value');

    reflector.delete('injected');
    expect(Object.prototype.hasOwnProperty.call(instance, 'injected')).toBe(false);
  });

});
