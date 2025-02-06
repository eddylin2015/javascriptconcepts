/** WriteJsLikePython */
/*
分類	方法
會改變原始陣列	
push()、pop()、shift()、unshift()、reverse()、splice()、sort()、copyWithin()、fill()、 join、delete、concat 
回傳陣列元素資訊或索引值	
length、indexOf()、lastIndexOf()、find()、findIndex()、filter()
針對每個元素處理	
forEach() .forEach(v [, idx, arr]) { };   function myFun(v, idx, arr){};  .forEach(myFun); 
產生新的陣列或新的值	
join()、concat()、slice()、map()、reduce()、reduceRight()、flat()、flatMap()、Array.from()、Array.of()、toString()
判斷並回傳布林值	
every()、some()、includes()、Array.isArray()
其他用法	
keys()、valueOf() 
*/

/** 1. Array.from({length:10},(_,i)=>i); */
(function () {
    const range = (s_, e_, step = 1) => Array.from({ length: (e_ - s_) / step + 1 }, (_, i) => s_ + (i * step));
    console.log(range(0, 10, 2));
    console.log(Array.from({ length: 10 }, (_, i) => i));
    console.log([...Array(10)].map((n, i) => i));
    console.log([...Array(10).keys()])
    console.log(Array(10).fill(0))
})();

/** 2. Slice */
(function () {
    str1 = 'The morning is upon us.'; // the length of str1 is 23.
    str2 = str1[1, 8];
    str2 = str1.slice(1, 8);
    str3 = str1.slice(4, -2);
    str4 = str1.slice(12);
    str5 = str1.slice(30);
})();

/* Array Methods */
(function () {
    const months = ['Jan', 'March', 'April', 'June'];
    months.splice(1, 0, 'Feb');
    // Inserts at index 1
    console.log(months);
    // Expected output: Array ["Jan", "Feb", "March", "April", "June"]
    months.splice(4, 1, 'May');
    // Replaces 1 element at index 4
    console.log(months);
    // Expected output: Array ["Jan", "Feb", "March", "April", "May"]
    /*** Sorting */
    months.sort();
    months.reverse(); 
    months.sort(function(a, b){return a - b});
    months.sort(function(a, b){return 0.5 - Math.random()});
    const arr=[4,3,2,1,7];
    Math.max.apply(null, arr); 
    Math.min.apply(null, arr);
    /*** Iteration */
    // .map(myFun); 
    // function myFun(v, i, arr) { return v * 2; } 
    // .reduce(myFun) -> sum; 
    // function myFun(total, v, i, arr) { return total + v; }
    // .reducerRight */
    // .every(myFun) -> true / false; 
    // function myFun(v) { return v < 18; }
    // .some(myFun) -> count number; 
    // function myFun(v) { return v < 18; }
    // .indexOf(); lastIndexOf();
    // .find(myFun)->elem; function myFun(v,i,arr){return v<18;}
    // .findIndex(myFun)->index;
    //  Array.from('ABC')->['A','B','C'] ;IE not support
    // .keys() ; IE not support
    // .entries()-> [[0,'A'],[1,'B'],[2,'C']]
    // .includes(elem);-> true/false;
})();

/** 參考: */
/* 
https://www.oxxostudio.tw/articles/201908/js-array.html
https://javascript.info/array-methods
*/

