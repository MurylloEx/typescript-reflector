import { MethodReflector } from 'src';

class TestingClass {
  method1() {}
  method2() {}
}

describe('Test result of MethodReflector methods', () => {
  
  test('Test if getName() method return an array with name of methods from class', () => {
    const reflector = MethodReflector.fromClass(TestingClass);
    expect(reflector.getNames()).toStrictEqual([
      'constructor', 
      'method1', 
      'method2'
    ]);
  });

  test('Test if getAll() method return an array with length equals to 3 from class', () => {
    const reflector = MethodReflector.fromClass(TestingClass);
    expect(reflector.getAll()).toHaveLength(3);
  });

  test('Test if getAll() method return an array with functions from instance', () => {
    const reflector = MethodReflector.fromInstance(new TestingClass());
    expect(reflector.getAll()).toStrictEqual([
      TestingClass,
      TestingClass.prototype.method1,
      TestingClass.prototype.method2
    ]);
  });

  test('Test if getAll() method return an array with functions from instance', () => {
    const reflector = MethodReflector.fromInstance(new TestingClass());

    reflector.create('method3', jest.fn());

    expect(reflector.getAll()).toHaveLength(4);
  });

});
