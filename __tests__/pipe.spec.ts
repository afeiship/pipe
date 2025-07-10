
import pipe from '../src/index';

describe('pipe', () => {
  it('should be a function', () => {
    expect(typeof pipe).toBe('function');
  });

  it('should return a function', () => {
    expect(typeof pipe()).toBe('function');
  });

  it('should pipe functions from left to right', () => {
    const add = (x: number) => x + 1;
    const multiply = (x: number) => x * 2;
    const subtract = (x: number) => x - 3;

    const piped = pipe(add, multiply, subtract);
    expect(piped(5)).toBe((5 + 1) * 2 - 3);
  });

  it('should handle initial input correctly', () => {
    const add = (x: number) => x + 1;
    const piped = pipe(add);
    expect(piped(1)).toBe(2);
  });
});

describe('pipe.async', () => {
  it('should be a function', () => {
    expect(typeof pipe.async).toBe('function');
  });

  it('should pipe async functions from left to right', async () => {
    const asyncAdd = async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return x + 1;
    };
    const asyncMultiply = async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return x * 2;
    };
    const asyncSubtract = async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return x - 3;
    };

    const piped = pipe.async(asyncAdd, asyncMultiply, asyncSubtract);
    const result = await piped(5);
    expect(result).toBe((5 + 1) * 2 - 3);
  });

  it('should handle a mix of sync and async functions', async () => {
    const add = (x: number) => x + 1;
    const asyncMultiply = async (x: number) => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return x * 2;
    };

    const piped = pipe.async(add, asyncMultiply);
    const result = await piped(5);
    expect(result).toBe((5 + 1) * 2);
  });
});

describe('pipe.sync', () => {
    it('should be an alias for pipe', () => {
        expect(pipe.sync).toBe(pipe);
    });
});
