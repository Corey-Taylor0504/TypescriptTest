function memoizer<T extends (...args: any[]) => any>(func: T): T {
  const cache: Record<string, ReturnType<T>> = {};

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  }) as T;
}

// Example usage:
function expensiveOperation(n: number): number {
  console.log("Calculating...");
  return n * 2;
}

const memoizedOperation = memoizer(expensiveOperation);
console.log(memoizedOperation(5)); // Calculating... 10
console.log(memoizedOperation(5)); // 10 (cached)
