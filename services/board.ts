export const init = (): number[] => Array(90).fill(0)

export const extract = (
  numbers: number[]
): { numbers: number[]; extracted: number } => {
  if (hasFinished(numbers)) {
    throw new Error(`Can't extract. Already finished.`)
  }

  const extracted = Math.floor(Math.random() * 90 + 1)

  if (numbers[extracted - 1] > 0) {
    return extract(numbers)
  }

  numbers[extracted - 1] = 1

  return { numbers, extracted }
}

export const hasFinished = (numbers: number[]): boolean => numbers.every((item) => item === 1)
