import { isPlainObject } from 'lodash'

const createCookiesMiddleware = ({ cookies, option: baseOption = {} } = {}) => {
  if (!cookies) {
    throw new Error('`cookies` object must given.')
  }
  return () => next => action => {
    if (!action.error && action.meta && isPlainObject(action.meta.cookies)) {
      Object.entries(action.meta.cookies).forEach(
        ([key, { value, option }]) => {
          if (value === null) {
            cookies.remove(key, { ...baseOption, ...option })
          } else {
            cookies.set(key, value, { ...baseOption, ...option })
          }
        }
      )
    }
    return next(action)
  }
}

export default createCookiesMiddleware
