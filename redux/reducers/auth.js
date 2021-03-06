import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  token: null,
}

export const handlerMap = {
  [actions.authorize]: (state, { payload: token }) => ({ ...state, token }),
  [actions.signout]: state => ({ ...state, token: null }),
}

export default handleActions(handlerMap, initialState)
