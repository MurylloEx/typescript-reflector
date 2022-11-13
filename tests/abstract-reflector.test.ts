import { AbstractReflector, Instance, Instantiable } from 'src/lib';

class TestingClass {}

class TestingReflector<T> extends AbstractReflector<T> {

  private constructor() {
    super();
  }

  static fromClass<T>(classValue: Instantiable<T>): TestingReflector<T> {
    return (new TestingReflector<T>()).withClass(classValue);
  }

  static fromInstance<T>(instanceValue: Instance<T>): TestingReflector<T> {
    return (new TestingReflector<T>()).withInstance(instanceValue);
  }

  override isClass() {
    return super.isClass();
  }

  override isInstance() {
    return super.isInstance();
  }

  override getClass() {
    return super.getClass();
  }

  override getInstance() {
    return super.getInstance();
  }

}

describe('Test result of AbstractReflector methods', () => {

  test('Test if fromClass() method return an instance of TestingReflector', () => {
    const reflector = TestingReflector.fromClass(TestingClass);
    expect(reflector).toBeInstanceOf(TestingReflector);
  });

  test('Test if fromInstance() method return an instance of TestingReflector', () => {
    const reflector = TestingReflector.fromInstance(new TestingClass());
    expect(reflector).toBeInstanceOf(TestingReflector);
  });

  test('Test if isClass() method return true ', () => {
    const reflector = TestingReflector.fromClass(TestingClass);
    expect(reflector.isClass()).toBeTruthy();
  });

  test('Test if isInstance() method return true', () => {
    const reflector = TestingReflector.fromInstance(new TestingClass());
    expect(reflector.isInstance()).toBeTruthy();
  });

  test('Test if getClass() method return an instance of TestingClass', () => {
    const reflector = TestingReflector.fromClass(TestingClass);
    expect(reflector.getClass()).toBe(TestingClass);
  });

  test('Test if getInstance() method return an instance of TestingClass', () => {
    const reflector = TestingReflector.fromInstance(new TestingClass());
    expect(reflector.getInstance()).toBeInstanceOf(TestingClass);
  });

});
