import { hooked, useState, useMemo } from 'lib/hooks'
import { describe, expect, test } from '@jest/globals'

describe('useMemo', () => {
  const array = [ 1, 2, 3, 4, 5 ]

  test('should update one time with no deps', async () => {
    const values: number[] = await new Promise((resolve) => hooked(() => {
      const [ multiplier, setMultiplier ] = useState(1)

      const value = useMemo(() => (
        array.map((v) => v * multiplier)
      ), [])

      multiplier < 3
        ? setMultiplier(multiplier + 1)
        : resolve(value)
    }))

    expect(values).toEqual([ 1, 2, 3, 4, 5 ])
  })

  test('should update 3 time with deps', async () => {
    const values: number[] = await new Promise((resolve) => hooked(() => {
      const [ multiplier, setMultiplier ] = useState(1)
      
      const value = useMemo(() => (
        array.map((v) => v * multiplier)
      ), [ multiplier ])

      multiplier < 3
        ? setMultiplier(multiplier + 1)
        : resolve(value)
    }))

    expect(values).toEqual([ 3, 6, 9, 12, 15 ])
  })
})
