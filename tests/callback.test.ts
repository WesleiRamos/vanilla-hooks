import { hookedPromise, useState, useCallback } from 'lib/hooks'
import { describe, expect, test } from '@jest/globals'

describe('useCallback', () => {
  test('should keep the same callback through renders', async () => {
    const callback = await hookedPromise<() => number>(({ resolve }) => {
      const [ counter, setCounter ] = useState(5)
      const callback = useCallback(() => counter, [ ])

      counter >= 0
        ? setCounter(counter - 1)
        : resolve(callback)
    })

    expect(callback()).toBe(5)
  })

  test('should change the callback when dependencies change', async () => {
    const callback = await hookedPromise<() => string>(({ resolve }) => {
      const [ name, setName ] = useState('Ayrton')
      const [ counter, setCounter ] = useState(0)

      const callback = useCallback(() => name, [ name ])

      counter === 3 && setName('Senna')

      counter <= 5
        ? setCounter(counter + 1)
        : resolve(callback)
    })

    const name = callback()
    expect(name).not.toBe('Ayrton')
    expect(name).toBe('Senna')
  })
})
