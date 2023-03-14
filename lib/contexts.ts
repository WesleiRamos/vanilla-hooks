const contexts = new WeakMap<Function, Context>()

/**
 * Cria um contexto para a função passada
 * @param reference 
 * @param args 
 */
export const createContext = (reference: Function, args: any[]) => {
  contexts.set(reference, {
    id: 0,
    args,
    hooks: {},
    cleanups: []
  })
}

/**
 * Retorna o contexto de uma função
 * @param reference 
 * @returns 
 */
export const getContext = (reference: Function): Context => {
  return contexts.get(reference)!
}

/**
 * Reseta o contexto da função e retorna os argumentos iniciais
 * @param reference 
 * @returns 
 */
export const resetContext = (reference: Function): any[] => {
  const context = getContext(reference)

  context.id = 0

  while (context.cleanups.length) {
    const cleanup = context.cleanups.shift()
    cleanup && cleanup()
  }

  return context.args
}
