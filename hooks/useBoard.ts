import React from 'react'
import { init as initNumbers, extract as extractNumber, hasFinished } from 'services/board'

type HookProps = {
  extracted: number
  numbers: number[]
  extract: () => number
  init: () => void
  status: string
}

export const useBoard = (): HookProps => {
  const [numbers, setNumbers] = React.useState<number[]>(initNumbers())
  const [extracted, setExtracted] = React.useState<number>()
  const [status, setStatus] = React.useState<string>('created')

  const extract = (): number => {
    if (status === 'ended') {
      return 0
    }

    const { extracted, numbers: newNumbers } = extractNumber(numbers)
    setNumbers([...newNumbers])
    setExtracted(extracted)
    setStatus(() => hasFinished(numbers) ? 'ended' : 'playing')

    return extracted
  }

  const init = () => {
    setNumbers([...initNumbers()])
    setExtracted(0)
    setStatus('created')
  }

  return {
    extracted: extracted || 0,
    numbers,
    extract,
    status,
    init,
  }
}
