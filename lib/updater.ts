import { resetContext } from './contexts'

let currentReference: Function | null = null

/**
 * Retorna a função que está sendo executada no momento
 * @returns 
 */
export const getCurrentReference = (): Function => (
  currentReference!
)

/**
 * Vamos utilizar essa promise para aguardar que todas
 * as atualizações pendentes sejam concluídas, assim
 * podemos chamar a função novamente uma única vez
 */
const wait = Promise.resolve()

/**
 * Armazena as funções que estão concluíndo atualizações
 */
const isUpdating = new Set<Function>()

/**
 * Agenda uma atualização para a função informada, caso
 * a atualização seja chamada multiplas vezes, apenas a primeira
 * será atendida quando não houver nenhum outro pedido
 * @param reference 
 * @returns 
 */
export const update = (reference: Function) => {
  if (isUpdating.has(reference))
    return

  isUpdating.add(reference)

  wait.then(() => {
    isUpdating.delete(reference)
    currentReference = reference
    reference(...resetContext(reference))
    currentReference = null
  })
}
