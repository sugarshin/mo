import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import reduxCatch from 'redux-catch'
import thunk from 'redux-thunk'
import throttle from 'redux-throttle'
import Cookies from 'universal-cookie'
import { merge } from 'lodash'
import createCookiesMiddleware from '../middlewares/cookies'
import signoutOnAuthorizationError from '../middlewares/signoutOnAuthorizationError'
import rootReducer from '../reducers'

const makeStore = (initialState, { req, isServer }) => {
  const cookies = new Cookies(req ? (req.headers.cookie || '') : null)
  const token = cookies.get('__ct') || null
  const store = createStore(
    rootReducer,
    merge({ auth: { token } }, initialState),
    applyMiddleware(
      reduxCatch((e, getState, action) => console.error(e, getState(), action)), // eslint-disable-line no-console
      thunk.withExtraArgument({ cookies }),
      signoutOnAuthorizationError,
      createCookiesMiddleware({ cookies }),
      throttle(400, { leading: true, trailing: true }),
      createLogger({ predicate: () => isServer ? false : true })
    )
  )

  return store
}

export default makeStore
