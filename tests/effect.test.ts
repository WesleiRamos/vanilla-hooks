import { hookedPromise, useState, useEffect } from 'src/hooks'
import { describe, expect, jest, test } from '@jest/globals'

describe('useEffect', () => {
  test('should be called on function update', async () => {
    const useEffectCallback = jest.fn()

    const counter = await hookedPromise<number>(({ resolve }) => {
      const [ counter, setCounter ] = useState(0)

      useEffect(useEffectCallback)

      counter < 4
        ? setCounter(counter + 1)
        : resolve(counter + 1)
    })

    expect(useEffectCallback).toBeCalledTimes(counter)
  })

  test('should be called once', async () => {
    const useEffectCallback = jest.fn()

    await hookedPromise(({ resolve }) => {
      const [ counter, setCounter ] = useState(0)

      useEffect(useEffectCallback, [])

      counter <= 4
        ? setCounter(counter + 1)
        : resolve(counter + 1)
    })

    expect(useEffectCallback).toBeCalledTimes(1)
  })

  test('should be called 3 times', async () => {
    const useEffectCallback = jest.fn()

    await hookedPromise(({ resolve }) => {
      const [ name, setName ] = useState('')
      const [ counter, setCounter ] = useState(1)

      useEffect(useEffectCallback, [ name ])

      if (counter === 3 || counter === 6) {
        setName(counter === 3 ? 'John' : 'Doe')
      }

      counter <= 9
        ? setCounter(counter + 1)
        : resolve(counter)
    })

    expect(useEffectCallback).toBeCalledTimes(3)
  })

  test('cleanup should be called', async () => {
    const cleanup = jest.fn()

    const counter = await hookedPromise<number>(({ resolve }) => {
      const [ counter, setCounter ] = useState(0)

      useEffect(() => cleanup)

      counter <= 4
        ? setCounter(counter + 1)
        : resolve(counter)
    })

    expect(cleanup).toBeCalledTimes(counter)
  })
})
