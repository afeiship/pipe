import pipe from '../src';

const pipeSync = pipe.sync;
const pipeAync = pipe.async;

describe('Test for pipe', () => {
  test('All sync functions', async () => {
    const add = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const addThenDouble = pipeAync(add, double);
    expect(await addThenDouble(1)).toBe(4);
  });

  test('All async functions', async () => {
    const mockFetch = (x: number) => Promise.resolve(x + 1);
    const mockDouble = (x: number) => Promise.resolve(x * 2);
    const addThenDouble = pipeAync(mockFetch, mockDouble);
    expect(await addThenDouble(1)).toBe(4);
  });

  test('Mixed sync and async functions', async () => {
    const mockFetch = (x: number) => Promise.resolve(x + 1);
    const mockDouble = (x: number) => x * 2;
    const addThenDouble = pipeAync(mockFetch, mockDouble);
    expect(await addThenDouble(1)).toBe(4);
  });

  test('Mixed with error', async () => {
    const mockFetch = (x: number) => Promise.resolve(x + 1);
    const mockDouble = (x: number) => x * 2;
    const mockError = (x: number) => {
      throw new Error('mock error');
    };
    const addThenDouble = pipeAync(mockFetch, mockError, mockDouble);
    expect(await addThenDouble(1)).toBe(4);
  });
});

describe('Test for pipe.sync', () => {
  test('All sync functions', () => {
    const add = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const addThenDouble = pipeSync(add, double);
    expect(addThenDouble(1)).toBe(4);
  });

  test('Mixed with error', () => {
    const mockDouble = (x: number) => x * 2;
    const mockError = (x: number) => {
      throw new Error('mock error');
    };
    const mockAddTwo = (x: number) => x + 2;
    const addThenDouble1 = pipeSync(mockError, mockDouble, mockAddTwo);
    const addThenDouble2 = pipeSync(mockDouble, mockError, mockAddTwo);
    expect(addThenDouble1(1)).toBe(4);
    expect(addThenDouble2(1)).toBe(4);
  });
});
