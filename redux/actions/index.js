import { createAction } from 'redux-actions'

const AUTHORIZE = 'AUTHORIZE'
export const authorize = createAction(
  AUTHORIZE,
  null,
  payload => ({ cookies: { __ct: payload } })
)

const SIGNOUT = 'SIGNOUT'
export const signout = createAction(
  SIGNOUT,
  null,
  payload => ({ cookies: { __ct: null } })
)

const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST'
export const fetchMeRequest = createAction(FETCH_ME_REQUEST)

const FETCH_ME_RECEIVE = 'FETCH_ME_RECEIVE'
export const fetchMeReceive = createAction(
  FETCH_ME_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const FETCH_RECENT_BUILDS_REQUEST = 'FETCH_RECENT_BUILDS_REQUEST'
export const fetchRecentBuildsRequest = createAction(FETCH_RECENT_BUILDS_REQUEST)

const FETCH_RECENT_BUILDS_RECEIVE = 'FETCH_RECENT_BUILDS_RECEIVE'
export const fetchRecentBuildsReceive = createAction(
  FETCH_RECENT_BUILDS_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const FETCH_SINGLE_BUILD_REQUEST = 'FETCH_SINGLE_BUILD_REQUEST'
export const fetchSingleBuildRequest = createAction(FETCH_SINGLE_BUILD_REQUEST)

const FETCH_SINGLE_BUILD_RECEIVE = 'FETCH_SINGLE_BUILD_RECEIVE'
export const fetchSingleBuildReceive = createAction(
  FETCH_SINGLE_BUILD_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const RESET_BUILD = 'RESET_BUILD'
export const resetBuild = createAction(RESET_BUILD)

const OPEN_SIDEMENU = 'OPEN_SIDEMENU'
export const openSidemenu = createAction(OPEN_SIDEMENU)

const CLOSE_SIDEMENU = 'CLOSE_SIDEMENU'
export const closeSidemenu = createAction(CLOSE_SIDEMENU)

const TOGGLE_SIDEMENU = 'TOGGLE_SIDEMENU'
export const toggleSidemenu = createAction(TOGGLE_SIDEMENU)

const FETCH_STEPS_REQUEST = 'FETCH_STEPS_REQUEST'
export const fetchStepsRequest = createAction(FETCH_STEPS_REQUEST)

const FETCH_STEPS_RECEIVE = 'FETCH_STEPS_RECEIVE'
export const fetchStepsReceive = createAction(
  FETCH_STEPS_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const RESET_STEPS = 'RESET_STEPS'
export const resetSteps = createAction(RESET_STEPS)

const REBUILD_REQUEST = 'REBUILD_REQUEST'
export const rebuildRequest = createAction(REBUILD_REQUEST)

const REBUILD_RECEIVE = 'REBUILD_RECEIVE'
export const rebuildReceive = createAction(
  REBUILD_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const CANCEL_BUILD_REQUEST = 'CANCEL_BUILD_REQUEST'
export const cancelBuildRequest = createAction(CANCEL_BUILD_REQUEST)

const CANCEL_BUILD_RECEIVE = 'CANCEL_BUILD_RECEIVE'
export const cancelBuildReceive = createAction(
  CANCEL_BUILD_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const DELETE_BUILD_CACHE_REQUEST = 'DELETE_BUILD_CACHE_REQUEST'
export const deleteBuildCacheRequest = createAction(DELETE_BUILD_CACHE_REQUEST)

const DELETE_BUILD_CACHE_RECEIVE = 'DELETE_BUILD_CACHE_RECEIVE'
export const deleteBuildCacheReceive = createAction(
  DELETE_BUILD_CACHE_RECEIVE,
  null,
  payload => ({ camelize: true })
)

const REBUILD_WITHOUT_CACHE_REQUEST = 'REBUILD_WITHOUT_CACHE_REQUEST'
export const rebuildWithoutCacheRequest = createAction(REBUILD_WITHOUT_CACHE_REQUEST)

const REBUILD_WITHOUT_CACHE_RECEIVE = 'REBUILD_WITHOUT_CACHE_RECEIVE'
export const rebuildWithoutCacheReceive = createAction(
  REBUILD_WITHOUT_CACHE_RECEIVE,
  null,
  payload => ({ camelize: true })
)
