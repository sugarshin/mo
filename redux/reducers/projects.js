import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  entities: [],
  isRequesting: false,
  error: null,
}

export const handlerMap = {
  [actions.fetchProjectsRequest]: state => ({
    ...state,
    isRequesting: true,
  }),
  [actions.fetchProjectsReceive]: {
    next: (state, { payload: entities }) => ({
      ...state,
      entities,
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
