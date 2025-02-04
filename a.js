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
  9.Message Queue & Event Loop
  10.setTimeout,setInterval,requestAnimationFrame
  11.Javascript Engines
  12.Bitwise Oper, TypedArrays, Array Buffers
  & | ^XOR ~NOT << >>
  Int8Array UInt8Array,Float32Array:

  `;
var Helo = "50 Javascript Concepts";  /* 6. Variable Scop */
import { greeting } from './b.js'; /*8. Modlues and Namespaces */
var MyNameSpace = {
  variable: 42,
  func: function () {
    console.log("Func in MyNameSpace");
  }
};
(function () {
  console.log(Helo);
  /*8 Modul b */
  greeting();
  /*8 Namespace */
  MyNameSpace.func();
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
  })()
  /* 12. Array Buffer */
  const intArray = new Int8Array([10, 20, 30])
  console.log(intArray);
  const buffer = new ArrayBuffer(8);
  // create an 8-byte buffer
  const intArr_ = new Int32Array(buffer);
  // View the buffer as a 32-bit integer array
  console.log(intArr_);
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

    // Add an additional method to 'Dog'

    // Create an instance of 'Dog'
  })();
  /** 18. Object.create and Object.assign */
  (function () {
    // Object.create

    //Example of Object.create:

    //Object.assign

    //Example of Object.assign


  })();
  /** 19. map,reduce and filter */
  (function () {

  })();
  /** 20. Pure Functions,Side Effects,State Mutation,Event Propagation */
  (function () {

  })();
  /** 21. */
  (function () {

  })();
  /** 22.  */
  (function () {

  })();
  /** 23. */
  (function () {

  })();
  /** 24.  */
  (function () {

  })();
  /** 25.  */
  (function () {

  })();
  /** 26.  */
  (function () {

  })();
  /** 27.  */
  (function () {

  })();
  /** 28.  */
  (function () {

  })();
  /** 29.  */
  (function () {

  })();
  /** 30.  */
  (function () {

  })();
  /** 31.  */
  (function () {

  })();
  /** 32.  */
  (function () {

  })();
  /** 33.  */
  (function () {

  })();
  /** 34.  */
  (function () {

  })();
  /** 35.  */
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