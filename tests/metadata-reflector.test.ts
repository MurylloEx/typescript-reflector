import { Metadata, MetadataEnum, MetadataReflector } from 'src';

const Noop = () => (target: any) => target;

@Noop()
class TestingClass {}

describe('Test result of MetadataReflector methods', () => {

  const reflector = MetadataReflector
    .fromClass(TestingClass)
    .namespace('testing');

  beforeEach(() => {
    const metadata: Metadata<string> = { 
      value: 'some-data',
      type: MetadataEnum.Class
    };

    reflector.clear()
      .append(metadata)
      .append(metadata)
      .append(metadata);
  });

  test('Test if isEmpty() method return false in a class with metadata', () => {
    expect(reflector.isEmpty()).toBeFalsy();
  });

  test('Test if isNotEmpty() method return true in a class with metadata', () => {
    expect(reflector.isNotEmpty()).toBeTruthy();
  });

  test('Test if count() method return 3 metadata elements from class', () => {
    expect(reflector.count()).toBe(3);
  });

  test('Test if firstOrFail() method return the first metadata elements from class', () => {
    expect(reflector.firstOrFail()).toBe(reflector.first());
  });

  test('Test if lastOrFail() method return the last metadata elements from class', () => {
    expect(reflector.lastOrFail()).toBe(reflector.last());
  });

  test('Test if take() method return a given number of metadata entries from class', () => {
    expect(reflector.take(2)).toHaveLength(2);
  });

  test('Test if prepend() method add a new metadata from class', () => {
    const metadata: Metadata<string> = { 
      value: 'some-data',
      type: MetadataEnum.Class
    };

    reflector.prepend(metadata);

    expect(reflector.count()).toBe(4);
  });

  test('Test if all() method return all metadata from class', () => {
    const expected: Metadata<string>[] = [
      { value: 'some-data', type: MetadataEnum.Class },
      { value: 'some-data', type: MetadataEnum.Class },
      { value: 'some-data', type: MetadataEnum.Class }
    ];
    expect(reflector.all()).toStrictEqual(expected);
  });

  test('Test if clear() method remove all metadata from class', () => {
    expect(reflector.clear().count()).toBe(0);
  });

});
