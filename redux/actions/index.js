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

const FETCH_PROJECTS_REQUEST = 'FETCH_PROJECTS_REQUEST'
export const fetchProjectsRequest = createAction(FETCH_PROJECTS_REQUEST)

const FETCH_PROJECTS_RECEIVE = 'FETCH_PROJECTS_RECEIVE'
export const fetchProjectsReceive = createAction(
  FETCH_PROJECTS_RECEIVE,
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
