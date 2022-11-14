import {
  ClassReflector,
  MetadataReflector,
  MethodReflector,
  PropertyReflector,
  Reflector
} from 'src';

class TestingClass {}

describe('Test result of Reflector methods', () => {

  test('Test if fromClass() method return an instance of Reflector', () => {
    const reflector = Reflector.fromClass(TestingClass);
    expect(reflector).toBeInstanceOf(Reflector);
  });

  test('Test if class() method return an instance of ClassReflector', () => {
    const reflector = Reflector.fromClass(TestingClass);
    expect(reflector.class()).toBeInstanceOf(ClassReflector);
  });

  test('Test if metadata() method return an instance of MetadataReflector', () => {
    const reflector = Reflector.fromClass(TestingClass);
    expect(reflector.metadata()).toBeInstanceOf(MetadataReflector);
  });

  test('Test if method() method return an instance of MethodReflector', () => {
    const reflector = Reflector.fromClass(TestingClass);
    expect(reflector.method()).toBeInstanceOf(MethodReflector);
  });

  test('Test if property() method return an instance of PropertyReflector', () => {
    const reflector = Reflector.fromClass(TestingClass);
    expect(reflector.property()).toBeInstanceOf(PropertyReflector);
  });

});
