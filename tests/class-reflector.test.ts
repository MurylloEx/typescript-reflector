import { ClassReflector, Instantiable } from 'src';

class Token { }

class G { }
class A { }
class B extends A { }
class C extends B { }
class D extends C { }
class E extends D { }

@Reflect.metadata('metadata-key', null)
class F extends E {
  constructor(token: Token) {
    super();
  }
}

describe('Test result of ClassReflector methods', () => {

  test('Test if getParentClass() method return the parent class', () => {
    const reflector = ClassReflector.fromClass(E);
    expect(reflector.getParentClass<D>()).toBe(D);
  });

  test('Test if getParentClasses() method return the parent classes', () => {
    const reflector = ClassReflector.fromClass(E);
    expect(reflector.getParentClasses<Instantiable<any>>()).toStrictEqual([E, D, C, B, A]);
  });

  test('Test if getParams() method return the constructor injection tokens', () => {
    const reflector = ClassReflector.fromClass(F);
    expect(reflector.getParams()).toStrictEqual([Token]);
  });

  test('Test if setPrototype() method define a valid prototype of class', () => {
    const reflector = ClassReflector.fromInstance(new G());
    reflector.setPrototype(F);
    expect(reflector.getParams()).toStrictEqual([Token]);
  });

});
