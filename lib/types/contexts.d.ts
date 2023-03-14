type Context = {
  id: number,
  args: any[],
  cleanups: Function[],
  hooks: { [key: number]: any }
}
