import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useBoard } from 'hooks/useBoard'

const Home: NextPage = () => {
  const { extract, numbers, extracted, init } = useBoard()

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
            <div className='flex justify-center items-center p-2'>
              <div>
                <div className='extracted-bullet'>
                  {extracted ? <p>{extracted}</p> : '...'}
                </div>
              </div>
            </div>
            <div className='flex flex-col'>
              <button className='btn-action my-2' onClick={() => extract()}>
                EXTRACT
              </button>

              <button className='btn my-2' onClick={() => init()}>
                RESET
              </button>
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
                      <div
                        key={`card_${item}`}
                        className='bg-gradient-to-b from-red-100 to-red-300 rounded-xl shadow'
                      >
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
