import { createStore, applyMiddleware } from 'redux'
import reduxCatch from 'redux-catch'
import thunk from 'redux-thunk'
import throttle from 'redux-throttle'
import Cookies from 'universal-cookie'
import createCookiesMiddleware from '../middlewares/cookies'
import rootReducer from '../reducers'

const makeStore = (initialState, { req }) => {
  const cookies = new Cookies(req ? (req.headers.cookie || '') : null)
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      reduxCatch((e, getState, action) => console.error(e, getState(), action)), // eslint-disable-line no-console
      thunk.withExtraArgument({ cookies }),
      createCookiesMiddleware({ cookies }),
      throttle(400, { leading: true, trailing: true })
    )
  )

  return store
}

export default makeStore
