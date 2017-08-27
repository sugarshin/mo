import { isPlainObject } from 'lodash'

const options = {
  secure: process.env.NODE_ENV === 'production',
}

const createCookiesMiddleware = ({ cookies, option = options } = {}) => {
  if (!cookies) {
    throw new Error('`cookies` object must given.')
  }
  return () => next => action => {
    if (!action.error && action.meta && isPlainObject(action.meta.cookies)) {
      Object.entries(action.meta.cookies).forEach(([key, value]) => {
        if (value === null) {
          cookies.remove(key, option)
        } else {
          cookies.set(key, value, option)
        }
      })
    }
    return next(action)
  }
}

export default createCookiesMiddleware
