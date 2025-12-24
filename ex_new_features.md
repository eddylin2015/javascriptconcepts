JavaScript New Features


Version	Year	Notable Features				
- ES6	2015	Classes, Modules, Arrow Fns, Promises, | Destructuring				
- ES2016	2016	**"	 "Array.includes()			
- ES2017	2017	async/await"	 "Object.values/entries"	 "padStart/| End		
- ES2018	2018	Object Rest/Spread, Async Iteration, finally"	 RegExp s/| named groups"			
- ES2019	2019	flat()"	 "flatMap()"	 "fromEntries()"	 optional | catch"	
- ES2020	2020	??"	 "?."	 "BigInt"	 "allSettled"	 dynamic "import
- ES2021	2021	Logical assignments, replaceAll"	 "Promise.any"	 numeric | separators"		
- ES2022	2022	Class fields, top-level await"	 "at()"	 "hasOwn"	 "cause	
- ES2023	2023	findLast"	 hashbang support"			
- ES2024	2024	Array.group"	 "Promise.withResolvers"	 "Object.groupBy
- ES2025  2025.6 導入JSON文件, 迭代器輔助方法Array Set等可迭代對象新增map filter等鏈式方法,Set union并 intersection交 difference差, Promise.try() .
- ES2026  2026.6 计划于 2026 年 6 月发布），目前处于提案阶段
Qwen3-Max-Preview

JavaScript has evolved significantly over the years, with new features added regularly through ECMAScript (ES) specifications. Below is a comprehensive overview of major JavaScript new features, grouped by ES version and including modern proposals.

🚀 ES6 / ES2015 — The Big One
This was a massive update that transformed JavaScript into a more powerful, modern language.

✅ Key Features:
let and const — Block-scoped variable declarations.
```javacript
let x = 10;
const PI = 3.14;
```
Arrow Functions — Shorter syntax and lexical this.
```javacript

const add = (a, b) => a + b;
```
Template Literals — String interpolation with backticks.

```javacript
const name = "Alice";
console.log(`Hello, ${name}!`);
```

Destructuring Assignment
```javacript

const [a, b] = [1, 2];
const { name, age } = person;
```

Default Parameters

```javacript
function greet(name = "Guest") { ... }
```

Rest/Spread Operators
```javacript
const arr = [...oldArr, newItem];
function sum(...args) { return args.reduce(...); }
```

Classes
```javacript

class Person {
  constructor(name) { this.name = name; }
  greet() { console.log(`Hi, I'm ${this.name}`); }
}
```

Modules (import/export)
```javacript

// math.```javacript
export const PI = 3.14;

// main.js
import { PI } from './math.js';
Promises — Native async handling.
```

```javacript
fetch(url).then(res => res.json()).catch(err => /*...*/);
```

Map, Set, WeakMap, WeakSet
```javacript
const map = new Map();
map.set('key', 'value');
```

Symbols — Unique identifiers.
```javacript
const sym = Symbol('description');
```

Iterators & Generators
```javacript
function* idGenerator() {
  let id = 1;
  while(true) yield id++;
}
```

🆕 ES2016 (ES7)
Small but useful additions.

Exponentiation Operator (**)
```javacript


const result = 2 ** 3; // 8
```

Array.prototype.includes()
```javacript


[1, 2, 3].includes(2); // true
```

🎯 ES2017 (ES8)
async/await — Cleaner async code.
```javacript


async function fetchData() {
  const data = await fetch(url);
  return data.```javacripton();
}
```

Object.values(), Object.entries()

```javacript


Object.values({a:1, b:2}); // [1, 2]
Object.entries({a:1, b:2}); // [['a',1], ['b',2]]
```

Trailing commas in function parameters
```javacript


function foo(a, b,) { ... } // valid
```

String.prototype.padStart(), padEnd()
```javacript


'5'.padStart(3, '0'); // '005'
```

Object.getOwnPropertyDescriptors()
🧩 ES2018 (ES9)
Rest/Spread for Objects
```javacript


const obj = { ...oldObj, newProp: 1 };
const { x, ...rest } = obj;
```

Asynchronous Iteration (for-await-of)
```javacript


for await (const chunk of readableStream) { ... }
```

Promise.prototype.finally()
```javacript
promise.then(...)
.catch(...)
.finally(() => cleanup());
```

RegExp Improvements

s (dotAll) flag — . matches newlines.

Named capture groups — /(?<year>\d{4})/

Lookbehind assertions — /(?<=\$)\d+/

🔢 ES2019 (ES10)
Array.prototype.flat(), flatMap()
```javacript
[1, [2, [3]]].flat(2); // [1, 2, 3]
```

Object.fromEntries()
```javacript
Object.fromEntries([['a', 1], ['b', 2]]); // {a:1, b:2}
```

String.trimStart(), trimEnd()
```javacript
'  hello  '.trimStart(); // 'hello  '
```

Optional catch binding
```javacript
try { ... } catch { // no (err) needed if unused
  console.log('Error occurred');
}
```

Stable Array.sort()

🌈 ES2020 (ES11)
BigInt — Arbitrary precision integers.
```javacript
const bigNumber = 9007199254740991n;
const evenBigger = bigNumber + 1n; // Works perfectly!
console.log(typeof bigNumber); // "bigint"
```

Nullish Coalescing Operator (??): Returns the right-hand operand only when the left-hand operand is null or undefined. A much safer alternative to using || for default values (which fails on 0, '', false).
```javacript
const name = input ?? 'Anonymous'; // only null/undefined
const userInput = '';
const value = userInput || 'Default'; // 'Default' (might be unexpected)
const valueSafe = userInput ?? 'Default'; // '' (empty string is preserved)
```
Optional Chaining (?.)
```javacript
user?.profile?.name; // doesn't throw if user or profile is null/undefined
```

Promise.allSettled()
Promise.allSettled(): Takes an array of promises and returns a new promise that resolves after all the input promises have either been fulfilled or rejected. This is different from Promise.all(), which rejects immediately if any promise rejects.
```javacript
Promise.allSettled(promises); // waits for all to settle (fulfilled/rejected)
const promises = [fetch('/api1'), fetch('/api2')];
const results = await Promise.allSettled(promises);
const successful = results.filter(p => p.status === 'fulfilled');
```
Dynamic import()
```javacript
const module = await import('./module.```javacript');
// Inside an async function
if (userNeedsFeature) {
  const module = await import('./modules/myModule.js');
  module.doSomething();
}
```
globalThis — Unified global object across environments.
```javacript
globalThis.setTimeout(...); // works in browser, Node, etc.
```

import.meta — Metadata about current module.
📦 ES2021 (ES12)

Logical Assignment Operators
```javacript
// Logical OR Assignment (||=)
// Assigns only if the current value is falsy
a ||= b; // Equivalent to: a || (a = b);
// Logical AND Assignment (&&=)
// Assigns only if the current value is truthy
a &&= b; // Equivalent to: a && (a = b);
// Nullish Assignment (??=)
// Assigns only if the current value is null or undefined
a ??= b; // Equivalent to: a ?? (a = b);
```
String.prototype.replaceAll()
```javacript
'hello world'.replaceAll('l', 'x'); // 'hexxo worxd'
```
Promise.any()
```javacript
Promise.any(promises); // resolves when any promise fulfills
```
WeakRefs & Finalizers — Advanced memory management (rarely used directly).
Numeric Separators
```javacript
const billion = 1_000_000_000;
```
🧪 ES2022 (ES13)
Class Fields (Public and Private)
```javacript

class Counter {
  count = 0;              // public field
  #secret = 'private';    // private field
  increment() { this.count++; }
}
```
Static Class Fields & Private Methods

```javacript
class MyClass {
  static version = '1.0';
  #privateMethod() { ... }
}
```
Top-level await — In modules only.
```javacript

const data = await fetch('/api/data').then(r => r.json());

// In an ES module (e.g., script type="module")
const data = await fetch('https://api.example.com/data').then(r => r.json());
console.log(data); // No need for an async wrapper!

```
Object.hasOwn() — Safer than hasOwnProperty
```javacript

Object.hasOwn(obj, 'prop');
```
at() method for Arrays, Strings
```javacript


arr.at(-1); // last element
str.at(-1); // last character
```
Error .cause
```javacript

throw new Error('Failed', { cause: originalError });
```
🎉 ES2023 (ES14)
Array.findLast(), Array.findLastIndex()
```javacript
const numbers = [1, 2, 3, 4, 3, 5];
numbers.findLast(x => x < 4); // 3 (the last one)
numbers.findLastIndex(x => x < 4); // 4 (the index of the last 3)
```
Hashbang Grammar Support — For executable scripts (Node.js).

```javacript
#!/usr/bin/env node
console.log('Hello');
```
WeakMap Key Symbols: Allows using unique Symbols as keys in a WeakMap. This enables easier creation of private fields in objects without them being exposed.

Symbol.asIterator → Symbol.iterator alias (minor)

🔮 ES2024 (ES15) — Released June 2024
✅ Approved Features:

Array.group() and Array.groupToMap()
```javacript


const people = [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}];
const byAge = people.group(p => p.age); 
// { '25': [...], '30': [...] }
```
Promise.withResolvers()
```javacript


const { promise, resolve, reject } = Promise.withResolvers();
// Useful for passing control outside Promise executor
```
Object.groupBy()
```javacript


Object.groupBy(array, callback);
```
String.dedent (Stage 3 proposal, may be included) — For cleaning up indented template strings.
Set methods: intersection, difference, union, symmetricDifference — Stage 3, likely coming soon.
⏭️ Upcoming Proposals (Stage 3+)
These are likely to be included in future versions. 

Pipeline Operator (|>) — Functional-style chaining.
```javacript


result = input |> fn1 |> fn2 |> fn3;
```
Records & Tuples — Immutable data structures (syntax: #{}, #[ ]).

Decorators — Already in Stage 3, expected in ES2025.
```javacript


@logged
class MyClass { ... }
```
Array.fromAsync() — Create array from async iterable.
Iterator Helpers — Like .map(), .filter() for iterators.

## Understanding JavaScript Generator and Yield
```javacript
function* simpleGenerator() {
  yield 'Hello';
  yield 'World';
  yield '!';
}
// Create the generator object
const generator = simpleGenerator();
// Use .next() to run the function until the next yield
console.log(generator.next()); // { value: 'Hello', done: false }
console.log(generator.next()); // { value: 'World', done: false }
console.log(generator.next()); // { value: '!', done: false }
console.log(generator.next()); // { value: undefined, done: true }

function* infiniteNumbers() {
  let n = 0;
  while (true) {
    yield n++;
  }
}

const numbers = infiniteNumbers();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2
// This can go on forever without crashing
// This is a conceptual example
function* fetchUserData() {
  // `yield` pauses until the Promise resolves
  const user = yield fetch('/api/user');
  const posts = yield fetch(`/api/posts/${user.id}`);
  return posts;
}

// A helper function would run this generator, waiting for each yielded Promise
// runGenerator(fetchUserData);
function* generatorA() {
  yield 'a';
  yield 'b';
}

function* generatorB() {
  yield 'x';
  yield* generatorA(); // Delegates to generatorA
  yield 'y';
}

// Equivalent to yielding: 'x', 'a', 'b', 'y'
const genB = generatorB();
console.log([...genB]); // ['x', 'a', 'b', 'y'] (using spread operator)
```

🔮 ES2025 (ES16) — Released2025.6 node22+
- 導入JSON文件,
```js
import data from './config.json'
assert {type:'json'}
data.apiUrl;
```
- 迭代器輔助方法Array Set等可迭代對象新增map filter等鏈式方法,無需先轉數組,性能更好.
```js
const numbers=[1,2,3,4]
const doubledEvents=numbers.values().filter(n=>n%2===0).map(n=>n*2);
```
- Set union 并 intersection交 difference差
```js
const setA=new Set([]);
const setB=new Set([]);
const unionAB=setA.union(setB);
const intersectAB=setA.intersection(setB);
const differenceAB=setA.difference(setB);
```
- Promise.try() 
```js
Promise.try(async()=>{
  await fetch("");
}).catch(err=>{
   console.log(err.message);
});
```
## 🔥 ES2026 可能包含的新特性
### 1. Record & Tuple（记录与元组）
不可变的数据结构，用于深度比较和共享值。

```js
// 记录（Record）
const record = #{ x: 1, y: 2 };
// 元组（Tuple）
const tuple = #[1, 2, 3];
```
### 2. Decimal（十进制浮点数）
解决二进制浮点数精度问题，适合财务计算。

```js
const amount = 0.1m + 0.2m;
console.log(amount); // 0.3m
```
### 3. Array.fromAsync
从异步可迭代对象创建数组。

```js
async function* asyncGen() {
  yield 1; yield 2;
}
const arr = await Array.fromAsync(asyncGen());
```
### 4. Set 和 Map 的新方法
Set.prototype.intersection()

Map.prototype.merge()
增强集合操作能力。

### 5. String.cooked
标签模板函数，用于转义处理。

```js
String.cooked`Hello\nWorld`; // 不转义 \n
```
### 6. 异步上下文（Async Context）
跟踪异步执行上下文，用于日志、监控等。

### 7. 类型注解（Type Annotations）
注意：这只是运行时忽略的注释，不是静态类型，主要为工具链设计。

```js
function greet(name: string): string {
  return `Hello, ${name}!`;
}
```
### 8. 明确资源管理（Explicit Resource Management）
使用 using 自动释放资源（已进入 ES2024）。

```js
{
  using file = openFile();
  // 自动关闭
}
```
📌 注意事项
以上特性尚未最终确定，可能变化。

Stage 3 的提案通常会被纳入，但非绝对。

可通过 TC39 提案列表 跟踪进展。
