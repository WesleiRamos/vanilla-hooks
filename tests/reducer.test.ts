import { hooked, useReducer } from 'lib/hooks'
import { describe, expect, test } from '@jest/globals'

type ReducerState = {
  counter: number
}

type ReducerAction = {
  type: 'increment' | 'decrement'
}

describe('useReducer', () => {
  const maxCounter = 5
  const pCounter = document.createElement('p')

  const simpleReducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
      case 'increment': return { counter: state.counter + 1 }
      case 'decrement': return { counter: state.counter - 1 }
      default:
        throw new Error('Invalid action')
    }
  }

  test('should increment counter', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(simpleReducer, {
        counter: 0
      })

      pCounter.innerText = state.counter.toString()

      state.counter <= maxCounter
        ? dispatch({ type: 'increment' })
        : resolve(state.counter.toString())
    }))

    expect(pCounter.innerText).toBe(counter)
  })

  test('should decrement counter', async () => {
    const counter = await new Promise(resolve => hooked(() => {
      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(simpleReducer, {
        counter: maxCounter
      })

      pCounter.innerText = state.counter.toString()

      state.counter >= 1
        ? dispatch({ type: 'decrement' })
        : resolve(state.counter.toString())
    }))

    expect(pCounter.innerText).toBe(counter)
  })

  test('should be called 2 times', async () => {
    let updateCounter = 0

    const counter = await new Promise(resolve => hooked(() => {
      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(simpleReducer, {
        counter: 0
      })

      pCounter.innerText = state.counter.toString()
      updateCounter++

      if (state.counter <= maxCounter) {
        for (let i = 0; i <= maxCounter; i++) {
          dispatch({ type: 'increment' })
        }
      } else {
        resolve(state.counter.toString())
      }
    }))

    expect(updateCounter).toBe(2)
    expect(pCounter.innerText).toBe(counter)
  })

  test('should throw error', async () => {
    expect(new Promise((_, reject) => hooked(() => {
      const [, dispatch ] = useReducer<ReducerState, ReducerAction>(simpleReducer, {
        counter: 0
      })

      try {
        dispatch({ type: 'invalid' as any })
      } catch (error) {
        reject(error)
      }
    }))).rejects.toThrowError('Invalid action')
  })
})
