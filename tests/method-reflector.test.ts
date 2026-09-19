import { MethodReflector } from 'src/lib';

class Greeter {
  hello(): string {
    return 'hello';
  }

  greet(name: string): string {
    return `hi ${name}`;
  }
}

describe('MethodReflector', () => {

  test('fromClass() and fromInstance() return MethodReflector', () => {
    expect(MethodReflector.fromClass(Greeter)).toBeInstanceOf(MethodReflector);
    expect(MethodReflector.fromInstance(new Greeter())).toBeInstanceOf(MethodReflector);
  });

  test('getNames() returns own prototype methods', () => {
    const reflector = MethodReflector.fromClass(Greeter);
    const names = reflector.getNames();

    expect(names).toEqual(expect.arrayContaining(['constructor', 'hello', 'greet']));
    expect(names).toHaveLength(3);
  });

  test('getAll() returns method function references', () => {
    const reflector = MethodReflector.fromClass(Greeter);
    const methods = reflector.getAll();

    expect(methods).toHaveLength(3);
    expect(methods.every((method) => typeof method === 'function')).toBe(true);
  });

  test('create() adds a callable method on the prototype', () => {
    class Dynamic {}
    const reflector = MethodReflector.fromClass(Dynamic);

    reflector.create('sum', function (this: unknown, a: number, b: number) {
      return a + b;
    });

    const instance = new Dynamic() as Dynamic & { sum(a: number, b: number): number };
    expect(instance.sum(2, 3)).toBe(5);
    expect(reflector.getNames()).toContain('sum');
  });

  test('getNames() from instance mirrors prototype methods', () => {
    const reflector = MethodReflector.fromInstance(new Greeter());
    expect(reflector.getNames()).toEqual(expect.arrayContaining(['hello', 'greet']));
  });

});
