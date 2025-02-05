'use strict'

var content = `
  1.Call Stack LIFO
  2.Primitive Types
  3.Value Types and Ref Types(Literal Obj,Array,Func,UD Obj)
  4.Implicit,Explicit,Nominal,Struct,and Duck Typing
  5.== vs === vs typeof()
  6.Func Scope, Block, Lexical
  7.Expression vs Statement
  8.IIFE Modlues and Namespaces
  `;
var Helo = "50 Javascript Concepts";  /* 6. Variable Scop */
import { greeting } from './module_a.js'; /*8. Modlues and Namespaces */
(function () {
  /** 6.Scope */
  (function () {
    console.log(Helo);
  })();
  /* 8.Module */
  (function () {
    /*** module_a*/
    greeting();
    /*** Namespace */
    var MyNameSpace = {
      variable: 42,
      func: function () {
        console.log("Func in MyNameSpace");
      }
    };
    MyNameSpace.func();
  })();
  /* 9.Messge Queue & Event Loop */
  (function () {
    setTimeout(function () { console.log("aysnc task completed.") }, 1000);
  })();
  /**10.setTimeout,setInterval,requestAnimationFrame */
  (function () {
    setTimeout(function () {
      console.log('Step after 1000 ms')
    }, 1000);
    let counter = 0;
    let interval = setInterval(function () {
      console.log("Counter:", counter);
      counter++;
      if (counter > 5) {
        clearInterval(interval);
      }
    }, 1000);
  })();
  /* 12. Array Buffer */
  (function () {
    /// Bitwise Oper, TypedArrays, Array Buffers
    /// & | ^XOR ~NOT << >>
    /// Int8Array UInt8Array,Float32Array:
    const intArray = new Int8Array([10, 20, 30])
    console.log(intArray);
    const buffer = new ArrayBuffer(8);
    // create an 8-byte buffer
    const intArr_ = new Int32Array(buffer);
    // View the buffer as a 32-bit integer array
    console.log(intArr_);
  })();
  /*13. Dom 
  const heading=document.querySelector('h1')
  heading.textContent='50 Javascript Concepts';
  */
  /*14. Factories and Classess */
  (function () {
    function createPerson(name, age) {
      return {
        name: name,
        age: age,
        greet: function () {
          console.log(`Helo,I'm ${this.name} and I'm ${this.age} years old.`)
        }
      }
    }
    const person1 = createPerson('Jane', 25);
    person1.greet();

    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      greet() {
        console.log(`Hello,I'm ${this.age} and I'm ${this.name}`)
      }
    }
    const person2 = new Person('Jane', 25);
    person2.greet();
  })();
  /**15 this call apply and bind */
  (function () {
    function greet(name) {
      console.log(`Helo,${name}! I'm ${this.name}`)
    }
    const person = { name: 'John' };
    greet.call(person, 'Maria')
    greet.apply(person, ['Maria'])
    const greetPerson = greet.bind(person)
    greetPerson('Maria')
  })();
  /**16 new,Constructor,instanceof,and Instances */
  (function () {
    /**new */
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    const person1 = new Person("John", 30);
    /**Constructor */
    /**Instanceof */
    console.log(person1 instanceof Person);
    const person2 = new Person('Maria', 25);
  })();
  /**17. Prototypal Inheritance & Prototype Chain */
  (function () {
    /**Example of Prototypal Inheritance & Prototype Chain */
    // Define an 'Animal' constructor
    function Animal(name) {
      this.name = name;
    }
    //Add a 'greet' method to the prototype of 'Animal'
    Animal.prototype.greet = function () {
      console.log(`Helo,I'm a ${this.name}`);
    };
    // Define a 'Dog' constructor that inferites from 'Animal'
    function Dog(name, breed) {
      Animal.call(this, name);//Call the 'Animal' constructor
      this.breed = breed;
    }
    // Establish prototype inheritance
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;
    // Add an additional method to 'Dog'
    Dog.prototype.bark = function () {
      console.log('Woof Woof');
    }
    // Create an instance of 'Dog'
    const myDog = new Dog("Max", "Labrador");
    myDog.greet();
    myDog.bark();
  })();
  /** 18. Object.create and Object.assign */
  (function () {
    // Object.create
    // const newObj=Object.create(prototype);
    //Example of Object.create:
    const animal = {
      sound: 'Make a sound',
      makeSound: function () {
        console.log(this.sound);
      }
    }
    const dog = Object.create(animal);
    dog.sound = 'Woof woof';
    dog.makeSound();

    //Object.assign for combining or cloning objects.
    // Object.assign(targetObject,sourceObj1,sourceObj2,...);
    // Example of Object.assign:
    const target = {};
    const source1 = { name: "Jonh", age: 30 };
    const source2 = { city: "New York" };
    Object.assign(target, source1, source2);
    console.log(target);

    //In summary:
    // Object.create：
    // Object.assign:

  })();
  /** 19. map,reduce and filter */
  (function () {
    const numbers = [1, 2, 3];
    /*** map */
    const doubles = numbers.map(n => n * 2);
    console.log(doubles, numbers); //[2,4,6]
    /*** filter */
    const evens = numbers.filter(n => n % 2 === 0);
    console.log(evens, numbers); //[2]
    /*** reduce */
    const sum = numbers.reduce((accumulater, n) => accumulater + n, 0);
    console.log(sum, numbers); //6    
  })();
  /** 20. Pure Functions,Side Effects,State Mutation,Event Propagation */
  (function () {
  })();
  /** 21. Closures*/
  (function () {
    function counter() {
      let count = 0;
      function increment() {
        count++;
        console.log(count);
      }
      return increment;
    }
    const counter1 = counter();
    counter1();
    counter1();
  })();
  /** 22.  High Order Functions*/
  (function () {
    /*** Functions as Arguments*/
    function performOperation(opr, a, b) {
      return opr(a, b);
    }
    function add(x, y) {
      return x + y;
    }
    function subtract(x, y) {
      return x - y;
    }
    const resultAddition = performOperation(add, 5, 3);
    const resultSubtraction = performOperation(subtract, 5, 3);
    console.log(resultAddition, resultSubtraction);
    /*** Functions as Results*/
    function multiplier(factor) {
      return function (number) {
        return number * factor;
      };
    }
    const double = multiplier(2);
    const triple = multiplier(3);
    console.log(double(5), triple(4));
    /*** Mapping*/

    /*** Filtering*/

    /*** Reducing*/

  })();
  /** 23. Recursion*/
  (function () {
    function factorial(n) {
      if (n === 0 || n === 1) {
        return 1;
      } else {
        return n * factorial(n - 1);
      }
    }
    console.log('5!', factorial(5))
  })();
  /** 24.  Collections & Generators*/
  (function () {
    /*** Collection */
    /*** Array */
    const numbers = [1, 2, 3, 4];
    const fruits = ["apple", "orange", "banana"];
    /*** Object */
    const person = { name: "John", age: 30 };
    /*** Maps */
    const map = new Map();
    map.set('name', 'Mary');
    map.set('age', 25);
    /*** Sets */
    const set = new Set();
    set.add('red');
    set.add('green');
    set.add('red');// Not added,as 'red' is already in the set
    /*** Generators */
    function* counter() {
      let num = 0;
      while (true) {
        yield num++;
      }
    }
    const generator = counter();
    console.log(generator.next().value);
    console.log(generator.next().value);
  })();
  /** 25. Promises */
  (function () {
    const promise = new Promise((resolve, reject) => {
      return resolve(1); //return reject(-1);
    });
    promise.then(value => {

    }).catch(error => {

    })
    /*** Chaining Promises 
     * doSomethingAsync()
     * .then(res1=>doAnother(res1))
     * .then(res2=>doMore(res2))
     * .then(finalres=>console.log(finalres))
     * .catch(error=>console.log(error))
    */
    /*** Handling Multiple Promises 
     * const promise1=fetchData1();
     * const promise2=fetchData2();
     * Promise.all([promise1,promise2])
     * .then(results=>{
     *    const res1=results[0]；
     *    const res2=results[1]；
     * }).catch(error=>console.log(error))
    */
  })();
  /** 26.  aysnc/await */
  (function () {
    /***Async function */
    async function fetchData(){

    }
    fetchData()
    .then()
    .catch();
    /***Error Handling */
    
    /***Chaining Promises with aysnc /await */

  })();
  /** 27.  Data Structures */
  (function () {

  })();
  /** 28.  Costly Operations & Big 0 Notation*/
  (function () {

  })();
  /** 29.  Algorithms*/
  (function () {

  })();
  /** 30. Inheritance,Polymorphism,and Code Reusability */
  (function () {

  })();
  /** 31.  Design Patterns*/
  (function () {

  })();
  /** 32.  Partial Application,Currying,Composition, and Pipe*/
  (function () {

  })();
  /** 33. Clean Code */
  (function () {

  })();
  /** 34.  Error Handling*/
  (function () {

  })();
  /** 35. ES6 Modules */
  (function () {

  })();
  /** 36.  */
  (function () {

  })();
  /** 37.  */
  (function () {

  })();
  /** 38.  */
  (function () {

  })();
  /** 39.  */
  (function () {

  })();
  /** 40.  */
  (function () {

  })();
  /** 41.  */
  (function () {

  })();
  /** 42.  */
  (function () {

  })();
  /** 43.  */
  (function () {

  })();
  /** 44.  */
  (function () {

  })();
  /** 45.  */
  (function () {

  })();
  /** 46.  */
  (function () {

  })();
  /** 47.  */
  (function () {

  })();
  /** 48.  */
  (function () {

  })();
  /** 49.  */
  (function () {

  })();
  /** 50.  */
  (function () {

  })();


})();