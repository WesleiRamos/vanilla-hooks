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

/**
 * Função unica para o hook useState, será passada para o hook
 * useReducer.
 * 
 * @param state 
 * @param action 
 * @returns 
 */
const useStateReducer = (state: any, action: any) => (
  typeof action === 'function'
    ? action(state) || action
    : action
)

/**
 * Recebe um estado inicial e retorna um array com o estado atual
 * e uma função de atualização.
 * 
 * @param initialValue 
 * @returns 
 */
export const useState = <T>(initialValue: T) => {
  return useReducer<T, T | ((state: T) => T)>(useStateReducer, initialValue)
}

/**
 * 
 * @param initialValue 
 * @returns 
 */
export const useRef = <T>(initialValue: T) => {
  return useState({ current: initialValue })[0]
}

/**
 * Recebe uma função e prepara para que seja possível
 * a utilização de hooks dentro dela.
 * 
 * @param fn    Função que será utilizada
 * @param args  Argumentos que serão passados para a função toda vez que ela for executada
 */
export const hooked = (fn: Function, ...args: any[]) => {
  createContext(fn, args)
  update(fn)
}
