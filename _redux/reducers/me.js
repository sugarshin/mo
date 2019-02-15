import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  entity: {},
  isRequesting: false,
  error: null
}

export const handlerMap = {
  [actions.fetchMeRequest]: state => ({
    ...state,
    isRequesting: true
  }),
  [actions.fetchMeReceive]: {
    next: (state, { payload: entity }) => ({
      ...state,
      entity,
      isRequesting: false,
      error: null
    }),
    throw: (state, { payload: error }) => ({
      ...state,
      isRequesting: false,
      error
    })
  }
}

export default handleActions(handlerMap, initialState)
