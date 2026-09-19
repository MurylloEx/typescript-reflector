import { MetadataEnum, MetadataReflector } from 'src/lib';

class Service {}

describe('MetadataReflector', () => {

  test('fromClass() and fromInstance() return MetadataReflector', () => {
    expect(MetadataReflector.fromClass(Service)).toBeInstanceOf(MetadataReflector);
    expect(MetadataReflector.fromInstance(new Service())).toBeInstanceOf(MetadataReflector);
  });

  test('starts empty for a fresh class', () => {
    class Fresh {}
    const reflector = MetadataReflector.fromClass(Fresh);

    expect(reflector.isEmpty()).toBe(true);
    expect(reflector.isNotEmpty()).toBe(false);
    expect(reflector.count()).toBe(0);
    expect(reflector.all()).toEqual([]);
    expect(reflector.first()).toBeNull();
    expect(reflector.last()).toBeNull();
  });

  test('append(), prepend(), and query helpers manage metadata lists', () => {
    class Catalog {}
    const reflector = MetadataReflector.fromClass(Catalog).namespace('catalog');

    reflector.append({ type: MetadataEnum.Class, value: 'a' });
    reflector.append({ type: MetadataEnum.Class, value: 'b' });
    reflector.prepend({ type: MetadataEnum.Class, value: 'z' });

    expect(reflector.count()).toBe(3);
    expect(reflector.isNotEmpty()).toBe(true);
    expect(reflector.all().map((item) => item.value)).toEqual(['z', 'a', 'b']);
    expect(reflector.first()?.value).toBe('z');
    expect(reflector.last()?.value).toBe('b');
    expect(reflector.take(2).map((item) => item.value)).toEqual(['z', 'a']);
    expect(reflector.firstOrFail().value).toBe('z');
    expect(reflector.lastOrFail().value).toBe('b');
  });

  test('stores metadata under custom keys', () => {
    class Tagged {}
    const reflector = MetadataReflector.fromClass(Tagged);

    reflector.append(
      { type: MetadataEnum.Property, key: 'id', value: 1 },
      'props',
    );

    expect(reflector.isEmpty('props')).toBe(false);
    expect(reflector.all('props')).toHaveLength(1);
    expect(reflector.isEmpty('default')).toBe(true);
  });

  test('firstOrFail() and lastOrFail() throw when empty', () => {
    class Empty {}
    const reflector = MetadataReflector.fromClass(Empty);

    expect(() => reflector.firstOrFail()).toThrow(ReferenceError);
    expect(() => reflector.lastOrFail()).toThrow('Cannot find last metadata');
  });

  test('instance metadata is readable after write', () => {
    class Widget {}
    const instance = new Widget();
    const reflector = MetadataReflector.fromInstance(instance).namespace('widgets');

    reflector.append({ type: MetadataEnum.Class, value: 'widget' });

    expect(MetadataReflector.fromInstance(instance).namespace('widgets').first()?.value)
      .toBe('widget');
  });

});
