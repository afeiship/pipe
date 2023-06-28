declare var wx: any;

type PipeAsyncFunction<T> = (input: T) => T | Promise<T>;
type PipeSyncFunction<T> = (input: T) => T;

function pipe<T>(...functions: PipeSyncFunction<T>[]): PipeSyncFunction<T> {
  return function (input: T): T {
    return functions.reduce((output: T, func: PipeSyncFunction<T>) => {
      try {
        return func(output);
      } catch (error) {
        console.error('Function execution skipped:', error);
        return output;
      }
    }, input);
  };
}

function pipeAsync<T>(...functions: PipeAsyncFunction<T>[]): PipeAsyncFunction<T> {
  return async function (input: T): Promise<T> {
    return functions.reduce(async (acc: Promise<T>, func: PipeAsyncFunction<T>) => {
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
