type Dispatcher<T = { type: string, payload?: any }> = (value: T) => void
