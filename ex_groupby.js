""

'use strict'
const Helo = "50 Javascript Concepts";  /* 6. Variable Scop */
const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 9 },
    { name: "bananas", type: "fruit", quantity: 5 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 12 },
    { name: "fish", type: "meat", quantity: 22 },
];
const people = [
    { name: "Alice", age: 28 },
    { name: "Bob", age: 30 },
    { name: "Eve", age: 28 }
];
(function () {
    /** 1.Object.groupBy() */
    (function () {
        const result_1 = Object.groupBy(inventory, ({ quantity }) =>
            quantity < 6 ? "restock" : "sufficient",
        );
        console.log(result_1.restock);
        const result_2 = Object.groupBy(inventory, ({ type }) => type);
        /* Result is:
        {
          vegetables: [
            { name: 'asparagus', type: 'vegetables', quantity: 5 },
          ],
          fruit: [
            { name: "bananas", type: "fruit", quantity: 0 },
            { name: "cherries", type: "fruit", quantity: 5 }
          ],
          meat: [
            { name: "goat", type: "meat", quantity: 23 },
            { name: "fish", type: "meat", quantity: 22 }
          ]
        }
        */
        // [{ name: "bananas", type: "fruit", quantity: 5 }]
        function myCallback({ quantity }) {
            return quantity > 5 ? "ok" : "restock";
        }
        const result3 = Object.groupBy(inventory, myCallback);

        /* Result is:
        {
          restock: [
            { name: "asparagus", type: "vegetables", quantity: 5 },
            { name: "bananas", type: "fruit", quantity: 0 },
            { name: "cherries", type: "fruit", quantity: 5 }
          ],
          ok: [
            { name: "goat", type: "meat", quantity: 23 },
            { name: "fish", type: "meat", quantity: 22 }
          ]
        }
        */
    })();
    /** 2.Map.groupBy()*/
    (function () {
        const restock = { restock: true };
        const sufficient = { restock: false };
        const result = Map.groupBy(inventory, ({ quantity }) =>
            quantity < 6 ? restock : sufficient,
        );
        console.log(result.get(restock));
        // [{ name: "bananas", type: "fruit", quantity: 5 }]
        // The key can be modified and still used
        restock["fast"] = true;
        console.log(result.get(restock));
        // [{ name: "bananas", type: "fruit", quantity: 5 }]
        // A new key can't be used, even if it has the same structure!
        const restock2 = { restock: true };
        console.log(result.get(restock2)); // undefined        
    })();
    /** 3.JavaScript Grouping Methods: Object.groupBy and Map.groupBy*/
    /** 3.1.Traditional approach using forEach*/
    (function () {
        const peopleByAge = {};
        people.forEach((person) => {
            const age = person.age;
            // We must check if the key exists and create it if not
            if (!peopleByAge[age]) peopleByAge[age] = [];
            // Then we can push the item
            peopleByAge[age].push(person);
        });
        console.log(peopleByAge);
        // Output:
        // {
        //   "28": [{"name":"Alice","age":28}, {"name":"Eve","age":28}],
        //   "30": [{"name":"Bob","age":30}]
        // }
    })();
    /** 3.2.Using reduce for grouping*/
    (function () {
        // Using reduce for grouping
        const peopleByAgeReduce = people.reduce((acc, person) => {
            const age = person.age;
            // Still need to check if the key exists
            if (!acc[age]) acc[age] = [];
            acc[age].push(person);
            return acc;
        }, {});
        // The result is the same as the forEach approach
        console.log(peopleByAgeReduce);
    })();
    /** 3.3.Introducing Object.groupBy*/
    (function () {
        // Using the new Object.groupBy method
        const peopleByAge = Object.groupBy(people, (person) => person.age);
        console.log(peopleByAge);
        // Output:
        // {
        //   "28": [{"name":"Alice","age":28}, {"name":"Eve","age":28}],
        //   "30": [{"name":"Bob","age":30}]
    })();
    /**3.4.Null Prototype Objects*/
    (function () {
        const peopleByAge = Object.groupBy(people, (person) => person.age);
        // This will throw an error
        console.log(peopleByAge.hasOwnProperty("28"));
        // TypeError: peopleByAge.hasOwnProperty is not a function
        // Instead, use Object methods directly
        console.log(Object.hasOwn(peopleByAge, "28")); // true
    })();
    /** _.Key Coercion
     * Object.keys(), Object.values(), or Object.hasOwn() 
    */
    (function () {
        const peopleByAge = Object.groupBy(people, (person) => person.age);
        // Both ways of accessing work because 28 is coerced to "28"
        console.log(peopleByAge[28]);  // Works
        console.log(peopleByAge["28"]); // Works
        // Using different data types as keys
        const dataPoints = [10, 20, 30, 40, 50];
        const groupedByRange = Object.groupBy(dataPoints, (num) => {
            return num < 30 ? "low" : "high";
        });
        console.log(groupedByRange);
        // Output: { "low": [10, 20], "high": [30, 40, 50] }
    })();
    /** _.Exploring Map.groupBy*/
    (function () {
        // Using Map.groupBy
        const peopleByAgeMap = Map.groupBy(people, (person) => person.age);
        console.log(peopleByAgeMap);
        // Output:
        // Map(2) {
        //   28 => [{"name":"Alice","age":28}, {"name":"Eve","age":28}],
        //   30 => [{"name":"Bob","age":30}]
        // }
        // Using Map methods
        console.log(peopleByAgeMap.get(28)); // Access by number, not string
        console.log(peopleByAgeMap.has(30)); // true
        console.log(peopleByAgeMap.size); // 2
    })();
    /** _.Using Objects as Keys*/
    (function () {
        const ceo = { name: "Jamie", age: 40, reportsTo: null };
        const manager = { name: "Alice", age: 28, reportsTo: ceo };
        const people = [
            ceo,
            manager,
            { name: "Bob", age: 30, reportsTo: manager },
            { name: "Eve", age: 28, reportsTo: ceo }
        ];

        // Group people by their manager
        const peopleByManager = Map.groupBy(people, (person) => person.reportsTo);

        // Get people reporting to the CEO
        console.log(peopleByManager.get(ceo));
        // Output: [
        //   { name: "Alice", age: 28, reportsTo: <ceo reference> },
        //   { name: "Eve", age: 28, reportsTo: <ceo reference> }
        // ]

        // Note: This won't work because it's a different object with the same shape
        console.log(peopleByManager.get({ name: "Jamie", age: 40, reportsTo: null }));
        // Output: undefined
    })();
    /** _.Real-World Use Cases*/
    (function () {
        const sales = [
            { product: "Laptop", category: "Electronics", amount: 1200 },
            { product: "Phone", category: "Electronics", amount: 800 },
            { product: "Desk", category: "Furniture", amount: 350 },
            { product: "Chair", category: "Furniture", amount: 150 }
        ];

        // Group sales by category
        const salesByCategory = Object.groupBy(sales, (sale) => sale.category);

        // Calculate total sales per category
        const categorySummary = Object.entries(salesByCategory).map(([category, items]) => {
            const totalSales = items.reduce((sum, item) => sum + item.amount, 0);
            const count = items.length;

            return {
                category,
                totalSales,
                count,
                averageSale: totalSales / count
            };
        });

        console.log(categorySummary);
        // Output:
        // [
        //   {
        //     category: "Electronics",
        //     totalSales: 2000,
        //     count: 2,
        //     averageSale: 1000
        //   },
        //   {
        //     category: "Furniture",
        //     totalSales: 500,
        //     count: 2,
        //     averageSale: 250
        //   }
        // ]
    })();
    /** _.Building UI Components*/
    (function () {
        // User data with departments
        const users = [
            { id: 1, name: "Alice", department: "Engineering" },
            { id: 2, name: "Bob", department: "Marketing" },
            { id: 3, name: "Charlie", department: "Engineering" },
            { id: 4, name: "Diana", department: "HR" },
            { id: 5, name: "Eve", department: "Marketing" }
        ];

        // Group users by department for a navigation component
        const usersByDepartment = Object.groupBy(users, (user) => user.department);

        // React component example (pseudocode)
        function DepartmentList() {
            return (`
                <div className="department-list">
                    {Object.entries(usersByDepartment).map(([department, members]) => (
                        <div key={department} className="department-section">
                            <h3>{department} ({members.length})</h3>
                            <ul>
                                {members.map(user => (
                                    <li key={user.id}>{user.name}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>`
            );
        }
    })();
    /** _.Complex Grouping with Custom Keys*/
    (function () {
        const transactions = [
            { id: 1, amount: 100, date: "2023-09-01" },
            { id: 2, amount: 200, date: "2023-09-15" },
            { id: 3, amount: 300, date: "2023-10-05" },
            { id: 4, amount: 150, date: "2023-10-20" }
        ];

        // Group by month extracted from date
        const transactionsByMonth = Map.groupBy(transactions, (tx) => {
            const date = new Date(tx.date);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        });

        // Group by amount range
        const transactionsByAmountRange = Object.groupBy(transactions, (tx) => {
            if (tx.amount < 150) return "small";
            if (tx.amount < 250) return "medium";
            return "large";
        });

        console.log(Object.keys(transactionsByAmountRange));
        // Output: ["small", "medium", "large"]
    })();
    /** _.Comparison with Manual Implementations*/
    (function () {
        // Generate test data
        const generateData = (size) => {
            return Array.from({ length: size }, (_, i) => ({
                id: i,
                category: ['A', 'B', 'C', 'D'][i % 4],
                value: Math.floor(Math.random() * 1000)
            }));
        };

        const testData = generateData(10000);

        // Measure performance
        console.time('Manual groupBy');

        const manualGroup = {};

        testData.forEach(item => {
            if (!manualGroup[item.category]) {
                manualGroup[item.category] = [];
            }
            manualGroup[item.category].push(item);
        });

        console.timeEnd('Manual groupBy');
        console.time('Object.groupBy');

        const nativeGroup = Object.groupBy(testData, item => item.category);

        console.timeEnd('Object.groupBy');
    })();
    /** _.Best Practices and Gotchas
    Key Selection
    Choose appropriate keys based on your data and requirements:*/
    (function () {
        // Bad: Using potentially non-unique keys
        const badGrouping = Object.groupBy(people, person => person.firstName);
        // Better: Using composite keys for uniqueness
        const betterGrouping = Object.groupBy(people, person => `${person.firstName}_${person.lastName}`);

        // Best: Using truly unique identifiers
        const bestGrouping = Object.groupBy(people, person => person.id);
    })();
    /* Handling Null and Undefined
       Be careful with null or undefined values in your grouping function:
    */
    (function () {
        const data = [
            { id: 1, category: "A" },
            { id: 2, category: null },
            { id: 3, category: undefined },
            { id: 4 }
        ];
        // These will all be grouped under the string "undefined"
        const grouped = Object.groupBy(data, item => item.category);
        console.log(Object.keys(grouped)); // ["A", "null", "undefined"]
        // Safer approach with default values
        const safeGrouped = Object.groupBy(data, item =>
            item.category ?? "unknown"
        );
        console.log(Object.keys(safeGrouped)); // ["A", "unknown"]
    })();
    /* Working with Null Prototype Objects
       When using Object.groupBy, remember to use appropriate methods for the null prototype result:
    */
    (function () {
        const grouped = Object.groupBy(people, person => person.department);
        // Don't do this:
        for (const dept in grouped) {
            // Risky with prototype inheritance
        }
        // Do this instead:
        Object.keys(grouped).forEach(dept => {
            // Safe with any object
        });
        // Or use Object methods directly:
        console.log(Object.entries(grouped));
        console.log(Object.values(grouped));
    })();
    /* Preserving Key Types with Map.groupBy
       Take advantage of Map.groupBy when key types matter:
    */
    (function () {
        const dates = [
            new Date("2023-01-15"),
            new Date("2023-01-20"),
            new Date("2023-02-10")
        ];
        // Group by month, keeping Date objects as keys
        const groupedByMonth = Map.groupBy(dates, date => {
            // Create a new Date with same year/month but day set to 1
            return new Date(date.getFullYear(), date.getMonth(), 1);
        });

        // Now we can use Date objects to query the map
        console.log(groupedByMonth.get(new Date(2023, 0, 1))); // January dates
        console.log(groupedByMonth.get(new Date(2023, 1, 1))); // February dates
    })();
    /*  Wait, that won’t work! Remember that Map keys use reference equality, not structural equality.Here’s the corrected version:
    */
    (function () {
        // Create month identifier dates first
        const jan2023 = new Date(2023, 0, 1);
        const feb2023 = new Date(2023, 1, 1);
        // Group by referencing these specific month objects
        const groupedByMonth = Map.groupBy(dates, date => {
            const month = date.getMonth();
            return month === 0 ? jan2023 : feb2023;
        });
        // Now we can access using our references
        console.log(groupedByMonth.get(jan2023)); // January dates
        console.log(groupedByMonth.get(feb2023)); // February dates
    })();
    /*  Browser and Environment Support
The groupBy methods are relatively new JavaScript features.Let's examine their current support status:

        Chrome: Supported since version 117
        Firefox: Supported since version 119
        Safari: Initial implementation under different names, expected to be standardized soon
        Node.js: Available in newer versions that include V8 updates following Chrome 117
For production applications that need to support older environments, you’ll need a polyfill or transpilation approach:
    */
    (function () {
        // Simple polyfill for Object.groupBy
        if (typeof Object.groupBy !== 'function') {
            Object.groupBy = function (array, callbackFn) {
                return array.reduce((result, item) => {
                    const key = String(callbackFn(item));
                    if (!Object.hasOwn(result, key)) result[key] = [];
                    result[key].push(item);
                    return result;
                }, Object.create(null));
            };
        }
        // Simple polyfill for Map.groupBy
        if (typeof Map.groupBy !== 'function') {
            Map.groupBy = function (array, callbackFn) {
                return array.reduce((result, item) => {
                    const key = callbackFn(item);
                    if (!result.has(key)) result.set(key, []);
                    result.get(key).push(item);
                    return result;
                }, new Map());
            };
        }
    })();
    /*Most efficient method to groupby on an array of objects*/
    (function () {
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] ??= []).push(x);
                return rv;
            }, {});
        };

        console.log(groupBy(['one', 'two', 'three'], 'length'));

        // or newer

        console.log({ ...Object.groupBy(['one', 'two', 'three'], ({ length }) => length) })

        // => {"3": ["one", "two"], "5": ["three"]}
    })();
    /*Using ES6 Map object:*/
    (function () {
        /**
         * @description
         * Takes an Array<V>, and a grouping function,
         * and returns a Map of the array grouped by the grouping function.
         *
         * @param list An array of type V.
         * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
         *                  K is generally intended to be a property key of V.
         *
         * @returns Map of the array grouped by the grouping function.
         */
        //export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
        //    const map = new Map<K, Array<V>>();
        function groupBy(list, keyGetter) {
            const map = new Map();
            list.forEach((item) => {
                const key = keyGetter(item);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [item]);
                } else {
                    collection.push(item);
                }
            });
            return map;
        }


        // example usage

        const pets = [
            { type: "Dog", name: "Spot" },
            { type: "Cat", name: "Tiger" },
            { type: "Dog", name: "Rover" },
            { type: "Cat", name: "Leo" }
        ];

        const grouped = groupBy(pets, pet => pet.type);

        console.log(grouped.get("Dog")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
        console.log(grouped.get("Cat")); // -> [{type:"Cat", name:"Tiger"}, {type:"Cat", name:"Leo"}]

        const odd = Symbol();
        const even = Symbol();
        const numbers = [1, 2, 3, 4, 5, 6, 7];

        const oddEven = groupBy(numbers, x => (x % 2 === 1 ? odd : even));

        console.log(oddEven.get(odd)); // -> [1,3,5,7]
        console.log(oddEven.get(even)); // -> [2,4,6]
    })();

    /*Using ES6 Map object:*/
    (function () {
        const groupBy = (items, key) => items.reduce(
            (result, item) => ({
                ...result,
                [item[key]]: [
                    ...(result[item[key]] || []),
                    item,
                ],
            }),
            {},
        );
    })();
    /*->---:*/
    (function () {
        Object.groupBy([1, 2, 3, 4, 5, 6, 7, 8, 9], v => (v % 2 ? "odd" : "even"));
        // { odd: [1, 3, 5, 7, 9], even: [2, 4, 6, 8] };

        Map.groupBy([1, 2, 3, 4, 5, 6, 7, 8, 9], v => (v % 2 ? "odd" : "even")).get('odd');
        // [1, 3, 5, 7, 9]

        //GroupBy one-liner, an ES2021 solution
        const groupBy = (x, f) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});
        const groupBy = (x, f) => x.reduce((a, b, i) => ((a[f(b, i, x)] ||= []).push(b), a), {});
        // f -> should must return string/number because it will be use as key in object

        // for demo

        groupBy([1, 2, 3, 4, 5, 6, 7, 8, 9], v => (v % 2 ? "odd" : "even"));
        // { odd: [1, 3, 5, 7, 9], even: [2, 4, 6, 8] };

        const colors = [
            "Apricot",
            "Brown",
            "Burgundy",
            "Cerulean",
            "Peach",
            "Pear",
            "Red",
        ];

        groupBy(colors, v => v[0]); // group by colors name first letter
        // {
        //   A: ["Apricot"],
        //   B: ["Brown", "Burgundy"],
        //   C: ["Cerulean"],
        //   P: ["Peach", "Pear"],
        //   R: ["Red"],
        // };

        groupBy(colors, v => v.length); // group by length of color names
        // {
        //   3: ["Red"],
        //   4: ["Pear"],
        //   5: ["Brown", "Peach"],
        //   7: ["Apricot"],
        //   8: ["Burgundy", "Cerulean"],
        // }

        const data = [
            { comment: "abc", forItem: 1, inModule: 1 },
            { comment: "pqr", forItem: 1, inModule: 1 },
            { comment: "klm", forItem: 1, inModule: 2 },
            { comment: "xyz", forItem: 1, inModule: 2 },
        ];

        groupBy(data, v => v.inModule); // group by module
        // {
        //   1: [
        //     { comment: "abc", forItem: 1, inModule: 1 },
        //     { comment: "pqr", forItem: 1, inModule: 1 },
        //   ],
        //   2: [
        //     { comment: "klm", forItem: 1, inModule: 2 },
        //     { comment: "xyz", forItem: 1, inModule: 2 },
        //   ],
        // }

        groupBy(data, x => x.forItem + "-" + x.inModule); // group by module with item
        // {
        //   "1-1": [
        //     { comment: "abc", forItem: 1, inModule: 1 },
        //     { comment: "pqr", forItem: 1, inModule: 1 },
        //   ],
        //   "1-2": [
        //     { comment: "klm", forItem: 1, inModule: 2 },
        //     { comment: "xyz", forItem: 1, inModule: 2 },
        //   ],
        // }
        const groupByToMap = (x, f) =>
            x.reduce((a, b, i, x) => {
                const k = f(b, i, x);
                a.get(k)?.push(b) ?? a.set(k, [b]);
                return a;
            }, new Map());
        const groupedMap = initialArray.reduce(
            (entryMap, e) => entryMap.set(e.id, [...entryMap.get(e.id) || [], e]),
            new Map()
        );
        const objsToMerge = [{ id: 1, name: "Steve" }, { id: 2, name: "Alice" }, { id: 1, age: 20 }];
        // The following variable should be created automatically
        const mergedArray = [{ id: 1, name: "Steve", age: 20 }, { id: 2, name: "Alice" }]
        const mergedArray = Array.from(
            objsToMerge.reduce(
                (entryMap, e) => entryMap.set(e.id, { ...entryMap.get(e.id) || {}, ...e }),
                new Map()
            ).values()
        );
        const groupedMap = new Map();
        for (const e of initialArray) {
            let thisList = groupedMap.get(e.type);
            if (thisList === undefined) {
                thisList = [];
                groupedMap.set(e.type, thisList);
            }
            thisList.push(e);
        }
    })();
})();  
