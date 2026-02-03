import { isString } from 'lodash-es'

class FakeUIError extends Error {
  constructor(msg: string) {
    super(msg)
    this.name = 'FakeUIError'
  }
}

export function throwError(scope: string, msg: string) {
  throw new FakeUIError(`[${scope}]:${msg}`)
}

export function debugWarn(error: Error): void
export function debugWarn(scope: string, msg: string): void
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? new FakeUIError(`[${scope}]:${msg}`) : scope
    console.warn(err)
  }
}
