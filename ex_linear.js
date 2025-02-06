/* JAVASCRIPT MATRIC
 * ex_linear.js
   Reshape
 *   Resize
 *   Multi = function(matric, matric)
 *   Inv
 *   Transform
 */

/** 構造 */
(function () {
    Array.from({ length: 10 }, (x, i, arr) => i);
    Array(10).fill(0);
    // push,pop,shift,unshift
})();

/** 遍歷 */
(function () {
    const a = Array(10).fill(0);
    for (const [index, element] of a.entries()) {
        console.log(index, element);
    }
    a.forEach((item, idex, arr) => {
        console.log(item);
    });
})();

/** 歸並 */
(function () {
    const a = Array.from({ length: 10 }, (x, i, arr) => i);
    const sum = a.reduce((accumulator, currentValue) => accumulator + currentValue, 0,);
    console.log(sum);
})();


/** 篩選 */
(function () {
    const a = Array.from({ length: 10 }, (x, i, arr) => i);
    const b = a.filter((elm, idx, array) => elm > 5, this);
    console.log(b);
})();
/** 映射:  Elm 運算 */
/** map */
(function () {
    const inventory = [{ type: "fruit" }, { type: 'tools' }];
    [1, 2, 3].map((elm, idx, array) => elm * 2);
    const StrCode = [...new Set(inventory.map(({ type }) => type))];
    console.log(StrCode);
})();
/** 排序  */
(function () {
    //reverse
    //sort
    //flat
    //flatMap
    //every
    //some
    //find
    //findLast
    //findIndex
    //findLastIndex
    //slice(start,len)
    //splice(start, del, ...elm)
    //property
    const inventory = [{ type: "fruit" }, { type: 'tools' }];
    const StrCode = [...new Set(inventory.map(({ type }) => type))];
    inventory.sort((a, b) => StrCode.indexOf(a.type) - StrCode.indexOf(b.type))
    console.log(inventory);
})();

/** Iterators and generators (for of) (for in )*/
//function* and Generator
//yield and yield*
//Iterators
/**  */
(function () {
    Array.prototype.reshape = function (rows, cols) {
        var copy = this.slice(0); // Copy all elements.
        this.length = 0; // Clear out existing array.
        for (var r = 0; r < rows; r++) {
            var row = [];
            for (var c = 0; c < cols; c++) {
                var i = r * cols + c;
                if (i < copy.length) {
                    row.push(copy[i]);
                }
            }
            this.push(row);
        }
    };
    Array.prototype.resize = function (newSize, defaultValue) {
        while (newSize > this.length)
            this.push(defaultValue);
        this.length = newSize;
    }
})();

/** Matrix */
(function () {
    var MDN = MDN || {};
    var document = document || {
        getElementById(x){
            return {style: {transform:""}};
        }
    };

    MDN.matrixArrayToCssMatrix = function (array) {
        return "matrix3d(" + array.join(',') + ")";
    }

    MDN.multiplyMatrixAndPoint = function (matrix, point) {

        //Give a simple variable name to each part of the matrix, a column and row number
        var c0r0 = matrix[0], c1r0 = matrix[1], c2r0 = matrix[2], c3r0 = matrix[3];
        var c0r1 = matrix[4], c1r1 = matrix[5], c2r1 = matrix[6], c3r1 = matrix[7];
        var c0r2 = matrix[8], c1r2 = matrix[9], c2r2 = matrix[10], c3r2 = matrix[11];
        var c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];

        //Now set some simple names for the point
        var x = point[0];
        var y = point[1];
        var z = point[2];
        var w = point[3];

        //Multiply the point against each part of the 1st column, then add together
        var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);

        //Multiply the point against each part of the 2nd column, then add together
        var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);

        //Multiply the point against each part of the 3rd column, then add together
        var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);

        //Multiply the point against each part of the 4th column, then add together
        var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);

        return [resultX, resultY, resultZ, resultW];
    }

    MDN.multiplyMatrices = function (matrixA, matrixB) {

        // A faster implementation of this function would not create
        // any new arrays. This creates arrays for code clarity.

        // Slice the second matrix up into rows
        var row0 = [matrixB[0], matrixB[1], matrixB[2], matrixB[3]];
        var row1 = [matrixB[4], matrixB[5], matrixB[6], matrixB[7]];
        var row2 = [matrixB[8], matrixB[9], matrixB[10], matrixB[11]];
        var row3 = [matrixB[12], matrixB[13], matrixB[14], matrixB[15]];

        // Multiply each row by the matrix
        var result0 = MDN.multiplyMatrixAndPoint(matrixA, row0);
        var result1 = MDN.multiplyMatrixAndPoint(matrixA, row1);
        var result2 = MDN.multiplyMatrixAndPoint(matrixA, row2);
        var result3 = MDN.multiplyMatrixAndPoint(matrixA, row3);

        // Turn the results back into a single matrix
        return [
            result0[0], result0[1], result0[2], result0[3],
            result1[0], result1[1], result1[2], result1[3],
            result2[0], result2[1], result2[2], result2[3],
            result3[0], result3[1], result3[2], result3[3],
        ];
    }

    MDN.multiplyArrayOfMatrices = function (matrices) {

        var inputMatrix = matrices[0];

        for (var i = 1; i < matrices.length; i++) {
            inputMatrix = MDN.multiplyMatrices(inputMatrix, matrices[i]);
        }

        return inputMatrix;
    }
    var x = 50;
    var y = 100;
    var z = 0;

    var translationMatrix = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];

    // Grab the DOM element
    var moveMe = document.getElementById('move-me');

    // Returns a result like: "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 200, 0, 1);"
    var matrix3dRule = MDN.matrixArrayToCssMatrix(translationMatrix);

    // Set the transform
    moveMe.style.transform = matrix3dRule;
    var m3 = {
        translation: function (tx, ty) {
            return [
                1, 0, 0,
                0, 1, 0,
                tx, ty, 1,
            ];
        },

        rotation: function (angleInRadians) {
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            return [
                c, -s, 0,
                s, c, 0,
                0, 0, 1,
            ];
        },

        scaling: function (sx, sy) {
            return [
                sx, 0, 0,
                0, sy, 0,
                0, 0, 1,
            ];
        },
        multiply: function (a, b) {
            var a00 = a[0 * 3 + 0];
            var a01 = a[0 * 3 + 1];
            var a02 = a[0 * 3 + 2];
            var a10 = a[1 * 3 + 0];
            var a11 = a[1 * 3 + 1];
            var a12 = a[1 * 3 + 2];
            var a20 = a[2 * 3 + 0];
            var a21 = a[2 * 3 + 1];
            var a22 = a[2 * 3 + 2];
            var b00 = b[0 * 3 + 0];
            var b01 = b[0 * 3 + 1];
            var b02 = b[0 * 3 + 2];
            var b10 = b[1 * 3 + 0];
            var b11 = b[1 * 3 + 1];
            var b12 = b[1 * 3 + 2];
            var b20 = b[2 * 3 + 0];
            var b21 = b[2 * 3 + 1];
            var b22 = b[2 * 3 + 2];

            return [
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,
                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,
                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ];
        }
    };
    async function initial() {
        if (!navigator.gpu) {
            console.log("WebGPU not supported.");
            //throw Error("WebGPU not supported.");
        }
    }
    initial();
})();
