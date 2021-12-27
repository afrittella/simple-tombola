import React from 'react'
import {
  checkWin,
  extract as extractNumber,
  hasFinished,
  init as initNumbers,
  initWins,
  WIN_OPTION,
  WinCount,
} from 'services/board'

type HookProps = {
  extracted: number
  numbers: number[]
  extract: () => number
  init: () => void
  status: string
  wins: WIN_OPTION[]
  originalWins: typeof WinCount
}

export const useBoard = (): HookProps => {
  const [numbers, setNumbers] = React.useState<number[]>(initNumbers())
  const [extracted, setExtracted] = React.useState<number>()
  const [status, setStatus] = React.useState<string>('created')
  const [wins, setWins] = React.useState<WIN_OPTION[]>(initWins())

  const init = () => {
    setNumbers([...initNumbers()])
    setExtracted(0)
    setStatus('created')
    setWins(initWins())
  }

  const extract = (): number => {
    if (status === 'ended') {
      return 0
    }

    const { extracted, numbers: newNumbers } = extractNumber(numbers)
    setNumbers([...newNumbers])
    setExtracted(extracted)
    setStatus(() => (hasFinished(numbers) ? 'ended' : 'playing'))

    const win = WinCount.get(checkWin(newNumbers, extracted) || 0)

    if (win) {
      const newWins = wins.filter((item) => item !== win)
      setWins(newWins)
      if (win === WIN_OPTION.TOMBOLA) {
        setStatus('ended')
      }
    }

    return extracted
  }

  return {
    extracted: extracted || 0,
    numbers,
    extract,
    status,
    init,
    wins,
    originalWins: new Map(WinCount),
  }
}
