export enum WIN_OPTION {
  AMBO = 'ambo',
  TERNO = 'terno',
  QUATERNA = 'quaterna',
  CINQUINA = 'cinquina',
  TOMBOLA = 'tombola',
}

export const WinCount: Map<number, WIN_OPTION> = new Map([
  [2, WIN_OPTION.AMBO],
  [3, WIN_OPTION.TERNO],
  [4, WIN_OPTION.QUATERNA],
  [5, WIN_OPTION.CINQUINA],
  [15, WIN_OPTION.TOMBOLA],
])

export const initWins = (): WIN_OPTION[] =>
  Array.from(WinCount).map((item) => item[1])

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

export const hasFinished = (numbers: number[]): boolean =>
  numbers.every((item) => item === 1)

export const getCardRows = (row: number, cardRow: number): number[] => [
  row + (1 - cardRow),
  row + (2 - cardRow),
  row + (3 - cardRow),
]

export const getExtractedCount = (
  numbers: number[],
  from: number,
  to: number
): number => numbers.slice(from - 1, to).reduce((acc, item) => acc + item)

export const getRowRange = (
  row: number,
  isLeft: boolean
): { from: number; to: number } => ({
  from: row * 10 - (isLeft ? 9 : 4),
  to: row * 10 - (isLeft ? 5 : 0),
})

export const checkFullWin = (
  numbers: number[],
  cardRows: number[],
  isLeft: boolean
): boolean => {
  const count = cardRows.reduce((acc, row) => {
    const { from, to } = getRowRange(row, isLeft)
    return acc + getExtractedCount(numbers, from, to)
  }, 0)

  return count === 15
}

export const checkWin = (
  numbers: number[],
  extracted: number
): number | undefined => {
  const row = Math.ceil(extracted / 10)

  const isLeft = row * 10 - extracted >= 5

  const cardRow = row % 3 || 3

  const cardRows = getCardRows(row, cardRow)

  // Tombola
  if (checkFullWin(numbers, cardRows, isLeft)) {
    return 15
  }

  const { from, to } = getRowRange(row, isLeft)
  const extractedCount = getExtractedCount(numbers, from, to)

  if (extractedCount > 1) {
    return extractedCount
  }

  return
}
