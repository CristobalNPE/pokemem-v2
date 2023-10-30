export function randomValue() {
  return Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function createNumberArray(size: number) {
  let createdArray = [];
  for (let i = 1; i <= size; i++) {
    createdArray.push(i);
  }

  return createdArray;
}

export function getRandomValuesFromArray(amount: number, array: number[]) {
  let randomValues = [...shuffleArray(array).slice(0, amount)];
  let remainingValues = array.filter(
    (element) => !randomValues.includes(element)
  );

  return [randomValues, remainingValues];
}
