JavaScript New Features

Version	Year	Notable Features				
ES6	2015	Classes, Modules, Arrow Fns, Promises, Destructuring				
ES2016	2016	**"	 "Array.includes()			
ES2017	2017	async/await"	 "Object.values/entries"	 "padStart/End		
ES2018	2018	Object Rest/Spread, Async Iteration, finally"	 RegExp s/named groups"			
ES2019	2019	flat()"	 "flatMap()"	 "fromEntries()"	 optional catch"	
ES2020	2020	??"	 "?."	 "BigInt"	 "allSettled"	 dynamic "import
ES2021	2021	Logical assignments, replaceAll"	 "Promise.any"	 numeric separators"		
ES2022	2022	Class fields, top-level await"	 "at()"	 "hasOwn"	 "cause	
ES2023	2023	findLast"	 hashbang support"			
ES2024	2024	Array.group"	 "Promise.withResolvers"	 "Object.groupBy		

Qwen3-Max-Preview
12:16
JavaScript has evolved significantly over the years, with new features added regularly through ECMAScript (ES) specifications. Below is a comprehensive overview of major JavaScript new features, grouped by ES version and including modern proposals.

🚀 ES6 / ES2015 — The Big One
This was a massive update that transformed JavaScript into a more powerful, modern language.

✅ Key Features:
let and const — Block-scoped variable declarations.
js

let x = 10;
const PI = 3.14;
Arrow Functions — Shorter syntax and lexical this.
js

const add = (a, b) => a + b;
Template Literals — String interpolation with backticks.
js
const name = "Alice";
console.log(`Hello, ${name}!`);
Destructuring Assignment
js

const [a, b] = [1, 2];
const { name, age } = person;
Default Parameters
js

function greet(name = "Guest") { ... }
Rest/Spread Operators
js

const arr = [...oldArr, newItem];
function sum(...args) { return args.reduce(...); }
Classes
js

class Person {
  constructor(name) { this.name = name; }
  greet() { console.log(`Hi, I'm ${this.name}`); }
}
Modules (import/export)
js

// math.js
export const PI = 3.14;

// main.js
import { PI } from './math.js';
Promises — Native async handling.
js


fetch(url).then(res => res.json()).catch(err => ...);
Map, Set, WeakMap, WeakSet
js


const map = new Map();
map.set('key', 'value');
Symbols — Unique identifiers.
js


const sym = Symbol('description');
Iterators & Generators
js


function* idGenerator() {
  let id = 1;
  while(true) yield id++;
}
🆕 ES2016 (ES7)
Small but useful additions.

Exponentiation Operator (**)
js


const result = 2 ** 3; // 8
Array.prototype.includes()
js


[1, 2, 3].includes(2); // true
🎯 ES2017 (ES8)
async/await — Cleaner async code.
js


async function fetchData() {
  const data = await fetch(url);
  return data.json();
}
Object.values(), Object.entries()
js


Object.values({a:1, b:2}); // [1, 2]
Object.entries({a:1, b:2}); // [['a',1], ['b',2]]
Trailing commas in function parameters
js


function foo(a, b,) { ... } // valid
String.prototype.padStart(), padEnd()
js


'5'.padStart(3, '0'); // '005'
Object.getOwnPropertyDescriptors()
🧩 ES2018 (ES9)
Rest/Spread for Objects
js


const obj = { ...oldObj, newProp: 1 };
const { x, ...rest } = obj;
Asynchronous Iteration (for-await-of)
js


for await (const chunk of readableStream) { ... }
Promise.prototype.finally()
js


promise.then(...).catch(...).finally(() => cleanup());
RegExp Improvements
s (dotAll) flag — . matches newlines.
Named capture groups — /(?<year>\d{4})/
Lookbehind assertions — /(?<=\$)\d+/
🔢 ES2019 (ES10)
Array.prototype.flat(), flatMap()
js


[1, [2, [3]]].flat(2); // [1, 2, 3]
Object.fromEntries()
js


Object.fromEntries([['a', 1], ['b', 2]]); // {a:1, b:2}
String.trimStart(), trimEnd()
js


'  hello  '.trimStart(); // 'hello  '
Optional catch binding
js


try { ... } catch { // no (err) needed if unused
  console.log('Error occurred');
}
Stable Array.sort()
🌈 ES2020 (ES11)
BigInt — Arbitrary precision integers.
js


const big = 9007199254740991n;
Nullish Coalescing Operator (??)
js


const name = input ?? 'Anonymous'; // only null/undefined
Optional Chaining (?.)
js


user?.profile?.name; // doesn't throw if user or profile is null/undefined
Promise.allSettled()
js


Promise.allSettled(promises); // waits for all to settle (fulfilled/rejected)
Dynamic import()
js


const module = await import('./module.js');
globalThis — Unified global object across environments.
js


globalThis.setTimeout(...); // works in browser, Node, etc.
import.meta — Metadata about current module.
📦 ES2021 (ES12)
Logical Assignment Operators
js


a ||= b;   // a || (a = b)
a &&= b;   // a && (a = b)
a ??= b;   // a ?? (a = b)
String.prototype.replaceAll()
js


'hello world'.replaceAll('l', 'x'); // 'hexxo worxd'
Promise.any()
js



Promise.any(promises); // resolves when any promise fulfills
WeakRefs & Finalizers — Advanced memory management (rarely used directly).
Numeric Separators
js


const billion = 1_000_000_000;
🧪 ES2022 (ES13)
Class Fields (Public and Private)
js

class Counter {
  count = 0;              // public field
  #secret = 'private';    // private field
  increment() { this.count++; }
}
Static Class Fields & Private Methods

js
class MyClass {
  static version = '1.0';
  #privateMethod() { ... }
}
Top-level await — In modules only.
js


const data = await fetch('/api/data').then(r => r.json());
Object.hasOwn() — Safer than hasOwnProperty
js


1
Object.hasOwn(obj, 'prop');
at() method for Arrays, Strings
js


arr.at(-1); // last element
str.at(-1); // last character
Error .cause
js


1
throw new Error('Failed', { cause: originalError });
🎉 ES2023 (ES14)
Array.findLast(), Array.findLastIndex()
js


1
[1, 2, 3, 4].findLast(x => x % 2 === 0); // 4
Hashbang Grammar Support — For executable scripts (Node.js).
js


1
2
#!/usr/bin/env node
console.log('Hello');
Symbol.asIterator → Symbol.iterator alias (minor)
🔮 ES2024 (ES15) — Released June 2024
✅ Approved Features:

Array.group() and Array.groupToMap()
js


const people = [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}];
const byAge = people.group(p => p.age); 
// { '25': [...], '30': [...] }
Promise.withResolvers()
js


const { promise, resolve, reject } = Promise.withResolvers();
// Useful for passing control outside Promise executor
Object.groupBy()
js


1
Object.groupBy(array, callback);
String.dedent (Stage 3 proposal, may be included) — For cleaning up indented template strings.
Set methods: intersection, difference, union, symmetricDifference — Stage 3, likely coming soon.
⏭️ Upcoming Proposals (Stage 3+)
These are likely to be included in future versions. 

Pipeline Operator (|>) — Functional-style chaining.
js


result = input |> fn1 |> fn2 |> fn3;
Records & Tuples — Immutable data structures (syntax: #{}, #[ ]).

Decorators — Already in Stage 3, expected in ES2025.
js


@logged
class MyClass { ... }
Array.fromAsync() — Create array from async iterable.
Iterator Helpers — Like .map(), .filter() for iterators.
