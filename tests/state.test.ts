import { hookedPromise, useState} from 'src/hooks'
import { describe, expect, test } from '@jest/globals'

describe('useState', () => {
  const maxCounter = 5

  test('should increment counter', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, setState ] = useState(0)
      
      state < maxCounter
        ? setState(state + 1)
        : resolve(state)
    })).resolves.toBe(maxCounter)
  })

  test('should decrement counter', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, setState ] = useState(maxCounter)
    
      state >= 1
        ? setState(state - 1)
        : resolve(state)
    })).resolves.toBe(0)
  })

  test('should increment counter with function', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, setState ] = useState(0)
      
      state < maxCounter
        ? setState((state: number) => state + 1)
        : resolve(state)
    })).resolves.toBe(maxCounter)
  })

  test('should decrement counter with function', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, setState ] = useState(maxCounter)
      
      state >= 1
        ? setState((state: number) => state - 1)
        : resolve(state)
    })).resolves.toBe(0)
  })

  test('should be called 2 times', async () => {
    let updateCounter = 0

    expect(hookedPromise(({ resolve }) => {
      updateCounter++
      const [ state, setState ] = useState(0)

      if (state < maxCounter) {
        for (let i = 0; i < maxCounter; i++) {
          setState((state: number) => state + 1)
        }
      } else {
        resolve([ updateCounter, state ])
      }
    })).resolves.toEqual([ 2, maxCounter ])
  })
})
