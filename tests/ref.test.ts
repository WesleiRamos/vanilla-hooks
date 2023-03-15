import { hookedPromise, useState, useRef } from 'lib/hooks'
import { describe, expect, test } from '@jest/globals'

type Reference = {
  current: boolean
}

describe('useRef', () => {
  test('should keep the same reference', async() => {
    let reference: Reference | null = null

    const ref = await hookedPromise(({ resolve }) => {
      const ref = useRef(false)
      const [ counter, setCounter ] = useState(0)

      if (reference === null) {
        reference = ref
      }

      counter <= 5
        ? setCounter(counter + 1)
        : resolve(ref)
    })

    expect(ref).toBe(reference)
  })
})
