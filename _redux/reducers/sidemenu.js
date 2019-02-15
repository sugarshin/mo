import { handleActions } from 'redux-actions'
import * as actions from '../actions'

export const initialState = {
  isOpen: false
}

export const handlerMap = {
  [actions.openSidemenu]: state => ({ ...state, isOpen: true }),
  [actions.closeSidemenu]: state => ({ ...state, isOpen: false }),
  [actions.toggleSidemenu]: state => ({ ...state, isOpen: !state.isOpen })
}

export default handleActions(handlerMap, initialState)
