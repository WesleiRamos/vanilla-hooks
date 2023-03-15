import { hooked, useState } from 'lib/hooks'
import { describe, expect, test } from '@jest/globals'

describe('useState', () => {
  const maxCounter = 5

  test('should increment counter', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, setState ] = useState(0)
      
      state < maxCounter
        ? setState(state + 1)
        : resolve(state)
    }))

    expect(counter).toBe(maxCounter)
  })

  test('should decrement counter', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, setState ] = useState(maxCounter)
    
      state >= 1
        ? setState(state - 1)
        : resolve(state)
    }))

    expect(counter).toBe(0)
  })

  test('should increment counter with function', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, setState ] = useState(0)
      
      state < maxCounter
        ? setState((state: number) => state + 1)
        : resolve(state)
    }))

    expect(counter).toBe(maxCounter)
  })

  test('should decrement counter with function', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, setState ] = useState(maxCounter)
      
      state >= 1
        ? setState((state: number) => state - 1)
        : resolve(state)
    }))

    expect(counter).toBe(0)
  })

  test('should be called 2 times', async () => {
    let updateCounter = 0

    const counter = await new Promise(resolve => hooked(() => {
      const [ state, setState ] = useState(0)

      updateCounter++

      if (state < maxCounter) {
        for (let i = 0; i < maxCounter; i++) {
          setState((state: number) => state + 1)
        }
      } else {
        resolve(state)
      }
    }))

    expect(updateCounter).toBe(2)
    expect(counter).toBe(maxCounter)
  })
})
