type Dispatcher<T = { type: string, payload?: any }> = (value: T) => void

type HookedPromiseFn<T = any> = (
  p: {
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void
  }, ...args: any[]
) => void
