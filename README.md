# pipe
> Pipe is a lightweight JavaScript library for function composition and execution.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install @jswork/pipe
```

## methods
- [x] pipe === pipe.sync
- [x] pipe.sync (default)
- [x] pipe.async

## usage
```js
import pipe from '@jswork/pipe';

// fns
function addOne(n: number): number {
  return n + 1;
}

function double(n: number): number {
  return n * 2;
}

function divide(n: number): number {
  if (n === 0) {
    throw new Error('Divide by zero error.');
  }
  return 10 / n;
}

// use pipe
const calculate = pipe(
  addOne,
  double,
  divide,
  addOne
);

const result1 = calculate(3);
const result2 = calculate(-1);

// has result, without log
console.log('Result1:', result1); // 10 / (3 + 1)*2  + 1 = 2.25
// has result, but with warning log
console.log('Result2:', result2); // 10 / (-1+1)*2 + 1 => Throw error: Divide by zero error.
```

## license
Code released under [the MIT license](https://github.com/afeiship/pipe/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/pipe
[version-url]: https://npmjs.org/package/@jswork/pipe

[license-image]: https://img.shields.io/npm/l/@jswork/pipe
[license-url]: https://github.com/afeiship/pipe/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/pipe
[size-url]: https://github.com/afeiship/pipe/blob/master/dist/pipe.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/pipe
[download-url]: https://www.npmjs.com/package/@jswork/pipe
