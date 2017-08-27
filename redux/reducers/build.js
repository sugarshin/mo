import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  entity: {},
  isRequesting: false,
  isCancelRequesting: false,
  isRebuildRequesting: false,
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
  [actions.resetBuild]: () => ({ ...initialState }),
  [actions.cancelBuildRequest]: state => ({ ...state, isCancelRequesting: true }),
  [actions.cancelBuildReceive]: state => ({ ...state, isCancelRequesting: false }),
  [actions.rebuildRequest]: state => ({ ...state, isRebuildRequesting: true }),
  [actions.rebuildReceive]: state => ({ ...state, isRebuildRequesting: false }),
  [actions.rebuildWithoutCacheRequest]: state => ({ ...state, isRebuildRequesting: true }),
  [actions.rebuildWithoutCacheReceive]: state => ({ ...state, isRebuildRequesting: false }),
}

export default handleActions(handlerMap, initialState)
