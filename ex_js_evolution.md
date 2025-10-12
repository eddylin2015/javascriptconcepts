# JavaScript 演化
## JavaScript 2009年的核心更新是ECMAScript 5（ES5） 的正式发布，重要里程碑：
 
- 严格模式（Strict Mode）： "use strict"; 

- 数组方法增强：新增多个遍历和操作数组的方法，覆盖常见场景：

 *  forEach() ：遍历数组并执行回调，替代传统 for 循环；
 *  map() ：对数组元素执行映射操作，返回新数组；
 *  filter() ：筛选满足条件的元素，返回新数组；
 *  reduce() / reduceRight() ：累加数组元素，实现求和、分组等复杂逻辑；
 *  some() / every() ：判断数组是否存在/全部满足条件的元素，返回布尔值；
 *  indexOf() / lastIndexOf() ：查找元素在数组中的索引，支持从末尾反向查找。

- 对象操作优化：

 *  Object.keys() ：返回对象所有可枚举属性的键名数组；
 *  Object.defineProperty() ：精细化定义对象属性（如设置是否可写、可枚举、可配置）
 *  Object.getPrototypeOf() / Object.setPrototypeOf() ：安全访问和修改对象原型；
 *  Object.create() ：基于指定原型创建新对象，简化原型继承。

- JSON原生支持：新增全局 JSON 对象，提供 JSON.parse() 和 JSON.stringify() 
- 函数绑定方法： Function.prototype.bind() ：创建一个新函数，将原函数的 this 绑定到指定对象，同时预设部分参数，解决异步场景中 this 指向丢失问题。
- 日期方法补充： Date.now() ：直接返回当前时间的时间戳（毫秒数），替代 new Date().getTime()
 
## JavaScript 2014（ES2014）是JavaScript语言规范的过渡版本：
 
- Array.prototype.values()：返回一个新的数组迭代器对象，用于遍历数组的元素值。可配合 for...of 循环使用，例如

```js
const arr = [1, 2, 3]; 
for(const val of arr.values()) 
{ console.log(val); } 
``` 
依次输出 1 、 2 、 3 。

- Array.prototype.entries()：返回一个新的数组迭代器对象，包含数组中每个元素的索引和值组成的数组（即 [index, value] ）。例如 
```js
const arr = ['a', 'b']; 
for(const [idx, val] of arr.entries()) 
{ console.log(idx, val); } 
```
依次输出 0 "a" 、 1 "b" 。
 
- Array.prototype.keys()：返回一个新的数组迭代器对象，用于遍历数组的索引。例如 
```js
const arr = [5, 6, 7]; 
for (const idx of arr.keys()) 
{ console.log(idx); }
```
依次输出 0 、 1 、 2 。

- Object.prototype.__proto__属性标准化：

正式将 __proto__ 属性纳入规范（此前是浏览器非标准实现），用于访问或修改对象的原型，但规范同时建议优先使用 Object.getPrototypeOf() 和 Object.setPrototypeOf() 进行原型操作，以避免直接修改 __proto__ 可能带来的性能和兼容性问题。

## JavaScript 2015（ES2015）是JavaScript语言的一个重要版本：
 
块级作用域变量声明： let 用于声明块级作用域的变量。 const 用于声明块级作用域的常量。
 
箭头函数：语法简洁，省略了 function 关键字，用 => 连接参数和函数体。箭头函数没有自己的 this ， this 继承自外层作用域，且不具备 arguments 对象，也不能作为构造函数使用。
 
模板字符串：使用反引号（ `）包裹， 
```js
const name = 'Alice';
const age = 25;
`My name is ${name},
and I am ${age} years old. ;`
``` 
解构赋值：可从数组或对象中提取值并赋值给变量。如 
```js
//数组解构
const arr = [10, 20, 30]; 
const [x, y, z] = arr; 
//对象解构如 
const obj = {name: 'Tom', age: 18}; 
const {name, age} = obj; 。
``` 
类（Classes）：引入了基于类的面向对象编程语法，是原型继承的语法糖。
包含 constructor 构造函数，
通过 extends 关键字实现继承，
用 super 调用父类方法，
还支持getter/setter和静态方法。
 
模块化：提供了标准化的模块系统，通过 export 导出模块功能，import 导入模块，

```js
// math.js 
export function sum(a, b) { return a + b; } 
// main.js 
import {sum} from './math.js'; 。
```

Promise：用于处理异步操作，解决了回调地狱问题。pending 、 fulfilled 和 rejected 三种状态，可通过 then 方法处理成功结果， catch 方法处理错误。
 
迭代器和生成器：迭代器是一种具有 next() 和 Symbol.iterator 方法的对象，可用于遍历数据结构。生成器函数通过 function* 声明，使用 yield 关键字返回值，可暂停和恢复执行。
 
增强的对象字面量：允许在对象字面量中直接使用变量和表达式，支持属性简写、方法简写、计算属性名等，如 
```js
const name = 'Alice'; 
const age = 25; 
const person = {
    name, 
    age, 
    sayHi() 
    { 
        console.log( `Hi, I'm ${this.name}` ); 
    }
};
```
 
默认参数、剩余参数和扩展运算符：函数参数可设置默认值，如 


```js
function createUser(name = 'Guest', isAdmin = false) 
{
    //...
}
```
 。剩余参数用 ... 表示，可将多个参数收集为数组，如 
```js
function sum(...numbers) 
{
    //...   
}
```
 。扩展运算符也用 ... 表示，可将数组展开，如 

```js
const nums1 = [1, 2, 3]; 
const nums2 = [4, 5, 6]; 
const combined = [...nums1, ...nums2];
```

## JavaScript 2016（ES2016）引入了以下两个新特性：
 
- Array.prototype.includes()：用于判断数组是否包含指定元素，返回布尔值。语法为 arr.includes(searchElement, fromIndex) ，其中 searchElement 是待查找元素， fromIndex 为可选的起始索引，负数表示从末尾倒数。与 indexOf() 方法相比， includes() 可以检测 NaN 值，例如 
```js
[1, NaN, 3].includes(NaN) //返回 true ，
[1, NaN, 3].indexOf(NaN) //返回 -1 。
```

- 指数运算符（）**：提供了更简洁的幂运算方式，语法为 base ** exponent ，等价于 Math.pow(base, exponent) ，且支持链式运算和与赋值运算符组合使用，如 
```js
x **= y //等价于 x = x ** y 。例如 
2 ** 3 //结果为 8 ， 
2 ** 3 ** 2 //等价于 2 ** (3 ** 2) ，结果为 512 。
```

## JavaScript 2017（ES2017）为开发者带来了一系列实用的新特性，具体如下：
 
- 字符串填充方法：新增 padStart() 和 padEnd() 方法。可以在字符串的开头或结尾填充指定字符，以达到固定长度，如 

```js
'es8'.padStart(5, '0'); //结果为 '00es8' 。
```
- 对象值遍历与属性描述符获取： 
 * Object.values() 返回对象可枚举属性值的数组， 
 * Object.entries() 返回键值对组成的二维数组。
 * Object.getOwnPropertyDescriptors() 可获取对象自有属性的描述符，如 
```js
Object.getOwnPropertyDescriptors({a: 1}) 
```
会返回包含 configurable 、 enumerable 等属性的对象。

- 函数参数尾部逗号：允许在定义函数参数列表或调用函数时使用尾部逗号，如 
```js
function fn(a, b,){} 
//和 
fn(1, 2,) 
//都是合法的。
```
 
- 异步函数：引入 async 和 await ， async 用于声明异步函数，函数内部可使用 await 等待 Promise resolve，使异步代码更像同步代码，提高了可读性，如 
```js
async function getData(){ 
    const res = await fetch('url'); 
    return res.json();
} 
```
- 共享内存与原子操作： SharedArrayBuffer 和 Atomics 用于多线程并发编程，通常在 Web Workers 中使用，可实现共享内存和原子操作，为处理高并发场景提供了支持。

## JavaScript 2018（ES2018）增强了语言功能和易用性：
 
- 异步函数（Async/Await）：让异步编程更直观易读，解决了传统Promise链式调用可读性差、调试难的问题。 async 用于声明异步函数， await 只能在异步函数内使用，用于等待Promise完成。如 
```js
async function getData() { 
    let res = await fetch('url'); 
    return res.json(); 
} 
```
 
- 共享内存与原子操作（Atomics）：为多线程编程提供支持。共享内存允许不同线程直接访问同一块内存区域，实现高效数据共享和通信。原子操作 Atomics 提供了一组原子方法，用于在共享内存上进行安全的并发操作，避免数据竞争等问题。
 
- 扩展的正则表达式：支持Unicode属性转义，如 
```js
/\p{Script=Greek}/u 
```
可匹配希腊字母。


还引入了命名捕获组，如 
```js
const regex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/; 
const match = regex.exec('2020-01-01'); 
console.log(match.groups.year); //可更方便地获取匹配结果。
```
 
- Rest/Spread属性：扩展了ES2015中数组的 spread 操作符，使其可用于对象。如 
```js
const obj1 = {a: 1, b: 2}; 
const obj2 = {...obj1, c: 3}; 
```
，可将 obj1 的属性拷贝到 obj2 。同时，对象析构也支持 rest 属性，如 
```js
const {a, ...rest} = {a: 1, b: 2, c: 3};
```
 ，可将剩余属性赋值给 rest 变量。
 
- Promise.prototype.finally()：可在Promise链的最后添加一个最终回调，无论Promise是成功还是失败都会执行，用于执行清理操作等，如 
```js
fetch('url')
.then(response => response.json())
.catch(error => console.error(error))
.finally(() => console.log('Request completed'));
``` 
- 异步迭代器：支持使用 for - await...of 循环来遍历异步可迭代对象，方便处理异步生成的数据序列，如 
```js
async function* asyncGenerator() 
{ 
    yield 1; 
    await new Promise(
        resolve => setTimeout(resolve, 1000)
        ); 
    yield 2; 
} 
async function main() { 
    for await (const value of asyncGenerator()) 
    { 
        console.log(value); 
    } 
}
```
 。
 
- 取消标记模板转义序列的语法限制：在ES2018之前，标记模板字面量中的转义序列有严格语法限制，ES2018取消了部分限制，使标记模板的使用更灵活。

## JavaScript 2019（ES2019）实用的新特性：
 
- 字符串方法增强：新增 trimStart() 和 trimEnd() 方法，分别用于去除字符串开头和结尾的空白字符。例如 
```js
let str = "  hello  "; 
str.trimStart();  //"hello  "
```


- 对象创建方法： Object.fromEntries() 方法允许从可迭代的键值对创建对象。如 
```js
const entries = [
    ["name", "Bob"], 
    ["age", 25]
    ]; 
const obj = Object.fromEntries(entries); 
//obj 为 {name: "Bob", age: 25}
```

- 可选的catch绑定：在 try...catch 语句中，若不需要使用捕获的错误对象，可省略 catch 的参数，即 
```js
try { 
    // 代码 
} catch { 
    // 处理代码 
} 
```
- 数组方法扩展： flat() 方法用于展平嵌套数组，创建新数组。如 
```js
const arr = [[1, 2], [3, 4]]; 
const newArr = arr.flat();
// [1, 2, 3, 4] 
```
flatMap() 方法先对数组元素进行映射，再展平结果，如 
```js
const nums = [1, 2, 3]; 
const result = nums.flatMap(x => [x, x * 2]); 
``` 
result 为 [1, 2, 2, 4, 3, 6] 。

- 数组排序修订： Array.sort() 方法被修订，要求浏览器必须使用稳定的排序算法，即排序时相同值元素的相对位置保持不变。
 
- JSON.stringify修订： JSON.stringify() 方法支持对带有循环引用的对象进行处理，会抛出 TypeError ，而不是之前的无限循环或未定义行为，增强了数据序列化的可靠性。
 
- Function.toString修订： Function.toString() 方法返回的字符串结果更规范，包含函数的参数列表和函数体等完整信息，且不同环境下结果更一致。
 
- Symbol描述属性： Symbol.prototype 新增 description 属性，可用于访问 Symbol 创建时的描述字符串，如
```js
const sym = Symbol('test'); 
console.log(sym.description); //会输出 test 。
```
## JavaScript 2020（ES2020）引入了多个重要特性，提升了代码的编写效率和可读性，具体如下：
 
BigInt：允许开发者使用更大的整数表示形式进行数据处理，可突破之前JavaScript中整数存储上限（2^53 - 1）的限制，通过在数字末尾附加 n 来表示，如 
```js
100n 
```
。
 
动态import：支持按需请求代码（代码拆分），可在 if-else 等条件块中根据条件加载模块，且不会污染全局命名空间，如 

```js
if (condition) 
  await import('./module.js');
``` 
空值合并运算符（??）：用于检查变量是否为 null 或 undefined ，若左侧操作数为 null 或 undefined ，则返回右侧操作数，否则返回左侧操作数，如 
```js
const value = null?? 'default'; 
```
， value 结果为 'default' 。

可选链操作符（?.）：可访问深度嵌套的对象属性、调用对象方法或访问数组元素，而不必担心属性或对象是否存在，若不存在则返回 undefined ，如 
```js
const nestedProp = obj?.nested?.prop; 。
``` 
Promise.allSettled：接受一个Promise数组，仅在所有Promise都已结算（无论成功或失败）时才会resolved或rejected，返回包含每个Promise结果（成功或失败原因）的数组。
 
String.prototype.matchAll：是与正则表达式相关的新方法，返回一个迭代器，可逐个返回所有匹配的组，方便处理字符串中多个匹配项的场景。
 
globalThis：为跨平台JavaScript代码提供了统一的全局对象引用，在浏览器中是 window ，在Node.js中是 global ，在web - workers中是 self ，通过 globalThis 可统一获取全局对象。
 
模块命名空间导出：新增
```js
export * as utils from './utils.mjs' 
```
这样的语法，等效于 
```js
import * as utils from './utils.mjs'; 
export { utils }; 
```
，方便模块导出。
 
定义明确for - in的顺序：ECMA规范对 for - in 的遍历顺序进行了标准化，使不同环境下该循环遍历对象属性的顺序一致。
 
import.meta：可用于访问有关模块的元信息，返回一个带有 url 属性的对象，指示模块的基本URL。

## JavaScript 2021（ES2021）引入了多个新特性，提升了代码可读性与开发效率，具体如下：
 
- 逻辑赋值运算符：包括 ||= 、 &&= 和 ??= 。 ||= 在左侧值为假值时执行赋值， &&= 在左侧值为真值时执行赋值， ??= 仅当左侧值为 null 或 undefined 时执行赋值。例如 
```js
let count = null; 
count ??= 10; 
``` 
，此时 count 的值为 10 。

- 数字分隔符：可使用下划线 _ 作为数字分隔符，提高大数字的可读性，如 const billion = 1_000_000_000; ，小数部分也可使用，如 
```js
const pi = 3.141_592_653_589; 。
```
 
- Promise.any和AggregateError： Promise.any 接收一个 Promise 数组，只要其中一个 Promise 成功，就返回该成功 Promise 的值。若所有 Promise 都拒绝，则抛出包含所有错误的 AggregateError 。
 
- String.prototype.replaceAll：用于替换字符串中所有匹配的子字符串，解决了此前 replace 方法若不使用全局正则表达式，只能替换第一次匹配项的问题。如 
```js
const text = "苹果,苹果,香蕉"; 
console.log(text.replaceAll("苹果", "橙子")); 
//，输出为 橙子,橙子,香蕉 。
```
 
- 国际化增强：新增 Intl.ListFormat API，提供语言敏感的列表格式化功能，如 
```js
const list = ['苹果', '香蕉', '橙子']; 
const formatter = new Intl.ListFormat('zh', { style: 'long', type: 'conjunction' }); 
console.log(formatter.format(list));
```
 ，输出为 苹果、香蕉和橙子 。
同时 DateTimeFormat 的 dateStyle 和 timeStyle 简化了日期时间的格式化。
 
- WeakRef和FinalizationRegistry： WeakRef 允许创建对对象的弱引用，不会阻止垃圾回收。 FinalizationRegistry 可在垃圾回收器回收对象时执行回调函数，用于更精细的内存管理。

## JavaScript 2022（ES2022）为开发者带来了诸多新特性，提升了开发体验与代码质量。具体如下：
 
- 顶级await：传统上 await 需在 async 函数内使用，ES2022允许在模块顶层直接使用 await 。例如在获取服务器数据初始化应用状态时，可直接写 
```js
const response = await fetch('https://api.example.com/data'); 
```
，简化了代码结构，提高了模块依赖管理效率。
 
- 类静态初始化块：为类的静态属性初始化提供独立代码块，使静态属性复杂初始化逻辑可与类定义分离。如 
```js
class MyClass {
    static config; 
    static {
        try {
            config = loadConfig();
            } 
        catch (error) {config = defaultConfig;}
        }
} 
```
，增强了类定义的可读性与可维护性。

- Array.prototype.at：允许通过传入正数或负数索引，便捷地获取数组中相应位置的元素。如 
```js
const numbers = [10, 20, 30, 40, 50]; 
const lastNumber = numbers.at(-1); 
```
，可快速定位数组末尾元素等，提升代码可读性。 

- 错误原因（Error Cause）：错误对象新增 cause 属性，允许在创建错误对象时传递描述错误根源的参数。如 

```js
try {
    await fetch('https://api.example.com/data');
} catch (error) {
    throw new Error('请求失败', {cause: error});
}
```
 ，方便在复杂业务中追踪错误根源。

- 正则表达式匹配索引（RegExp Match Indices）：借助 RegExp 的 d 标记，正则表达式匹配时可获取匹配结果在原始字符串中的起止位置。如 
```js
const pattern = /test/d; 
const result = pattern.exec('sample text'); 
```
，可通过 result.indices(0)[0] 和 result.indices(0)[1] 获取匹配起止位置，利于文本处理等场景。

- Object.hasOwn：用于简化对象属性检测逻辑，可替代 Object.prototype.hasOwnProperty.call(object, key) 。如 
```js
const person = {name: 'Alice'}; 
if (Object.hasOwn(person, 'name')) { 
    //，使代码更简洁易读。
}
```
 
此外，ES2022还支持类字段声明、私有方法和字段、静态类字段和静态私有方法等特性，让类的定义和使用更加灵活和安全。


## JavaScript 2023（ES2023）引入了一些新特性，旨在提升开发效率和代码可读性。具体如下：
 
- 数组方法增强：新增 findLast 和 findLastIndex 方法，可从数组末尾开始查找满足条件的元素及其索引。同时还添加了 toReversed 、 toSorted 、 toSpliced 和 with 四个方法，分别用于返回反转、排序、拼接后的数组副本，以及指定索引处元素被替换后的副本，有助于函数式编程，避免副作用。
 
- Hashbang语法标准化：Hashbang注释（以 #!/ 开头）在ES2023中正式标准化，在Node.js等环境中，允许脚本直接执行而无需通过 node 命令调用，确保了跨环境的一致性。
 
- WeakMap支持Symbol作为键：此前WeakMap只允许对象作为键，ES2023扩展了其功能，允许使用符号（Symbol）作为键，提供了更大的灵活性，且有助于内存管理。

## JavaScript随着ECMAScript 2024（ES15）标准的确定，迎来了诸多新特性，同时相关生态系统也有进一步发展。具体如下：
 
语言特性方面
 
- 数组原生的group - by方法：Object新增了groupBy方法，可对对象键进行分组，不再完全依赖Lodash等库。Map也增加了静态方法Map.groupBy，方便对数据进行分组操作。
 
- Promise.withResolvers：使得创建Promise更简单，可在Promise外部控制加载过程，实现更有效的延迟加载策略，优化页面加载时间和性能。
 
- Buffer性能升级：ES2024引入可调整的数组缓冲区，解决了之前当流水线上的数据超过缓冲区容量时，需将当前数据缓冲区全部复制到更大缓冲区而导致性能下降的问题，尤其适用于处理大量数据的场景。
 
- 异步升级：Atomics对象新增waitAsync方法，允许开发者在异步环境中等待某个条件变量达到特定值，在多线程环境中，如Web Workers场景下，可避免阻塞主线程，同时等待某个事件的发生。
 
- 正则升级：为了更好地匹配Unicode字符集，正则表达式引入v标志，还增加了新的集合操作符，增强了正则表达式处理字符集的能力。
 
生态系统方面
 
- V8引擎优化：作为Chrome浏览器和Node.js的核心JavaScript引擎，2024年改进了垃圾回收机制，减少了内存泄漏和性能抖动，同时优化了即时编译器（JIT），提高了代码执行效率。
 
- 框架更新：React 19发布，引入新的并发渲染机制，优化了组件渲染性能。Vue 4.0发布，支持新的Composition API，优化了虚拟DOM性能。Angular 17发布，引入Ivy编译器优化，减少了应用打包体积和加载时间。
 
- 工具升级：代码格式化工具如Prettier 3.0和ESLint 9.0发布，Prettier增加了更多格式化选项，ESLint优化了规则配置和错误检查机制，有助于提高代码质量和维护性。

## 2025年，JavaScript随着ECMAScript 2025标准的批准迎来了多项重要更新。以下是一些主要特性：
 
导入属性与JSON模块：原生支持JSON模块导入，可通过 with {type: 'json'} 声明模块类型。如 

```js
import config from './config.json' with { type: 'json' }; 
``` 
，无需第三方工具，导入的JSON会自动解析为JavaScript对象，浏览器与Node.js统一支持。

迭代器辅助方法：引入 filter,map,drop,take 等迭代器辅助方法，通过惰性执行实现流式处理。如
```js
 const result = arr.values()
    .filter(x => x.length > 0)
    .drop(1).take(3)
    .map(x =>  =${x}= )
    .toArray();              
```
，可有效减少大数据处理时的内存占用。

Set集合方法扩展：新增7个集合方法，支持数学集合运算。如 union(other) 用于求并集， 
```js
{1,2}.union({2,3}) //结果为 {1,2,3} 。
``` 
顶级await：JavaScript模块中支持顶级await，可直接在模块顶层使用 await ，简化异步初始化逻辑，无需将代码包裹在异步函数中，如 

```js
const data = await fetch('url').then(res => res.json());
```

Temporal API：为处理日期和时间提供了现代、全面且可靠的替代方案，可精确处理时区、持续时间和日历系统，如 

```js
//nodejs no implemented.
const now = temporal.now.plainDateTimeIso(); 
```
 
Records和Tuples（第3阶段提案）：引入Records和Tuples，分别为不可变对象和不可变数组，有助于强制实现不可变性和值相等性，如 
```js
const record = #{name: "alice", age: 30};   
const tuple = #(1, 2, 3); 。
```
 
Do表达式（第3阶段提案）：允许将语句用作表达式，可在表达式中编写复杂逻辑，使条件逻辑更简洁易读，如 
```js
const result = do { if (condition) { 'yes'; } else { 'no'; } };
```
 
findLast和findLastIndex：数组新增 findLast 和 findLastIndex 方法，用于查找匹配条件的最后一个元素及其索引，如 

```js
const numbers = [1, 3, 7, 9, 7]; 
numbers.findLast(n => n < 8) //结果为 7 。
```

