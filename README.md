# typescript-reflector

Fluent TypeScript helpers for runtime reflection over classes, properties, methods, and decorator metadata — built on top of [`reflect-metadata`](https://www.npmjs.com/package/reflect-metadata).

## Purpose

TypeScript erases most type information at compile time. Libraries that rely on decorators, dependency injection, ORMs, or validation often need a consistent way to:

- Walk class inheritance chains
- Inspect constructor parameter design-types emitted by the compiler
- Read and write custom metadata in a namespaced store
- List or mutate methods and properties on a class or instance

**typescript-reflector** provides a small, fluent API for those tasks without inventing a new metadata protocol. It wraps `Reflect` / `reflect-metadata` and common prototype introspection behind focused reflector classes.

## Problem solved

Raw `Reflect.getMetadata` / `Object.getPrototypeOf` usage tends to scatter across projects as ad-hoc helpers. This package centralizes that logic behind a single entry point:

```ts
import { Reflector } from 'typescript-reflector';

const reflector = Reflector.fromClass(MyService);
reflector.class().getParams();
reflector.method().getNames();
reflector.metadata().append({ type: MetadataEnum.Class, value: 'tag' });
```

You can also construct the specialized reflectors directly when you only need one concern.

## Requirements

- Node.js **18+**
- TypeScript projects that use `experimentalDecorators` and `emitDecoratorMetadata` when you need design-time metadata (`design:paramtypes`, etc.)

## Install

```bash
npm install typescript-reflector
```

Ensure `reflect-metadata` is loaded once at application startup (the package imports it for you when you import from `typescript-reflector`):

```ts
import 'reflect-metadata';
import { Reflector, MetadataEnum } from 'typescript-reflector';
```

## Quick start

```ts
import { Reflector, MetadataEnum, ClassReflector } from 'typescript-reflector';

class Token {}

class Base {}
class Child extends Base {
  constructor(public token: Token) {
    super();
  }

  ping() {
    return 'pong';
  }
}

const fromClass = Reflector.fromClass(Child);
const fromInstance = Reflector.fromInstance(new Child(new Token()));

// Inheritance
fromClass.class().getParentClass(); // Base
fromClass.class().getParentClasses(); // [Child, Base]

// Constructor design:paramtypes (requires emitDecoratorMetadata)
fromClass.class().getParams(); // [Token]

// Methods
fromClass.method().getNames(); // includes 'constructor', 'ping'
fromClass.method().create('extra', function () {
  return 42;
});

// Properties
fromInstance.property().getOwnNames();
fromInstance.property().inject('flag', true);

// Custom metadata (namespaced Reflect metadata bag)
fromClass
  .metadata()
  .namespace('app')
  .append({ type: MetadataEnum.Class, value: { role: 'service' } });

fromClass.metadata().namespace('app').first();
fromClass.metadata().namespace('app').count(); // 1
```

### Specialized reflectors

| Class | Responsibility |
| --- | --- |
| `Reflector` | Facade: `class()`, `property()`, `method()`, `metadata()` |
| `ClassReflector` | Parent classes, constructor params, `setPrototype` |
| `PropertyReflector` | Own / inherited names, `inject`, `delete` |
| `MethodReflector` | Method names, method refs, `create` stubs |
| `MetadataReflector` | Namespaced metadata lists: append/prepend/query |
| `AbstractReflector` | Shared class vs instance target handling |

### Metadata shapes

Metadata entries are typed unions keyed by `MetadataEnum`:

- `Class` — `{ type, value }`
- `Property` — `{ type, key, value }`
- `Method` — `{ type, key, value }`
- `Parameter` — `{ type, key, value, index }`

Entries are stored as arrays under a string key (default `"default"`) inside a Reflect metadata object for the configured namespace (default `"reflector"`).

## API overview

### `Reflector.fromClass(ctor)` / `Reflector.fromInstance(instance)`

Creates a facade bound to a constructor or instance. Branch into:

- `.class()` → `ClassReflector`
- `.property()` → `PropertyReflector`
- `.method()` → `MethodReflector`
- `.metadata()` → `MetadataReflector`

Each specialized class also exposes the same `fromClass` / `fromInstance` static factories.

### `ClassReflector`

- `getParentClass()` — immediate parent
- `getParentClasses()` — chain excluding `Object` / `Function` roots
- `getParams()` — `design:paramtypes` for the constructor
- `setPrototype(proto)` — replace prototype on the bound class or instance

### `PropertyReflector`

- `getOwnNames()` — `Object.getOwnPropertyNames` on the bound target
- `getNames()` — unique names across the prototype chain
- `inject(name, value)` — assign and return `this`
- `delete(name)` — delete and return `this`

### `MethodReflector`

- `getNames()` — own prototype properties that are functions
- `getAll()` — those function values
- `create(name, stub)` — install a method that forwards to `stub`

### `MetadataReflector`

- `namespace(name)` — Reflect metadata key (default `"reflector"`)
- `append` / `prepend` — mutate the list for a key (default `"default"`)
- `all` / `take` / `first` / `last` / `firstOrFail` / `lastOrFail`
- `count` / `isEmpty` / `isNotEmpty`

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Clean and compile to `dist/` with declarations |
| `npm test` | Run Jest unit tests |
| `npm run test:cov` | Tests with coverage |
| `npm run test:watch` | Jest watch mode |
| `npm run lint` | Typecheck library and tests |
| `npm start` | Run `src/index.ts` via `ts-node` |

## Project layout

```
src/
  index.ts
  lib/
    reflection/   # Reflector classes
    types/        # Instantiable, Instance, Metadata types
tests/            # Jest suites
```

## License

[MIT](./LICENSE) © Muryllo Pimenta de Oliveira
