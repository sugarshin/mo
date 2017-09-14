import { createStore, applyMiddleware } from 'redux'
import reduxCatch from 'redux-catch'
import thunk from 'redux-thunk'
import throttle from 'redux-throttle'
import Cookies from 'universal-cookie'
import { merge } from 'lodash'
import createCookiesMiddleware from '../middlewares/cookies'
import signoutOnAuthorizationError from '../middlewares/signoutOnAuthorizationError'
import rootReducer from '../reducers'

const makeStore = (initialState, { req }) => {
  const cookies = new Cookies(req ? (req.headers.cookie || '') : null)
  const token = cookies.get('__ct') || null
  const store = createStore(
    rootReducer,
    merge({ auth: { token } }, initialState),
    applyMiddleware(
      reduxCatch((e, getState, action) => console.error(e, getState(), action)), // eslint-disable-line no-console
      thunk.withExtraArgument({ cookies }),
      signoutOnAuthorizationError,
      createCookiesMiddleware({ cookies, option: { secure: true } }),
      throttle(400, { leading: true, trailing: true })
    )
  )

  return store
}

export default makeStore
