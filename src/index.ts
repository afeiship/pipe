declare var wx: any;

type PipeAsyncFunction<T> = (input: any) => T | Promise<T>;
type PipeSyncFunction<T> = (input: any) => T;

// 支持 pipe(add, mul, sub) 和 pipe([add, mul, sub])
function pipe<T>(...functions: PipeSyncFunction<T>[]): PipeSyncFunction<T>;
function pipe<T>(functions: PipeSyncFunction<T>[]): PipeSyncFunction<T>;
function pipe<T>(...args: any[]): PipeSyncFunction<T> {
  const fns = Array.isArray(args[0]) ? args[0] : args;
  return function (input: any): T {
    return fns.reduce((output: T, func: PipeSyncFunction<T>) => {
      try {
        return func(output);
      } catch (error) {
        console.error('Function execution skipped:', error);
        return output;
      }
    }, input);
  };
}

function pipeAsync<T>(...functions: PipeAsyncFunction<T>[]): PipeAsyncFunction<T>;
function pipeAsync<T>(functions: PipeAsyncFunction<T>[]): PipeAsyncFunction<T>;
function pipeAsync<T>(...args: any[]): PipeAsyncFunction<T> {
  const fns = Array.isArray(args[0]) ? args[0] : args;
  return async function (input: any): Promise<T> {
    return fns.reduce(async (acc: Promise<T>, func: PipeAsyncFunction<T>) => {
      try {
        const output = await acc;
        const result = await Promise.resolve(func(output));
        return result;
      } catch (error) {
        console.error('Function execution skipped:', error);
        return acc;
      }
    }, Promise.resolve(input));
  };
}

pipe.async = pipeAsync;
pipe.sync = pipe;

// for commonjs es5 require
if (typeof module !== 'undefined' && module.exports && typeof wx === 'undefined') {
  module.exports = pipe;
}

export default pipe;
