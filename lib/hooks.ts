import { createContext, getContext } from './contexts'
import { update, getCurrentReference } from './updater'

/**
 * Recebe uma função e um estado inicial, retorna um array
 * com o estado atual e uma função de atualização.
 * 
 * @TODO Implementar o terceiro parâmetro
 * 
 * @param reducer 
 * @param initialState 
 * @returns 
 */
export const useReducer = <T, D>(reducer: Function, initialState: T): [ T, Dispatcher<D> ] => {
  const reference = getCurrentReference()
  const context   = getContext(reference)
  const localId   = context.id++

  context.hooks[localId] = context.hooks.hasOwnProperty(localId)
    ? context.hooks[localId]
    : initialState

  const dispatch = (action: D) => {
    context.hooks[localId] = reducer(context.hooks[localId], action)
    update(reference)
  }

  return [context.hooks[localId], dispatch]
}

export const hooked = (fn: Function, ...args: any[]) => {
  createContext(fn, args)
  update(fn)
}
