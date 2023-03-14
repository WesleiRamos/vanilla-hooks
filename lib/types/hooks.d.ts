type Dispatcher<T = { type: string, payload?: any }> = (action: T) => void
