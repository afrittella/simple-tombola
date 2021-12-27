import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useBoard } from 'hooks/useBoard'

const Home: NextPage = () => {
  const [cardColor, setCardColor] = React.useState<string>('card--yellow')
  const { extract, numbers, extracted, init, wins, originalWins, status } =
    useBoard()

  return (
    <div>
      <div className='container m-auto p-10'>
        <Head>
          <title>Simple Tombola</title>
          <meta
            name='description'
            content='A simple react implementation of classic "Tombola" board'
          />
          <meta name='author' content='Andrea Frittella' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className='grid grid-cols-[250px,_2fr]'>
          <aside className='p-4'>
            <div className='flex items-start justify-around my-4'>
              <button
                className={`btn-color bg-yellow-400 ${
                  cardColor === 'card--yellow' ? 'ring-4 ring-gray-600' : ''
                }`}
                onClick={() => setCardColor('card--yellow')}
              >
                {' '}
              </button>
              <button
                className={`btn-color bg-red-400 ${
                  cardColor === 'card--red' ? 'ring-4 ring-gray-600' : ''
                }`}
                onClick={() => setCardColor('card--red')}
              >
                {' '}
              </button>
              <button
                className={`btn-color bg-cyan-400 ${
                  cardColor === 'card--cyan' ? 'ring-4 ring-gray-600' : ''
                }`}
                onClick={() => setCardColor('card--cyan')}
              >
                {' '}
              </button>
              <button
                className={`btn-color bg-green-400 ${
                  cardColor === 'card--green' ? 'ring-4 ring-gray-600' : ''
                }`}
                onClick={() => setCardColor('card--green')}
              >
                {' '}
              </button>
            </div>
            <div className='flex justify-center items-center p-2'>
              <div>
                <div className='extracted-bullet'>
                  {extracted ? <p>{extracted}</p> : '...'}
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <button
                className={`${
                  status === 'ended' ? 'btn-disabled' : 'btn-action'
                } my-2 py-6`}
                onClick={() => extract()}
                disabled={status === 'ended'}
              >
                EXTRACT
              </button>

              <button className='btn my-2' onClick={() => init()}>
                RESET
              </button>
            </div>
            <div className='flex flex-col mt-5'>
              <h4 className='text-xl font-bold'>Winnings</h4>
              {Array.from(originalWins).map((win) => (
                <p
                  className={`text-2xl my-2 ${
                    wins && !wins.includes(win[1])
                      ? 'line-through text-green-700'
                      : ''
                  }`}
                  key={`win_${win[1]}`}
                >
                  {win[1].slice(0, 1).toUpperCase() + win[1].slice(1)}
                </p>
              ))}
            </div>
          </aside>
          <div>
            {numbers && (
              <>
                <div className='relative'>
                  <div
                    className={
                      'absolute top-0 bottom-0 left-0 right-0 grid grid-cols-2 grid-rows-3 z-10 gap-3 justify-center justify-items-stretch'
                    }
                  >
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={`card_${item}`} className={`card ${cardColor}`}>
                        {' '}
                      </div>
                    ))}
                  </div>
                  <div
                    className={
                      'relative grid grid-cols-10 gap-4 justify-center justify-items-center z-50'
                    }
                  >
                    {numbers.map((item, index) => (
                      <div
                        key={`number_${index}`}
                        className={`bullet ${
                          item === 1 ? 'bullet--selected' : ''
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
