import { hookedPromise, useReducer } from 'src/hooks'
import { describe, expect, test } from '@jest/globals'

type ReducerState = {
  counter: number
}

type ReducerAction = {
  type: 'increment' | 'decrement'
}

describe('useReducer', () => {
  const maxCounter = 5

  const simpleReducer = (state: ReducerState, action: ReducerAction) => {
    switch (action.type) {
      case 'increment': return { counter: state.counter + 1 }
      case 'decrement': return { counter: state.counter - 1 }
      default:
        throw new Error('Invalid action')
    }
  }

  test('should increment counter', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(
        simpleReducer, { counter: 0 }
      )

      state.counter < maxCounter
        ? dispatch({ type: 'increment' })
        : resolve(state.counter)
    })).resolves.toBe(maxCounter)
  })

  test('should decrement counter', async () => {
    expect(hookedPromise(({ resolve }) => {
      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(
        simpleReducer, { counter: maxCounter }
      )

      state.counter >= 1
        ? dispatch({ type: 'decrement' })
        : resolve(state.counter)
    })).resolves.toBe(0)
  })

  test('should be called 2 times', async () => {
    let updateCounter = 0

    expect(hookedPromise(({ resolve }) => {
      updateCounter++

      const [ state, dispatch ] = useReducer<ReducerState, ReducerAction>(
        simpleReducer, { counter: 0 }
      )

      if (state.counter < maxCounter) {
        for (let i = 0; i < maxCounter; i++) {
          dispatch({ type: 'increment' })
        }
      } else {
        resolve([ updateCounter, state.counter ])
      }
    })).resolves.toEqual([ 2, maxCounter ])
  })

  test('should throw error', async () => {
    expect(hookedPromise(({ reject }) => {
      const [, dispatch ] = useReducer<ReducerState, ReducerAction>(
        simpleReducer, { counter: 0 }
      )

      try {
        dispatch({ type: 'invalid' as any })
      } catch (error) {
        reject(error)
      }
    })).rejects.toThrowError('Invalid action')
  })
})
