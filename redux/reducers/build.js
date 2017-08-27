import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  entity: {},
  isRequesting: false,
  error: null,
}

export const handlerMap = {
  [actions.fetchSingleBuildRequest]: state => ({
    ...state,
    isRequesting: true,
  }),
  [actions.fetchSingleBuildReceive]: {
    next: (state, { payload: entity }) => ({
      ...state,
      entity,
      isRequesting: false,
      error: null,
    }),
    throw: (state, { payload: error }) => ({
      ...state,
      isRequesting: false,
      error,
    }),
  },
}

export default handleActions(handlerMap, initialState)
