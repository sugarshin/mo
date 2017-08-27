import Router from 'next/router'
import { signout } from '../actions'

const signoutOnAuthorizationError = store => next => action => {
  if (action.error && action.payload && action.payload.status === 401) {
    store.dispatch(signout())
    Router.replace('/authorize')
  }
  return next(action)
}

export default signoutOnAuthorizationError
